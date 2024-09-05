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
              @click="viewProveedor(props.row)"
            />
          </q-td>
          <q-td auto-width>
            <q-btn
              round
              color="warning"
              icon="edit"
              size="sm"
              @click="editProveedor(props.row)"
            />
          </q-td>
          <q-td auto-width>
            <q-btn
              round
              color="negative"
              icon="delete"
              size="sm"
              @click="deleteProveedor(props.row)"
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
            label="Proveedor"
            v-model="selectedProveedor.proveedor"
            readonly
          />
          <q-input
            dense
            label="Nombre Comercial"
            v-model="selectedProveedor.nombre_comercial"
            readonly
          />
          <q-input
            dense
            label="Domicilio Fiscal"
            v-model="selectedProveedor.domicilio_fiscal"
            readonly
          />
          <q-input
            dense
            label="Teléfono"
            v-model="selectedProveedor.telefono"
            readonly
          />
          <q-input
            dense
            label="Gerente General"
            v-model="selectedProveedor.gerente_general"
            readonly
          />
          <q-input
            dense
            label="NIT"
            v-model="selectedProveedor.nit"
            readonly
          />
          <q-input
            dense
            label="Email"
            v-model="selectedProveedor.email"
            readonly
          />
          <q-input
            dense
            label="Teléfono del Gerente"
            v-model="selectedProveedor.telefono_gerente"
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
            label="Proveedor"
            v-model="selectedProveedor.proveedor"

          />
          <q-input
            dense
            label="Nombre Comercial"
            v-model="selectedProveedor.nombre_comercial"

          />
          <q-input
            dense
            label="Domicilio Fiscal"
            v-model="selectedProveedor.domicilio_fiscal"

          />
          <q-input
            dense
            label="Teléfono"
            v-model="selectedProveedor.telefono"

          />
          <q-input
            dense
            label="Gerente General"
            v-model="selectedProveedor.gerente_general"

          />
          <q-input
            dense
            label="NIT"
            v-model="selectedProveedor.nit"

          />
          <q-input
            dense
            label="Email"
            v-model="selectedProveedor.email"

          />
          <q-input
            dense
            label="Teléfono del Gerente"
            v-model="selectedProveedor.telefono_gerente"

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
const proveedorStore = useProveedoraStore()
const props = defineProps({
  columnsProp: Array,
  rowsProp: Array,
  title: String
});
const viewprompt = ref(false)
const editprompt = ref(false)
const deleteprompt = ref(false)
const selectedProveedor = ref()
const viewProveedor = (proveedor) => {
  selectedProveedor.value = proveedor;
  viewprompt.value = true;
  console.log(selectedProveedor.value)
};
const editProveedor = (proveedor) => {
  selectedProveedor.value = proveedor;
  editprompt.value = true;
  console.log(selectedProveedor.value)
};
const deleteProveedor = (proveedor) => {
  selectedProveedor.value = proveedor;
  deleteprompt.value = true;
  console.log(selectedProveedor.value)

};
const  actualizarInformacion = async() => {
            //TODO preguntar chino si actualiza en la bd o actualiza en la tabla
            try {


                await proveedorStore.updateProveedor(selectedProveedor.value);
            } catch (error) {
              console.log(error)
            }

            }
            const  borrarInformacion = async() => {
            //TODO preguntar chino si actualiza en la bd o actualiza en la tabla
            try {


                await proveedorStore.deleteProveedor(selectedProveedor.value.id);
            } catch (error) {
              console.log(error)
            }finally {
              window.location.reload()
            }

            }
</script>
