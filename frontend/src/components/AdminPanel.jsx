import VenueList from "./VenueList"; // Mekan listesi bileşeni
import InputWithLabel from "./InputWithLabel"; // Arama kutusu bileşeni
import Header from "./Header"; // Başlık bileşeni
import React, { useState } from "react"; // React ve state hook'u
import { useSelector,useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";

// Yönetici panel sayfa bileşeni
const AdminPanel=()=>{
 const venues =useSelector((state)=>state.data||state.venues);
 const dispatch = useDispatch();
 const [searchVenue, setSearchVenue] = useState("");
 const search = (event) => {
    setSearchVenue(event.target.value);
  };
    React.useEffect(()=>{
      dispatch({type:"FETCH_INIT"});
      VenueDataService.getAllVenue().then((response)=>{
        console.log("API'den Gelen Mekanlar:", response.data);
        dispatch({type:"FETCH_SUCCESS",payload:response.data})
      }).catch(()=>{
        dispatch({type:"FETCH_FAILURE"})
      })
    },[dispatch])
   const filteredVenues=Array.isArray(venues) ? venues.filter((venue)=>
     venue.name.toLowerCase().includes(searchVenue.toLowerCase())||
  venue.address.toLowerCase().includes(searchVenue.toLowerCase())
  ):[];
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
          <VenueList venues={filteredVenues} />
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;