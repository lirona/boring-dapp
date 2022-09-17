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
        uint256 timeToComplete;
        string infoHash;
        string pickedUpHash;
        string completedHash;
        uint256 numOfUsers;
        address[] users;
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
    mapping(address => uint[]) public usersQuestsMapping;

    uint256 public constant WITHDRAW_PENDING_PERIOD = 604800;
    address public committee;

    constructor(address _committee)
    {
        committee = _committee;
    }

    /**
    * @notice add a new quest, called by quest's sponser and deposits the quest's price 
    * (enabling financial access, local economies and global ecologies)
    * @param _tokenAddress address of token to pay for quest, unless it's ETH
    * @param _amount amount of token to deposit for completing the quest
    * @param _ipfsHash IPFS hash of quest details
    * @param _timeToComplete time in seconds between picking up the quest until it must be completed 
    * (ensuring lack of fraud)
    **/
    function sponserQuest(
        address _tokenAddress, 
        uint256 _amount, 
        uint256 _numOfUsers,
        uint _timeToComplete,
        string calldata _ipfsHash
        ) 
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
            timeToComplete: _timeToComplete,
            infoHash: _ipfsHash,
            pickedUpHash: "",
            completedHash: "",
            numOfUsers: _numOfUsers,
            users: new address[](_numOfUsers),
            pickUpTime : 0,
            status: QuestStatus.PENDING
        });

        if (_amount > 0)
            quest.token.safeTransferFrom(msg.sender, address(this), _amount);

        quests.push(quest);

        emit SponserQuest(quests.length - 1, _tokenAddress, quest.amount, _ipfsHash);
    }

    /**
    * @notice pick up a quest, called by user which then has `quest.timeToComplete` to complete it
    * @param _questId id of quest
    * @param _ipfsHash hash of before image/video of quest location (trustworthiness)
    **/
    function pickUpQuest(uint256 _questId, string memory _ipfsHash) public {
        Quest storage quest = quests[_questId];
        require(quest.status == QuestStatus.PENDING, "Quest must be pending pick up");
        quest.pickedUpHash = _ipfsHash;
        quest.users.push(msg.sender);
        usersQuestsMapping[msg.sender].push(_questId);
        if (quest.users.length == quest.numOfUsers) {
            quest.status = QuestStatus.PICKEDUP;
            quest.pickUpTime = block.timestamp;
        }
        emit PickUpQuest(_questId, msg.sender, _ipfsHash);
    }
  
    /**
    * @notice report completing a quest, called only by one of the users which picked up the quest,
    * and before completing timeout
    * @param _questId id of quest
    * @param _ipfsHash hash of after image/video of quest location (trustworthiness)
    **/
    function completeQuest(uint256 _questId, string memory _ipfsHash) public {
        Quest storage quest = quests[_questId];
        require(quest.status == QuestStatus.PICKEDUP, "Quest not picked up");
        require(_addressInQuestUsers(msg.sender, quest), "Must be reported by one of the users that picked up this quest");
        require(block.timestamp - quest.pickUpTime <= quest.timeToComplete, "Time to complete quest has passed");
        quest.completedHash = _ipfsHash;
        quest.status = QuestStatus.COMPLETED;
        emit CompleteQuest(_questId, msg.sender, _ipfsHash);
    }

    /**
    * @notice sponser reviews submission of completed quest
    * @param _questId id of quest
    * @param _approve whether to approve the completion and pay out the user or dismiss it (right to appeal and fairness)
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
        quest.users = new address[](quest.numOfUsers);
        quest.status = QuestStatus.PENDING;
        quest.pickUpTime = 0;
        emit RejectSubmission(_questId);
    }

    /**
    * @notice after dismisal of quest completion by the sponser, the committe can choose to still 
    * approve the completion and pay out the user (right to appeal and fairness)
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

     /**
    * @dev payout the amount of quest to users or refund sponser
    * (enabling financial access to local communities and ensuring fairness)
    **/
    function _payOutQuest(Quest storage _quest, bool _refund) private {
        if (_refund) {
            _payUser(_quest.sponser, _quest, _quest.amount);
        } else {
            uint userCount = _quest.users.length;
            uint256 amount = _quest.amount / userCount;
            for (uint i = 0; i < userCount; i++) {
                _payUser(_quest.users[i], _quest, amount);
            }
        }
        _quest.status = QuestStatus.PAIDOUT;
    }

    function _payUser(address _user, Quest storage _quest, uint256 amount) private {
        if (_quest.isEth) {
            (bool success, ) = _user.call{value: amount}("");
            require(success, "Failed to send ETH");
        } else {
            _quest.token.safeTransfer(_user, amount);
        }
    }

    function _addressInQuestUsers(address _add, Quest storage _quest) private view returns (bool) {
        for (uint i = 0; i < _quest.users.length; i++) {
            if (_quest.users[i] == _add)
                return true;
        }
        return false;
    }

    function getQuests() public view returns (Quest[] memory) {
        return quests;
    }

    function getQuestsForUser(address _user) public view returns (uint[] memory) {
        return usersQuestsMapping[_user];
    }
        
    receive() external payable {}
}
