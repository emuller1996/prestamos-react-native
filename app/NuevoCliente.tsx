import React from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { getAllClientesRedux } from "../redux/reducers/clientSlice";
import { getAllClientesService } from "../services/clientes";
import { useAppDispatch } from "../hooks/useAppDispatch";

export default function NuevoClienteScreen() {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    console.log({ nombre: text, numero_telefonico: number });

    try {
      const r = await axios.post(
        "https://prestamos-app-nextapp.vercel.app/api/clientes",
        {
          nombre: text,
          numero_telefonico: number,
        }
      );
      Alert.alert("Cliente Registrado");
      dispatch(getAllClientesRedux());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cliete</Text>

      <SafeAreaView style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
        />

        <TouchableWithoutFeedback onPress={onSubmit}>
          <View style={styles.button}>
            <Text> Guardar</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    marginHorizontal: 50,
  },
  input: {
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#4855DE",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#F9F9F9",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#1026FF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.95,
    shadowRadius: 16.0,

    elevation: 10,
  },
});
