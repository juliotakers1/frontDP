<template>
  
  <router-view />
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
  setup () {
    return {
      drawer: ref(false)
    }
  },
  }
  </script>
  
  