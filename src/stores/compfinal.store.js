import { defineStore } from 'pinia'
import axios from 'axios'



export const usefacturaFinalStore = defineStore({
  id: 'facturaFinalStore',
  state: () => ({
    facturasFinales: [],
    facturaFinal: {
      id_factura: '',
      id_producto: '',
      precio_compra: '',
      precio_venta: '',
    },

  }),
  actions: {
    async obtenerFacturaFinal() {
      try {
        const res = await axios.get('http://localhost:3000/factura-compra/');
        this.facturasFinales = res.data.factura_compras
      } catch (error) {
        console.error('Error al cargar facturas:', error);
        throw error;
      }
    },
    async guardarFacturaFinal(factura) {
        try {
          const res = await axios.post('http://localhost:3000/factura-compra/', factura);
        } catch (error) {
          console.error('Error al enviar la factura final:', error);
          throw error;
        }
      },
      async deleteFacturaFinal(id) {
        try {
          // Espera a que se complete la eliminación en el backend
          await axios.delete(`http://localhost:3000/factura-compra/id/${id}`);

          // Actualiza el estado local del store eliminando la factura del arreglo facturasFinales
          this.facturasFinales = this.facturasFinales.filter(factura => factura.id !== id);

          console.log(`Factura con ID: ${id} eliminada correctamente`);
        } catch (error) {
          console.error('Error al borrar la factura:', error);
          throw new Error('No se pudo borrar la factura. Inténtalo de nuevo más tarde.');
        }
      }


  }
});
