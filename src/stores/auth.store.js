import { defineStore } from 'pinia'
import axios from 'axios'



export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null
  }),
  actions: {
    async ingresoUsuario(credentials) {
      try {
        const res = await axios.post('http://localhost:3000/login/', credentials);
        const { token, usuarioDB } = res.data;
        this.token = token;
        this.user = usuarioDB;
        this.isAuthenticated = true;
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    },
    async loadUserFromLocalStorage() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verificar si el token es válido
          const isTokenValid = token;
          if (isTokenValid) {
            // El token es válido, mantener la sesión activa
            this.token = token;
            this.isAuthenticated = true;
          } else {
            // El token ha expirado, cerrar sesión
            this.logoutUser();
          }
        } else {
          // No hay token en el almacenamiento local, cerrar sesión
          this.logoutUser();
        }
      } catch (error) {
        console.error('Error loading user from local storage:', error);
        throw error;
      }
    },
    
    
    logoutUser() {
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});
