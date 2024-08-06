import { defineStore } from 'pinia'
import axios from 'axios'



export const useFacturaStore = defineStore({
  id: 'facturaStore',
  state: () => ({
    facturas: [],
    facturasTemporales: [],
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
        const res = await axios.get('http://localhost:3000/factura/');
        this.facturas = res.data
        console.log(this.facturas, 'facturas')
      } catch (error) {
        console.error('Error al cargar facturas:', error);
        throw error;
      }
    },
    async obtenerFacturaTemporal(usuario) {
      try {
        const res = await axios.get('http://localhost:3000/facturaTemporal/', {
          params: { usuario } // Enviar el nombre del usuario como parámetro de consulta
        });
        this.facturasTemporales = res.data.facturasTemporales;
        console.log(this.facturasTemporales, 'facturasTemp');
      } catch (error) {
        console.error('Error al cargar facturas:', error);
        throw error;
      }
    },
    async guardarFactura(factura) {
        try {
          const res = await axios.post('http://localhost:3000/factura/', factura);
          console.log(factura, 'factura hecha')
        } catch (error) {
          console.error('Error al enviar la factura:', error);
          throw error;
        }
      },
      async guardarFacturaTemporal(factura) {
        try {
          const res = await axios.post('http://localhost:3000/facturaTemporal/', factura);
          console.log(factura, 'factura hecha')
        } catch (error) {
          console.error('Error al enviar la factura:', error);
          throw error;
        }
      },

  }
});
