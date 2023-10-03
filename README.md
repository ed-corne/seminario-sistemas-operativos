# 💻Administración y planificación de procesos en sistemas operativos.

**✅En este proyecto se simulan distintos tipos de administracion y planificación de procesos relacionados con los sistemas operativos. Para el desarrollo de este proyecto se uso el lenguage de JavaScript haciendo uso de la tecnologia de ⚛️ React + Vite.**

## 🍃 Procesamiento por lotes
Procesamiento por lotes (Batch Processing): Este es un enfoque en el que los programas se agrupan en lotes y se ejecutan en secuencia sin interacción en tiempo real con el usuario. Es común en sistemas informáticos antiguos y se utiliza para procesar grandes cantidades de datos de manera eficiente, donde se carga un lote de trabajos, se ejecutan en orden y luego se carga otro lote.

[Implementacion de procesamiento por lotes](./src/batches1/)

## 🌿Multiprogramación
Multiprogramación (Multiprogramming): La multiprogramación es una técnica que permite que múltiples programas se ejecuten en una computadora al mismo tiempo. El sistema operativo asigna tiempo de CPU a cada programa de manera intercalada para lograr una apariencia de ejecución simultánea, lo que mejora la utilización de los recursos de la computadora.

[Implementacion de multiprogramación](./src/multiprogramming/)

## Estructura del Proyecto

- `src/`: Contiene los archivos fuente del proyecto.
  - `components/`: Componentes de React utilizados en la interfaz de usuario.
  - `batches1/`: Dentro de esta carpeta se encuentran todos los archivos para la parte del simulador de lotes.
  - `multiprogramming/`: Dentro de esta carpeta se encuentran todos los archivos para la parte del simulador de multiprogramación.
  - `pages/`: Contiene las paginas de la aplicación.
  - `styles/`: Contiene los estilos de los componentes.
  - `index.css`: Estilos globales de la aplicación.
  - `main.js`: Punto de entrada para el archivo de configuración de Vite y la implementacion de React router.
- `public/`: Contiene archivos estáticos accesibles públicamente.
- `package.json`: Archivo de configuración de dependencias y scripts.

## Instalación

1. Clona este repositorio a tu máquina local utilizando el siguiente comando:

   ```bash
   git clone https://github.com/ed-corne/SimuladorProcesamientoLotes.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd vite-project
   ```

3. Instala las dependencias utilizando npm o yarn:

   ```bash
   npm install
   # o
   yarn install
   ```

4. Inicia el servidor de desarrollo con el siguiente comando:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

---
Desarrollado por Edwin Cornejo. 👨🏻‍💻💚

