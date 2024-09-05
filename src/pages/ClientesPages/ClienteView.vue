<template>
  <div class="container">
    <TableCliente :columns-prop="colClientes" :rows-prop="clienteStore.clientes" :title="'Clientes'"  />
  </div>
</template>

<script setup>

import { useClienteStore } from 'src/stores/cliente.store';
import { onMounted } from 'vue';
import TableCliente from 'src/components/Table/TableCliente.vue';
const clienteStore = useClienteStore()
const colClientes = [
  { name: 'id', label: 'Codigo', field: 'id' },
 { name: 'nombre', label: 'Nombre', field: 'nombre' },
  { name: 'apellido', label: 'Apellido', field: 'apellido' },
  { name: 'telefono', label: 'Telefono', field: 'telefono' },
  { name: 'nit', label: 'NIT', field: 'nit' },
  { name: 'direccion', label: 'Direccion', field: 'direccion' },
  { name: 'email', label: 'Correo', field: 'email' },

 ]

onMounted(async() => {
  await clienteStore.obtenerCliente()
});
</script>
