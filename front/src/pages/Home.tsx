import { View } from "react-native";

import {
  Button,
  DataTable,
  Snackbar,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useState } from "react";

// En circunstancias normales esto se definiria entorno del servicio que lo utilize y no aca.
// Ex. ./src/services/orders/dto o ./src/modules/orders/services/dto
type OrderResponseDto = {
  products: {
    unitPrice: number;
    quantity: number;
    popularity: number;
    name: string;
  }[];
  customer: {
    name: string;
    address: string;
  };
};

export default function Home() {
  const [order, setOrder] = useState<OrderResponseDto>();

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([4, 8, 16]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, order?.products?.length || 0);

  const [orderId, setOrderId] = useState("");

  const onSubmit = () => {
    // El path a la api en circunstancias normales, lo definiria dentro de .env
    // Tambien haria una funcion que reutilize la logica de la request y su manejo de errores,
    // y definiria esto dentro de los src/services de la aplicacion dependiendo de la escala del proyecto.
    fetch(`http://localhost:3000/interview/order/${orderId}`).then(
      async (res) => {
        if (res?.ok) {
          const users: OrderResponseDto = await res.json();
          setOrder(users);
          console.log(users);
        } else {
          setSnackbarVisibility(true);
          // Tambien se deberian manejar otros errores
        }
      }
    );
  };

  const theme = useTheme();

  const [snackbarVisibility, setSnackbarVisibility] = useState(false);

  return (
    <View
      // En otras circunstancias esto se define en un StyleSheet
      //y si se reutiliza mucho se hace un custom component
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.background,
      }}
    >
      <Surface
        elevation={1}
        style={{
          padding: 8,
          margin: 8,
          borderRadius: theme.roundness,
          gap: 14,
        }}
      >
        <TextInput
          mode="outlined"
          error={Number.isNaN(Number(orderId))}
          placeholder="Ingrese numero de orden"
          label={"OrderId"}
          onChangeText={(newString) => setOrderId(newString)}
          value={orderId}
        />
        <Button
          disabled={Number.isNaN(Number(orderId))}
          mode="contained"
          onPress={() => {
            console.log("Pressed", orderId);
            onSubmit();
          }}
          style={{ maxWidth: 200 }}
        >
          Submit
        </Button>
      </Surface>
      {order ? (
        <Surface
          elevation={1}
          // Si tendria un tema definido para la aplicacion usaria sus constantes.
          style={{ padding: 8, margin: 8, borderRadius: theme.roundness }}
        >
          <Text style={{ color: theme.colors.onSurface }}>
            Nombre: {order.customer.name}
          </Text>

          <Text style={{ color: theme.colors.onSurface }}>
            Dirección: {order.customer.address}
          </Text>
        </Surface>
      ) : null}

      <Surface
        elevation={1}
        style={{ padding: 8, margin: 8, borderRadius: theme.roundness }}
      >
        {/* <View className="w-[50%] min-w-96 p-4 bg-slate-300 rounded-2xl"> */}

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Nombre</DataTable.Title>
            <DataTable.Title>Precio unitario</DataTable.Title>
            <DataTable.Title numeric>Cantidad</DataTable.Title>
            <DataTable.Title numeric>Popularidad</DataTable.Title>
          </DataTable.Header>

          {order &&
            order.products.slice(from, to).map((item) => (
              <DataTable.Row key={item.name}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.unitPrice}</DataTable.Cell>
                <DataTable.Cell numeric>{item.unitPrice}</DataTable.Cell>
                <DataTable.Cell numeric>{item.popularity}</DataTable.Cell>
              </DataTable.Row>
            ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(
              order ? order.products.length / itemsPerPage : 0
            )}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${order?.products?.length || 0}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
        {/* </View> */}
      </Surface>
      <Snackbar
        visible={snackbarVisibility}
        onDismiss={() => {
          setSnackbarVisibility(false);
        }}
        action={{
          label: "Entendido",
          onPress: () => {
            // Do something
            setSnackbarVisibility(false);
          },
        }}
      >
        Orden no encontrada.
      </Snackbar>
    </View>
  );
}
