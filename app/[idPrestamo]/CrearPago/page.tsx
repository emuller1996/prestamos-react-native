import { StyleSheet, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CrearPagoModal() {
  const { idPrestamo } = useLocalSearchParams();
  console.log(idPrestamo);

  return (
    <View style={styles.container}>
      <Text>Crear Pagos {idPrestamo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 8,
    backgroundColor: "#F9F4FF",
  },
});
