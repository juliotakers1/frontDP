<template>
  <div>
    <q-table
      flat bordered
      :title="title"
      :rows="rowsProp"
      :columns="columnsProp"
      row-key="name"

    >

      <template v-slot:header="props">
        <q-tr :props="props"  >
          <!-- <q-th auto-width /> -->
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
           <q-th auto-width >Ver</q-th>
           <q-th auto-width >Editar</q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" >
          <!-- <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="eliminarProducto(props.row)"  icon="remove" />
          </q-td> -->
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"

          >
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn round color="positive" icon="visibility" size="sm" @click="obtenerRow(props.row)"  />
            <!-- <q-btn color="primary" label="Ver" /> -->
          </q-td>
          <q-td auto-width>

            <q-btn round color="warning" icon="edit" size="sm"    />
          </q-td>
        </q-tr>


      </template>
      <!-- Slot para la columna 'ver' -->

    </q-table>



  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCompraStore } from 'src/stores/compra.store';
import { usefacturaFinalStore } from "src/stores/compfinal.store";
// Define las props recibidas
const productoStore = useCompraStore();
const facFinalStore = usefacturaFinalStore();
const emit = defineEmits(['producto-seleccionado']);
const props = defineProps({
  columnsProp: Array,
  rowsProp: Array,
  title: String
});
const viewprompt = ref(false)
const editprompt = ref(false)
const selectedProducto = ref()
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
const obtenerRow = (factura) => {
const verRow = factura

const proc = facFinalStore.facturasFinales.find(e => verRow.id === e.id_factura);
const productoFinal = productoStore.productos.find(e => proc.id_producto=== e.id);
producto.value = productoFinal
console.log([producto.value], 'aaa')
emit('producto-seleccionado', [producto.value]);
}
//TODO ya funciona y muestra la tabla pero verificar cuando es mas de 1 producto
onMounted(async() => {
  await facFinalStore.obtenerFacturaFinal()
});
// const  actualizarInformacion = async() => {

            // try {
            //   const formData = new FormData();
            //     formData.append('nombre', selectedProducto.value.nombre);
            //     // formData.append('cantidad', selectedProducto.value.cantidad);
            //     formData.append('descripcion', selectedProducto.value.descripcion);
            //     formData.append('observacion', selectedProducto.value.observacion);
            //     formData.append('marca', selectedProducto.value.marca);
            //     formData.append('precio_compra', selectedProducto.value.precio_compra);
            //     formData.append('precio_venta', selectedProducto.value.precio_venta);
            //     formData.append('codigo_qr', selectedProducto.value.codigo_qr);
            //     formData.append('categoria', selectedProducto.value.categoria);
            //     if (selectedProducto.value.imagen) {
            //       formData.append('imagen', selectedProducto.value.imagen); // Añade la imagen si está seleccionada
            //     }

            //     await productoStore.updateProducto(selectedProducto.value);
            // } catch (error) {
            //   console.log(error)
            // }

            // }

//             const eliminarProducto = (producto) => {
//   // Filtra la lista para excluir el producto con el ID dado
//   selectedProducto.value = selectedProducto.value.findIndex(p => p.id !== producto.id);
// };
</script>
