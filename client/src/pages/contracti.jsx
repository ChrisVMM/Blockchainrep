import React from 'react';

export default function ContractPage() {
  return (
    <main>
      <h1 className='text-3xl font-bold text-center my-4'>Visualización de Contratos</h1>
      <div className="iframe-container">
        <iframe
          src="https://www.oklink.com/es-la/amoy/address/0xc3F28D64f06ef9Fbf48BF61a52e48B7dCf5882A9"
          title="Contrato"
          width="100%"
          height="600"
          allowFullScreen
        />
      </div>
    </main>
  );
}
