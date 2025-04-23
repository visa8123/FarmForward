// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FarmToMarket {
    struct Product {
        string productId;
        string name;
        string location;
        string fertilizerUsed;
        string soilType;
        string farmerInfo;
        bool isShipped;

        string quantity;
        string storageMethod;
        string transportMode;
        string processorInfo;
        bool isProcessed;

        string purchasedFrom;
        string retailerInfo;
        bool isRetailed;

        bool exists;
    }

    mapping(string => Product) public products;
    string[] private productIds;

    function addProduct(
        string memory _productId,
        string memory _name,
        string memory _location,
        string memory _fertilizerUsed,
        string memory _soilType,
        string memory _farmerInfo
    ) public {
        require(!products[_productId].exists, "Product already exists");

        products[_productId] = Product(
            _productId,
            _name,
            _location,
            _fertilizerUsed,
            _soilType,
            _farmerInfo,
            true,
            "",
            "",
            "",
            "",
            false,
            "",
            "",
            false,
            true
        );

        productIds.push(_productId);
    }

    function updateProcessor(
        string memory _productId,
        string memory _quantity,
        string memory _storageMethod,
        string memory _transportMode,
        string memory _processorInfo
    ) public {
        require(products[_productId].exists, "Product doesn't exist");

        products[_productId].quantity = _quantity;
        products[_productId].storageMethod = _storageMethod;
        products[_productId].transportMode = _transportMode;
        products[_productId].processorInfo = _processorInfo;
        products[_productId].isProcessed = true;
    }

    function updateRetailer(
        string memory _productId,
        string memory _purchasedFrom,
        string memory _retailerInfo
    ) public {
        require(products[_productId].exists, "Product doesn't exist");

        products[_productId].purchasedFrom = _purchasedFrom;
        products[_productId].retailerInfo = _retailerInfo;
        products[_productId].isRetailed = true;
    }

    function getProduct(string memory _productId) public view returns (Product memory) {
        require(products[_productId].exists, "Product not found");
        return products[_productId];
    }

    function getAllProductIds() public view returns (string[] memory) {
        return productIds;
    }
}
