import axios from "axios";
axios.defaults.baseURL = `http://192.168.0.6:3001`
export const getAllClientesService = async () => {
  return await axios.get(`/clientes`, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
export const getClientesByIdService = async (id) => {
  return await axios.get(`/clientes/${id}`, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
export const postCreateClientesService = async (data) => {
  return await axios.post(`/clientes`, data, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
export const putUpdateClientesService = async (id, data) => {
  return await axios.put(`/clientes/${id}`, data, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
