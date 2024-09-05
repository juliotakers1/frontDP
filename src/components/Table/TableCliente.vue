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
          <q-th auto-width>Borrar</q-th>
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
              @click="viewCliente(props.row)"
            />
          </q-td>
          <q-td auto-width>
            <q-btn
              round
              color="warning"
              icon="edit"
              size="sm"
              @click="editCliente(props.row)"
            />
          </q-td>
          <q-td auto-width>
            <q-btn
              round
              color="negative"
              icon="delete"
              size="sm"
              @click="deleteCliente(props.row)"
            />
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <q-dialog v-model="viewprompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Detalles del Producto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="Nombre"
            v-model="selectedCliente.nombre"
            readonly
          />
          <q-input
            dense
            label="Apellido"
            v-model="selectedCliente.apellido"
            readonly
          />
          <q-input
            dense
            label="NIT"
            v-model="selectedCliente.nit"
            readonly
          />
          <q-input
            dense
            label="Dirección"
            v-model="selectedCliente.direccion"
            readonly
          />
          <q-input
            dense
            label="Teléfono"
            v-model="selectedCliente.telefono"
            readonly
          />
          <q-input
            dense
            label="Email"
            v-model="selectedCliente.email"
            readonly
          />
        </q-card-section>



        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cerrar" color="primary" @click="viewprompt = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editprompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Detalles del Producto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="Nombre"
            v-model="selectedCliente.nombre"
          />
          <q-input
            dense
            label="Apellido"
            v-model="selectedCliente.apellido"
          />
          <q-input
            dense
            label="NIT"
            v-model="selectedCliente.nit"
          />
          <q-input
            dense
            label="Dirección"
            v-model="selectedCliente.direccion"
          />
          <q-input
            dense
            label="Teléfono"
            v-model="selectedCliente.telefono"
          />
          <q-input
            dense
            label="Email"
            v-model="selectedCliente.email"
          />
        </q-card-section>



        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Guardar" color="primary" @click="editprompt = false, actualizarInformacion()" />
          <q-btn flat label="Cerrar" color="primary" @click="editprompt = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteprompt" persistent>
      <q-card style="min-width: 350px">


        <q-card-section class="q-pt-md">
          <p>Seguro que desea eliminarlo?</p>

        </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Si" color="primary" @click="deleteprompt = false, borrarInformacion()" />
          <q-btn flat label="Cerrar" color="primary" @click="deleteprompt = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useProveedoraStore } from 'src/stores/proveedor.store';
import { useClienteStore } from 'src/stores/cliente.store';
const clienteStore = useClienteStore()
const props = defineProps({
  columnsProp: Array,
  rowsProp: Array,
  title: String
});
const viewprompt = ref(false)
const editprompt = ref(false)
const deleteprompt = ref(false)
const selectedCliente = ref()
const viewCliente = (cliente) => {
  selectedCliente.value = cliente;
  viewprompt.value = true;
  console.log(selectedCliente.value)
};
const editCliente = (cliente) => {
  selectedCliente.value = cliente;
  editprompt.value = true;
  console.log(selectedCliente.value)
};
const deleteCliente = (cliente) => {
  selectedCliente.value = cliente;
  deleteprompt.value = true;
  console.log(selectedCliente.value)

};
const  actualizarInformacion = async() => {
            //TODO preguntar chino si actualiza en la bd o actualiza en la tabla
            try {


                await clienteStore.updateCliente(selectedCliente.value);
            } catch (error) {
              console.log(error)
            }

            }
            const  borrarInformacion = async() => {
            //TODO preguntar chino si actualiza en la bd o actualiza en la tabla
            try {


                await clienteStore.deleteCliente(selectedCliente.value.id);
            } catch (error) {
              console.log(error)
            }finally {
              window.location.reload()
            }

            }
</script>
