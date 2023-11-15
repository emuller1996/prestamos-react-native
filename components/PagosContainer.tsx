import { Text, View } from "../components/Themed";
import { StyleSheet } from "react-native";


export default function PagosContainer() {
  return <View style={styles.container}>

    <Text>Crear Pago</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
