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
import { useForm, Controller } from "react-hook-form";
import FormClientes from "../components/FormClientes";

export default function NuevoClienteScreen() {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async () => {
    console.log({ nombre: text, numero_telefonico: number });

    try {
      /* const r = await axios.post(
          "https://prestamos-app-nextapp.vercel.app/api/clientes",
          {
            nombre: text,
            numero_telefonico: number,
          }
        );
        Alert.alert("Cliente Registrado");
        dispatch(getAllClientesRedux()); */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cliete</Text>

      <FormClientes cliente={null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1FFF1",
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
    backgroundColor: "#025504",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#D3FFD5",

    textAlign: "center",
    borderWidth: 2,
    borderColor: "#D3FFD5",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.0,

    elevation: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "#D3FFD5",
  },
});
