<template>
  <div class="">
 <div class="q-gutter-y-md" >

   <q-card>

    <div class="q-pa-md ">
      <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      flat
      class="bg-grey-1"
    >
      <q-step
        :name="1"
        title="Crear"
        icon="settings"
        :done="step > 1"
      >
      <div class="row q-col-gutter-sm">

        <div class="col-md-12 col-sm-12 q-mb-md" id="select">
          <q-toggle
        v-model="third"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        label="Buscar Producto Nombre"
      />
      <q-toggle
        v-model="barras"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        label="Buscar Producto Codigo Barras"
      />
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
          v-if="third && !barras && !nuevo"

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
      <!-- 2 -->

        <q-select
          outlined
          dense
          v-model="producto.codigo_qr"
          use-input
          input-debounce="0"
          label="Buscar Productos"
          :options="productoStore.productos"
          option-label="codigo_qr"
          option-value="id"
          @filter="filterFnCodigo"

          v-else-if="barras && !third && !nuevo"
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
            v-if="producto.codigo_qr"
            name="cancel"
            class="cursor-pointer"
           @click.stop.prevent="producto.codigo_qr = null"
          />
        </template>
      </q-select>
      <!-- 3 -->

      <q-input

          v-else-if="nuevo && !barras && !third"
          class=" col-12 q-mb-md"
          type="text"
          outlined
          dense
          v-model="nuevoNombre"
          label="Nombre Producto *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese nombre del Producto']"
        />
        </div>

        <div class="col-12">

          <p v-if="producto.cantidad" class="column text-existencia" >Existencia: {{producto.cantidad}}</p>
          <p v-if="!nuevoNombre" class="column existencia" >Existencia Total:  {{ producto.cantidad - nuevaCantidad }}</p>
        <!-- Otros campos aquí -->

        </div>
        <q-input
          class="col-md-6 col-sm-12 col-xs-12 q-mb-md"
          type="number"
          outlined
          dense
          v-model="nuevaCantidad"
          label="Cantidad *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese la Cantidad']"
        />
         <q-input
          class="col-md-6 col-sm-12 col-xs-12 q-mb-md"
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
          class="col-md-4 col-sm-12 col-xs-12 q-mb-md"
          outlined
          dense
          v-model="producto.precio_compra"
          label="Precio de Compra *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese el Precio de Compra']"
        />
        <q-input
          class="col-md-4 col-sm-12 col-xs-12 q-mb-md"
          outlined
          dense
          v-model="producto.precio_venta"
          label="Precio de Venta *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese el Precio de Venta']"
        />

        <div class="col-md-4 col-sm-12 col-xs-12 q-gutter-sm q-mb-md">
          <q-input
          class="col-8"
          outlined
          dense
          v-model="producto.codigo_qr"
          label="Codigo de barras *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese el Codigo de barras']"
        />
          <q-btn
          class="col-2 float-right"
          label="Generar Codigo"
          color="purple"
          @click="generarCodigoBarra"
        />


        </div>

        <div class="col-md-12 col-sm-12 q-mb-md q-gutter-sm" >

          <input type="file" @change="handleFileChange"  class="col-md-4 col-sm-12 q-mb-md" />
            <p></p>
            <img :src="imagePreview" alt="" v-if="imagePreview" width="100px" height="100px">
        </div>

        <div class="col-md-12 col-sm-12 q-mb-md q-gutter-sm" >
            <q-btn @click="agregarLista" color="blue-grey" label="Agregar"  class="col-4  q-mb-md float-right	"   />
          </div>
          <div class="col-12">
            <TablaGeneral :columns-prop="colProductos" :rows-prop="listaProductosTemp" :title="'Productos'" />
          </div>
       </div>
      </q-step>

      <q-step
      :name="2"
      title="Producto"
      icon="store"
      :done="step > 2"
      >
      Producto Armado
      </q-step>

      <q-step
      :name="3"
      title="Finalizar"
      icon="star"
      >
      <q-banner class="bg-positive text-white q-mt-md text-bold" >
      Se ha registrado correctamente.
      <template v-slot:action>

      <!-- <q-btn flat color="white" label="Cargar" @click="update" /> -->
      </template>
      </q-banner>
      </q-step>



