import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { postCreatePagoPorPrestamosService } from "../../../services/prestamos.services";
import Toast from "react-native-toast-message";

export default function CrearPagoModal() {
  const { idPrestamo } = useLocalSearchParams();
  const [date, setDate] = useState<any>(null);
  const [show, setShow] = useState(false);
  console.log(idPrestamo);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      fecha_pago: new Date().toISOString(),
      valor_pagado: 0,
    },
  });
  const onChangeS = (event: any, selectedDate: any) => {
    setValue("fecha_pago", selectedDate);
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(false);
  };
  const onSubmit = async (data: any) => {
    data.prestamoId = parseInt(`${idPrestamo}`);
    console.log(data);

    try {
      await postCreatePagoPorPrestamosService(data);
      Toast.show({
        type: "success",
        text1: "Pago Registado",
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Valor del Pago </Text>

          {/* <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="600.000"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          /> */}
          <Controller
            control={control}
            rules={{
              required: "Valor prestamo es Obligatorio.",
              validate: (i) => {
                if (i === 0) {
                  return false || "Valor debe ser diferente a zero";
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CurrencyInput
                style={styles.input}
                precision={0}
                value={value}
                onChangeValue={onChange}
              />
            )}
            name="valor_pagado"
          />
          {errors.valor_pagado && (
            <Text style={styles.textError}>
              {errors?.valor_pagado?.message}
            </Text>
          )}
        </View>

        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Guardar</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Toast position="bottom" visibilityTime={800} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ebf3ff",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    paddingBottom: 8,
    backgroundColor: "#ebf3ff",
  },
  form: {
    width: "86%",
    backgroundColor: "#ebf3ff",
    marginTop: 32,
  },
  textError: {
    color: "#ca2a2a",
    fontSize: 16,
    paddingLeft: 16,
    textAlign: "center",
    backgroundColor: "#ebf3ff",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#678fd9",
    fontSize: 16+8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#025504",
    backgroundColor: "#f6faff",
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#5387cf",
    borderColor: "#a3c7ff",
    color: "#E8E1EF",
    borderRadius: 9,
    borderWidth: 3,
    paddingVertical: 8,
  },
  buttonText: {
    color: "#eff4fc",
    textAlign: "center",
    paddingVertical: 6,
    fontSize:16,
    fontWeight:"600",
  },
});
