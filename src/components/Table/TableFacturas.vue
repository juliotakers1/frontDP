<template>
  <div>
    <div class="row q-gutter-md q-pa-md justify-end">
      <q-input
      v-model="fechaInicio"
      label="Fecha Inicio"
      type="date"
      outlined
      class="col-md-4 col-sm-12"
    />
    <q-input
      v-model="fechaFin"
      label="Fecha Fin"
      type="date"
      outlined
      class="col-md-4 col-sm-12"
    />

    <q-btn label="Filtrar" @click="filtrarPorFecha"  class="col-md-2 col-sm-12" />
    </div>
    <!-- Inputs para seleccionar la fecha de inicio y fin -->


    <q-table
      flat bordered
      :title="title"
      :rows="filteredRows"
      :columns="columnsProp"
      row-key="name"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width>Ver</q-th>
          <q-th auto-width>Editar</q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              round
              color="positive"
              icon="visibility"
              size="sm"
              @click="obtenerRow(props.row)"
            />
          </q-td>
          <q-td auto-width>
            <q-btn
              round
              color="warning"
              icon="edit"
              size="sm"
            />
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useCompraStore } from 'src/stores/compra.store';
import { usefacturaFinalStore } from "src/stores/compfinal.store";

const productoStore = useCompraStore();
const facFinalStore = usefacturaFinalStore();
const emit = defineEmits(['producto-seleccionado']);
const props = defineProps({
  columnsProp: Array,
  rowsProp: Array,
  title: String
});

// Variables para las fechas de filtro
const fechaInicio = ref(null);
const fechaFin = ref(null);

// Producto seleccionado
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
  codigo_qr: ''
});

// Función para obtener la fila seleccionada
const obtenerRow = (factura) => {
  const verRow = factura;
  const proc = facFinalStore.facturasFinales.filter(e => verRow.id === e.id_factura);
  const productosFinales = proc.map(p => productoStore.productos.find(e => p.id_producto === e.id));
  producto.value = productosFinales;
  emit('producto-seleccionado', producto.value);
};

// Computed property para filtrar las filas en función de las fechas
const filteredRows = computed(() => {
  if (!fechaInicio.value || !fechaFin.value) {
    return props.rowsProp;
  }

  // Convierte las fechas a objetos Date
  const startDate = new Date(fechaInicio.value);
  const endDate = new Date(fechaFin.value);

  // Filtra las filas entre las fechas de inicio y fin
  return props.rowsProp.filter(row => {
    const emisionDate = new Date(row.fecha_emision);
    return emisionDate >= startDate && emisionDate <= endDate;
  });
});

// Función para filtrar las filas por fecha
const filtrarPorFecha = () => {
  // La lógica del filtro ya está en `filteredRows`
  console.log('Filtrando por fechas:', fechaInicio.value, fechaFin.value);
};

// Obtén los datos de la tienda en el hook `onMounted`
onMounted(async () => {
  await facFinalStore.obtenerFacturaFinal();
});
</script>
