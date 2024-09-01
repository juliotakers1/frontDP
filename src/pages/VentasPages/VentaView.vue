<template>
  <div class="">
    <h2>Ventas</h2>
    <div class="q-pa-md row items-start q-gutter-md" >
      <div class="col-8 row" >
        <q-card class="my-card col-md-2 col-sm-4 bg-teal-3" v-for="item in productoStore.productos" :key="item.id"  @click="agregarLista(item)">
          <img :src="item.imagen" class="img-card ">
          <q-card-section>
            <q-input v-model="item.nombre" label=" Nombre" dense readonly  />
            <q-input v-model="item.precio_venta" label=" Precio" stack-label dense readonly />
            <q-input v-model="item.cantidad" label=" Cantidad Disponible" stack-label dense readonly />
          </q-card-section>
          <q-card-section>

          </q-card-section>
        </q-card>
      </div>
      <div>
        <div v-if="listadeProductos.length > 0" class="col-4">
          <q-card class="my-card" v-for="prd in listadeProductos" :key="prd.id"   >

            <q-card-section>
             <h1>{{prd.nombre}}</h1>
            </q-card-section>
            <q-card-section>
            <p>{{prd.nombre}}</p>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
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
const agregarLista = async(item) => {
    if (item.nombre) {

            const nuevoProducto = {
              nombre: item.nombre,
            cantidad: item.cantidad,
            descripcion: item.descripcion,
            observacion: item.observacion,
            marca: item.marca,
            precio_compra: item.precio_compra,
            precio_venta: item.precio_venta,
            imagen: item.imagen,
            codigo_qr: item.codigo_qr,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };

        listadeProductos.value.push(nuevoProducto);

    }
    console.log(listadeProductos.value, 'aqui')
};
onMounted(async() => {
  await productoStore.obtenerProducto()
})
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
