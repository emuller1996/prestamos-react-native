import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Page() {
  const { idPrestamo } = useLocalSearchParams();

  return <Text>Blog post: {idPrestamo}</Text>;
}
