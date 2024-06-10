<template>
     <div class="">
    <div class="q-gutter-y-md" >
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-2 text-grey-7"
          active-color="primary"
          indicator-color="red"
          align="justify"
        >
          <q-tab name="facturas" label="Factura" no-caps />
          <q-tab name="productos" label="Producto" no-caps />
          <q-tab name="nuevas" label="Nueva" no-caps />
        </q-tabs>


      </q-card>

      <q-card>




        <q-tab-panels v-model="tab" animated class="bg-grey-1 text-dark ">
          <q-tab-panel name="facturas">

            tabla
          </q-tab-panel>

          <q-tab-panel name="productos" class="bg-grey-1 text-white">
           tabla
          </q-tab-panel>

            <q-tab-panel name="nuevas" class="bg-grey-1 text-dark">

            <div class=" ">

              <q-stepper
                v-model="step"
                ref="stepper"
                color="primary"
                animated
              >
                <q-step
                  :name="1"
                  title="Nueva Factura"
                  icon="settings"
                  :done="step > 1"
                >
              <div>

              <div class="row q-col-gutter-sm">
                <q-input
                class="col-md-3 col-sm-12 q-mb-md"
                  outlined
                  dense
                  v-model="factura.no_documento"
                  label="No. Documento *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese su No. Documento']"
                />
                <q-input
                class="col-md-3 col-sm-12 q-mb-md"
                  outlined
                  dense
                  v-model="factura.tipo_documento"
                  label="Tipo de Documento *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese el Tipo de Documento']"
                />

                    <q-input
                    class="col-3 q-mb-md"
                  outlined
                  dense
                  type="date"
                  v-model="factura.fecha_emision"
                  label="Fecha de Emision *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese la Fecha de Emision']"
                />
                <q-input
                class="col-3 q-mb-md"
                  outlined
                  dense
                  type="date"
                  v-model="factura.fecha_pago"
                  label="Fecha de Pago *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese la Fecha de Pago']"
                />

                <q-input
                class="col-3 q-mb-md"
                  outlined
                  dense
                  v-model="factura.razon_social_proveedor"
                  label="Razon Social/Proveedor *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese Razon Social/Proveedor']"
                />
                <q-input
                class="col-3 q-mb-md"
                  outlined
                  dense
                  v-model="factura.gastos_transporte"
                  label="Gastos de Transporte *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese el Gastos de Transporte']"
                />

                  <q-input
                  class="col-3 q-mb-md"
                  outlined
                  dense
                  type="number"
                  v-model="factura.telefono_vendedor"
                  label="Telefono Vendedor *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese el Telefono de Vendedor']"
                />
                <q-input
                class="col-3 q-mb-md"
                  outlined
                  dense
                  v-model="factura.nombre_vendedor"
                  label="Nombre Vendedor *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese el Nombre Vendedor']"
                />

                <q-input
                class="col-3 q-mb-md"
                  outlined
                  dense
                  v-model="factura.tipo_pago"
                  label="Tipo de Pago *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese el Tipo de Pago']"
                />
                <q-input
                class="col-3 q-mb-md"
                  outlined
                  dense
                  v-model="factura.tipo_factura"
                  label="Tipo de Factura *"

                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Ingrese el Tipo de Factura']"
                />
               </div>



     </div>
      </q-step>

      <q-step
        :name="2"
        title="Productos"
        icon="store"
        :done="step > 2"
      >
      <div >

      <div class="row q-col-gutter-sm">

        <div class="col-md-4 col-sm-12 q-mb-md" id="select">
          <q-toggle
        v-model="third"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        label="Buscar Producto Nombre"
      />
        <q-select
          outlined
          dense
          v-model="producto.nombre"
          use-input
          input-debounce="0"
          label="Buscar Productos"
          :options="productoStore.productos"
          option-label="nombre"
          option-value="id"
          @filter="filterFn"
          style="width: 250px"
          v-if="third"
        >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
        <!-- Slot para el icono clearable -->
        <template v-slot:append>
          <q-icon
            v-if="producto.nombre"
            name="cancel"
            class="cursor-pointer"
            @click.stop.prevent="producto.nombre = null"
          />
        </template>
      </q-select>
        </div>
        <div class="col-md-4 col-sm-12 q-mb-md" id="barras">
          <q-toggle
        v-model="barras"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        label="Buscar Producto Codigo Barras"
      />
        <q-select
          outlined
          dense
          v-model="producto.nombre"
          use-input
          input-debounce="0"
          label="Buscar Productos"
          :options="productoStore.productos"
          option-label="nombre"
          option-value="id"
          @filter="filterFn"
          style="width: 250px"
          v-if="barras"
        >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
        <!-- Slot para el icono clearable -->
        <template v-slot:append>
          <q-icon
            v-if="producto.nombre"
            name="cancel"
            class="cursor-pointer"
            @click.stop.prevent="producto.nombre = null"
          />
        </template>
      </q-select>
        </div>
        <div class="col-md-4 col-sm-12 q-mb-md" id="nuevo">
          <q-toggle
        v-model="nuevo"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        label="Crear Producto"
      />
        <q-select
          outlined
          dense
          v-model="producto.nombre"
          use-input
          input-debounce="0"
          label="Buscar Productos"
          :options="productoStore.productos"
          option-label="nombre"
          option-value="id"
          @filter="filterFn"
          style="width: 250px"
          v-if="nuevo"
        >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
        <!-- Slot para el icono clearable -->
        <template v-slot:append>
          <q-icon
            v-if="producto.nombre"
            name="cancel"
            class="cursor-pointer"
            @click.stop.prevent="producto.nombre = null"
          />
        </template>
      </q-select>
        </div>
        <!-- Otros campos aquí -->
         <q-input
          class="col-md-4 col-sm-12 q-mb-md"
          type="text"
          outlined
          dense
          v-model="producto.cantidad"
          label="Cantidad *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese la Cantidad']"
        />
         <q-input
          class="col-md-4 col-sm-12 q-mb-md"
          outlined
          dense
          v-model="producto.marca"
          label="Marca *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese Marca']"
        />
        <q-input
          class="col-12 q-mb-md"
          outlined
          dense
          type="text"
          v-model="producto.descripcion"
          label="Descripcion *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese la Descripcion']"
        />
        <q-input
          class="col-12 q-mb-md"
          outlined
          dense
          type="text"
          v-model="producto.observacion"
          label="Observacion *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese la Observacion']"
        />
        <q-input
          class="col-md-4 col-sm-12 q-mb-md"
          outlined
          dense
          v-model="producto.precio_compra"
          label="Precio de Compra *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese el Precio de Compra']"
        />
        <q-input
          class="col-md-4 col-sm-12 q-mb-md"
          outlined
          dense
          v-model="producto.precio_venta"
          label="Precio de Venta *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese el Precio de Venta']"
        />
        <q-input
          class="col-md-4 col-sm-12 q-mb-md"
          outlined
          dense
          v-model="producto.imagen"
          label="Imagen *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese la Imagen']"
        />
       {{ productoStore.productos }}
       </div>



