import React from 'react';

const EmptyState = ({ message }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <p>{message || "Gösterilecek sonuç bulunamadı."}</p>
  </div>
);

export default EmptyState;