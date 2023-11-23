import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { getAllPagosRedux } from "../../redux/reducers/pagosSlice";
import { useSelector } from "react-redux";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { ViewDollar } from "../../utils";

export default function TabPagosScreen() {
  const pagos = useSelector((state: any) => state.pagos.pagos);
  const loading = useSelector((state: any) => state.pagos.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPagosRedux());
  }, []);
  return (
    <View style={styles.container}>
      {loading && (
        <View style={{ height: "100%" }}>
          <ActivityIndicator
            style={{ paddingTop: 150 }}
            size="large"
            color="#0A660F"
          />
        </View>
      )}

      <View
        style={{
          padding: 12,
          borderWidth: 2,
          marginBottom: 8,
          borderColor: "#1f8c04",
          backgroundColor: "#dbf3d6",
          borderRadius: 8,
          width: "94%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            gap: 64,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight:"600" }}>Fecha</Text>
          <Text style={{ fontSize: 18, fontWeight:"600" }}>Valor Pago</Text>
          <Text style={{ fontSize: 18, fontWeight:"600" }}>Cliente</Text>
        </View>
      </View>

      <FlatList
        onRefresh={() => {
          dispatch(getAllPagosRedux());
        }}
        refreshing={false}
        data={pagos}
        renderItem={({ item: pago }) => (
          <View
            style={{
              padding: 12,
              borderWidth: 2,
              marginBottom: 8,
              borderColor: "#1f8c04",
              backgroundColor: "#dbf3d6",

              borderRadius: 8,
            }}
          >
            <View
              key={pago.id}
              style={{
                flexDirection: "row",
                gap: 32,
                backgroundColor: "transparent",
              }}
            >
              <Text style={styles.text}>
                {pago.fecha_pago.substring(0, 10)}
              </Text>
              <Text style={styles.text}>{ViewDollar(pago.valor_pagado)}</Text>
              <Text style={styles.text}>{pago.prestamo.cliente.nombre}</Text>
            </View>
          </View>
        )}
      ></FlatList>
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
  text: {
    fontSize: 15,
    backgroundColor: "transparent",
  },
});
