import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import FormClientes from "../../components/FormClientes";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getClientesByIdService } from "../../services/clientes";
export default function Page() {
  const { idCliente } = useLocalSearchParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    getClientById();
  }, []);

  const getClientById = async () => {
    try {
      const t = await getClientesByIdService(idCliente);
      console.log(t.data.clientes);
      setCliente(t.data.clientes);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cliete</Text>
      {cliente && <FormClientes cliente={cliente} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1FFF1",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
