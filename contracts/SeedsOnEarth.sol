//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SeedsOnEarth {
    using SafeERC20 for IERC20;

    enum QuestStatus { CREATED, PENDING, READYTOPICKUP, PICKEDUP, COMPLETED, DISMISSED, PAIDOUT }

    struct Quest{
        address creator;
        address sponsor;
        bool isCelo;
        IERC20 token;
        uint256 amount;
        uint256 timeToComplete;
        string infoHash;
        string pickedUpHash;
        string completedHash;
        uint256 numOfUsers;
        address[] users;
        uint256 createdTime;
        uint256 pickUpTime;
    }

    event CreateQuest(
        uint256 indexed _questId, 
        address indexed _token, 
        uint256 indexed _amount, 
        uint256 _numOfUsers, 
        uint256 _timeToComplete, 
        string _ipfsHash
    );
    event SponsorQuest(uint256 indexed _questId, address indexed _tokenAddress, uint256 indexed amount);
    event JoinQuest(uint256 indexed _questId, address indexed _sender);
    event PickUpQuest(uint256 indexed _questId, address indexed _sender, string indexed _ipfsHash);
    event CompleteQuest(uint256 indexed _questId, address indexed _sender, string indexed _ipfsHash);
    event ReviewSubmission(uint256 indexed _questId, bool indexed _approve);
    event RejectSubmission(uint256 indexed _questId);
    event ApproveSubmission(uint256 indexed _questId);
    event Withdraw(uint256 indexed _questId);

    Quest[] public quests;

    // user => questIds
    mapping(address => uint[]) public usersQuestsMapping;

    // questId => QuestStatus
    mapping(uint256 => QuestStatus) public questStatuses;

    uint256 public constant WITHDRAW_PENDING_PERIOD = 7 * 24 * 60 * 60; // 7 days
    uint256 public constant SPONSOR_PENDING_PERIOD = 30 * 24 * 60 * 60; // 30 days

    address public committee;

    constructor(address _committee)
    {
        committee = _committee;
    }

    /**
    * @notice add a new quest, called by quest's creator and deposits the quest's bounty.
    * if there is no bounty deposited, the quest will be in pending status for 30 days, during which
    * anyone can sponsor the quest.
    * (enabling financial access, local economies and global ecologies)
    * @param _tokenAddress address of token to pay for quest, unless it's ETH
    * @param _amount amount of token to deposit for completing the quest
    * @param _numOfUsers number of users required to complete the quest
    * @param _timeToComplete time in seconds between picking up the quest until it must be completed 
    * (ensuring lack of fraud)
    * @param _ipfsHash IPFS hash of quest details
    **/
    function createQuest(
        address _tokenAddress, 
        uint256 _amount, 
        uint256 _numOfUsers,
        uint _timeToComplete,
        string calldata _ipfsHash
        ) 
    public 
    payable
    {
        QuestStatus status;
        if (msg.value > 0 || (_tokenAddress != address(0) && _amount > 0)){
            status = QuestStatus.PENDING;
        } else {
            status = QuestStatus.CREATED;
        }
        bool isCelo_ = (msg.value > 0);
        Quest memory quest = Quest({
            creator: msg.sender,
            sponsor: status == QuestStatus.PENDING ? msg.sender : address(0),
            isCelo: isCelo_,
            token: IERC20(_tokenAddress),
            amount: isCelo_? msg.value : _amount,
            timeToComplete: _timeToComplete,
            infoHash: _ipfsHash,
            pickedUpHash: "",
            completedHash: "",
            numOfUsers: _numOfUsers,
            users: new address[](0),
            createdTime: block.timestamp,
            pickUpTime : 0
        });

        if (_amount > 0)
            quest.token.safeTransferFrom(msg.sender, address(this), _amount);

        quests.push(quest);
        questStatuses[quests.length - 1] = status;

        emit CreateQuest(quests.length - 1, _tokenAddress, quest.amount, _numOfUsers, _timeToComplete, _ipfsHash);
    }
    
    /**
     * @notice sponsor a quest and deposits the quest's price.
     * can be called by anyone to sponsor a quest which doesn't have a bounty yet.
     * @param _questId id of quest to sponsor
     * @param _tokenAddress address of token to pay for quest, unless it's CELO transfered with msg.value
     * @param _amount amount of token to deposit for the quest's bounty
     */
    function sponsorQuest(uint256 _questId, address _tokenAddress, uint256 _amount) public payable {
        Quest storage quest = quests[_questId];
        require(questStatuses[_questId] == QuestStatus.CREATED, "Quest already sponsored");
        require(block.timestamp - quest.createdTime < SPONSOR_PENDING_PERIOD, "Sponsor period expired");
        
        bool isCelo_ = (msg.value > 0);

        if (_amount > 0)
            quest.token.safeTransferFrom(msg.sender, address(this), _amount);

        questStatuses[_questId] = QuestStatus.PENDING;
        quest.sponsor = msg.sender;
        quest.isCelo = isCelo_;
        quest.amount = isCelo_? msg.value : _amount;
        quest.token = IERC20(_tokenAddress);

        emit SponsorQuest(_questId, _tokenAddress, _amount);
    }

    /**
    * @notice join a quest, called by user to join a quest
    * @param _questId id of quest
    **/
    function joinQuest(uint256 _questId) public {
        Quest storage quest = quests[_questId];
        require(questStatuses[_questId] == QuestStatus.PENDING, "Quest must be pending to join");
        quest.users.push(msg.sender);
        usersQuestsMapping[msg.sender].push(_questId);
        if (quest.users.length == quest.numOfUsers) {
            questStatuses[_questId] = QuestStatus.READYTOPICKUP;
        }
        emit JoinQuest(_questId, msg.sender);
    }

    /**
    * @notice pick up a quest, called any of the users that have joined the quest.
    * after picking up, the users have `quest.timeToComplete` to complete it
    * @param _questId id of quest
    * @param _ipfsHash hash of before image/video of quest location (trustworthiness)
    **/
    function pickUpQuest(uint256 _questId, string memory _ipfsHash) public {
        Quest storage quest = quests[_questId];
        require(questStatuses[_questId] == QuestStatus.READYTOPICKUP, "Quest must be ready to pick up");
        require(_addressInQuestUsers(msg.sender, quest), "Must be picked up by one of the users that joined this quest");
        quest.pickedUpHash = _ipfsHash;
        questStatuses[_questId] = QuestStatus.PICKEDUP;
        quest.pickUpTime = block.timestamp;
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
        require(questStatuses[_questId] == QuestStatus.PICKEDUP, "Quest not picked up");
        require(_addressInQuestUsers(msg.sender, quest), "Must be reported by one of the users that picked up this quest");
        require(block.timestamp - quest.pickUpTime <= quest.timeToComplete, "Time to complete quest has passed");
        quest.completedHash = _ipfsHash;
        questStatuses[_questId] = QuestStatus.COMPLETED;
        emit CompleteQuest(_questId, msg.sender, _ipfsHash);
    }

    /**
    * @notice creator reviews submission of completed quest
    * @param _questId id of quest
    * @param _approve whether to approve the completion and pay out the user or dismiss it (right to appeal and fairness)
    * (and pass to committee for final approval)
    **/
    function reviewSubmission(uint256 _questId, bool _approve) public {
        Quest storage quest = quests[_questId];
        require(msg.sender == quest.creator, "Only quest's creator can review submission");
        require(questStatuses[_questId] == QuestStatus.COMPLETED, "Quest not completed");
        if (_approve) {
            _payOutQuest(quest, false);
        } else {
            questStatuses[_questId] = QuestStatus.DISMISSED;
        }
        emit ReviewSubmission(_questId, _approve);
    }

    /**
    * @notice after dismisal of quest completion by the creator, or in case the timeout for completion had passed,
    * the committe can reset the quest back to pending
    * @param _questId id of quest
    **/
    function rejectSubmission(uint256 _questId) public {
        Quest storage quest = quests[_questId];
        require(msg.sender == committee, "Only committee can reject submissions");
        require(questStatuses[_questId] == QuestStatus.DISMISSED || 
            (questStatuses[_questId] == QuestStatus.PICKEDUP && block.timestamp - quest.pickUpTime > quest.timeToComplete),
             "Quest can only be reset if it was dismissed by creator or time to complete had passed");
        quest.pickedUpHash = "";
        quest.completedHash = "";
        quest.users = new address[](0);
        questStatuses[_questId] = QuestStatus.PENDING;
        quest.pickUpTime = 0;
        emit RejectSubmission(_questId);
    }

    /**
    * @notice after dismisal of quest completion by the creator, the committe can choose to still 
    * approve the completion and pay out the user (right to appeal and fairness)
    * @param _questId id of quest
    **/
    function approveSubmission(uint256 _questId) public {
        Quest storage quest = quests[_questId];
        require(questStatuses[_questId] == QuestStatus.DISMISSED, "Quest was not dismissed by creator");
        require(msg.sender == committee, "Only committee can approve submissions after dismisal");
        _payOutQuest(quest, false);
        emit ApproveSubmission(_questId);
    }

    /**
    * @notice quest sponsor can ask to withdraw his quest and get refunded, only in the case the
    * quest is pending pick up
    * @param _questId id of quest
    **/
    function withdraw(uint256 _questId) public {
        Quest storage quest = quests[_questId];
        require(msg.sender == quest.sponsor, "Only quest's sponsor can request to withdraw");
        require(questStatuses[_questId] == QuestStatus.PENDING || questStatuses[_questId] == QuestStatus.READYTOPICKUP, "Withdraw can be done only when quest is not yet picked up");
        _payOutQuest(quest, true);
        emit Withdraw(_questId);
    }

    /**
    * @dev payout the amount of quest to users or refund sponsor
    * (enabling financial access to local communities and ensuring fairness)
    **/
    function _payOutQuest(Quest storage _quest, bool _refund) private {
        if (_refund) {
            _payUser(_quest.sponsor, _quest, _quest.amount);
        } else {
            uint userCount = _quest.users.length;
            uint256 amount = _quest.amount / userCount;
            for (uint i = 0; i < userCount; i++) {
                _payUser(_quest.users[i], _quest, amount);
            }
        }
    }

    function _payUser(address _user, Quest storage _quest, uint256 amount) private {
        if (_quest.isCelo) {
            (bool success, ) = _user.call{value: amount}("");
            require(success, "Failed to send CELO");
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

    function getQuestById(uint256 _questId) public view returns (Quest memory) {
        return quests[_questId];
    }

    function getQuestsForUser() public view returns (uint[] memory) {
        return usersQuestsMapping[msg.sender];
    }

    function getQuestStatus(uint256 _questId) public view returns (QuestStatus) {
        return questStatuses[_questId];
    }
        
    receive() external payable {}
}
