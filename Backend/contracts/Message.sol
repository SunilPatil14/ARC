// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Message {
    string public message;
    address public owner;

    // Store message history
    struct MessageEntry {
        address sender;
        string text;
        uint256 timestamp;
    }

    MessageEntry[] public messages;

    event MessageUpdated(address indexed sender, string newMessage, uint256 timestamp);

    constructor(string memory _initialMessage) {
        message = _initialMessage;
        owner = msg.sender;
        messages.push(MessageEntry(msg.sender, _initialMessage, block.timestamp));
    }

    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
        messages.push(MessageEntry(msg.sender, _newMessage, block.timestamp));
        emit MessageUpdated(msg.sender, _newMessage, block.timestamp);
    }

    function getMessageHistory() public view returns (MessageEntry[] memory) {
        return messages;
    }

    function messageCount() public view returns (uint256) {
        return messages.length;
    }
}
