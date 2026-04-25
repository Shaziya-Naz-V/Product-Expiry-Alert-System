import axios from 'axios';

const instance = axios.create({
 baseURL: 'https://product-expiry-alert-system-ch0e.onrender.com/api' 
});

export default instance;
