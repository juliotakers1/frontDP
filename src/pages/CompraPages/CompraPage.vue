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
      <q-banner class="bg-negative text-white q-mt-md" v-if="productoStore.productosTemporales && facturaStore.facturasTemporales">
        Existen productos & facturas pendientes
        <template v-slot:action>
          <q-btn flat color="yellow" label="Limpiar" />
          <!-- <q-btn flat color="white" label="Cargar" @click="update" /> -->
        </template>
      </q-banner>
      <q-card>




        <q-tab-panels v-model="tab" animated class="bg-grey-1 text-dark ">
          <q-tab-panel name="facturas">

            tabla
          </q-tab-panel>

          <q-tab-panel name="productos" class="bg-grey-1 text-white">
            <TablaGeneral :columns-prop="colProductos" :rows-prop="productoStore.productos" :title="'Productos'" />
          </q-tab-panel>

            <q-tab-panel name="nuevas" class="bg-grey-1 text-dark">

            <div class=" ">

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
          <p v-if="nuevaCantidad" class="column existencia" >Existencia Total:  {{ Number(producto.cantidad) + Number(nuevaCantidad) }}</p>
        <!-- Otros campos aquí -->

        </div>
        <q-input
          class="col-md-6 col-sm-12 col-xs-12 q-mb-md"
          type="text"
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

       </div>



</div>
      </q-step>
      <q-step
        :name="3"
        title="Productos Cargados"
        icon="list"
        v-if="listaProductosTemp"
      >
        <TablaGeneral :columns-prop="colProductos" :rows-prop="listaProductosTemp" :title="'Productos Agregados'" />
      </q-step>
      <q-step
        :name="4"
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
          <q-btn @click="validarYGuardarData" color="primary" :label="step === 4 ? 'Finalizar' : 'Continuar'"  :disable="factura.no_documento ===''"  />
          <q-btn v-if="step > 1 && step < 4" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
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

