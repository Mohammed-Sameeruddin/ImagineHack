// "SPDX-License-Identifier: UNLICENSED"

pragma solidity >=0.5.0;

contract Media{
    
    mapping(address => mapping(uint => Post)) public userpost;

    uint public totalpost;
    
    struct Post{
        uint id;
        string description;
        address sender;
        uint likes;
        uint dislikes;
    }

    constructor() public {
        totalpost = 0;
        addPost("This is default post");
    }

    event PostAdded(
        uint id,
        string description,
        address sender,
        uint likes,
        uint dislikes
    );

    
    function addPost(string memory _description) public{
        totalpost++;
        userpost[msg.sender][totalpost] = Post(totalpost,_description,msg.sender,0,0);
        emit PostAdded(totalpost,_description,msg.sender,0,0);

    }
    
    function getlikes(uint _id) public view returns (uint){
        return userpost[msg.sender][_id].likes;
    }
    
    function getdislikes(uint _id) public view returns (uint){
        return userpost[msg.sender][_id].dislikes;
    }
    
    function like(uint _id) public{
        userpost[msg.sender][_id].likes++;
    }
    
    function dislike(uint _id) public{
        userpost[msg.sender][_id].dislikes++;
    } 

    function isPostInvalid(uint _id) public view returns(bool){
        uint _dislikes = getdislikes(_id);
        if(_dislikes >= 3){
            return true;
        }
        else{
            return false;
        }
    }
     
}