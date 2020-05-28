pragma solidity >=0.4.21 <0.7.0;

contract Escrow{

string public _category;
address public _contractor;
address public _contractee;
address initiator ;
uint public _payAMount;
uint public contractID;
uint c;


struct memorandum {
        uint ID;
        string title;
        uint totalNeeded;
        uint totalReceived;
        string description;
        string date;
        address payable contractor;
        bool accepted;
        uint timelength;
        uint stage;

}


struct parties{
        uint holdings;
        address payable _to;
        address payable _from;
 }

//A mapping that connects each written contract with a unique id number
mapping(uint => memorandum) public memorandums;
mapping(uint => parties) public payments;



constructor  () public {
        createMemo(  "Brazil South Africa Atlantic Farmers union", 210, 0, 
        "inclusion in this buisness memorandum, stipulates that all participating parties facillitate trade of crops using this smart contract. One must use have at least 3000$ in capital to participate, One must send their funds to this smart contract which will be overviewed by an arbitrator quaterly who will realocate funds to participating based on the kg of crops they... blah blah", 
        "2020/04/23", 0x03015D857D5a2538Bdba889eF7e2bfEb30C1aEFB, false, 365, 2);
        createMemo(  "Brazil South Africa Atlantic Farmers union", 210, 0, 
        "inclusion in this buisness memorandum, stipulates that all participating parties facillitate trade of crops using this smart contract. One must use have at least 3000$ in capital to participate, One must send their funds to this smart contract which will be overviewed by an arbitrator quaterly who will realocate funds to participating based on the kg of crops they... blah blah", 
        "2020/04/23", 0xB0AFA0c6DF1F4AdeF5dd370585DD1Bb4971f09da, false, 365, 2);

}


function createMemo (
      string memory title,
      uint totalNeeded,
      uint totalReceived,
      string memory description,
      string memory date,
      address payable contractor,
      bool accepted,
      uint timelength,
      uint stage) public payable{
              contractID ++;
              memorandums[contractID] = memorandum(contractID,  title, totalNeeded, totalReceived,  description, date, contractor, accepted, timelength, stage);
      }

function pushIn(uint x, uint y) public payable {
        payments[x] = parties(y, msg.sender, msg.sender);
        memorandums[x].stage ++;
    }

function request(uint x) public payable {
        payments[x]._to =  msg.sender;
        memorandums[x].stage ++;
    }

function pushOut(uint x) public payable {
        payments[x]._to.transfer(20000);
        payments[x].holdings = 0;

    }


function getBread(uint x) public returns(address){
        address _to = payments[x]._to;
        return _to;

}

}