import { computed, onMounted, ref, watch, onBeforeUnmount, nextTick  } from "vue";
import { useFacturaStore } from "src/stores/factura.store";
import { useCompraStore } from 'src/stores/compra.store';
import { useAuthStore } from 'src/stores/auth.store';
import { usefacturaFinalStore } from "src/stores/compfinal.store";
import { useQuasar } from "quasar";
import  TablaGeneral  from "src/components/Table/TablaGeneral.vue"
import { nanoid } from 'nanoid';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
const $q = useQuasar();
const tab = ref('facturas')
   const step= ref(1)
    const facturaStore = useFacturaStore()
    const productoStore = useCompraStore();
    const facturaFinalStore = usefacturaFinalStore()
    const authStore = useAuthStore()
    const usr = authStore.user.email
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
      id: '',
      nombre: '',
      cantidad: '',
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


   const third = ref(true)
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
function limpiarCamposFactura() {
  factura.value = {
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
          }
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
const nuevaCantidad = ref('')


   onMounted(async() => {
     await productoStore.obtenerProducto()
     await productoStore.obtenerProductoTemporales(authStore.user.email)
     await facturaStore.obtenerFacturaTemporal(authStore.user.email)
     if(facturaStore.facturasTemporales){
      deleteFacturaID.value = facturaStore.facturasTemporales.map(factura => factura.id);
     }

     if(productoStore.productosTemporales || facturaStore.facturasTemporales) {
      tab.value = 'nuevas'
      try {
          // Cargar facturas temporales
          const facturaTemporal = facturaStore.facturasTemporales[0]; // O elige el índice adecuado
          // Actualizar inputs con los datos de la primera factura temporal
          factura.value = {
            no_documento: facturaTemporal.no_documento,
          tipo_documento: facturaTemporal.tipo_documento,
          fecha_emision: facturaTemporal.fecha_emision,
          fecha_pago: facturaTemporal.fecha_pago,
          razon_social_proveedor: facturaTemporal.razon_social_proveedor,
          gastos_transporte: facturaTemporal.gastos_transporte,
          telefono_vendedor: facturaTemporal.telefono_vendedor,
          nombre_vendedor: facturaTemporal.nombre_vendedor,
          tipo_pago: facturaTemporal.tipo_pago,
          tipo_factura: facturaTemporal.tipo_factura
          }


          listaProductosTemp.value = productoStore.productosTemporales;
        } catch (error) {
          console.error('Error al actualizar datos:', error);
        }
     } else {

      tab.value = 'facturas'
     }

   })



// submit aqui
const validarYGuardarData = async () => {

if (step.value === 1) {

    try {

      //TODO validar que si es pendiente solo de step al otro si es nueva que guarde en temporal
      if( facturaStore.facturasTemporales) {
        step.value++

      } else {

        factura.value.usuario = usr
        await facturaStore.guardarFacturaTemporal(factura.value)
        step.value++
      }


    } catch (error) {
      console.log('Error', error)
    }

} else if (step.value === 2) {

    step.value++
}
else if (step.value === 3) {
//   await productoStore.obtenerProductoTemporales()
const productosCompletos = computed(() => {
  return listaProductosTemp.value.map(producto => {
    // Verifica si productoStore.productos está definido
    if (!productoStore.productos) {
      // Elimina la propiedad id si existe
      const { id, ...productoSinId } = producto;
      return productoSinId;
    }

    const encontrado = productoStore.productos.find(p => p.nombre === producto.nombre);
    const productoModificado = encontrado ? { ...producto, id: encontrado.id } : producto;

    // Elimina la propiedad id si existe
    const { id, ...productoSinId } = productoModificado;
    return productoSinId;
  });
});

listaProductos.value = productosCompletos.value;

factura.value.id = nanoid(8)
await facturaStore.guardarFactura(factura.value)
  step.value++
}else if (step.value === 4) {



  try {
          //TODO  problema, tengo cambiar validacion id en producto porque si va a tener id pero del temporal no del original
        // Crear un array de promesas para todas las operaciones

     const promises = listaProductos.value.map(async (producto) => {
            // Verificar que producto es un objeto y tiene o no tiene la propiedad id según sea necesario
            producto.cantidad = Number(producto.cantidad) + Number(nuevaCantidad.value)
            if (!producto || typeof producto !== 'object') {
                throw new Error('Producto inválido');
            }

            if ('id' in producto) {
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
                  formData.append('imagen', producto.imagen); // Añade la imagen si está seleccionada
                }

                await productoStore.updateProducto(producto);
            } else {
              producto.id = nanoid(8)
              const formData = new FormData();
                formData.append('id', producto.id);
                formData.append('nombre', nuevoNombre ? nuevoNombre : producto.nombre);
                formData.append('cantidad', producto.cantidad);
                formData.append('descripcion', producto.descripcion);
                formData.append('observacion', producto.observacion);
                formData.append('marca', producto.marca);
                formData.append('precio_compra', producto.precio_compra);
                formData.append('precio_venta', producto.precio_venta);
                formData.append('codigo_qr', producto.codigo_qr);

                if (producto.imagen) {
                  formData.append('imagen', producto.imagen); // Añade la imagen si está seleccionada
                }

                await productoStore.guardarProducto(producto);

                //f compra
                facturaFinal.value = {
                id_factura: factura.value.id,
                id_producto: producto.id,
                precio_compra: producto.precio_compra,
                precio_venta: producto.precio_venta,
            }

            await  facturaFinalStore.guardarFacturaFinal(facturaFinal.value)

            }

        });
          //
        // Ejecutar todas las promesas en paralelo
        await Promise.all(promises);
        const promises2 = listaProductosTemp.value.map(async (prd) => {

          await productoStore.deleteProducto(prd.id)
          await Promise.all(promises2);
        });

        await facturaStore.deleteFactura(deleteFacturaID.value[0])
        limpiarCamposFactura()

        // Incrementar el step después de completar todas las operaciones

    } catch (error) {
        console.error('Error al procesar los datos:', error);
        // Manejar el error apropiadamente
    } finally {
      step.value = 1;
    }
}

 }

 // lista productos
 const listaProductos = ref([]);
 const listaProductosTemp = ref([]);
