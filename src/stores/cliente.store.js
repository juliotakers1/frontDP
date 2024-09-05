import { defineStore } from 'pinia'
import axios from 'axios'



export const useClienteStore = defineStore({
  id: 'clienteStore',
  state: () => ({
    clientes: [],
    cliente: {
    nombre: '',
    apellido: '',
    nit: '',
    direccion: '',
    telefono: '',
    email: '',
    },

  }),
  actions: {
    async obtenerCliente() {
      try {
        const res = await axios.get('http://localhost:3000/cliente/');
        this.clientes = res.data.clientes
        console.log(this.clientes, 'store')
      } catch (error) {
        console.error('Error al cargar cliente:', error);
        throw error;
      }
    },

    async guardarCliente(cliente) {
        try {
          const res = await axios.post('http://localhost:3000/cliente/', cliente);
        } catch (error) {
          console.error('Error al enviar la cliente:', error);
          throw error;
        }
      },
      async updateCliente(payload) {

        try {



          const res = await axios.put(`http://localhost:3000/cliente/id/${payload.id}`, payload);

          return res.data; // Opcional: retornar la respuesta si necesitas manejarla en otro lugar
        } catch (error) {
          console.error('Error al actualizar el cliente:', error);
          throw error;
        }
      },
      async deleteCliente(id) {
        try {
          await axios.delete(`http://localhost:3000/cliente/id/${id}`);
        } catch (error) {
          console.error('Error al borrar la cliente:', error);
          throw new Error('No se pudo borrar la cliente. Inténtalo de nuevo más tarde.');
        }
      },
  }
});
