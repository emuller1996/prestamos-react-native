import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientesService } from "../services/clientes";

export default function ModalScreen() {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => {
    try {
      const r = await getAllClientesService();
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
      <Text style={styles.title}>Ingrese los datos del prestamos</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {options && (
        <>
          <Text style={styles.label}>Ingrese los datos del prestamos</Text>

          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={options}
          />
        </>
      )}
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
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    paddingBottom:8
  },
});
