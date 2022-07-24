//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SeedsOnEarth {
    using SafeERC20 for IERC20;

    enum TaskStatus { PENDING, PICKEDUP, COMPLETED, DISMISSED, PAIDOUT }

    struct Task{
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
        TaskStatus status;
    }

    event SponserTask(uint256 indexed _taskId, address indexed _token, address indexed _amount, string _description);
    event PickUpTask(uint256 indexed _taskId, address indexed _sender, string indexed _ipfsHash);
    event CompleteTask(uint256 indexed _taskId, address indexed _sender, string indexed _ipfsHash);
    event reviewSubmission(uint256 indexed _taskId, bool indexed _approve);
    event RejectSubmission(uint256 indexed _taskId);
    event ApproveSubmission(uint256 indexed _taskId);
    event Withdraw(uint256 indexed _taskId);

    Task[] public tasks;

    uint256 public constant WITHDRAW_PENDING_PERIOD = 604800;
    address public committee;

    constructor(address _committee)
    {
        committee = _committee;
    }

    function sponserTask(
            address _tokenAddress, 
            uint256 _amount, 
            string memory _description, 
            uint _timeToComplete) 
        public 
        payable
    {
        require(msg.value > 0 || (_token != address(0) && _amount > 0), "Task must have value");
        bool isEth_ = (msg.value > 0);
        Task task = Task({
            sponser: msg.sender,
            isEth: isEth_,
            token: IERC20(_token),
            amount: isEth_? msg.value : _amount,
            description: _description,
            timeToComplete: _timeToComplete,
            pickedUpHash: "",
            completedHash: "",
            user: address(0),
            status: PENDING
        });

        if (_amount > 0)
            task.token.safeTransferFrom(msg.sender, address(this), _amount);

        tasks.push(task);

        emit SponserTask(tasks.length - 1, _tokenAddress, task.amount, _description);
    }
    
    function pickUpTask(uint256 _taskId, string memory _ipfsHash) public {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.PENDING, "Task must be pending pick up");
        task.pickedUpHash = _ipfsHash;
        task.user = msg.sender;
        task.status = TaskStatus.PICKEDUP;
        task.pickUpTime = block.timestamp;
        emit PickUpTask(_taskId, msg.sender, _ipfsHash);
    }
  
    function completeTask(uint256 _taskId, string memory _ipfsHash) public {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.PICKEDUP, "Task not picked up");
        require(task.user == msg.sender, "Task picked up by other user");
        require(block.timestamp - task.pickUpTime <= task.timeToComplete, "Time to complete task has passed");
        task.completedHash = _ipfsHash;
        task.status = TaskStatus.COMPLETED;
        emit CompleteTask(_taskId, msg.sender, _ipfsHash);
    }
    
    function _payOutTask(Task storage _task, bool _refund) private {
        address to = _refund? _task.sponser : _task.user;
        if (_task.isEth){
                (bool success,) = to.call{value: _task.amount}("");
                require(success, "Failed to send ETH");
            } else {
                _task.token.safeTransfer(to, _task.amount);
            }
        _task.status = TaskStatus.PAIDOUT;
    }

    function reviewSubmission(uint256 _taskId, bool _approve) public {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.sponser, "Only task's sponser can review submission");
        if (_approve) {
            _payOutTask(task, false);
        } else {
            task.status = TaskStatus.DISMISSED;
        }
        emit ReviewSubmission(_taskId, _approve);
    }

    function rejectSubmission(uint256 _taskId) public {
        Task storage task = tasks[_taskId];
        require(msg.sender == committee, "Only committee can reject submissions");
        require(task.status == TaskStatus.DISMISSED || 
            (task.status == TaskStatus.PICKEDUP && block.timestamp - task.pickUpTime > task.timeToComplete),
             "Task can only be reset if it was dismissed by sponser or time to complete had passed");
        task.pickedUpHash = "";
        task.completedHash = "";
        task.user = address(0);
        task.status = TaskStatus.PENDING;
        task.pickUpTime = 0;
        emit RejectSubmission(_taskId);
    }

    function approveSubmission(uint256 _taskId) public {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.DISMISSED, "Task was not dismissed by sponser");
        require(msg.sender == committee, "Only committee can approve submissions");
        _payOutTask(task, false);
        emit ApproveSubmission(_taskId);
    }

    function withdraw(uint256 _taskId) public {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.sponser, "Only task's sponser can request to withdraw");
        require(task.status == TaskStatus.PENDING, "Withdraw can be done only when task is pending");
        _payOutTask(task, true);
        emit Withdraw(_taskId);
    }

    receive() external payable {}
}