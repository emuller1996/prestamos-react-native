import axios from "axios";
export const getAllClientesService = async () => {
  return await axios.get(`https://prestamos-app-nextapp.vercel.app/api/clientes`, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
export const getClientesByIdService = async (id) => {
  return await axios.get(`https://prestamos-app-nextapp.vercel.app/api/clientes/${id}`, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
export const postCreateClientesService = async (data) => {
  return await axios.post(`https://prestamos-app-nextapp.vercel.app/api/clientes`, data, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
export const putUpdateClientesService = async (id, data) => {
  return await axios.put(`https://prestamos-app-nextapp.vercel.app/api/clientes/${id}`, data, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
