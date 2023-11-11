import { useEffect, useState } from "react";


const useCliente = () => {
  const [Clientes, setClientes] = useState(undefined);
  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => {
    try {
      const r = await axios.get(
        "https://prestamos-app-nextapp.vercel.app/api/clientes"
      );
      setClientes(r.data.clientes);
      console.log(r.data.clientes);
    } catch (error) {}
  };

  return { clientes: Clientes };
};

export default useCliente;
