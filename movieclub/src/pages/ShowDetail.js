import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../api/tvmaze';
import Spinner from '../components/common/Spinner';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [detailsResponse, episodesResponse] = await Promise.all([
          api.getShowDetails(id),
          api.getShowEpisodes(id)
        ]);
        setShow(detailsResponse.data);
        setEpisodes(episodesResponse.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p>Hata: {error}</p>;
  if (!show) return <p>Dizi bulunamadı.</p>;

  return (
    <div>
      <Link to="/">&larr; Geri</Link>
      <h1>{show.name}</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <img src={show.image?.original} alt={show.name} style={{ maxWidth: '300px' }} />
        <div>
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
          <p><strong>Tür:</strong> {show.genres?.join(', ')}</p>
          <p><strong>Dil:</strong> {show.language}</p>
          <p><strong>Puan:</strong> {show.rating?.average}</p>
          <p><strong>Durum:</strong> {show.status}</p>
        </div>
      </div>

      <h2>Bölümler</h2>
      <ul>
        {episodes.map(ep => (
          <li key={ep.id}>
            S{ep.season}:E{ep.number} - {ep.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowDetail;