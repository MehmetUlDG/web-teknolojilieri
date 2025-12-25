// React Router'dan NavLink bileşenini içe aktar (sayfa yönlendirme için)
import { useDispatch,useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// Navigasyon çubuğu (navbar) bileşeni - Sayfa üstünde sabit menü gösterir
function NavBar() {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.isAuthenticated
  }));
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <div className="navbar-default navbar navbar-fixed-top">
      <div className="container">
        {/* Navbar başlık bölümü */}
        <div className="navbar-header">
          {/* Ana sayfa linki - Logo/başlık olarak gösterilir */}
          <NavLink className="navbar-brand" to="/">Mekanbul</NavLink>

          {/* Mobil cihazlar için hamburger menü butonu */}
          <button
            className="navbar-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-main"
          >
            {/* Hamburger menü ikonu (3 çizgi) */}
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        {/* Menü öğeleri - Mobilde collapse (açılır/kapanır) olabilir */}
        <div id="navbar-main" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            {/* Hakkında sayfası linki */}
            <li>
              <NavLink to={"about"}>Hakkında</NavLink>
            </li>
        {!isAuthenticated ? (
        <>
          <li>
            <NavLink to="/signup">Kayıt Ol</NavLink>
          </li>
          <li>
            <NavLink to="/login">Giriş Yap</NavLink>
          </li>
        </>
      ) : (
        <li>
           {/* Tıklanınca hem Redux state'i temizlenir hem de Login'e gider */}
           <NavLink to="/login" onClick={handleLogout}>
             Çıkış Yap
           </NavLink>
        </li>
      )}
        </ul>
      </div>
    </div>
    </div >
  );
}

// Bileşeni dışa aktar
export default NavBar;
