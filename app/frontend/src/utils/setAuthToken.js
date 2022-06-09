import api from "./api";

const setAuthToken = (token, token_type) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token_type+ ' ' + token;
    localStorage.setItem("access_token", token);
    localStorage.setItem("token_type", token_type);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
  }
};

export default setAuthToken;
