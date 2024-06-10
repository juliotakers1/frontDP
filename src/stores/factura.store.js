import { defineStore } from 'pinia'
import axios from 'axios'



export const useFacturaStore = defineStore({
  id: 'facturaStore',
  state: () => ({
    facturas: [],
    factura: {
    no_documento: '',
    tipo_documento: '',
    fecha_emision: '',
    fecha_pago: '',
    razon_social_proveedor: '',
    gastos_transporte: '',
    telefono_vendedor: '',
    nombre_vendedor: '',
    tipo_pago: '',
    tipo_factura: '',
    },
    
  }),
  actions: {
    async obtenerFactura() {
      try {
        const res = await axios.get('http://localhost:3000/compra/');
        this.facturas = res.data
        console.log(this.facturas, 'facturas')
      } catch (error) {
        console.error('Error al cargar facturas:', error);
        throw error;
      }
    },
    async guardarFactura(factura) {
        try {
          const res = await axios.post('http://localhost:3000/factura/', factura);
          console.log(factura, 'compra hecha')
        } catch (error) {
          console.error('Error al enviar la factura:', error);
          throw error;
        }
      },
    
  }
});
