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
           <!-- <q-th auto-width >Editar</q-th> -->
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
            <q-btn round color="positive" icon="visibility" size="sm" @click="viewProducto(props.row)" />
            <q-btn round color="negative" icon="delete" size="sm" @click="eliminarProducto(props.row)" />
          </q-td>
          <!-- <q-td auto-width>

            <q-btn round color="warning" icon="edit" size="sm"  @click="editProducto(props.row)"  />
          </q-td> -->
        </q-tr>
        <!-- <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
          </q-td>
        </q-tr> -->

      </template>
      <!-- Slot para la columna 'ver' -->

    </q-table>
    <q-dialog v-model="viewprompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Detalles del Producto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="Código"
            v-model="selectedProducto.id"
            readonly
          />
          <q-input
            dense
            label="Nombre"
            v-model="selectedProducto.nombre"
            readonly
          />
          <q-input
            dense
            label="Cantidad"
            v-model="selectedProducto.cantidad"
            readonly
          />
          <q-input
            dense
            label="Cantidad Faltante"
            v-model="selectedProducto.cantidadFalta"
            readonly
          />
          <q-input
            dense
            label="Código QR"
            v-model="selectedProducto.codigo_qr"
            readonly
          />
          <q-input
            dense
            label="Descripción"
            v-model="selectedProducto.descripcion"
            readonly
          />
          <q-input
            dense
            label="Marca"
            v-model="selectedProducto.marca"
            readonly
          />
          <q-input
            dense
            label="Observación"
            v-model="selectedProducto.observacion"
            readonly
          />
          <q-input
            dense
            label="Precio de Compra"
            v-model="selectedProducto.precio_compra"
            readonly
          />
          <q-input
            dense
            label="Precio de Venta"
            v-model="selectedProducto.precio_venta"
            readonly
          />

          <img :src="selectedProducto.imagen" v-if="selectedProducto.imagen" alt="Imagen no valida" width="100px" height="100px">
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cerrar" color="primary" @click="viewprompt = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCompraStore } from 'src/stores/compra.store';
// Define las props recibidas
const productoStore = useCompraStore();
const props = defineProps({
  columnsProp: Array,
  rowsProp: Array,
  title: String
});
const viewprompt = ref(false)
const editprompt = ref(false)
const selectedProducto = ref()
const viewProducto = (producto) => {
  selectedProducto.value = producto;
  viewprompt.value = true;
  console.log(selectedProducto.value)
};

const editProducto = (producto) => {
  selectedProducto.value = producto;
  editprompt.value = true;
  console.log(selectedProducto.value)
};


// Función para eliminar el producto de la lista directamente
const eliminarProducto = (producto) => {
  const index = props.rowsProp.findIndex(item => item.id === producto.id);
  if (index !== -1) {
    props.rowsProp.splice(index, 1);  // Eliminar el producto de la lista original
  }
  console.log('Producto eliminado:', producto);
};

</script>
