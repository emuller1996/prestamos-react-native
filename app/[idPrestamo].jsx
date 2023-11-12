import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { getAllPrestamosByIdService } from "../services/prestamos.services";
import { View } from "../components/Themed";
import { ViewDollar } from "../utils";

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
          Valor del Prestamo: {Prestamo?.fecha_pago.substring(0, 10)}
        </Text>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.card}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>Pagos </Text>
        <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            justifyContent: "space-around",
          }}
        >
          <Text style={styles.text}>Fecha</Text>
          <Text style={styles.text}>Valor</Text>
        </View>
        {Prestamo && (
          <FlatList
            style={{ minHeight: "40%" }}
            data={Prestamo.Pagos}
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
    alignItems: "stretch",
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: "#767676",
  },
  card: {
    marginTop: 32,
    padding: 16,
    borderWidth: 0.8,
    borderColor: "#909090",
    borderRadius: 16,
  },
  separator: {
    marginVertical: 8,
    height: 1,
    width: "100%",
    alignItems: "center",
  },
});
