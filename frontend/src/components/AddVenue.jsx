import Header from "./Header";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { useDispatch } from "react-redux";

function AddVenue() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} =useParams();
  // Form verilerini yönetmek için local state
  const [venue, setVenue] = useState({
    name: "",
    address: "",
    foodanddrink: "",
    lat: 37,
    long: 30,
    rating:0,
    day1: "Pazartesi-Cuma",
    open1: "09:00",
    close1: "17:00",
    day2: "Cumartesi-Pazar",
    open2: "09:00",
    close2: "17:00",
  });

  // Input değişimlerini yakala
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenue((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

   const flatVenueData = {
      name: venue.name,
      address: venue.address,
      foodanddrink: venue.foodanddrink,
      lat: parseFloat(venue.lat),
      long: parseFloat(venue.long),
      day1: venue.day1,
      open1: venue.open1,
      close1: venue.close1,
      isClosed1: false,
      day2: venue.day2,
      open2: venue.open2,
      close2: venue.close2,
      isClosed2: false
    };
    // Servis çağrısı
    VenueDataService.addVenue(flatVenueData)
      .then((response) => {
        dispatch({ type: "ADD_UPDATE_VENUE_SUCCESS", payload: response.data });
        navigate("/admin"); // Başarılıysa admin paneline git
      })
      .catch((error) => {
        dispatch({ type: "ADD_UPDATE_VENUE_FAILURE" });
        alert("Mekan eklenirken bir hata oluştu!");
      });
  };

  return (
    <>
      <Header headerText="Yeni Mekan" motto="Haritaya yeni bir yer ekle" />
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <form className="form-horizontal" onSubmit={onSubmit}>
            
            {/* Mekan Bilgileri */}
            <div className="form-group">
              <label className="col-sm-3 control-label">Mekan Adı:</label>
              <div className="col-sm-9">
                <input className="form-control" name="name" required onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-3 control-label">Adres:</label>
              <div className="col-sm-9">
                <input className="form-control" name="address" required onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-3 control-label">İmkanlar (Virgülle ayır):</label>
              <div className="col-sm-9">
                <input 
                  className="form-control" 
                  name="foodanddrink" 
                  placeholder="Çay, Kahve, Pasta" 
                  onChange={handleChange} 
                />
              </div>
            </div>
              {/* Puan seçimi (1-5 arası) */}
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">
                Puan:
              </label>
              <div className="col-xs-12 col-sm-2">
                <select
                  className="form-control input-sm"
                  id="rating"
                  name="rating"
                >
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </select>
              </div>
            </div>

            <hr />
             <h4>Çalışma Günleri</h4>
            {/* Hafta içi gün */}
            <div className="form-group">
              <label className="col-sm-3 control-label">Hafta İçi:</label>
              <div className="col-sm-3">
                <input className="form-control" name="day1" defaultValue="Pazartesi-Çarşamba" onChange={handleChange} />
              </div>
            </div>

            {/* Hafta sonu gün */}
            <div className="form-group">
              <label className="col-sm-3 control-label">Hafta Sonu:</label>
              <div className="col-sm-3">
                <input className="form-control" name="day2" defaultValue="Cumartesi-Pazar" onChange={handleChange} />
              </div>
            </div>

            <h4>Çalışma Saatleri</h4>
            {/* Hafta içi saatleri */}
            <div className="form-group">
              <label className="col-sm-3 control-label">Hafta İçi:</label>
              <div className="col-sm-3">
                <input className="form-control" name="open1" defaultValue="09:00" onChange={handleChange} />
              </div>
              <div className="col-sm-3">
                <input className="form-control" name="close1" defaultValue="17:00" onChange={handleChange} />
              </div>
            </div>

            {/* Hafta sonu saatleri */}
            <div className="form-group">
              <label className="col-sm-3 control-label">Hafta Sonu:</label>
              <div className="col-sm-3">
                <input className="form-control" name="open2" defaultValue="09:00" onChange={handleChange} />
              </div>
              <div className="col-sm-3">
                <input className="form-control" name="close2" defaultValue="17:00" onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary pull-right">Mekanı Ekle</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddVenue;