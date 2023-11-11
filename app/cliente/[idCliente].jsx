import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Page() {
  const { idCliente } = useLocalSearchParams();

  return <Text>Client id: {idCliente}</Text>;
}
