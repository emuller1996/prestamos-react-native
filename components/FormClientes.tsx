import React from "react";
import axios from "axios";
import { Text, View } from "./Themed";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
} from "react-native";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useForm, Controller } from "react-hook-form";
import { getAllClientesRedux } from "../redux/reducers/clientSlice";
import Toast from "react-native-toast-message";
import { putUpdateClientesService } from "../services/clientes";

export default function FormClientes({
  cliente,
}: {
  cliente: { nombre: string; numero_telefonico: string; id: number };
}) {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: cliente ? cliente.nombre : "",
      numero_telefonico: cliente ? cliente.numero_telefonico : "",
    },
  });

  const onSubmit = async (data: any) => {
    if (cliente) {
      await putUpdateClientesService(cliente.id, data);
      dispatch(getAllClientesRedux());
      Toast.show({
        type: "success",
        text1: "Cliente Editado",
      });
    } else {
      try {
        const r = await axios.post(
          "https://prestamos-app-nextapp.vercel.app/api/clientes",
          data
        );
        Toast.show({
          type: "success",
          text1: "Cliente Creado",
        });
        dispatch(getAllClientesRedux());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        {/* <Text style={styles.label}>Nombre</Text> */}

        <View style={{ marginBottom: 16 }}>
          <Controller
            control={control}
            rules={{
              required: "Nombre del cliente es obligatorio",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="nombre"
          />
          {errors.nombre && (
            <Text style={styles.textError}>{errors?.nombre?.message}</Text>
          )}
        </View>
        <View style={{ marginBottom: 16 }}>
          <Controller
            control={control}
            rules={{
              required: "numero telefonico es obligatorio",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                placeholder="numero telefonico"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="numero_telefonico"
          />
          {errors.numero_telefonico && (
            <Text style={styles.textError}>
              {errors.numero_telefonico.message}
            </Text>
          )}
        </View>
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
        /> */}

        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Guardar</Text>
          </View>
        </TouchableWithoutFeedback>
        {/* <Button
          color={"#025504"}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        /> */}
      </SafeAreaView>

      <Toast position="top" visibilityTime={800} />
    </View>
  );
}

interface Props {
  cliente: object;
  // any props that come into the component
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
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#025504",
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#025504",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#025504",
    paddingHorizontal: 8,
    paddingVertical: 16,
    color: "#D3FFD5",

    textAlign: "center",
    borderWidth: 1,
    borderColor: "#D3FFD5",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.0,

    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    color: "#D3FFD5",
    textAlign: "center",
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4F7150",
  },
  textError: {
    color: "#78281F",
    backgroundColor: "#F1FFF1",
    fontSize: 16,
    paddingLeft: 16,
  },
});
