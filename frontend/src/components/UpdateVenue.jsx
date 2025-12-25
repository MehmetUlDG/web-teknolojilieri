import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { useDispatch } from "react-redux";

function UpdateVenue() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // URL'den ID'yi alıyoruz

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

  // Sayfa yüklendiğinde mevcut mekan bilgilerini getir
  useEffect(() => {
    VenueDataService.getVenue(id).then((response) => {
      const data = response.data;
      // API'den gelen kompleks JSON yapısını düz state yapısına dönüştürüyoruz
      setVenue({
        name: data.name,
        address: data.address,
        foodanddrink: data.foodanddrink.join(","), // Diziyi virgüllü metne çevir
        lat: data.coordinates[0],
        long: data.coordinates[1],
        rating:data.rating||5,
        day1: data.hours[0]?.day || "Pazartesi-Cuma",
        open1: data.hours[0]?.open || "09:00",
        close1: data.hours[0]?.close || "17:00",
        day2: data.hours[1]?.day || "Cumartesi-Pazar",
        open2: data.hours[1]?.open || "09:00",
        close2: data.hours[1]?.close || "17:00",
      });
    }).catch(error => {
      console.error("Veri çekilirken hata oluştu:", error);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenue((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    // Veritabanı döküman yapısına geri dönüştür
    const updatedVenue = {
      name: venue.name,
      address: venue.address,
      foodanddrink: venue.foodanddrink.split(",").map(item => item.trim()),
      lat: parseFloat(venue.lat),
      long: parseFloat(venue.long),
      rating:venue.rating,
      // 1. Gün Saatleri
      day1: venue.day1,
      open1: venue.open1,
      close1: venue.close1,
      isClosed1: venue.isClosed1 || false,
      // 2. Gün Saatleri
      day2: venue.day2,
      open2: venue.open2,
      close2: venue.close2,
      isClosed2: venue.isClosed2 || false
    };

    // Servis çağrısı (updateVenue metodu id ve veriyi alır)
    VenueDataService.updateVenue(id, updatedVenue)
      .then((response) => {
        dispatch({ type: "ADD_UPDATE_VENUE_SUCCESS", payload: response.data });
        navigate("/admin"); // Başarılıysa admin paneline dön
      })
      .catch((error) => {
        dispatch({ type: "ADD_UPDATE_VENUE_FAILURE" });
        alert("Güncelleme sırasında bir hata oluştu!");
      });
  };

  return (
    <>
      <Header headerText="Mekanı Güncelle" motto={`${venue.name} bilgilerini düzenle`} />
      <div className="row">
        <div className="col-xs-12 col-md-8">
          <form className="form-horizontal" onSubmit={onSubmit}>

            <div className="form-group">
              <label className="col-sm-3 control-label">Mekan Adı:</label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  name="name"
                  value={venue.name}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-3 control-label">Adres:</label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  name="address"
                  value={venue.address}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-3 control-label">İmkanlar:</label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  name="foodanddrink"
                  value={venue.foodanddrink}
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
                  name="rating"
                  value={venue.rating}
                  onChange={handleChange}
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
            <div className="form-group">
              <label className="col-sm-3 control-label">Hafta İçi:</label>
              <div className="col-sm-4">
                <input className="form-control" name="open1" value={venue.open1} onChange={handleChange} />
              </div>
              <div className="col-sm-4">
                <input className="form-control" name="close1" value={venue.close1} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="col-sm-3 control-label">Hafta Sonu:</label>
              <div className="col-sm-4">
                <input className="form-control" name="open2" value={venue.open2} onChange={handleChange} />
              </div>
              <div className="col-sm-4">
                <input className="form-control" name="close2" value={venue.close2} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-success pull-right">Değişiklikleri Kaydet</button>
            <button type="button" className="btn btn-default pull-right" onClick={() => navigate("/admin")} style={{ marginRight: "10px" }}>İptal</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateVenue;