import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetail />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
