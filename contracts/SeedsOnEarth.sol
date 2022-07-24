//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SeedsOnEarth {
    using SafeERC20 for IERC20;

    enum QuestStatus { PENDING, PICKEDUP, COMPLETED, DISMISSED, PAIDOUT }

    struct Quest{
        address sponser;
        bool isEth;
        IERC20 token;
        uint256 amount;
        string description;
        uint256 timeToComplete;
        string pickedUpHash;
        string completedHash;
        address user;
        uint256 pickUpTime;
        QuestStatus status;
    }

    event SponserQuest(uint256 indexed _questId, address indexed _token, uint256 indexed _amount, string _description);
    event PickUpQuest(uint256 indexed _questId, address indexed _sender, string indexed _ipfsHash);
    event CompleteQuest(uint256 indexed _questId, address indexed _sender, string indexed _ipfsHash);
    event ReviewSubmission(uint256 indexed _questId, bool indexed _approve);
    event RejectSubmission(uint256 indexed _questId);
    event ApproveSubmission(uint256 indexed _questId);
    event Withdraw(uint256 indexed _questId);

    Quest[] public quests;

    uint256 public constant WITHDRAW_PENDING_PERIOD = 604800;
    address public committee;

    constructor(address _committee)
    {
        committee = _committee;
    }

    /**
    * @notice add a new quest, called by quest's sponser and deposits the quest's price
    * @param _tokenAddress address of token to pay for quest, unless it's ETH
    * @param _amount amount of token to deposit for completing the quest
    * @param _description name of quest
    * @param _timeToComplete time in seconds between picking up the quest until it must be completed
    **/
    function sponserQuest(
            address _tokenAddress, 
            uint256 _amount, 
            string memory _description, 
            uint _timeToComplete) 
        public 
        payable
    {
        require(msg.value > 0 || (_tokenAddress != address(0) && _amount > 0), "Quest must have value");
        bool isEth_ = (msg.value > 0);
        Quest memory quest = Quest({
            sponser: msg.sender,
            isEth: isEth_,
            token: IERC20(_tokenAddress),
            amount: isEth_? msg.value : _amount,
            description: _description,
            timeToComplete: _timeToComplete,
            pickedUpHash: "",
            completedHash: "",
            user: address(0),
            pickUpTime : 0,
            status: QuestStatus.PENDING
        });

        if (_amount > 0)
            quest.token.safeTransferFrom(msg.sender, address(this), _amount);

        quests.push(quest);

        emit SponserQuest(quests.length - 1, _tokenAddress, quest.amount, _description);
    }
    
    /**
    * @notice pick up a quest, called by user which then has `quest.timeToComplete` to complete it
    * @param _questId id of quest
    * @param _ipfsHash hash of before image/video of quest location
    **/
    function pickUpQuest(uint256 _questId, string memory _ipfsHash) public {
        Quest storage quest = quests[_questId];
        require(quest.status == QuestStatus.PENDING, "Quest must be pending pick up");
        quest.pickedUpHash = _ipfsHash;
        quest.user = msg.sender;
        quest.status = QuestStatus.PICKEDUP;
        quest.pickUpTime = block.timestamp;
        emit PickUpQuest(_questId, msg.sender, _ipfsHash);
    }
  
    /**
    * @notice report completing a quest, called only by the user which picked up the quest, and before completing timeout
    * @param _questId id of quest
    * @param _ipfsHash hash of after image/video of quest location
    **/
    function completeQuest(uint256 _questId, string memory _ipfsHash) public {
        Quest storage quest = quests[_questId];
        require(quest.status == QuestStatus.PICKEDUP, "Quest not picked up");
        require(quest.user == msg.sender, "Quest picked up by other user");
        require(block.timestamp - quest.pickUpTime <= quest.timeToComplete, "Time to complete quest has passed");
        quest.completedHash = _ipfsHash;
        quest.status = QuestStatus.COMPLETED;
        emit CompleteQuest(_questId, msg.sender, _ipfsHash);
    }
    
    /**
    * @dev payout the amount of quest to user or refund sponser
    **/
    function _payOutQuest(Quest storage _quest, bool _refund) private {
        address to = _refund? _quest.sponser : _quest.user;
        if (_quest.isEth){
                (bool success,) = to.call{value: _quest.amount}("");
                require(success, "Failed to send ETH");
            } else {
                _quest.token.safeTransfer(to, _quest.amount);
            }
        _quest.status = QuestStatus.PAIDOUT;
    }

    /**
    * @notice sponser reviews submission of completed quest
    * @param _questId id of quest
    * @param _approve whether to approve the completion and pay out the user or dismiss it 
    * (and pass to committee for final approval)
    **/
    function reviewSubmission(uint256 _questId, bool _approve) public {
        Quest storage quest = quests[_questId];
        require(msg.sender == quest.sponser, "Only quest's sponser can review submission");
        require(quest.status == QuestStatus.COMPLETED, "Quest not completed");
        if (_approve) {
            _payOutQuest(quest, false);
        } else {
            quest.status = QuestStatus.DISMISSED;
        }
        emit ReviewSubmission(_questId, _approve);
    }

    /**
    * @notice after dismisal of quest completion by the sponser, or in case the timeout for completion had passed,
    * the committe can reset the quest back to pending
    * @param _questId id of quest
    **/
    function rejectSubmission(uint256 _questId) public {
        Quest storage quest = quests[_questId];
        require(msg.sender == committee, "Only committee can reject submissions");
        require(quest.status == QuestStatus.DISMISSED || 
            (quest.status == QuestStatus.PICKEDUP && block.timestamp - quest.pickUpTime > quest.timeToComplete),
             "Quest can only be reset if it was dismissed by sponser or time to complete had passed");
        quest.pickedUpHash = "";
        quest.completedHash = "";
        quest.user = address(0);
        quest.status = QuestStatus.PENDING;
        quest.pickUpTime = 0;
        emit RejectSubmission(_questId);
    }

    /**
    * @notice after dismisal of quest completion by the sponser, the committe can choose to still 
    * approve the completion and pay out the user
    * @param _questId id of quest
    **/
    function approveSubmission(uint256 _questId) public {
        Quest storage quest = quests[_questId];
        require(quest.status == QuestStatus.DISMISSED, "Quest was not dismissed by sponser");
        require(msg.sender == committee, "Only committee can approve submissions after dismisal");
        _payOutQuest(quest, false);
        emit ApproveSubmission(_questId);
    }

    /**
    * @notice quest sponser can ask to withdraw his quest and get refunded, only in the case the quest is pending pick up
    * @param _questId id of quest
    **/
    function withdraw(uint256 _questId) public {
        Quest storage quest = quests[_questId];
        require(msg.sender == quest.sponser, "Only quest's sponser can request to withdraw");
        require(quest.status == QuestStatus.PENDING, "Withdraw can be done only when quest is pending");
        _payOutQuest(quest, true);
        emit Withdraw(_questId);
    }

    receive() external payable {}
}