pragma solidity ^0.4.24;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  address public owner;


  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function _transferOwnership(address _newOwner) internal {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }
}

/**
 * @title DistributionList
 * @dev The DistributionList contract holds a mapping of addresses to token balances.
 * 
 */
contract DistributionList is Ownable {
 
  mapping(address => uint256) public addressToBalance;

  /**
   * @dev add an address to the distribution list
   * @param _operator address
   * @return true if the address was added to the distribution list, false if the address was already in the distribution list
   */
  function addAddressToDistributionlist(address _listee, uint256 _balance)
    onlyOwner
    public
  {
    addressToBalance[_listee] = _balance;
  }

  /**
   * @dev add addresses to the distribution list
   * @param _operators addresses
   * @return true if at least one address was added to the distribution list,
   * false if all addresses were already in the distribution list
   */
  function addAddressesToDistributionlist(address[] _listees, uint256[] _balances)
    onlyOwner
    public
  {
    require(_listees.length == _balances.length);
    for (uint256 i = 0; i < _listees.length; i++) {
      addAddressToDistributionlist(_listees[i], _balances[i]);
    }
  }

  /**
   * @dev remove an address from the distribution list
   * @param _operator address
   * @return true if the address was removed from the distribution list,
   * false if the address wasn't in the distribution list in the first place
   */
  function removeAddressFromDistributionlist(address _toBeRemoved)
    onlyOwner
    public
  {
    addressToBalance[_toBeRemoved] = 0;
  }

  /**
   * @dev remove addresses from the distribution list
   * @param _operators addresses
   * @return true if at least one address was removed from the distribution list,
   * false if all addresses weren't in the distribution list in the first place
   */
  function removeAddressesFromDistributionlist(address[] _toBeRemoved)
    onlyOwner
    public
  {
    for (uint256 i = 0; i < _toBeRemoved.length; i++) {
      removeAddressFromDistributionlist(_toBeRemoved[i]);
    }
  }
}