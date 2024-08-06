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
        this.facturas = res.data
        console.log(this.facturas, 'facturas')
      } catch (error) {
        console.error('Error al cargar facturas:', error);
        throw error;
      }
    },
    async guardarFacturaFinal(factura) {
        try {
          const res = await axios.post('http://localhost:3000/factura-compra/', factura);
          console.log(factura, 'factura hecha')
        } catch (error) {
          console.error('Error al enviar la factura final:', error);
          throw error;
        }
      },

  }
});
