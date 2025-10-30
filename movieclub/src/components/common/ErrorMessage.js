import React from 'react';

const ErrorMessage = ({ message, onRetry }) => (
  <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
    <p>Bir hata oluştu: {message}</p>
    <button onClick={onRetry}>Tekrar Dene</button>
  </div>
);

export default ErrorMessage;