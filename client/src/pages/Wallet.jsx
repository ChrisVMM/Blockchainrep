import React, { useState } from 'react';

const Wallet = () => {
  const [walletInfo, setWalletInfo] = useState(null);

  const connectMetaMask = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0];
        console.log("Connected with MetaMask, wallet address:", walletAddress);
        
        // Aquí puedes realizar acciones adicionales con la dirección de la billetera, como obtener información sobre el saldo
        // Por ejemplo, puedes usar Web3.js o Ethers.js para interactuar con la red Ethereum y obtener información sobre la cuenta
        
        // Ejemplo de cómo mostrar la dirección de la billetera en el frontend
        setWalletInfo({
          address: walletAddress,
          // Puedes agregar más campos aquí, como el saldo de la cuenta, etc.
        });
      } else {
        throw new Error('MetaMask not detected');
      }
    } catch (error) {
      console.error('Error connecting with MetaMask:', error);
    }
  };

  const showContractHistory = () => {
    window.open('https://www.oklink.com/es-la/amoy/address/0xc3F28D64f06ef9Fbf48BF61a52e48B7dCf5882A9', '_blank');
    console.log('Showing contract history...');
  };

  const showContract = () => {
    window.open('https://thirdweb.com/polygon-amoy-testnet/0xc3F28D64f06ef9Fbf48BF61a52e48B7dCf5882A9', '_blank');
    console.log('Showing contract...');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '50px'
      }}
    >
      <h2
        style={{
          marginBottom: '20px',
          color: '#333',
          fontSize: '28px',
          textAlign: 'center'
        }}
      >
        My Wallet
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center'
        }}
      >
        <button 
          style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            outline: 'none'
          }}
          onClick={showContract}
        >
          Explore Contract
        </button>
        <button 
          style={{
            backgroundColor: '#008CBA',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            outline: 'none'
          }}
          onClick={showContractHistory}
        >
          Show Contract History
        </button>
        <button 
          style={{
            backgroundColor: '#f44336',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            outline: 'none'
          }}
          onClick={connectMetaMask}
        >
          Connect with MetaMask
        </button>
        {walletInfo && (
          <div
            style={{
              backgroundColor: '#f0f0f0',
              padding: '20px',
              borderRadius: '10px',
              marginTop: '20px'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>Wallet Address:</h3>
            <p style={{ fontSize: '18px' }}>{walletInfo.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wallet;