const agregarLista = async() => {
  // Verificar si existe producto.nombre para determinar si es nuevo o existente
  if (producto.value.nombre) {
    // Producto existente: Copia profunda del producto para evitar mutaciones accidentales
    const nuevoProducto = {
      ...producto.value.nombre,
      usuario: usr,
      cantidad: producto.value.cantidad,
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

    // Agregar el producto a la lista de productos
    listaProductosTemp.value.push(nuevoProducto);
  } else {
    // Nuevo producto: Crear un objeto nuevoProducto
    const nuevoProducto = {
      nombre: nuevoNombre.value,
      usuario: usr,
      cantidad: producto.value.cantidad,
      descripcion: producto.value.descripcion,
      observacion: producto.value.observacion,
      marca: producto.value.marca,
      precio_compra: producto.value.precio_compra,
      precio_venta: producto.value.precio_venta,
      imagen: producto.value.imagen,
      codigo_qr: producto.value.codigo_qr,
      createdAt: new Date().toISOString(), // Puedes establecer la fecha actual
      updatedAt: new Date().toISOString() // Puedes establecer la fecha actual
    };

    // Agregar el producto nuevo a la lista de productos
    listaProductosTemp.value.push(nuevoProducto);
    //aqui iria el guardar
     // Crear un array de promesas para todas las operaciones
     const promises = listaProductosTemp.value.map(async (producto) => {
            // Verificar que producto es un objeto y tiene o no tiene la propiedad id según sea necesario
            producto.cantidad = Number(producto.cantidad) + Number(nuevaCantidad.value)
            if (!producto || typeof producto !== 'object') {
                throw new Error('Producto inválido');
            }

            if ('id' in producto) {
              const formData = new FormData();
              formData.append('usuario', usr);
                formData.append('nombre', producto.nombre);
                formData.append('cantidad', producto.cantidad);
                formData.append('descripcion', producto.descripcion);
                formData.append('observacion', producto.observacion);
                formData.append('marca', producto.marca);
                formData.append('precio_compra', producto.precio_compra);
                formData.append('precio_venta', producto.precio_venta);
                formData.append('codigo_qr', producto.codigo_qr);

                if (producto.imagen) {
                  formData.append('imagen', producto.imagen); // Añade la imagen si está seleccionada
                }

                await productoStore.updateProductoTemporal(producto);
            } else {
              const formData = new FormData();
              formData.append('usuario', usr);
                formData.append('nombre', nuevoNombre);
                formData.append('cantidad', producto.cantidad);
                formData.append('descripcion', producto.descripcion);
                formData.append('observacion', producto.observacion);
                formData.append('marca', producto.marca);
                formData.append('precio_compra', producto.precio_compra);
                formData.append('precio_venta', producto.precio_venta);
                formData.append('codigo_qr', producto.codigo_qr);

                if (producto.imagen) {
                  formData.append('imagen', producto.imagen); // Añade la imagen si está seleccionada
                }

                await productoStore.guardarProductoTemporal(producto);


            }
        });

        // Ejecutar todas las promesas en paralelo
        await Promise.all(promises);
  }

  // Limpiar el formulario o reiniciar valores después de agregarlo (opcional)
  reiniciarFormulario();
};


// Función para reiniciar el formulario después de agregar un producto
const reiniciarFormulario = () => {
  producto.value = {
    nombre: '',
    cantidad: '',
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

 { name: 'nombre', label: 'Nombre', field: 'nombre' },
  { name: 'cantidad', label: 'Cantidad', field: 'cantidad' },
  { name: 'descripcion', label: 'Descripción', field: 'descripcion' },
  { name: 'observacion', label: 'Observación', field: 'observacion' },
  { name: 'marca', label: 'Marca', field: 'marca' },
  { name: 'precio_compra', label: 'Precio Compra', field: 'precio_compra' },
  { name: 'precio_venta', label: 'Precio Venta', field: 'precio_venta' },
  { name: 'codigo_qr', label: 'Código QR', field: 'codigo_qr' }
 ]
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
