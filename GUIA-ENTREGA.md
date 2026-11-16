# Entrega de TecnoStock

## Video: guion de aproximadamente 1 minuto y 50 segundos

Graba la ventana del navegador con OBS o la herramienta de grabación de pantalla de tu equipo. Activa el micrófono y comprueba que el archivo final dure menos de dos minutos.

| Tiempo | Pantalla y explicación |
| --- | --- |
| 0:00–0:15 | Login: «Mi proyecto se llama TecnoStock. Es una página web de inventario y ventas de una tienda tecnológica, desarrollada con HTML y CSS, y JavaScript para las interacciones». Ingresa con el acceso de demostración. |
| 0:15–0:30 | Dashboard: «El panel muestra productos, unidades disponibles, ventas e ingresos. También presenta las últimas ventas y las alertas de stock bajo». |
| 0:30–0:45 | Productos: «El inventario muestra código, categoría, precio y existencias. Puedo buscar un producto por su nombre o código». Haz una búsqueda y bórrala. |
| 0:45–1:05 | Nuevo producto: registra TEC-006, Teclado inalámbrico, Periféricos, Bs 180, stock 10. «El formulario valida los campos y evita códigos duplicados». |
| 1:05–1:20 | Ventas: «Las ventas están relacionadas con los productos mediante un identificador y muestran cliente, cantidad y total». |
| 1:20–1:40 | Nueva venta: elige el teclado, cliente de ejemplo y cantidad 2. «El total se calcula automáticamente y no puedo vender más unidades que las disponibles». Guarda. |
| 1:40–1:50 | Vuelve a productos y muestra stock 8. «El diseño se adapta a móviles y los datos se guardan en el navegador. El código y su historial de ramas están en mi repositorio público de GitHub». Esta última afirmación debe usarse solo después de publicar el repositorio. |

Si TEC-006 ya existe, usa otro código. No muestres datos personales en la grabación.

## GitHub (pendiente de conexión)

El repositorio local ya contiene las ramas de desarrollo. No confundas un merge local con un Pull Request: este último debe crearse en GitHub.

Cuando GitHub esté conectado, crear un repositorio **público** llamado `tecnostock`, añadir su URL como remoto `origin` y subir las ramas. Crear un Pull Request de `feature/ventas` hacia `develop`, revisar los cambios y fusionarlo. Después integrar `develop` en `master` y actualizar las ramas remotas.

Si se hace manualmente, crear el repositorio vacío, sin README ni licencia, para evitar conflictos con este historial. Comandos iniciales (reemplazar TU_USUARIO):

```powershell
git remote add origin https://github.com/TU_USUARIO/tecnostock.git
git push -u origin master
git push -u origin develop
git push -u origin feature/interfaz
git push -u origin feature/ventas
```

En GitHub seleccionar base `develop` y compare `feature/ventas`. Título sugerido: «Incorporar ventas relacionadas, validaciones y almacenamiento local». Tras fusionar el PR, actualizar la copia local e integrar:

```powershell
git switch develop
git pull origin develop
git switch master
git merge develop
git push origin master
```

## Lista final

- ZIP con el código fuente.
- URL del repositorio público, con ramas e historial verificables.
- Al menos un Pull Request visible en GitHub.
- Video grabado de máximo dos minutos mostrando las seis páginas.

El video y el repositorio remoto no se crean con el servidor local. Deben verificarse antes de presentar.
