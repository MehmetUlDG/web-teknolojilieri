// Axios kütüphanesini içe aktar
// Axios: HTTP istekleri (GET, POST, PUT, DELETE vb.) yapmak için kullanılan kütüphane
import axios from "axios";

// Axios instance oluştur - Tüm API istekleri için ortak yapılandırma
// Bu instance, her API çağrısında tekrar tekrar yapılandırma yapmamızı önler
const http = axios.create({
  // Backend API'nin temel URL'i
  // Tüm API istekleri bu URL'e göre yapılır
  // Örnek: baseURL = "http://localhost:3000/api" ise
  // GET isteği -> "http://localhost:3000/api/venues" olur
  baseURL: import.meta.env.VITE_API_URL,
  
  // HTTP istek başlıkları (headers)
  // Her istekte otomatik olarak bu başlıklar gönderilir
  headers: {
    // Sunucudan JSON formatında veri beklediğimizi belirtir
    Accept: "application/json",
    
    // Gönderilen verinin formatını belirtir
    // application/json:JSON türü verileri için kullanılır
    // charset=UTF-8: Türkçe karakter desteği için
    "Content-Type": "application/json",
  },
});

export default http;