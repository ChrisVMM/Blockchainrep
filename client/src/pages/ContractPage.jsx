import React from 'react';

export default function ContractPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', backgroundColor: '#EAF6FF', padding: '20px' }}>
        <h1 style={{ fontSize: '28px', color: '#0056b3' }}>¡Ten en cuenta tus contratos inteligentes!</h1>
        <p>
          "Al crear contratos inteligentes, es fundamental comprender completamente el alcance y las implicaciones de cada término y condición. Asegúrate de tener una comprensión clara de los requisitos del negocio y las necesidades de los usuarios antes de implementar cualquier contrato inteligente. Además, realiza pruebas exhaustivas en un entorno de desarrollo seguro para identificar y solucionar cualquier vulnerabilidad o fallo potencial antes de implementar el contrato en producción. La seguridad y la confiabilidad son fundamentales cuando se trata de contratos inteligentes, ya que pueden tener un impacto significativo en las transacciones financieras y la reputación de tu proyecto."
        </p>
      </div>
      <div style={{ flex: '1', backgroundColor: '#D6F5D6', padding: '20px' }}>
        <h1 style={{ fontSize: '28px', color: '#008000' }}>Creando Contratos</h1>
        <p>
          Para crear nuevos contratos, dirígete a la sección de inicio y luego a "Mi Perfil". Allí encontrarás la
          opción para "My wallet"  , dentro de esta mostrara diferentes opciones para crear el contrato inteligente . 
        </p>
      </div>
      <div style={{ flex: '1', backgroundColor: '#E8DAF8', padding: '20px' }}>
        <h1 style={{ fontSize: '28px', color: '#800080' }}>Verificación de Saldo</h1>
        <p>
          Antes de desplegar un contrato inteligente, realiza una exhaustiva auditoría de seguridad para identificar y corregir posibles vulnerabilidades. Las auditorías son críticas para garantizar la integridad y seguridad de tu contrato, protegiendo así los fondos y activos involucrados. Recuerda siempre verificar que tienes el saldo suficiente en tu cuenta antes de realizar transacciones, y asegúrate de que el activo que deseas comprar esté disponible para evitar contratiempos y maximizar la eficiencia de tus operaciones financieras.
        </p>
      </div>
      <div style={{ flex: '1', backgroundColor: '#C3C1E0', padding: '20px' }}>
        <h1 style={{ fontSize: '28px', color: '#4b0082' }}>Detalles del Contrato</h1>
        <p>
          Este es un ejemplo de código que te ponemos para que te puedas guiar y hacer tu propio contrato inteligente. Ten en cuenta que siempre debes estar con el comprador y vendedor. Nuestro modelo se basa en mostrar confiabilidad y seguridad a las partes interesadas, por ende, a la hora de crear el contrato define con el comprador y vendedor cuáles serán las variables más importantes para ellos, funciones, entre otras.
        </p>
        <pre>
          <code>
            {`// SPDX-License-Identifier: UNLICENSED
// Aquí vamos a crear nuestro contrato
pragma solidity ^0.8.9;

contract RealEstate {
    
    // Variables

    struct Property {
        uint256 productId;
        address owner;
        uint256 price;
        string propertyTitle;
        string category;
        string images;
        string propertyAddress;
        string description;
        address[] reviewers;
        string[] reviews;
    }

    // Mapeo
    
    mapping(uint256 => Property) private properties;
    uint256 public propertyIndex;

    // Sección de Reviews
    
    struct Review {
        address reviewer;
        uint256 productId;
        uint256 rating;
        string comment;
        uint256 likes;
    }

    struct Product {
        uint256 productId;
        uint256 totalRating;
        uint256 numReviews;
    }

    mapping(uint256 => Review[]) private reviews;
    mapping(address => uint256[]) private userReviews;
    mapping(uint256 => Product) private products;

    uint256 public reviewsCounter;

    event ReviewAdded(uint256 indexed productId, address indexed reviewer, uint256 rating, string comment);
    event ReviewLiked(uint256 indexed productId, uint256 indexed reviewIndex, address indexed liker, uint256 likes);
    // Eventos 

    event PropertyListed(uint256 indexed id, address indexed owner, uint256 price);
    event PropertySold(uint256 indexed id, address indexed oldOwner, address indexed newOwner, uint256 price);
    event PropertyResold(uint256 indexed id, address indexed oldOwner, address indexed newOwner, uint256 price);

    // Funciones del contrato

    function listProperty(address owner, uint256 price, string memory _propertyTitle, string memory _category, string memory _images, string memory _propertyAddress, string memory _description) external returns (uint256) {
        require(price > 0, "Price must be greater than 0.");
        uint256 productId = propertyIndex++;
        Property storage property = properties[productId];

        property.productId = productId;
        property.owner = owner;
        property.price = price;
        property.propertyTitle = _propertyTitle;
        property.category = _category;
        property.images = _images;
        property.propertyAddress = _propertyAddress;
        property.description = _description;

        emit PropertyListed(productId, owner, price);
        
        return productId;
    }

    function updateProperty(address owner, uint256 productId, string memory _propertyTitle, string memory _category, string memory _images, string memory _propertyAddress, string memory _description) external returns (uint256) {
        Property storage property = properties[productId];

        require(property.owner == owner, "You are not the owner");

        property.propertyTitle = _propertyTitle;
        property.category = _category;
        property.images = _images;
        property.propertyAddress = _propertyAddress;
        property.description = _description;

        return productId;
    }

    function updatePrice(address owner, uint256 productId, uint256 price) external returns (string memory) {
        Property storage property = properties[productId];
        require(property.owner == owner, "You're not the owner");
        property.price = price;

        return "Your property price is updated";
    }

    function buyProperty(uint256 id, address buyer) external payable {
        uint256 amount = msg.value;

        require(amount >= properties[id].price, "Insufficient funds");

        Property storage property = properties[id];

        (bool sent,) = payable(property.owner).call{value: amount}("");
        require(sent, "Failed to send Ether");

        property.owner = buyer;
        emit PropertySold(id, property.owner, buyer, amount);
    }

    function getProperty(uint256 id) external view returns (uint256, address, uint256, string memory, string memory, string memory, string memory, string memory) {
       Property memory property = properties[id];
       return (property.productId, property.owner, property.price, property.propertyTitle, property.category, property.images, property.propertyAddress, property.description);
    }

    function getAllProperties() public view returns (Property[] memory) {
        Property[] memory items = new Property[](propertyIndex);
        for (uint256 i = 0; i < propertyIndex; i++) {
            uint256 currentId = i + 1;
            Property storage currentItem = properties[currentId];
            items[i] = currentItem;
        }
        return items;
    }

    function getUserProperties(address user) external view returns (Property[] memory) {
        uint256 itemCount = 0;

        for (uint256 i = 0; i < propertyIndex; i++) {
            if (properties[i + 1].owner == user) {
                itemCount++;
            }
        }

        Property[] memory items = new Property[](itemCount);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < propertyIndex; i++) {
            if (properties[i + 1].owner == user) {
                uint256 currentId = i + 1;
                Property storage currentItem = properties[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function addReview(uint256 productId, uint256 rating, string calldata comment, address user) external {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        Property storage property = properties[productId];

        property.reviewers.push(user);
        property.reviews.push(comment);

        reviews[productId].push(Review(user, productId, rating, comment, 0));
        userReviews[user].push(productId);
        products[productId].totalRating += rating;
        products[productId].numReviews++;

        emit ReviewAdded(productId, user, rating, comment);
        reviewsCounter++;
    }

    function getProductReviews(uint256 productId) external view returns (Review[] memory) {
        return reviews[productId];
    }

    function getUserReviews(address user) external view returns (Review[] memory) {
        uint256 totalReviews = userReviews[user].length;

        Review[] memory userProductReviews = new Review[](totalReviews);

        for (uint256 i = 0; i < totalReviews; i++) {
            uint256 productId = userReviews[user][i];
            Review[] memory productReviews = reviews[productId];

            for (uint256 j = 0; j < productReviews.length; j++) {
                if (productReviews[j].reviewer == user) {
                    userProductReviews[i] = productReviews[j];
                }
            }
        }
        return userProductReviews;
    }

    function likeReview(uint256 productId, uint256 reviewIndex, address user) external {   
        Review storage review = reviews[productId][reviewIndex];
        review.likes++;
        emit ReviewLiked(productId, reviewIndex, user, review.likes);
    }

    function getHighestRatedProduct() external view returns (uint256) {
        uint256 highestRating = 0;
        uint256 highestRatedProductId = 0;

        for (uint256 i = 0; i < reviewsCounter; i++) {
            uint256 productId = i + 1;
            if (products[productId].numReviews > 0) {
                uint256 avgRating = products[productId].totalRating / products[productId].numReviews;
                if (avgRating > highestRating) {
                    highestRating = avgRating;
                    highestRatedProductId = productId;
                }
            }
        }
        return highestRatedProductId;
    }
}
`}
          </code>
        </pre>
      </div>
    </div>
  );
}
