import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
  TouchableWithoutFeedback,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import RNPickerSelect from "react-native-picker-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientesService } from "../services/clientes";
import { useForm, Controller } from "react-hook-form";
/* import DateTimePicker from "@react-native-community/datetimepicker"; */
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { postCreatePrestamosService } from "../services/prestamos.services";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getAllPrestamosRedux } from "../redux/reducers/prestamoSlice";
import Toast from "react-native-toast-message";


export default function ModalScreen() {
  const [options, setOptions] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      fecha_pago: "",
      valor_prestamo: "",
      clienteId: null,
    },
  });

  useEffect(() => {
    getClientes();
  }, []);

  const onChangeS = (event: any, selectedDate: any) => {
    setValue("fecha_pago", selectedDate);
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(false);
  };

  const onSubmit = async (data: any) => {
    data.valor_prestamo =parseInt(data.valor_prestamo)
    data.clienteId =parseInt(data.clienteId)
    console.log(data);
    try {
      await postCreatePrestamosService(data);

      dispatch(getAllPrestamosRedux());
      reset();

      Toast.show({
        type: "success",
        text1: "Prestamo Creado",
      });
    } catch (error) {
      console.log(error);
      
    }
  };

  const getClientes = async () => {
    try {
      const r = await getAllClientesService();
      const s = r.data.clientes;
      setOptions(
        s.map((c: any) => {
          return { label: c.nombre, value: c.id };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese los datos del prestamos</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.form}>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Fecha Pago </Text>
          <SafeAreaView>
            <Button
              onPress={() => {
                setShow(!show);
              }}
              title="Selecionar Fecha"
            />
            <Text>
              Fecha Selecionada : {date.toLocaleString().substring(0, 10)}
            </Text>
            {show && (
              <Controller
                control={control}
                rules={{
                  required: "cliente",
                }}
                render={({ field: { onBlur, value } }) => (
                  <RNDateTimePicker
                    onChange={onChangeS}
                    value={date}
                    mode="date"
                  />
                )}
                name="fecha_pago"
              />
            )}
          </SafeAreaView>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Valor Prestamo </Text>

          <Controller
            control={control}
            rules={{
              required: "Valor del Prestamo",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                placeholder="Valor del Prestamo"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="valor_prestamo"
          />
          {errors.valor_prestamo && (
            <Text style={styles.textError}>
              {errors?.valor_prestamo?.message}
            </Text>
          )}
        </View>

        {options && (
          <>
            <Text style={styles.label}>Selecione Cliente</Text>

            <Controller
              control={control}
              rules={{
                required: "cliente",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <RNPickerSelect
                  useNativeAndroidPickerStyle={true}
                  onValueChange={onChange}
                  items={options}
                />
              )}
              name="clienteId"
            />
          </>
        )}

        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View
            style={{
              marginTop: 32,
              borderColor: "red",
              borderWidth: 1,
              padding: 16,
            }}
          >
            <Text style={{ textAlign: "center" }}> Guardar</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Toast position="top" visibilityTime={800} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  },
  form: {
    width: "80%",
  },
  textError: {
    color: "#78281F",
    backgroundColor: "#F1FFF1",
    fontSize: 16,
    paddingLeft: 16,
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
});