<template v-slot:navigation>
<q-stepper-navigation>
<q-btn @click="validarYGuardarData" color="primary" :label="step === 4 ? 'Finalizar' : 'Continuar'"    />
<q-btn v-if="step > 1 && step < 4" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
</q-stepper-navigation>
</template>
</q-stepper>


    </div>


   </q-card>
 </div>
</div>
</template>



<script setup >

import { computed, onMounted, ref, watch, onBeforeUnmount, nextTick  } from "vue";
import { useFacturaStore } from "src/stores/factura.store";
import { useCompraStore } from 'src/stores/compra.store';
import { useAuthStore } from 'src/stores/auth.store';
import { usefacturaFinalStore } from "src/stores/compfinal.store";
import { useQuasar } from "quasar";
import  TablaGeneral  from "src/components/Table/TablaGeneral.vue"
import JsBarcode from 'jsbarcode';
import { nanoid } from 'nanoid';
import jsPDF from 'jspdf';
const $q = useQuasar();
const step= ref(1)
 const productoStore = useCompraStore();
 const facturaFinalStore = usefacturaFinalStore()
 const authStore = useAuthStore()
 const usr = authStore.user.email


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
 })
 const facturaFinal = ref({
   id_factura: '',
   id_producto: '',
   precio_compra: '',
   precio_venta: '',
 })


const third = ref(true)
 const barras = ref(false)
 const nuevo = ref(false)


 const cantTemp = ref(0)
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
 const filteredProducts = productoStore.productos.filter(
   v => v.nombre.toLowerCase().indexOf(needle) > -1
 )
 productoStore.productos = filteredProducts

 // Si hay un producto seleccionado, llenar los datos del producto
 if (productoStore.productos.length === 1) {
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
   cantTemp.value = selectedProduct.cantidad
 } else {
   // Si se quita la selección, limpiar los campos del producto
   limpiarCamposProducto()

   // Si no hay resultados, activar el segundo toggle y desactivar el primero
   if (productoStore.productos.length === 0) {
     $q.dialog({
       title: 'Producto no encontrado',
       message: 'No se encontró el producto. ¿Desea crear uno nuevo?',
       cancel: true,
       persistent: true
     }).onOk(() => {
       // Mostrar campos para crear un nuevo producto
       nuevo.value = true;
       third.value = false;
       barras.value = false;
     }).onCancel(() => {
       // Pasar a la búsqueda por código QR
       barras.value = true
       third.value = false
       nuevo.value = false
     });

   }
 }
})
}

function limpiarCamposProducto() {
producto.value = {
 nombre: '',
 cantidad: 0,
 descripcion: '',
 observacion: '',
 marca: '',
 precio_compra: '',
 precio_venta: '',
 imagen: null,
 codigo_qr: ''
}

nuevaCantidad.value = ''
nuevoNombre.value = ''
}

//qr
const filterFnCodigo = (val, update) => {
if (val === '') {
 update(() => {
   productoStore.obtenerProducto()
   limpiarCamposProducto()
 })
 return
}

update(() => {
 const needle = val.toLowerCase()
 const filteredProducts = productoStore.productos.filter(
   v => v.codigo_qr.toLowerCase().indexOf(needle) > -1
 )
 productoStore.productos = filteredProducts

 // Si hay un producto seleccionado, llenar los datos del producto
 if (productoStore.productos.length === 1) {
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
   cantTemp.value = selectedProduct.cantidad
 } else {
   // Si se quita la selección, limpiar los campos del producto
   limpiarCamposProducto()

   // Si no hay resultados, desactivar el toggle de barras y activar el nuevo toggle
   if (productoStore.productos.length === 0) {
     $q.dialog({
       title: 'Producto no encontrado',
       message: 'No se encontró el producto. ¿Desea crear uno nuevo?',
       cancel: true,
       persistent: true
     }).onOk(() => {
       // Mostrar campos para crear un nuevo producto
       nuevo.value = true;
       third.value = false;
       barras.value = false;
     }).onCancel(() => {

       barras.value = false
       third.value = false
       nuevo.value = true
     });

   }
 }
})
}

