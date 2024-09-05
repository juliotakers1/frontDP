<template>
  <div class="container">
    <TableProveedores :columns-prop="colProveedores" :rows-prop="proveedorStore.proveedores" :title="'Proveedores'"  />
  </div>
</template>

<script setup>
import { useProveedoraStore } from 'src/stores/proveedor.store';
import { onMounted } from 'vue';
import TableProveedores from 'src/components/Table/TableProveedores.vue';
const proveedorStore = useProveedoraStore()
const colProveedores = [
  { name: 'id', label: 'Codigo', field: 'id' },
 { name: 'proveedor', label: 'Proveedor', field: 'proveedor' },
  { name: 'nombre_comercial', label: 'Nombre', field: 'nombre_comercial' },
  { name: 'telefono', label: 'Telefono', field: 'telefono' },
  { name: 'domicilio_fiscal', label: 'Direccion', field: 'domicilio_fiscal' },
  { name: 'email', label: 'Correo', field: 'email' },
  // { name: 'telefono_vendedor', label: 'Telefono vendedor', field: 'telefono_vendedor' },
  // { name: 'razon_social_proveedor', label: 'Razon social', field: 'razon_social_proveedor' },
  // { name: 'tipo_pago', label: 'Tipo pago', field: 'tipo_pago' },
  // { name: 'tipo_factura', label: 'Tipo factura', field: 'tipo_factura' }
 ]

onMounted(async() => {
  await proveedorStore.obtenerProveedor()
});
</script>
