// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pixel4te is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => address) private _mintedBy;
    mapping(uint256 => uint8) private _royaltiesPercent;

    uint256 public mintFee;

    constructor() ERC721("Pixel4te", "PIX") {
        mintFee = 0.01 ether; // Set a default minting fee of 0.01 ether
    }

    function mintItem(address to, uint8 royaltiesPercent, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        require(msg.value >= mintFee, "Insufficient payment"); // Require payment of the minting fee
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _mintedBy[newItemId] = msg.sender; // Store the address of the user who minted the NFT
        _royaltiesPercent[newItemId] = royaltiesPercent;

        // Transfer the minting fee to the contract owner
        payable(owner()).transfer(msg.value);

        return newItemId;
    }

    function setURI(uint tokenId, string memory newURI)
        public
    {
        address itemOwner = ownerOf(tokenId);
        require(msg.sender == itemOwner, 'UNAUTHORIZED');
        _setTokenURI(tokenId, newURI);
    }

    function currentItem()
        public
        view
        returns (uint256)
    {
        return _tokenIds.current();
    }

    function itemsOf(address owner) public view returns (uint256[] memory) {
      
      uint256 balance = balanceOf(owner);
      uint256[] memory items = new uint256[](balance);
      if (balance == uint256(0)) {
        return items;
      }
      uint256 j = 0;
      for (uint256 i = 1; i <= currentItem(); i++) {
        if (ownerOf(i) == owner) {
          items[j] = i;
          j++;
        }
      }
      return items;
    }

    function mintFeeUpdate(uint256 newFee) public onlyOwner {
        mintFee = newFee;
    }

    function getMinter(uint256 tokenId) public view returns (address) {
        return _mintedBy[tokenId];
    }

    function setRoyaltiesPercent(uint256 tokenId, uint8 percent) public {
        require(_mintedBy[tokenId] == msg.sender, "Unauthorized");
        _royaltiesPercent[tokenId] = percent;
    }

    function getRoyaltiesPercent(uint256 tokenId) public view returns (uint256) {
        return _royaltiesPercent[tokenId];
    }
}
