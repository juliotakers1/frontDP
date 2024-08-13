<template>



  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff"   class="shadow-2 rounded-borders">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Administracion</q-toolbar-title>
          <q-btn color="warning" label="Salir" no-caps @click="cerrarSesion"  />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
      <q-scroll-area style="height: calc(100% - 150px); border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple :active="link === 'inicio'" @click="link = 'inicio'" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              <router-link to="/home" style="text-decoration: none; color: black;">Inicio</router-link>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :active="link === 'compras'" @click="link = 'compras'" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="storefront" />
            </q-item-section>

            <q-item-section>
              <router-link to="/compras" style="text-decoration: none; color: black;">Compras</router-link>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :active="link === 'compras-directas'" @click="link = 'compras-directas'" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="storefront" />
            </q-item-section>

            <q-item-section>
              <router-link to="/compras-directas" style="text-decoration: none; color: black;">Compras Directas</router-link>
            </q-item-section>
          </q-item>

          <q-item  clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="sell" />
            </q-item-section>

            <q-item-section>
              Ventas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>
              Drafts
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import  { useAuthStore } from 'src/stores/auth.store'
import { useQuasar } from 'quasar'
import {useRouter} from "vue-router";

const link = ref('Inicio')
const drawer = ref(false)
const authStore = useAuthStore()
const $q = useQuasar()

const router = useRouter();
const cerrarSesion = async() => {

  try {
    await authStore.logoutUser()
    router.push('/')
  } catch (error) {
    $q.notify({
                  type: 'negative',
                  message: `error al iniciar Sesión`
                })
  }
}
</script>
<style >
.my-menu-link {
  color: white;
  background: #F2C037;
}
</style>
