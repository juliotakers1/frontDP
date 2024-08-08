import { defineStore } from 'pinia';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de importar así

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
          const decodedToken = jwtDecode(token);

          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            this.token = token;
            this.user = decodedToken.data; // Asegúrate de que `data` sea el campo correcto
            this.isAuthenticated = true;
          } else {
            this.logoutUser();
          }
        } else {
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
