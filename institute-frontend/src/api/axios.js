import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000' 
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auto logout if token expired
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export default API;