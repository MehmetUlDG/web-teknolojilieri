import { Navigate, NavLink, useNavigate } from "react-router-dom"; 
import Rating from "./Rating"; 
import FoodAndDrinkList from "./FoodAndDrinkList"; 
import React from "react";
import { formatDistance } from "../services/Utils"; 
import { useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";

const Venue = ({ venue, adminView, onDelete }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleDelete = (e) => {
    e.preventDefault(); 
    if (window.confirm(`${venue.name} adlı mekanı silmek istediğinize emin misiniz?`)) {
      VenueDataService.deleteVenue(venue.id || venue._id)
        .then(() => {
          dispatch({ type: "REMOVE_VENUE_SUCCESS" });
          // Başarılı olduğunda AdminPanel'deki getVenues() fonksiyonunu tetikler:
          if (onDelete) onDelete(); 
        })
        .catch(() => {
          dispatch({ type: "REMOVE_VENUE_FAILURE" });
          alert("Silme işlemi başarısız.");
        });
    }
  };
  const handleUpdate=(e)=>{
    e.preventDefault();
    const venueId = venue.id || venue._id;
    navigate(`/admin/venue/update/${venueId}`);
  }

  return (
    <div className="list-group">
        <div className="col-xs-12 list-group-item">
          <h4>
            <NavLink to={`/venue/${venue.id || venue._id}`}>{venue.name} </NavLink>
            <Rating rating={venue.rating} />
            
            {/* Admin ise silme butonunu göster */}
            {adminView && (
              <button 
                onClick={handleDelete} 
                className="btn btn-danger btn-sm pull-right"
              >
                Mekanı Sil
              </button>
            )}
             {/* Admin ise güncelleme butonunu göster */}
            {adminView && (
              <button 
                onClick={handleUpdate} 
                className="btn btn-warning btn-sm pull-right"
              >
                Mekanı Güncelle
              </button>
            )}
          </h4>
          <span className="span badge pull-right badge-default">
            {formatDistance(venue.distance)}
          </span>
          <p className="address"> {venue.address}</p>
          <FoodAndDrinkList foodAndDrinkList={venue.foodanddrink} />
        </div>
    </div>
  );
};

export default Venue;