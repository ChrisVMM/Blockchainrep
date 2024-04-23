import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const ContractInteraction = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    owner: '',
    price: '',
    propertyTitle: '',
    category: '',
    images: null, // Cambiado a null para almacenar archivos
    propertyAddress: '',
    description: ''
  });

  // Estado para almacenar todas las propiedades listadas
  const [properties, setProperties] = useState([]);

  // Estado para almacenar la instancia del contrato
  const [contract, setContract] = useState(null);

  // Estado para almacenar la cuenta actual
  const [account, setAccount] = useState('');

  // Carga el contrato inteligente y establece la instancia
  useEffect(() => {
    const loadContract = async () => {
      const web3 = new Web3('http://localhost:8545'); // Reemplaza 'http://localhost:8545' con tu URL de nodo Ethereum
      const accounts = await web3.eth.getAccounts();
      const contractABI = [/* Inserta aquí tu ABI */]; // Inserta el ABI directamente aquí
      const contractAddress = '0x123...'; // Reemplaza '0x123...' con la dirección de tu contrato inteligente
      const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);
      setAccount(accounts[0]);
    };
    loadContract();
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    // Si el campo es una imagen, guarda el archivo seleccionado
    if (e.target.name === 'images') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Función para enviar el formulario y listar una propiedad
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Creamos un objeto FormData para enviar los datos, incluyendo el archivo
      const formDataToSend = new FormData();
      formDataToSend.append('owner', formData.owner);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('propertyTitle', formData.propertyTitle);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('images', formData.images); // Agregamos el archivo
      formDataToSend.append('propertyAddress', formData.propertyAddress);
      formDataToSend.append('description', formData.description);

      await fetch('URL_DE_TU_API_PARA_GUARDAR_LA_IMAGEN', {
        method: 'POST',
        body: formDataToSend
      });

      await contract.methods.listProperty(formData.owner, formData.price, formData.propertyTitle, formData.category, 'URL_DE_LA_IMAGEN_GUARDADA', formData.propertyAddress, formData.description)
        .send({ from: account });
      console.log('Property listed successfully');
    } catch (error) {
      console.error('Error listing property:', error);
    }
  };

  // Función para cargar todas las propiedades listadas
  const loadProperties = async () => {
    try {
      const allProperties = await contract.methods.getAllProperties().call();
      setProperties(allProperties);
    } catch (error) {
      console.error('Error loading properties:', error);
    }
  };

  // Función para agregar una reseña a una propiedad
  const addReview = async (productId, rating, comment, user) => {
    try {
      await contract.methods.addReview(productId, rating, comment, user).send({ from: account });
      console.log('Review added successfully');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Función para comprar una propiedad
  const buyProperty = async (id, buyer, price) => {
    try {
      await contract.methods.buyProperty(id, buyer).send({ from: account, value: price });
      console.log('Property bought successfully');
    } catch (error) {
      console.error('Error buying property:', error);
    }
  };

  // Función para obtener todas las propiedades listadas
  const getAllProperties = async () => {
    try {
      const allProperties = await contract.methods.getAllProperties().call();
      console.log('All properties:', allProperties);
      return allProperties;
    } catch (error) {
      console.error('Error loading properties:', error);
      return [];
    }
  };

  // Función para obtener el producto con la calificación más alta
  const getHighestRatedProduct = async () => {
    try {
      const highestRatedProduct = await contract.methods.getHighestRatedProduct().call();
      console.log('Highest rated product:', highestRatedProduct);
      return highestRatedProduct;
    } catch (error) {
      console.error('Error getting highest rated product:', error);
      return 0;
    }
  };

  // Función para obtener las reseñas de un producto
  const getProductReviews = async (productId) => {
    try {
      const productReviews = await contract.methods.getProductReviews(productId).call();
      console.log('Product reviews:', productReviews);
      return productReviews;
    } catch (error) {
      console.error('Error getting product reviews:', error);
      return [];
    }
  };

  // Función para obtener una propiedad por su ID
  const getProperty = async (id) => {
    try {
      const property = await contract.methods.getProperty(id).call();
      console.log('Property:', property);
      return property;
    } catch (error) {
      console.error('Error getting property:', error);
      return null;
    }
  };

  // Función para obtener todas las propiedades de un usuario
  const getUserProperties = async (user) => {
    try {
      const userProperties = await contract.methods.getUserProperties(user).call();
      console.log('User properties:', userProperties);
      return userProperties;
    } catch (error) {
      console.error('Error getting user properties:', error);
      return [];
    }
  };

  // Función para obtener todas las reseñas de un usuario
  const getUserReviews = async (user) => {
    try {
      const userReviews = await contract.methods.getUserReviews(user).call();
      console.log('User reviews:', userReviews);
      return userReviews;
    } catch (error) {
      console.error('Error getting user reviews:', error);
      return [];
    }
  };

  // Función para dar me gusta a una reseña
  const likeReview = async (productId, reviewIndex, user) => {
    try {
      await contract.methods.likeReview(productId, reviewIndex, user).send({ from: account });
      console.log('Review liked successfully');
    } catch (error) {
      console.error('Error liking review:', error);
    }
  };

  // Función para listar una propiedad
  const listProperty = async (owner, price, propertyTitle, category, images, propertyAddress, description) => {
    try {
      await contract.methods.listProperty(owner, price, propertyTitle, category, images, propertyAddress, description).send({ from: account });
      console.log('Property listed successfully');
    } catch (error) {
      console.error('Error listing property:', error);
    }
  };

  // Función para actualizar el precio de una propiedad
  const updatePrice = async (owner, productId, price) => {
    try {
      await contract.methods.updatePrice(owner, productId, price).send({ from: account });
      console.log('Price updated successfully');
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  // Función para actualizar los detalles de una propiedad
  const updateProperty = async (owner, productId, propertyTitle, category, images, propertyAddress, description) => {
    try {
      await contract.methods.updateProperty(owner, productId, propertyTitle, category, images, propertyAddress, description).send({ from: account });
      console.log('Property updated successfully');
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };


  // Renderizar el formulario y la lista de propiedades
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f2f2f2', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Contract Interaction</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', backgroundColor: '#fff' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Listar Propiedad</h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Owner (Dirección Metamask):</label>
            <input type="text" name="owner" value={formData.owner} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Price (Unidades):</label>
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Título de la Propiedad:</label>
            <input type="text" name="propertyTitle" value={formData.propertyTitle} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Imágenes:</label>
            <input type="file" name="images" onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Lugar:</label>
            <input type="text" name="propertyAddress" value={formData.propertyAddress} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc', resize: 'none' }}></textarea>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ padding: '10px 20px', borderRadius: '3px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Listar Propiedad</button>
          </div>
        </form>
      </div>

      <hr style={{ marginBottom: '30px', borderTop: '1px solid #ccc' }} />

      <h2 style={{ textAlign: 'center' }}>Todas las Propiedades Listadas</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadProperties} style={{ padding: '10px 20px', borderRadius: '3px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>Cargar Propiedades</button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {properties.map((property, index) => (
          <li key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', marginBottom: '10px', backgroundColor: '#fff' }}>
            <p>ID: {property.productId}</p>
            <p>Owner: {property.owner}</p>
            <p>Precio: {property.price}</p>
            <p>Título: {property.propertyTitle}</p>
            <p>Lugar: {property.propertyAddress}</p>
            <p>Descripción: {property.description}</p>
            <img src={property.images} alt="Property" style={{ maxWidth: '100%', marginTop: '10px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContractInteraction;
