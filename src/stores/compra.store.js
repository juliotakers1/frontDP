import { defineStore } from 'pinia'
import axios from 'axios'



export const useCompraStore = defineStore({
  id: 'compraStore',
  state: () => ({

    producto: {
        nombre: '',
        cantidad: '',
        descripcion: '',
        observacion: '',
        marca: '',
        precio_compra: '',
        precio_venta: '',
        imagen: '',
        codigo_qr: ''
    },
    productos: []

  }),
  actions: {
    async obtenerProducto() {
      try {
        const res = await axios.get('http://localhost:3000/producto/');
        this.productos = res.data.productos
        console.log(this.productos, 'productos')
      } catch (error) {
        console.error('Error al cargar facturas:', error);
        throw error;
      }
    },
    async guardarProducto(payload) {
        try {
          const res = await axios.post('http://localhost:3000/producto/', payload);
          console.log(payload, 'producto hecha')
        } catch (error) {
          console.error('Error al enviar la producto:', error);
          throw error;
        }
      },
      async updateProducto(payload) {
        try {
          const res = await axios.put(`http://localhost:3000/producto/id/${payload.id}`, payload);
          console.log('Producto actualizado:', res.data);
          return res.data; // Opcional: retornar la respuesta si necesitas manejarla en otro lugar
        } catch (error) {
          console.error('Error al actualizar el producto:', error);
          throw error;
        }
      },


      async buscarProductoPorNombre(nombre) {
        try {
          const response = await axios.get(`http://localhost:3000/producto?nombre=${nombre}`);

            this.productos = response.data;
            console.log(this.productos, 'producs');

        } catch (error) {
          console.error('Error al buscar productos:', error);
          this.productos = [];
        }
      },

      async buscarProductoPorQR(barra) {
        try {
          const response = await axios.get(`http://localhost:3000/producto?codigo_qr=${barra}`);
          if (response.data) {
            this.productos = response.data;
            console.log(this.productos, 'producs');
          } else {
            this.productos = [];
          }
        } catch (error) {
          console.error('Error al buscar productos:', error);
          this.productos = [];
        }
      },

  }
});
