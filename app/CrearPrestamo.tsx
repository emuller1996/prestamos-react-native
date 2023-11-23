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
import { SelectList } from "react-native-dropdown-select-list";
import CurrencyInput from "react-native-currency-input";

import { useNavigation } from "expo-router";

export default function ModalScreen() {
  const [options, setOptions] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [date, setDate] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const dispatch = useAppDispatch();
  const navi = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      fecha_pago: "",
      valor_prestamo: 0,
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
    data.valor_prestamo = parseInt(data.valor_prestamo);
    data.clienteId = parseInt(data.clienteId);
    if (data.fecha_pago === "") {
      setError("fecha_pago", {
        message: "Fecha de Pago Obligatoria",
        type: "required",
      });
      return false;
    }
    console.log(data);
    try {
      await postCreatePrestamosService(data);
      dispatch(getAllPrestamosRedux());
      reset();

      Toast.show({
        type: "success",
        text1: "Prestamo Creado",
      });
      getClientes();
      setDate(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientes = async () => {
    try {
      setOptions(null);
      const r = await getAllClientesService();
      const s = r.data;
      setOptions(
        s.map((c: any) => {
          return { value: c.nombre, key: c.id };
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
          <Text style={styles.label}>Cliente </Text>

          {options && (
            <>
              <Controller
                control={control}
                rules={{
                  required: "Cliente es Obligatorio.",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SelectList
                    setSelected={(e: any) => setValue("clienteId", e)}
                    data={options}
                    save="key"
                    searchPlaceholder="Selecione el Cliente"
                    boxStyles={styles.input}
                  />
                )}
                name="clienteId"
              />
              {errors.clienteId && (
                <Text style={styles.textError}>
                  {errors?.clienteId?.message}
                </Text>
              )}
            </>
          )}
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Valor Prestamo </Text>

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
            name="valor_prestamo"
          />
          {errors.valor_prestamo && (
            <Text style={styles.textError}>
              {errors?.valor_prestamo?.message}
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Fecha Pago </Text>
          <SafeAreaView>
            <TextInput
              focusable={false}
              style={styles.input}
              placeholder="Ingrese la Fecha"
              value={date && date.toISOString().substring(0, 10)}
              onPressIn={() => {
                setShow(!show);
              }}
            />
            {/* <Button
              onPress={() => {
                setShow(!show);
              }}
              title="Selecionar Fecha"
            /> */}
            {/* <Text>
              Fecha Selecionada : {date.toLocaleString().substring(0, 10)}
            </Text> */}
            {show && (
              <>
                <Controller
                  control={control}
                  render={({ field: { onBlur, value } }) => (
                    <RNDateTimePicker
                      onChange={onChangeS}
                      value={date ? date : new Date()}
                      mode="date"
                    />
                  )}
                  name="fecha_pago"
                />
              </>
            )}
            {errors.fecha_pago && (
              <Text style={styles.textError}>s{errors.fecha_pago.message}</Text>
            )}
          </SafeAreaView>
        </View>

        {/*  {options && (
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
        )} */}

        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Guardar</Text>
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
    backgroundColor: "#F9F4FF",
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
    backgroundColor: "#F9F4FF",
  },
  form: {
    width: "86%",
    backgroundColor: "#F9F4FF",
  },
  textError: {
    color: "#CA2A62",
    fontSize: 16,
    paddingLeft: 16,
    textAlign: "center",
    backgroundColor: "#F9F4FF",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A067D9",
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 9,
    color: "#025504",
    backgroundColor: "#FBFBFB",
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#774CA1",
    color: "#E8E1EF",
    borderRadius: 9,
    borderWidth: 1,
    paddingVertical: 8,
  },
  buttonText: {
    color: "#E8E1EF",
    textAlign: "center",
    paddingVertical: 6,
  },
});
