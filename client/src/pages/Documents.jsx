import React from 'react';

const Documents = () => {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Documents</h1>
      <p style={paragraphStyle}>
        If you're looking to expand your knowledge in the world of blockchain technology and cryptocurrencies, I recommend delving deeper into Smart Contracts, Thirdweb, and Metamask. Smart Contracts are self-executing computer programs that operate on the blockchain, enabling automatic transactions when certain predefined conditions are met. Thirdweb is an innovative platform that provides tools and resources for developing and deploying decentralized applications, leveraging the full potential of blockchain technology. On the other hand, Metamask is a cryptocurrency wallet and gateway to the Ethereum blockchain, facilitating interaction with decentralized applications directly from your web browser. Exploring these concepts will provide you with a deeper understanding of blockchain technology and its various applications in the modern world. Embark on your journey towards knowledge and innovation!
      </p>
      
      <section style={sectionStyle}>
        <h2 style={subtitleStyle}>Github</h2>
        <p style={paragraphStyle}>
          <a href="https://github.com/ChrisVMM/Blockchainrep" style={linkStyle}>https://github.com/ChrisVMM/Blockchainrep</a>
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subtitleStyle}>Videos</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <a href="https://youtu.be/jYEqoIeAoBg" style={linkStyle}>Video Tutorial 1</a>
          <a href="https://youtu.be/-HTubEJ61zU" style={linkStyle}>Video Tutorial 2</a>
          <a href="https://youtu.be/yN3zpI3sNAE" style={linkStyle}>Video Tutorial 3</a>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={subtitleStyle}>Important Information</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <a href="https://thirdweb.com/" style={linkStyle}>Check out Thirdweb Documentation</a>
          <a href="https://docs.metamask.io/" style={linkStyle}>Metamask documentation</a>
          <a href="https://developer.algorand.org/algokit/?utm_source=google&utm_medium=paid_search&utm_campaign=algokit_awareness&utm_content=simple&utm_term=web3_devs&utm_source=google&utm_medium=cpc&utm_campaign=21150107436&utm_adgroup=155812648050&utm_term=smart%20contracts&gad_source=1&gclid=Cj0KCQjwltKxBhDMARIsAG8KnqXXPlb6CneYIci6G3KXwMUKSzVhyxAe7OvbOqX2dTt4z1Z_ptP7jz8aAiBDEALw_wcB" style={linkStyle}>What is a Smart Contract?</a>
        </div>
      </section>
    </div>
  );
};

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const subtitleStyle = {
  fontSize: '20px',
  marginBottom: '10px',
};

const paragraphStyle = {
  marginBottom: '20px',
};

const sectionStyle = {
  marginBottom: '40px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff',
  marginBottom: '10px',
};

export default Documents;
