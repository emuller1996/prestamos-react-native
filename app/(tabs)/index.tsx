import { Alert, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, ActivityIndicator } from "react-native";
import { getAllPrestamosService } from "../../services/prestamos.services";
import {
  SetPrestamos,
  getAllPrestamosRedux,
} from "../../redux/reducers/prestamoSlice";
import { Link } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import { ViewDollar } from "../../utils";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function TabOneScreen() {
  const prestamos = useSelector((state: any) => state.prestamos.prestamos);
  const loading = useSelector((state: any) => state.prestamos.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPrestamosRedux());
  }, []);

  const getPrestamos = async () => {
    try {
      const r = await getAllPrestamosService();

      dispatch(SetPrestamos(r.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {loading && (
        <View style={{ height: "90%" }}>
          <ActivityIndicator
            style={{ paddingTop: 150 }}
            size="large"
            color="#0A660F"
          />
        </View>
      )}
      <FlatList
        onRefresh={() => {
          dispatch(getAllPrestamosRedux());
        }}
        refreshing={loading}
        data={prestamos}
        renderItem={({ item: prestam }) => (
          <View key={prestam} style={styles.card}>
            <Text>{prestam.cliente.nombre}</Text>
            <Text>{prestam.cliente.estado}</Text>
            <Text>{ViewDollar(prestam.cliente.deuda_actual)}</Text>
            <Link style={styles.button} href={`/${prestam.id}`}>
              <FontAwesome name="pencil" size={25} />
              <Text>Ver Prestamo</Text>
            </Link>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0FAFCC",
    padding: 10,
    textAlign: "center",
    borderRadius: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  countText: {
    color: "#FF00FF",
  },
  card: {
    borderColor: "#399DAF",
    backgroundColor: "#EAFCFF",
    borderWidth: 1,
    padding: 13,
    borderRadius: 11,
    marginBottom: 9,
  },
});

/* const styles = StyleSheet.create({
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
}); */
