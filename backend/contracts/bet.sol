// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bet {
    address public owner;
    address public platformWallet;
    uint256 public platformFeePercent = 5;

    string public betName;
    string public optionADescription;
    string public optionBDescription;

    uint256 public amountA;
    uint256 public amountB;
    bool public isClosed;
    uint256 public winningOption; // 0 for not decided, 1 for Option A, 2 for Option B

    mapping(address => uint256) public betsOnA;
    mapping(address => uint256) public betsOnB;

    address[] public bettorsOnA; // Array para armazenar endereços de apostadores
    address[] public bettorsOnB; // Array para armazenar endereços de apostadores

    event BetPlaced(address indexed user, uint256 amount, bool onOptionA);
    event BetClosed(uint256 winningOption);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(
        address _platformWallet,
        string memory _betName,
        string memory _optionADescription,
        string memory _optionBDescription
    ) {
        owner = msg.sender;
        platformWallet = _platformWallet;
        betName = _betName;
        optionADescription = _optionADescription;
        optionBDescription = _optionBDescription;
        isClosed = false;
    }

    function placeBet(bool onOptionA) public payable {
        require(!isClosed, "Bet is closed");
        require(msg.value > 0, "Bet amount must be greater than 0");

        if (onOptionA) {
            bettorsOnA.push(msg.sender);
            amountA += msg.value;
            betsOnA[msg.sender] += msg.value;
        } else {
            bettorsOnB.push(msg.sender);
            amountB += msg.value;
            betsOnB[msg.sender] += msg.value;
        }

        emit BetPlaced(msg.sender, msg.value, onOptionA);
    }

    function closeBet(uint256 _winningOption) public onlyOwner {
        require(!isClosed, "Bet already closed");
        require(_winningOption == 1 || _winningOption == 2, "Invalid winning option");

        isClosed = true;
        winningOption = _winningOption;

        uint256 totalPool = amountA + amountB;
        uint256 platformFee = (totalPool * platformFeePercent) / 100;
        uint256 payoutPool = totalPool - platformFee;
        uint256 winningPool = winningOption == 1 ? amountA : amountB;

        if (winningPool > 0) {
            address payable[] memory winners = getWinners(winningOption);

            for (uint256 i = 0; i < winners.length; i++) {
                uint256 userBetAmount = winningOption == 1 ? betsOnA[winners[i]] : betsOnB[winners[i]];
                uint256 payout = (userBetAmount * payoutPool) / winningPool;
                payable(winners[i]).transfer(payout);
            }
        }

        payable(platformWallet).transfer(platformFee);

        emit BetClosed(winningOption);
    }

    function getWinners(uint256 _winningOption) internal view returns (address payable[] memory) {
        // Define the count of winners based on the winning option
        uint256 count = _winningOption == 1 ? bettorsOnA.length : bettorsOnB.length;
        address payable[] memory winners = new address payable[](count);
        uint256 index = 0;

        // Loop through the relevant bettors and populate the winners array
        if (_winningOption == 1) {
            for (uint256 i = 0; i < count; i++) {
                winners[index++] = payable(bettorsOnA[i]);
            }
        } else {
            for (uint256 i = 0; i < count; i++) {
                winners[index++] = payable(bettorsOnB[i]);
            }
        }

        return winners;
    }
}
