import axios from "axios";
axios.defaults.baseURL = `http://192.168.0.6:3001`

export const getPagosService = async () => {
    return await axios.get(`/pagos/`, {
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    });
  };