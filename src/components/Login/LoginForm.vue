<template>
    <div class="principal q-pa-md items-center justify-center" >
        <p class="text-weight-bold text-h3 text-center q-py-lg">Login</p>
      <q-form
        @submit="login"
        class="q-gutter-md"
      >
        <q-input
        class="q-py-md"
          outlined
          dense
          v-model="usuario.email"
          label="Usuario *"
          hint="Usuario"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese su Usuario']"
        />
  
        <q-input
        class="q-py-md"
         outlined
          dense
          type="password"
          v-model="usuario.pass"
          label="Contraseña *"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Ingrese su Contraseña',
            // val => val > 0 && val < 5 || 'Contraseña debe ser mayor a 6'
          ]"
        />
 
        <div class="row justify-end">
          <q-btn label="Ingresar" type="submit" color="primary"/>
          
        </div>
        <div>
          <router-link to="/recovery" style="text-decoration: none; color: black;">Has olvidado tu contraseña?</router-link>
        </div>
      </q-form>
  
    </div>
  </template>
  
  <script setup>
   import  { useAuthStore } from 'src/stores/auth.store'
   import { useQuasar } from 'quasar'
import { ref } from 'vue'
import {useRouter} from "vue-router";
const router = useRouter();
   const $q = useQuasar()
   const authStore = useAuthStore()
   const usuario = ref({
    email:'',
    pass:''
  })
    const login = async() => {
            try {
                await authStore.ingresoUsuario(usuario.value)
                await router.push('/home')
            } catch (error) {
              console.log(error, 'error')
                $q.notify({
                  type: 'negative',
                  message: `error al iniciar Sesión`
                })
                
            }
         
        }
 
  </script>
  <style scoped>
.principal {

    height: 400px; width: 400px;
}
@media screen and (max-width: 400px) {
    .principal {

height: 360px; width: 300px;
} 
}
</style>