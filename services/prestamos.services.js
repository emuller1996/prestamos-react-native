import axios from "axios";
axios.defaults.baseURL = `http://192.168.0.6:3001`
export const getAllPrestamosService = async () => {
  return await axios.get(
    `/prestamos`,
    {
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    }
  );
};
export const getAllPrestamosByIdService = async (id) => {
  return await axios.get(
    `/prestamos/${id}/`,
    {
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    }
  );
};

export const postCreatePrestamosService = async (data) => {
  return await axios.post(
    `/prestamos`,
    data,
    {
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    }
  );
};
export const postCreatePagoPorPrestamosService = async (data) => {
  return await axios.post(
    `/prestamos/${data.prestamoId}/pagos`,
    data,
    {
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    }
  );
};
