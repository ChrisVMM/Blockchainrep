// import React, { useState, useEffect } from 'react';

// export default function Home() {
//   const [images, setImages] = useState([]); // Estado para almacenar las imágenes
//   const [cryptoData, setCryptoData] = useState(null); // Estado para almacenar datos de criptomonedas

//   // Función para obtener datos de criptomonedas de una API
//   const fetchCryptoData = async () => {
//     try {
//       const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
//       const data = await response.json();
//       setCryptoData(data.bitcoin.usd);
//     } catch (error) {
//       console.error('Error fetching crypto data:', error);
//     }
//   };

//   // Efecto para cargar imágenes al cargar la página
//   useEffect(() => {
//     // Simplemente generando imágenes de prueba para este ejemplo
//     const tempImages = [];
//     for (let i = 1; i <= 20; i++) {
//       tempImages.push(`https://via.placeholder.com/400x200?text=Property${i}`);
//     }
//     setImages(tempImages);

//     // Llamar a la función para obtener datos de criptomonedas
//     fetchCryptoData();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col items-center justify-center">
//         <h1 className="text-4xl font-bold mb-8">Propiedades Disponibles</h1>
//         <div className="flex flex-wrap justify-center">
//           {images.map((image, index) => (
//             <img key={index} src={image} alt={`Property ${index + 1}`} className="m-2 rounded-md shadow-md" />
//           ))}
//         </div>
//       </div>
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-2">Cambio de Criptomonedas</h2>
//         <p className="text-lg">Bitcoin (BTC) - USD: {cryptoData}</p>
//       </div>
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-2">Información</h2>
//         <p className="text-lg">Texto informativo sobre la empresa inmobiliaria...</p>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}