import { defineStore } from 'pinia'
import axios from 'axios'



export const usefacturaDirectaStore = defineStore({
  id: 'facturaDirectaStore',
  state: () => ({
    facturasDirectas: [],
    facturaDirecta: {
      id_producto: '',
      precio_compra: '',
      precio_venta: '',
    },

  }),
  actions: {
    async obtenerFacturaDirecta() {
      try {
        const res = await axios.get('http://localhost:3000/factura-directa/');
        this.facturasDirectas = res.data.factura_directa
      } catch (error) {
        console.error('Error al cargar facturas:', error);
        throw error;
      }
    },
    async guardarFacturaDirecta(factura) {
        try {
          const res = await axios.post('http://localhost:3000/factura-directa/', factura);
          console.log('guardado con exito', factura)
        } catch (error) {
          console.error('Error al enviar la factura final:', error);
          throw error;
        }
      },

  }
});
