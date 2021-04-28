import axios from "axios";
var base = "https://e7fa9fdc7870.ngrok.io";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    switch (error.response.status) {
      case 401:
        break;
    }
    return Promise.reject(error);
  }
);

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.get["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = [
  function (data) {
    let ret = "";
    for (let it in data) {
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    return ret;
  },
];

export { axios, base };
