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
    productos: [],
    productosTemporales: []

  }),
  actions: {
    async obtenerProducto() {
      try {
        const res = await axios.get('http://localhost:3000/producto/');
        this.productos = res.data.productos
      } catch (error) {
        console.error('Error al cargar facturas:', error);
        throw error;
      }
    },
    async obtenerProductoTemporales(usuario) {
      try {
        // Enviar el nombre del usuario como parámetro de consulta
        const res = await axios.get('http://localhost:3000/productoTemporal/', {
          params: { usuario }
        });
        this.productosTemporales = res.data.productosTemporales;
        console.log('productosTemporales:', this.productosTemporales);
      } catch (error) {
        console.error('Error al cargar productos temporales:', error);
        throw error;
      }
    },
    async guardarProducto(payload) {
        try {
          console.log(payload, 'payload')
          const formData = new FormData();
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            formData.append(key, payload[key]);
          }
        }
        console.log(formData,'formData')
          const res = await axios.post('http://localhost:3000/producto/', formData);
          console.log(formData, 'producto redi')
        } catch (error) {
          console.error('Error al enviar la producto:', error);
          throw error;
        }
      },
      async guardarProductoTemporal(payload) {
        try {
          console.log(payload, 'payload')
          const formData = new FormData();
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            formData.append(key, payload[key]);
          }
        }
        console.log(formData,'formData')
          const res = await axios.post('http://localhost:3000/productoTemporal/', formData);
          console.log(formData, 'producto redi')
        } catch (error) {
          console.error('Error al enviar la producto:', error);
          throw error;
        }
      },
      async updateProducto(payload) {

        try {
          const formData = new FormData();
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            formData.append(key, payload[key]);
          }
        }

          const res = await axios.put(`http://localhost:3000/producto/id/${payload.id}`, formData);

          return res.data; // Opcional: retornar la respuesta si necesitas manejarla en otro lugar
        } catch (error) {
          console.error('Error al actualizar el producto:', error);
          throw error;
        }
      },
      async updateProductoTemporal(payload) {

        try {
          const formData = new FormData();
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            formData.append(key, payload[key]);
          }
        }

          const res = await axios.put(`http://localhost:3000/productoTemporal/id/${payload.id}`, formData);

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
