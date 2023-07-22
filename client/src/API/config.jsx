import axios from "axios";

const Roomster = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: "https://roomster-backend.onrender.com/",
});

Roomster.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
// Roomster.interceptors.response.use();
// Add a response interceptor
// Roomster.interceptors.response.use(
//   function (response) {
//     if (response.status === 200) {
//       console.log("message");
//       response.data = { message: "Request succeeded."};
//     }
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
// params: {
//     api_key: '52ef927bbeb21980cd91386a29403c78',

export default Roomster;
