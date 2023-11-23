import axios from "axios";
axios.defaults.baseURL = `http://18.231.180.169:3035`
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
