<template>
  <div class="principal q-pa-md items-center justify-center" >
        <p class="text-weight-bold text-h5 text-center q-py-lg">Recuperar</p>
      <q-form
        
        class="q-gutter-md"
      >
        <q-input
        class="q-py-md"
          outlined
          dense
          v-model="usuario.email"
          label="Correo *"
          
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese su Correo']"
        />
  
       
 
        <div class=" text-center vertical-bottom">
          <q-btn label="Recuperar" type="submit" color="primary"/>
          
        </div>
      </q-form>
  
    </div>
</template>

<script setup>
import { ref } from "vue";

const usuario = ref({
    email:''
  })
</script>
