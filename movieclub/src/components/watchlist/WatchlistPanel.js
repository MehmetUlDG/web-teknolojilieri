import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { ACTIONS } from '../../contexts/appReducer';

const WatchlistPanel = () => {
  const { state, dispatch } = useAppContext();
  const { watchlist } = state;

  const handleRemove = (id) => {
    dispatch({ type: ACTIONS.REMOVE_WATCHLIST, payload: { id } });
  };

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR_WATCHLIST });
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', minWidth: '250px' }}>
      <h3>Gösterime Girecekler</h3>
      {watchlist.length === 0 ? (
        <p>Listeniz boş.</p>
      ) : (
        <>
          <ul>
            {watchlist.map(item => (
              <li key={item.show.id} style={{ marginBottom: '0.5rem' }}>
                {item.show.name}
                <button onClick={() => handleRemove(item.show.id)} style={{ marginLeft: '0.5rem' }}>
                  Kaldır
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleClear}>Tümünü Temizle</button>
        </>
      )}
    </div>
  );
};

export default WatchlistPanel;