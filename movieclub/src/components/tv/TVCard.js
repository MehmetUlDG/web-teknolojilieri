import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { ACTIONS } from '../../contexts/appReducer';

const TVCard = ({ showData }) => {
  const { dispatch } = useAppContext();
  const { show } = showData;

  const handleAdd = () => {
    dispatch({ type: ACTIONS.ADD_WATCHLIST, payload: showData });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '300px' }}>
      <img 
        src={show.image?.medium || 'https://via.placeholder.com/210x295'} 
        alt={show.name} 
        style={{ width: '100%' }} 
      />
      <h3>{show.name}</h3>
      <p>Tür: {show.genres?.join(', ') || 'N/A'}</p>
      <p>Dil: {show.language || 'N/A'}</p>
      <p>Puan: {show.rating?.average || 'N/A'}</p>
      <div dangerouslySetInnerHTML={{ __html: show.summary?.substring(0, 100) + '...' }} />
      <Link to={`/show/${show.id}`}>Detay</Link>
      <button onClick={handleAdd} style={{ marginLeft: '1rem' }}>
        Kısa Listeye Ekle
      </button>
    </div>
  );
};

export default TVCard;