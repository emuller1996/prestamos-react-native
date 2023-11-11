import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientesService } from "../services/clientes";
import { SetClientes } from "../redux/reducers/clientSlice";

export default function ModalScreen() {
  const clientes = useSelector((state: any) => state.clientes.clientes);

  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => {
    try {
      const r = await getAllClientesService();
      dispatch(SetClientes(r.data.clientes));
      const s = r.data.clientes;
      setOptions(
        s.map((c: any) => {
          return { label: c.nombre, value: c.id };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={options}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