const nuevoNombre = ref('')
const nuevaCantidad = ref(0) //TODO cambiar cantidad por nueva, y que al update se sume, si es nuevo solo que lo agruegue, y si es update que aparezca arriba del input stock
//fn qr


onMounted(async() => {
  await productoStore.obtenerProducto()


})

const generarCodigoBarra = () => {
  const generarRandomDigits = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  const calcularChecksum = (codigo) => {
    let suma = 0;
    for (let i = 0; i < codigo.length; i++) {
      suma += parseInt(codigo[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const mod = suma % 10;
    return mod === 0 ? 0 : 10 - mod;
  };

  const codigoBase = generarRandomDigits(12);
  const checksum = calcularChecksum(codigoBase);
  const codigoQR = codigoBase + checksum;

  producto.value.codigo_qr = codigoQR;

  // Crear un canvas para el código de barras
  const canvas = document.createElement('canvas');
  canvas.width = 200; // Ancho del canvas ajustado para una buena resolución
  canvas.height = 80; // Altura del canvas ajustado para una buena resolución
  JsBarcode(canvas, codigoQR, {
    format: 'CODE128',
    displayValue: true,
    textMargin: 4, // Margen entre el código de barras y el texto
    fontSize: 16, // Tamaño de fuente para los números
    fontOptions: 'bold'
  });

  const imgData = canvas.toDataURL('image/png');

  // Crear un nuevo PDF
  const doc = new jsPDF();
  const width = 60; // Ancho de la imagen en el PDF
  const height = 30; // Altura de la imagen en el PDF
  const margin = 10; // Margen entre imágenes

  // Añadir la imagen del código de barras según la cantidad
  const cantidad = nuevaCantidad.value;
  let x = 10; // Coordenada X inicial
  let y = 10; // Coordenada Y inicial

  for (let i = 0; i < cantidad; i++) {
    doc.addImage(imgData, 'PNG', x, y, width, height);

    // Actualizar las coordenadas X e Y para la próxima imagen
    x += width + margin;
    if (x + width > doc.internal.pageSize.getWidth()) { // Si la siguiente imagen excede el ancho de la página
      x = 10; // Reiniciar X
      y += height + margin; // Mover Y hacia abajo
    }

    if (y + height > doc.internal.pageSize.getHeight()) { // Si la siguiente imagen excede el alto de la página
      doc.addPage(); // Añadir una nueva página
      x = 10; // Reiniciar X
      y = 10; // Reiniciar Y
    }
  }

  // Guardar el PDF con el nombre especificado en producto.value.nombre
  const pdfFileName = 'producto.pdf';
  doc.save(pdfFileName);
};
const imagePreview = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  producto.value.imagen = file // Almacena el archivo seleccionado
  if (file && file.type.startsWith('image/')) {
    imagePreview.value = URL.createObjectURL(file)
  } else {
    imagePreview.value = null
  }
}


// lista productos
const listaProductos = ref([]);
const listaProductosTemp = ref([]);
const agregarLista = async() => {
    if (producto.value.nombre) {
        // Producto existente
        //TODO VER PORQUE ME CAMBIA LA NUEVA CANT AHORA
            const nuevoProducto = {
            ...producto.value.nombre,
            cantidad: nuevaCantidad.value,
            descripcion: producto.value.descripcion,
            observacion: producto.value.observacion,
            marca: producto.value.marca,
            precio_compra: producto.value.precio_compra,
            precio_venta: producto.value.precio_venta,
            imagen: producto.value.imagen,
            codigo_qr: producto.value.codigo_qr,
            createdAt: producto.value.createdAt,
            updatedAt: producto.value.updatedAt
        };

        listaProductos.value.push(nuevoProducto);
        listaProductosTemp.value.push(nuevoProducto);
        console.log(listaProductosTemp.value, 'temsps')
        limpiarCamposProducto();

    } else {
        // Nuevo producto
        const nuevoProducto = {
            nombre: nuevoNombre.value,
            cantidad: nuevaCantidad.value,
            descripcion: producto.value.descripcion,
            observacion: producto.value.observacion,
            marca: producto.value.marca,
            precio_compra: producto.value.precio_compra,
            precio_venta: producto.value.precio_venta,
            imagen: producto.value.imagen,
            codigo_qr: producto.value.codigo_qr,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        listaProductos.value.push(nuevoProducto);
        listaProductosTemp.value.push(nuevoProducto);
        limpiarCamposProducto();

        // Crear un array de promesas para todas las operaciones


    }

    const promises3 = listaProductos.value.map(async (producto) => {


//TODO ver resta no jala
            if (!producto || typeof producto !== 'object') {
                throw new Error('Producto inválido');
            }

            if ('id' in producto) {
                console.log(producto.cantidad, 'estosevia')
                const formData = new FormData();
                formData.append('nombre', producto.nombre);
                formData.append('cantidad', producto.cantidad);
                formData.append('descripcion', producto.descripcion);
                formData.append('observacion', producto.observacion);
                formData.append('marca', producto.marca);
                formData.append('precio_compra', producto.precio_compra);
                formData.append('precio_venta', producto.precio_venta);
                formData.append('codigo_qr', producto.codigo_qr);

                if (producto.imagen) {
                    formData.append('imagen', producto.imagen);
                }
                producto.cantidad =  cantTemp.value  - producto.cantidad
                await productoStore.updateProducto(producto);

            } else {
                console.log('Nuevo producto sin ID, generando uno...');
                producto.id = nanoid(9);
                const formData = new FormData();
                formData.append('nombre', nuevoNombre);
                formData.append('id', producto.id);
                formData.append('cantidad', producto.cantidad);
                formData.append('descripcion', producto.descripcion);
                formData.append('observacion', producto.observacion);
                formData.append('marca', producto.marca);
                formData.append('precio_compra', producto.precio_compra);
                formData.append('precio_venta', producto.precio_venta);
                formData.append('codigo_qr', producto.codigo_qr);

                if (producto.imagen) {
                    formData.append('imagen', producto.imagen);
                }

                await productoStore.guardarProducto(producto);

            }
        });

        await Promise.all(promises3);
        cantTemp.value = 0
};



// Función para reiniciar el formulario después de agregar un producto
const reiniciarFormulario = () => {
producto.value = {
 nombre: '',
 cantidad: 0,
 marca: '',
 descripcion: '',
 observacion: '',
 precio_compra: '',
 precio_venta: '',
 imagen: null,
};
nuevaCantidad.value = ''
};
//fin lista

const colProductos = [
  { name: 'id', label: 'Codigo', field: 'id' },
{ name: 'nombre', label: 'Nombre', field: 'nombre' },
{ name: 'cantidad', label: 'Cantidad', field: 'cantidad' },
// { name: 'descripcion', label: 'Descripción', field: 'descripcion' },
// { name: 'observacion', label: 'Observación', field: 'observacion' },
// { name: 'marca', label: 'Marca', field: 'marca' },
// { name: 'precio_compra', label: 'Precio Compra', field: 'precio_compra' },
{ name: 'precio_venta', label: 'Precio Venta', field: 'precio_venta' },
// { name: 'codigo_qr', label: 'Código QR', field: 'codigo_qr' }
]

const validarYGuardarData = async () => {}
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

.existencia {
font-weight: bold;
color: red;
margin: 0;
}
.text-existencia {
font-weight: bold;
color: rebeccapurple;
margin: 0;
}
</style>
