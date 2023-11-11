import { Alert, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { FlatList } from "react-native";
import axios from "axios";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

import { useDispatch, useSelector } from "react-redux";
import {
  SetClientes,
  getAllClientesRedux,
} from "../../redux/reducers/clientSlice";
import { getAllClientesService } from "../../services/clientes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
export default function TabTwoScreen() {
  /* const [Clientes, setClientes] = useState(null); */
  const clientes = useSelector((state: any) => state.clientes.clientes);

  const [first, setfirst] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {

    dispatch(getAllClientesRedux());

  }, [first]);

  interface Cliente {
    nombre: string;
  }


  return (
    <View style={styles.container}>
      <Link style={styles.button} href="/NuevoCliente">
        <FontAwesome name="plus-circle" size={25} />
        <Text style={styles.text}>Crear Cliente</Text>
      </Link>

      {/* <Text style={styles.title}>Tab Two</Text> */}
      <FlatList
        data={clientes}
        renderItem={({ item: clie }) => (
          <View key={clie.nombre} style={styles.card}>
            <Text>{clie.nombre}</Text>
            <Text>{clie.estado}</Text>
            <Link style={styles.button} href={`/cliente/${clie.id}`}>
              <FontAwesome name="pencil" size={25} />
              <Text>Editar Cliente</Text>
            </Link>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    display: "flex",
    marginBottom: 27,
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
  card: {
    borderColor: "#399DAF",
    backgroundColor: "#EAFCFF",
    borderWidth: 1,
    padding: 9,
    borderRadius: 10,
    margin: 5,
  },
  button: {
    backgroundColor: "#3095C4",
    color: "#EDEDED",
    borderRadius: 10,
    borderColor: "#0F73A1",
    borderStyle: "solid",
    elevation: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 2,
    fontSize: 17,
    marginHorizontal: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    alignSelf: "flex-end",
    color: "#EDEDED",
  },
});
