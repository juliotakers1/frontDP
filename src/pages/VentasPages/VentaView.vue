<template>
  <div class="">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Ventas"
        icon="settings"
        :done="step > 1"
      >
      <div class="q-pa-md row items-start q-gutter-md" >
        <div class="col-12 row" >
          <q-card class="my-card col-md-2 col-sm-4 bg-grey-1 q-gutter-md" v-for="item in productoStore.productos" :key="item.id"  @click="viewProducto(item)" style="margin:8px;">
            <img :src="item.imagen" class="img-card ">
            <q-card-section>
              <q-input v-model="item.nombre" label=" Nombre" dense readonly  />
              <q-input v-model="item.precio_venta" label=" Precio" stack-label dense readonly />
              <q-input v-model="item.cantidad" label=" Cantidad Disponible" stack-label dense readonly />
            </q-card-section>
            <q-card-section>

            </q-card-section>
          </q-card>
          <q-dialog v-model="viewprompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Detalles del Producto</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  label="Cantidad"
                  v-model="newCantidad"

                />

              </q-card-section>



              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cerrar" color="negative" @click="viewprompt = false" />
                <q-btn flat label="Agregar" color="primary" @click="agregarLista(selectedProducto), viewprompt = false" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>

      </div>
      </q-step>

      <q-step
        :name="2"
        title="Producto"
        icon="create_new_folder"
        :done="step > 2"
      >
      <div class="row" >
        <div class="col-12">
          <q-table
          flat
          dense
          title="Productos Cargados"
          :rows="listadeProductos"
          :columns="colProductos"
          row-key="name"
          color="black"

        >

        <template v-slot:body-cell-acciones="props">
          <q-btn
            color="negative"
            label=""
            @click="eliminarProductoLista(props.row)"
            size="sm"
            round

              icon="delete"

            class="q-pa-sm q-mx-lg"
          />

        </template>
      </q-table>

        </div>
        <div class="totales col-md-4 col-sm-12">
          <q-input
          dense
          label="Descuento"
          v-model="cliente.nombre"
        />
        </div>
        <div class="totales col-md-4 col-sm-12">
        <q-input
          dense
          label="Total"
          v-model="cliente.apellido"
        />
        </div>
      </div>

      </q-step>

      <q-step
        :name="3"
        title="Cliente"
        icon="assignment"
        :done="step > 3"
      >
      <div class="q-pa-md">
        <q-input
          dense
          label="Nombre"
          v-model="cliente.nombre"
        />
        <q-input
          dense
          label="Apellido"
          v-model="cliente.apellido"
        />
        <q-input
          dense
          label="NIT"
          v-model="cliente.nit"
        />
        <q-input
          dense
          label="Dirección"
          v-model="cliente.direccion"
        />
        <q-input
          dense
          label="Teléfono"
          v-model="cliente.telefono"
        />
        <q-input
          dense
          label="Email"
          v-model="cliente.email"
        />
      </div>
      </q-step>

      <q-step
        :name="4"
        title="Create an ad"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>

  </div>
</template>

<script setup>
import { computed, onMounted, ref  } from "vue";
import { useCompraStore } from 'src/stores/compra.store';

const productoStore = useCompraStore();
const listadeProductos = ref([]);
const producto = ref({
   id: '',
   nombre: '',
   cantidad: 0,
   descripcion: '',
   observacion: '',
   marca: '',
   precio_compra: '',
   precio_venta: '',
   imagen: null,
   codigo_qr: '',
 })
 const cliente = ref({

  nombre: '',
  apellido: '',
  nit: '',
  direccion: '',
  telefono: '',
  email: '',

})

 const step= ref(1)
 const newCantidad = ref(0)
 const selectedProducto = ref()
 const viewprompt = ref(false)
 const viewProducto = (cliente) => {
  selectedProducto.value = cliente;
  viewprompt.value = true;
  console.log(selectedProducto.value)
};
const agregarLista = async(item) => {
    if (item.nombre) {

            const nuevoProducto = {
              nombre: item.nombre,
            cantidad: newCantidad.value,
            descripcion: item.descripcion,
            observacion: item.observacion,
            marca: item.marca,
            precio_compra: item.precio_compra,
            precio_venta: item.precio_venta,
            subtotal: newCantidad.value * item.precio_venta,
            imagen: item.imagen,
            codigo_qr: item.codigo_qr,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };

        listadeProductos.value.push(nuevoProducto);
        newCantidad.value = 0
    }
    console.log(listadeProductos.value, 'aqui')
};
function eliminarProductoLista(producto) {
  const index = listadeProductos.value.indexOf(producto)
  if (index !== -1) {
    listadeProductos.value.splice(index, 1)
  }
}
// Función para simular clic cuando se detecta el código de barras
const onBarcodeScanned = (barcodeValue) => {
  const productoEscaneado = productoStore.productos.find(
    (producto) => producto.codigo_qr === barcodeValue
  );
  if (productoEscaneado) {
    viewProducto(productoEscaneado);
  } else {
    console.log('Producto no encontrado');
  }
};

// Listener para capturar el código de barras
onMounted(() => {
  let barcodeInput = '';
  window.addEventListener('keydown', (e) => {
    // Captura los caracteres
    if (e.key !== 'Enter') {
      barcodeInput += e.key;
    } else {
      // Cuando se presiona 'Enter', procesamos el código de barras
      onBarcodeScanned(barcodeInput);
      barcodeInput = ''; // Reinicia el input
    }
  });

  // Obtener los productos desde la tienda
  productoStore.obtenerProducto();
});

const colProductos = [
{ name: 'nombre', label: 'Nombre', field: 'nombre' },
{ name: 'cantidad', label: 'Cantidad', field: 'cantidad' },
{ name: 'precio_venta', label: 'Precio Venta', field: 'precio_venta' },
{ name: 'subtotal', label: 'Subtotal', field: 'subtotal' },
{ name: 'acciones', label: '', field: 'acciones', sortable: false }
]
</script>
<style  scoped>
.my-card {
  margin: 0;
  text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.img-card {
  width: 100px;
  height: 100px;
  margin-top: 8px;
}
</style>
