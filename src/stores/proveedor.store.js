import { defineStore } from 'pinia'
import axios from 'axios'



export const useProveedoraStore = defineStore({
  id: 'proveedorStore',
  state: () => ({
    proveedores: [],
    proveedor: {
    proveedor: '',
    nombre_comercial: '',
    domicilio_fiscal: '',
    telefono: '',
    gerente_general: '',
    nit: '',
    email: '',
    telefono_gerente: '',
    },

  }),
  actions: {
    async obtenerProveedor() {
      try {
        const res = await axios.get('http://localhost:3000/proveedor/');
        this.proveedores = res.data.proveedores
        console.log(this.proveedores, 'store')
      } catch (error) {
        console.error('Error al cargar proveedor:', error);
        throw error;
      }
    },

    async guardarProveedor(proveedor) {
        try {
          const res = await axios.post('http://localhost:3000/proveedor/', proveedor);
        } catch (error) {
          console.error('Error al enviar la proveedor:', error);
          throw error;
        }
      },
      async updateProveedor(payload) {

        try {



          const res = await axios.put(`http://localhost:3000/proveedor/id/${payload.id}`, payload);

          return res.data; // Opcional: retornar la respuesta si necesitas manejarla en otro lugar
        } catch (error) {
          console.error('Error al actualizar el producto:', error);
          throw error;
        }
      },
      async deleteProveedor(id) {
        try {
          await axios.delete(`http://localhost:3000/proveedor/id/${id}`);
        } catch (error) {
          console.error('Error al borrar la proveedor:', error);
          throw new Error('No se pudo borrar la proveedor. Inténtalo de nuevo más tarde.');
        }
      },
  }
});
