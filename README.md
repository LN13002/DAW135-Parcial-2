# Parcial 2 - DAW 135

Aplicación web construida con React, TypeScript, Bulma CSS y Vite, que consume la API pública de Open Library para buscar y mostrar información de libros.

## Tecnologías principales

- **React**: librería para crear la interfaz de usuario.
- **TypeScript**: tipado estático para mayor seguridad y claridad del código.
- **Vite**: herramienta de compilación y desarrollo rápido.
- **Bulma CSS**: framework CSS ligero para diseño responsivo.
- **Open Library API**: fuente de datos para búsquedas y detalles de libros.

## Estructura del proyecto

- `src/`
  - `main.tsx`: punto de entrada de la aplicación.
  - `App.tsx`: componente principal que organiza la aplicación.
  - `index.css` / `App.css`: estilos globales y específicos.
  - `components/`: componentes reutilizables de UI.
    - `BookCard.tsx`: tarjeta de libro individual.
    - `BookGrid.tsx`: rejilla para mostrar los libros.
    - `ErrorMessage.tsx`: componente para mostrar errores.
    - `LoadingSpinner.tsx`: indicador de carga.
    - `Navbar.tsx`: barra de navegación principal.
    - `Pagination.tsx`: paginación de resultados.
    - `SearchBar.tsx`: barra de búsqueda de libros.
    - `Sidebar.tsx`: barra lateral con filtros o información adicional.
    - `StarRating.tsx`: calificación de libros con estrellas.
- `public/`: activos estáticos públicos.
- `package.json`: dependencias y scripts del proyecto.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: configuración de TypeScript.
- `vite.config.ts`: configuración de Vite.
- `eslint.config.js`: reglas de linting para el proyecto.

## Qué hace esta app

- Permite buscar libros usando la API de Open Library.
- Muestra resultados en tarjetas con información básica.
- Incluye paginación para navegar entre páginas de resultados.
- Maneja estados de carga y errores.

## Cómo ejecutar el proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir la URL que indica Vite en el navegador.

## Notas

- El diseño utiliza Bulma CSS para estilos rápidos y una experiencia responsiva.
- La aplicación está basada en datos de Open Library, por lo que la información mostrada depende de la respuesta de esa API.
