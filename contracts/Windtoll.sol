pragma solidity ^0.4.0;

contract windtoll {
   
    uint public dailyFactor;
    address owner;
   
    struct Car {
        string owner;
        uint avgSpeed;
        uint mass;
        uint earning;
    }
   
    mapping(address => Car) carsArray;
    address[] public carAddresses;
   
    constructor(uint _df) payable {
        dailyFactor = _df;
        owner = msg.sender;
    }
   
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
   
    //event to know that a transfer has been completed
    event transfer_completed(address receiver,string name);
    
    //fallback function
    function () external payable {
       
    }
   
   
    
    function setdf(uint _df) onlyOwner public {
        dailyFactor = _df;
    }
   
    function getdf() public view returns (uint) {
        return dailyFactor;
    }
   
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
   
    function fundTransfer(address receiver) payable {
        var amount = carsArray[receiver].earning;
        require(address(this).balance >= amount);
        receiver.transfer(amount);
    }

    function AddCars(address _addr, string _owner, uint _avgSpeed, uint _mass) onlyOwner public
    {
        var newCar = carsArray[_addr];
       
        if(newCar.earning == 0)
        {
            newCar.owner = _owner;
            newCar.avgSpeed = _avgSpeed;
            newCar.mass = _mass;
            newCar.earning = _mass * _avgSpeed * _avgSpeed * dailyFactor;
           
            carAddresses.push(_addr) -1;
            fundTransfer(_addr);
           
            transfer_completed(_addr, _owner);
        }
       
    }
   
    function getCars() view public returns(address[]) {
        return carAddresses;
    }
   
    function getCar(address _addr) view public returns (string, uint, uint, uint) {
        return (carsArray[_addr].owner, carsArray[_addr].avgSpeed, carsArray[_addr].mass, carsArray[_addr].earning);
    }
}
