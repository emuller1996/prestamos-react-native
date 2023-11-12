import { Alert, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { FlatList, ActivityIndicator } from "react-native";
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
import { ViewDollar } from "../../utils";
export default function TabTwoScreen() {
  /* const [Clientes, setClientes] = useState(null); */
  const clientes = useSelector((state: any) => state.clientes.clientes);
  const loading = useSelector((state: any) => state.clientes.loading);

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

      {loading && (
        <View style={{ height: "100%" }}>
          <ActivityIndicator
            style={{ paddingTop: 150 }}
            size="large"
            color="#0A660F"
          />
        </View>
      )}
      <FlatList
        onRefresh={() => {
          dispatch(getAllClientesRedux());
        }}
        refreshing={false}
        data={clientes}
        renderItem={({ item: clie }) => (
          <View key={clie.nombre} style={styles.card}>
            <View style={{ backgroundColor: "#E6FFE7", display: "flex" }}>
              <Text style={styles.textCard}>{clie.nombre}</Text>
              <Text style={styles.textCard}>{clie.estado}</Text>
              <Text style={styles.textCard}>
                {ViewDollar(clie.deuda_actual)}
              </Text>
            </View>
            <View style={styles.button}>
              <Link style={styles.link} href={`/cliente/${clie.id}`}>
                <FontAwesome name="pencil" size={25} />
                <Text style={{ color: "#EBEBEB" }}>Editar Cliente</Text>
              </Link>
            </View>
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
    borderColor: "#0A660F",
    backgroundColor: "#E6FFE7",
    borderWidth: 1,
    padding: 9,
    borderRadius: 10,
    margin: 5,
  },
  button: {
    backgroundColor: "#0A660F",
    color: "#fff",
    borderRadius: 10,
    borderColor: "#0F73A1",
    borderStyle: "solid",
    textAlign: "center",
    elevation: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: 17,
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    alignSelf: "flex-end",
    color: "#EDEDED",
  },
  textCard: {
    fontSize: 18,
    padding: 2,
  },
  link: {
    width: "100%",
    textAlign: "center",
    color: "#EBEBEB",
  },
});
