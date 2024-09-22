<template>
  <div>
    <div class="row q-gutter-md q-pa-md justify-end">
      <q-btn label="Exportar Excel" class="col-md-1 col-sm-12 bg-positive text-white" @click="exportToExcel" />
      <q-input
        v-model="searchQuery"
        label="Buscar"
        outlined
        class="col-md-7 col-sm-12"
      />
      <q-input
      v-model="fechaInicio"
      label="Fecha Inicio"
      type="date"
      outlined
      class="col-md-1 col-sm-12"
    />
    <q-input
      v-model="fechaFin"
      label="Fecha Fin"
      type="date"
      outlined
      class="col-md-1 col-sm-12"
    />


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
            @click="actualizarCompra(props.row)"
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
import * as XLSX from 'xlsx';
const productoStore = useCompraStore();
const facFinalStore = usefacturaFinalStore();
const emit = defineEmits(['producto-seleccionado']);
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  columnsProp: Array,
  rowsProp: Array,
  title: String
});

// Variables para las fechas de filtro
const fechaInicio = ref(null);
const fechaFin = ref(null);
const searchQuery = ref("");
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
// Computed property para filtrar las filas en función de la búsqueda y las fechas
const filteredRows = computed(() => {
  let filtered = props.rowsProp;

  // Filtrar por fechas si están seleccionadas
  if (fechaInicio.value && fechaFin.value) {
    const startDate = new Date(fechaInicio.value);
    const endDate = new Date(fechaFin.value);

    filtered = filtered.filter(row => {
      const emisionDate = new Date(row.fecha_emision);
      return emisionDate >= startDate && emisionDate <= endDate;
    });
  }

  // Filtrar por el término de búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(query)
      )
    );
  }

  return filtered;
});
// Función para exportar a Excel
const exportToExcel = () => {
  // Genera un nuevo libro de Excel
  const wb = XLSX.utils.book_new();

  // Crea una hoja de cálculo con los datos filtrados
  const ws = XLSX.utils.json_to_sheet(filteredRows.value);

  // Agrega la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(wb, ws, 'Datos Filtrados');

  // Exporta el archivo Excel
  XLSX.writeFile(wb, 'DatosFiltrados.xlsx');
};

const actualizarCompra = (data) => {
  console.log(data, 'ladata')
  router.push({
    name: 'actualizar-compra', // El nombre de la ruta definida en tu router
    query: {
      rowData: JSON.stringify(data) // Aquí pasas el objeto recibido en las props
    }
  });
};
// Obtén los datos de la tienda en el hook `onMounted`
onMounted(async () => {
  await facFinalStore.obtenerFacturaFinal();
});
</script>
