# TecnoStock

Proyecto académico de inventario y ventas de una tienda tecnológica. Seis páginas construidas con HTML semántico, CSS adaptable y JavaScript sin dependencias.

## Ejecutar

Con Node.js instalado, ejecutar `node server.js` y abrir http://localhost:8080. Detener con Ctrl+C.

Acceso demostrativo: `admin@tecnostock.com` / `Demo1234`. No usar datos personales: no existe servidor de autenticación. Los registros se guardan en localStorage del navegador y la sesión en sessionStorage. El acceso es una simulación académica, no seguridad de producción.

## Páginas

- index.html: login.
- dashboard.html: indicadores y ventas recientes.
- productos.html: inventario con búsqueda.
- producto-nuevo.html: registro de productos.
- ventas.html: historial relacionado con productos por ID.
- venta-nueva.html: registro de ventas y descuento de stock.

Los montos están expresados en bolivianos (Bs). Los datos iniciales son ficticios. Para reiniciar la demostración, borrar los datos del sitio desde el navegador.
