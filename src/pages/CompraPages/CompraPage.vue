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


        <!-- Otros campos aquí -->
         <q-input
          class="col-md-6 col-sm-12 q-mb-md"
          type="text"
          outlined
          dense
          v-model="producto.cantidad"
          label="Cantidad *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese la Cantidad']"
        />
         <q-input
          class="col-md-6 col-sm-12 q-mb-md"
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
        <!-- <q-input
          class="col-md-4 col-sm-12 q-mb-md"
          outlined
          dense
          v-model="producto.imagen"
          label="Imagen *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese la Imagen']"
        /> -->
        <div class="col-md-4 col-sm-12 q-mb-md q-gutter-sm" >

          <input type="file" @change="handleFileChange" />
            <p></p>
            <img :src="producto.imagen" alt="" v-if="producto.imagen" width="100px" height="100px" >
        </div>

            <q-btn @click="agregarLista" color="blue-grey" label="Agregar"   />


       </div>



</div>
      </q-step>
      <q-step
        :name="3"
        title="Productos Cargados"
        icon="shop"
        v-if="listaProductos.length > 0"
      >
        <TablaGeneral :columns-prop="colProductos" :rows-prop="listaProductos" />
      </q-step>
      <q-step
        :name="4"
        title="Codigo QR"
        icon="qr_code"
      >
        This step won't show up because it is disabled.
      </q-step>



      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="validarYGuardarData" color="primary" :label="step === 4 ? 'Finalizar' : 'Continuar'"  :disable="factura.no_documento ===''"  />
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
import  TablaGeneral  from "src/components/Table/TablaGeneral.vue"
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
      imagen: null,
      codigo_qr: ''
    })
    const handleFileChange = (event) => {
  producto.value.imagen = event.target.files[0]; // Almacena el archivo seleccionado
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
//fn qr


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
      console.log('error al guardar factura')
    }

} else if (step.value === 2) {
    try {
          //TODO  PREGUNTAR CHINO si es para mas de 1 producto
        // Crear un array de promesas para todas las operaciones
        const promises = listaProductos.value.map(async (producto) => {
            // Verificar que producto es un objeto y tiene o no tiene la propiedad id según sea necesario
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
              const formData = new FormData();
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
                console.log('Creando nuevo producto');
                await productoStore.guardarProducto(producto);

                //TODO puede que funcione, despues de step 2, ya guardo los productos, pero segun yo lista de productos aun tiene los productos, entonces hacer un nuevo get y comparar con los de lista y obtener los ids
            }
        });

        // Ejecutar todas las promesas en paralelo
        await Promise.all(promises);
          console.log(listaProductos.value, 'listaProductos')
        // Incrementar el step después de completar todas las operaciones
        step.value++;
    } catch (error) {
        console.error('Error al procesar productos:', error);
        // Manejar el error apropiadamente
    }
}
else if (step.value === 3) {
  await productoStore.obtenerProducto()
  const productosCompletos = computed(() => {
  return listaProductos.value.map(producto => {
    const encontrado = productoStore.productos.find(p => p.nombre === producto.nombre);
    return encontrado ? { ...producto, id: encontrado.id } : producto;
  });
});
  console.log(productosCompletos.value, 'id')
  step.value++
}else if (step.value === 4) {
  //TODO guardar productos y factura en el nuevo

  step.value++
}

 }

 // lista productos
 const listaProductos = ref([]);

const agregarLista = () => {
  // Verificar si existe producto.nombre para determinar si es nuevo o existente
  if (producto.value.nombre) {
    // Producto existente: Copia profunda del producto para evitar mutaciones accidentales
    const nuevoProducto = {
      ...producto.value.nombre,
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
    listaProductos.value.push(nuevoProducto);
  } else {
    // Nuevo producto: Crear un objeto nuevoProducto
    const nuevoProducto = {
      nombre: nuevoNombre.value,
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
    listaProductos.value.push(nuevoProducto);
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
    imagen: '',
  };
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

  </style>
