import React, { useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import TVCard from './TVCard';
import EmptyState from '../common/EmptyState';

const TVList = () => {
  const { state } = useAppContext();
  const { shows, filters, pagination } = state;

  const filteredAndPagedShows = useMemo(() => {
    const filtered = shows.filter(item => {
      const { show } = item;
      const rating = show.rating?.average || 0;
      
      const matchesGenre = filters.genre ? 
        show.genres?.some(g => g.toLowerCase().includes(filters.genre.toLowerCase())) : true;
      
      const matchesLanguage = filters.language ?
        show.language?.toLowerCase().includes(filters.language.toLowerCase()) : true;
        
      const matchesRating = filters.minRating ? 
        rating >= parseFloat(filters.minRating) : true;
        
      return matchesGenre && matchesLanguage && matchesRating;
    });

    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;

    return filtered.slice(startIndex, endIndex);
  }, [shows, filters, pagination]);

  if (filteredAndPagedShows.length === 0) {
    return <EmptyState message="Filtre kriterlerine uygun sonuç bulunamadı." />;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {filteredAndPagedShows.map(item => (
        <TVCard key={item.show.id} showData={item} />
      ))}
    </div>
  );
};

export default TVList;