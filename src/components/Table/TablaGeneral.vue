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
        <q-tr :props="props"  >
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" >
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"

          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
          </q-td>
        </q-tr>

      </template>

    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Define las props recibidas
const props = defineProps({
  columnsProp: Array,
  rowsProp: Array,
  title: String
});

</script>
