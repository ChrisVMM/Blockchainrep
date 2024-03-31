import React, { useState, useEffect } from 'react';

export default function Home() {
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes
  const [cryptoData, setCryptoData] = useState(null); // Estado para almacenar datos de criptomonedas

  // Función para obtener datos de criptomonedas de una API
  const fetchCryptoData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await response.json();
      setCryptoData(data.bitcoin.usd);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  // Efecto para cargar imágenes al cargar la página
  useEffect(() => {
    // Simplemente generando imágenes de prueba para este ejemplo
    const tempImages = [];
    for (let i = 1; i <= 20; i++) {
      tempImages.push(`https://via.placeholder.com/400x200?text=Property${i}`);
    }
    setImages(tempImages);

    // Llamar a la función para obtener datos de criptomonedas
    fetchCryptoData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Propiedades Disponibles</h1>
        <div className="flex flex-wrap justify-center">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Property ${index + 1}`} className="m-2 rounded-md shadow-md" />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Cambio de Criptomonedas</h2>
        <p className="text-lg">Bitcoin (BTC) - USD: {cryptoData}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Información</h2>
        <p className="text-lg">Texto informativo sobre la empresa inmobiliaria...</p>
      </div>
    </div>
  );
}
