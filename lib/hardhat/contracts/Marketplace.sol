// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

import "./Pixel4te.sol";

contract Marketplace {
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableMap for EnumerableMap.AddressToUintMap;
    // Struct para representar un NFT en venta
    struct NFT {
        address seller;
        uint256 tokenId;
        uint256 price;
        address buyer;
    }
    struct Offer {
        address offerer;
        uint256 value;
    }
    // Mapping para almacenar todos los NFTs en venta en el marketplace
    mapping(uint256 => NFT) public nfts;

    // Mapping para almacenar los NFTs listados por cada vendedor
    mapping(address => EnumerableSet.UintSet) private sellerToNfts;

    mapping(uint256 => EnumerableMap.AddressToUintMap) private pendingOffers;

    // Eventos
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTPriceUpdated(uint256 indexed tokenId, uint256 price);
    event OfferMade(uint256 indexed tokenId, address indexed offerer, uint256 value);
    event PurchaseMade(uint256 indexed tokenId, uint256 price, address indexed buyer);
    event NFTRemoved(uint256 indexed tokenId);

    // Propietario del contrato
    address owner;

    // Contrato de la colección Pixel4te
    Pixel4te private pixel4teContract;
    // Constructor
    constructor(address collection) {
        owner = msg.sender;
        pixel4teContract = Pixel4te(collection);
    }

    function _isValidNFT(uint _tokenId) internal view returns (bool) {
      try pixel4teContract.ownerOf(_tokenId) {
        return true;
      } catch {
        return false;
      }
    }
    // Función para listar un nuevo NFT en el marketplace
    function listNFT(uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price cannot be zero");
        require(_isValidNFT(_tokenId), "Invalid NFT");
        // Verificar que el NFT no está listado
        // Verificar que el NFT pertenece al msg.sender
        address _owner = pixel4teContract.ownerOf(_tokenId);
        require(_owner == msg.sender, "Not the NFT owner");
        // Añadir el NFT al mapping de nfts
        nfts[_tokenId] = NFT({
            seller: msg.sender,
            tokenId: _tokenId,
            price: _price,
            buyer: address(0)
        });

        // Añadir el NFT al set de sellerToNfts
        sellerToNfts[msg.sender].add(_tokenId);

        // Disparar el evento NFTListed
        emit NFTListed(_tokenId, msg.sender, _price);
    }
    
    function removeNFT(uint256 _tokenId) external {
      require(nfts[_tokenId].seller == msg.sender, "Only seller can remove NFT");
      sellerToNfts[msg.sender].remove(_tokenId);
      delete nfts[_tokenId];
      emit NFTRemoved(_tokenId);
    }

    // Función para actualizar el precio de un NFT
    function updateNFTPrice(uint256 _tokenId, uint256 _price) external {
        require(isNFTListed(_tokenId), "NFT does not exist");
        require(msg.sender == nfts[_tokenId].seller, "Only NFT seller can update the price");

        // Actualizar el precio del NFT
        nfts[_tokenId].price = _price;

        // Disparar el evento NFTPriceUpdated
        emit NFTPriceUpdated(_tokenId, _price);
    }

    function _processSaleAndTransferNFT(uint256 _tokenId, uint256 _price) internal {
      uint256 royaltiesPercent = pixel4teContract.getRoyaltiesPercent(_tokenId); // Obtener royalties percent
      require(royaltiesPercent > 0, "Royalties percent must be greater than zero.");
      address royaltiesOwner = pixel4teContract.getMinter(_tokenId); // Obtener royalties beneficario
      uint256 royalties = _price.mul(royaltiesPercent); // Calcular royalties
      address payable seller = payable(nfts[_tokenId].seller); // Obtener la dirección del vendedor como payable
      seller.transfer(_price.sub(royalties)); // Transferir el precio del NFT menos las royalties al vendedor
      payable(royaltiesOwner).transfer(royalties); // Transferir las royalties al beneficario
      pixel4teContract.safeTransferFrom(nfts[_tokenId].seller, msg.sender, nfts[_tokenId].tokenId); // Transferir el NFT al comprador
      sellerToNfts[nfts[_tokenId].seller].remove(_tokenId); // Eliminar el NFT del set de NFTs del vendedor
      delete nfts[_tokenId]; // Eliminar el NFT del mapping de NFTs
    }

    // Función para hacer una oferta por un NFT
    function makeOffer(uint256 _tokenId) external payable {
        require(isNFTListed(_tokenId), "NFT does not exist");
        require(msg.sender != nfts[_tokenId].seller, "Seller cannot make an offer for their own NFT");
        require(msg.value > 0, "Offer value must be greater than zero");

        if (pendingOffers[_tokenId].contains(msg.sender)) {
          uint existingOffer = pendingOffers[_tokenId].get(msg.sender);
          if (existingOffer > 0 && msg.value > existingOffer) { // Si la nueva oferta es mayor que la oferta existente
            uint256 refundAmount = existingOffer;
            existingOffer = msg.value;
            pendingOffers[_tokenId].set(msg.sender, existingOffer);
            payable(msg.sender).transfer(refundAmount); // Reembolsar la oferta anterior
            emit OfferMade(_tokenId, msg.sender, msg.value);

          } else {
            // La nueva oferta es menor o igual que la oferta existente
            revert("Offer value must be higher than existing offer");
          }
        } else {
          if (msg.value >= nfts[_tokenId].price) { // Si la oferta es mayor o igual que el precio del NFT
            nfts[_tokenId].buyer = msg.sender; // Almacenar el comprador del NFT

            _processSaleAndTransferNFT(_tokenId, nfts[_tokenId].price);

            emit PurchaseMade(_tokenId, nfts[_tokenId].price, msg.sender); // Disparar el evento PurchaseMade
          } else {
            // No hay una oferta pendiente del usuario para este NFT
            pendingOffers[_tokenId].set(msg.sender, msg.value);
            emit OfferMade(_tokenId, msg.sender, msg.value);

          }
        }
    }

    function acceptOffer(uint256 _tokenId, address _buyer) external {
        require(isNFTListed(_tokenId), "NFT does not exist");
        require(msg.sender == nfts[_tokenId].seller, "Only the seller can accept an offer");
        require(pendingOffers[_tokenId].contains(_buyer), "There are no pending offers for this NFT");

        nfts[_tokenId].buyer = _buyer; // Almacenar el comprador del NFT
        pendingOffers[_tokenId].remove(_buyer);
        _processSaleAndTransferNFT(_tokenId, nfts[_tokenId].price);

        emit PurchaseMade(_tokenId, nfts[_tokenId].price, _buyer); // Disparar el evento PurchaseMade
    }

    function cancelOffer(uint256 _tokenId) external {
      require(pendingOffers[_tokenId].contains(msg.sender), "There are no pending offers for this NFT");
      uint256 offerValue = pendingOffers[_tokenId].get(msg.sender);
      require(offerValue > 0, "Offer value must be greater than zero");
      pendingOffers[_tokenId].remove(msg.sender);
      payable(msg.sender).transfer(offerValue);
    }

    // Función para comprar un NFT sin hacer una oferta
    function buyNFT(uint256 _tokenId) external payable {
        require(isNFTListed(_tokenId), "NFT does not exist");
        require(msg.sender != nfts[_tokenId].seller, "Seller cannot buy their own NFT");
        require(msg.value >= nfts[_tokenId].price, "Insufficient funds");

        nfts[_tokenId].buyer = msg.sender; // Almacenar el comprador del NFT

        _processSaleAndTransferNFT(_tokenId, nfts[_tokenId].price);

        emit PurchaseMade(_tokenId, nfts[_tokenId].price, msg.sender); // Disparar el evento PurchaseMade
    }

    function getPendingOffers(uint256 _tokenId) external view returns (Offer[] memory) {
        Offer[] memory offers = new Offer[](pendingOffers[_tokenId].length());
        for (uint256 i = 0; i < pendingOffers[_tokenId].length(); i++) {
            (address offerer, uint256 value) = pendingOffers[_tokenId].at(i);
            offers[i] = Offer({offerer: offerer, value: value});
        }
        return offers;
    }

    function getNFTsBySeller(address _seller) external view returns (uint256[] memory) {
      uint256[] memory result = new uint256[](sellerToNfts[_seller].length());
      for (uint256 i = 0; i < sellerToNfts[_seller].length(); i++) {
          result[i] = sellerToNfts[_seller].at(i);
      }
      return result;
    }

    function getNFTPrice(uint256 _tokenId) external view returns (uint256) {
      return isNFTListed(_tokenId) ? nfts[_tokenId].price : 0;
    }

    function isNFTListed(uint256 _tokenId) internal view returns (bool) {
      return nfts[_tokenId].tokenId > 0;
    }

}
