import VenueList from "./VenueList"; // Mekan listesi bileşeni
import InputWithLabel from "./InputWithLabel"; // Arama kutusu bileşeni
import Header from "./Header"; // Başlık bileşeni
import React, { useState,useEffect } from "react"; // React ve state hook'u
import { useSelector, useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";
import { useNavigate } from "react-router-dom";

// Yönetici panel sayfa bileşeni
const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const Venues = useSelector((state) => state.user);
  const venues = data || Venues || [];
  const [searchVenue, setSearchVenue] = useState("");
  const search = (event) => {
    setSearchVenue(event.target.value);
  };
  React.useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
    VenueDataService.getAllVenue().then((response) => {
      console.log("API'den Gelen Mekanlar:", response.data);
      dispatch({ type: "FETCH_SUCCESS", payload: response.data })
    }).catch(() => {
      dispatch({ type: "FETCH_FAILURE" })
    })
  }, [])

  const handleVenueDeleted = () => {
    getVenues();
  };
  const handleAdd = () => {
    navigate("/admin/venue/new");
  }

  const filteredVenues = Array.isArray(venues) ? venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
    venue.address.toLowerCase().includes(searchVenue.toLowerCase())
  ) : [];

useEffect(() => {
    let logoutTimer;
    const startTimer = () => {
      // Önceki sayacı temizle
      clearTimeout(logoutTimer);
      // Yeni sayaç başlat (10000 ms = 10 saniye)
      logoutTimer = setTimeout(() => {
        alert("Süre doldu, çıkış yapılıyor..."); 
        dispatch({type:"LOGOUT"});
        navigate('/login');
      }, 10000);
    };

    const resetTimer = () => {
      startTimer();
    };

    startTimer();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [navigate,dispatch]);

  return (
    <div>
      {/* Sayfa başlığı ve slogan */}
      <Header
        headerText="Mekanbul"
        motto="Civarınızdaki Mekanlarınızı Keşfedin!"
      />

      {/* Arama kutusu */}
      <InputWithLabel
        id="arama"
        label="Mekan Ara:"
        type="text"
        isFocused
        onInputChange={search}
        value={searchVenue}
      />

      <hr />

      {/* Mekan listesi */}
      <div className="row">
        <div className="row">
          <VenueList venues={filteredVenues} adminView={true} onDelete={handleVenueDeleted} />
        </div>
      </div>
      <div className="row">
        {
          <button
            onClick={handleAdd}
            className="btn btn-primary btn-sm pull-right"
          >
            Mekan Ekle
          </button>
        }
      </div>
    </div>
  );
};
export default AdminPanel;