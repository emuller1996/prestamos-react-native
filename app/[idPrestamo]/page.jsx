import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { getAllPrestamosByIdService } from "../../services/prestamos.services";
import { View } from "../../components/Themed";
import { ViewDollar } from "../../utils";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Page() {
  const { idPrestamo } = useLocalSearchParams();

  const [Prestamo, setPrestamo] = useState(null);

  useEffect(() => {
    getPrestamoById();
  }, []);

  const getPrestamoById = async () => {
    try {
      const t = await getAllPrestamosByIdService(idPrestamo);
      console.log(t.data.prestamo);
      setPrestamo(t.data.prestamo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Cliente: {Prestamo?.cliente.nombre}</Text>

        <Text style={styles.text}>
          Deuda Actual: {ViewDollar(Prestamo?.deuda_actual)}
        </Text>
        <Text style={styles.text}>
          Pago Interes: {ViewDollar(Prestamo?.pago_interes)}
        </Text>
        <Text style={styles.text}>
          Valor del Prestamo: {ViewDollar(Prestamo?.valor_prestamo)}
        </Text>
        <Text style={styles.text}>
          Fecha del Prestamo: {Prestamo?.createdAt.substring(0, 10)}
        </Text>
        <Text style={styles.text}>
          Fecha del Pago: {Prestamo?.fecha_pago.substring(0, 10)}
        </Text>
        <Text style={styles.estado}>{Prestamo?.estado}</Text>
      </View>

      <View style={styles.card}>
        <Text
          style={{ ...styles.text, textAlign: "center", marginVertical: 8 }}
        >
          Pagos{" "}
        </Text>
        <View style={styles.button}>
          <Link style={styles.text} href={`/${idPrestamo}/CrearPago/page`}>
            <FontAwesome style={{ color: "#ffefe5" }} name="dollar" size={25} />
            <Text
              style={{
                fontSize: 20,
                color: "#ffefe5",
              }}
            >
              Crea Pago
            </Text>
          </Link>
        </View>
        {/* <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        /> */}
        <View
          style={{
            display: "flex",
            marginTop:16,
            flexDirection: "row",
            gap: 16,
            justifyContent: "space-around",
            backgroundColor: "transparent",
          }}
        >
          <Text style={styles.text}>Fecha</Text>
          <Text style={styles.text}>Valor</Text>
        </View>
        {Prestamo && (
          <FlatList
            style={{ minHeight: "40%" }}
            data={Prestamo.Pagos}
            ListEmptyComponent={
              <Text
                style={{ textAlign: "center", marginTop: 16, fontSize: 16 }}
              >
                No hay Pagos
              </Text>
            }
            renderItem={({ item: prestam }) => (
              <>
                <View
                  style={styles.separator}
                  lightColor="#eee"
                  darkColor="rgba(255,255,255,0.1)"
                />
                <View
                  key={prestam}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 16,
                    justifyContent: "space-around",
                    backgroundColor: "transparent",
                  }}
                >
                  <Text style={styles.text}>
                    {prestam.fecha_pago.substring(0, 10)}
                  </Text>
                  <Text style={styles.text}>
                    {ViewDollar(prestam.valor_pagado)}
                  </Text>
                </View>
              </>
            )}
          ></FlatList>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffefe5",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: "#9b5005",
  },
  card: {
    marginTop: 32,
    padding: 16,
    borderWidth: 0.8,
    borderColor: "#fd8813",
    backgroundColor: "#fff7f2",
    borderRadius: 16,
  },
  separator: {
    marginVertical: 8,
    height: 2,
    width: "100%",
    backgroundColor: "#ffd4a9",
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "#ffcb96",
    backgroundColor: "#ff8437",
    color: "#ffeee3",
    borderRadius: 9,
    padding: 8,
    justifyContent: "center",
  },
  estado: {
    borderWidth: 2,
    borderColor: "#ffcb96",
    backgroundColor: "#ff8437",
    fontSize: 20,
    borderRadius: 8,
    color: "#fcf1e7",
    marginVertical: 10,
    overflow: "hidden",
    textAlign: "center",
  },
});