</div>
      </q-step>

      <q-step
        :name="3"
        title="Codigo QR"
        icon="qr_code"
      >
        This step won't show up because it is disabled.
      </q-step>



      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="validarYGuardarData" color="primary" :label="step === 3 ? 'Finalizar' : 'Continuar'"  :disable="factura.no_documento ===''" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>

            </div>

          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
  </template>



  <script setup >

import { computed, onMounted, ref, watch, onBeforeUnmount  } from "vue";
import { useFacturaStore } from "src/stores/factura.store";
import { useCompraStore } from 'src/stores/compra.store';
import { useQuasar } from "quasar";

const $q = useQuasar();
const tab = ref('facturas')
   const step= ref(1)
    const facturaStore = useFacturaStore()
    const productoStore = useCompraStore();
    const factura = ref({
    no_documento: '',
    tipo_documento: '',
    fecha_emision: '',
    fecha_pago: '',
    razon_social_proveedor: '',
    gastos_transporte: '',
    telefono_vendedor: '',
    nombre_vendedor: '',
    tipo_pago: '',
    tipo_factura: '',
    })
    const producto = ref({
      nombre: '',
      cantidad: '',
      descripcion: '',
      observacion: '',
      marca: '',
      precio_compra: '',
      precio_venta: '',
      imagen: '',
      codigo_qr: ''
    })
   const third = ref(false)
    const barras = ref(false)
    const nuevo = ref(false)
    const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      productoStore.obtenerProducto()
      limpiarCamposProducto()
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    productoStore.productos = productoStore.productos.filter(
      v => v.nombre.toLowerCase().indexOf(needle) > -1
    )

    // Si hay un producto seleccionado, llenar los datos del producto
    if (productoStore.productos.length === 1) {
      // Copiar los datos del producto seleccionado al objeto producto
      const selectedProduct = productoStore.productos[0]
      producto.value = {
        nombre: selectedProduct.nombre,
        cantidad: selectedProduct.cantidad,
        descripcion: selectedProduct.descripcion,
        observacion: selectedProduct.observacion,
        marca: selectedProduct.marca,
        precio_compra: selectedProduct.precio_compra,
        precio_venta: selectedProduct.precio_venta,
        imagen: selectedProduct.imagen,
        codigo_qr: selectedProduct.codigo_qr
      }
    } else {
      // Si se quita la selección, limpiar los campos del producto
      limpiarCamposProducto()
    }
  })
}

function limpiarCamposProducto() {
  producto.value = {
    nombre: '',
    cantidad: '',
    descripcion: '',
    observacion: '',
    marca: '',
    precio_compra: '',
    precio_venta: '',
    imagen: '',
    codigo_qr: ''
  }
}



   onMounted(async() => {
     await productoStore.obtenerProducto()
   })


// submit aqui
const validarYGuardarData = async () => {

if (step.value === 1) {

    try {
      // facturaStore.guardarFactura(factura.value)
      step.value++

    } catch (error) {

    }

} else if (step.value === 2) {
  step.value++
} else if (step.value === 3) {
  step.value++
}

 }
  </script>



  <style >

.mb-sticky-virtscroll-table
 {
    height: 410px;
  }

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #0080ff;
    color: white;
  }
  thead tr th {
    position: sticky;
    z-index: 1
  /* this will be the loading indicator */
  }

  thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px
  }
  thead tr:first-child th {
    top: 0
  }


  /* prevent scrolling behind sticky top row on focus */
  tbody {
    /* height of all previous header rows */
    scroll-margin-top: 48px
  }

  .typeahead-list {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
}

  </style>
