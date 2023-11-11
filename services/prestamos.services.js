import axios from "axios";

export const getAllPrestamosService = async () => {
  return await axios.get(
    `https://prestamos-app-nextapp.vercel.app/api/prestamos`,
    {
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    }
  );
};
export const getAllPrestamosByIdService = async (id) => {
  return await axios.get(
    `https://prestamos-app-nextapp.vercel.app/api/prestamos/${id}/`,
    {
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    }
  );
};

export const postCreatePrestamosService = async (data) => {
  return await axios.post(
    `https://prestamos-app-nextapp.vercel.app/api/prestamos`,
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
    `https://prestamos-app-nextapp.vercel.app/api/prestamos/${data.prestamoId}/pagos`,
    data,
    {
      /* headers: {
        Authorization: `Bearer ${token}`,
      }, */
    }
  );
};
