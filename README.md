# INTA - Visualizador de Costos Agropecuarios

[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)  
[![React](https://img.shields.io/badge/built%20with-React-blue)](https://reactjs.org/)  
[![Tailwind](https://img.shields.io/badge/styled%20with-TailwindCSS-38bdf8)](https://tailwindcss.com/)

### Probá la app en Vercel haciendo click [acá](https://proyecto-inta.vercel.app/)

---

## 📋 Descripción

**INTA - Visualizador de Costos Agrícolas** es una aplicación web desarrollada para facilitar la **gestión y análisis económico** en contextos agropecuarios. Está dirigida a técnicos, productores y agentes del sector, y permite estimar costos operativos clave a través de tres módulos principales:

- 💊 **Sanidad vegetal (fitosanitarios)**
- 🌱 **Fertilización**
- 🚜 **Maquinaria**

Cada módulo permite comparar tratamientos, cargar insumos personalizados y visualizar los resultados de forma clara e interactiva.

Esta herramienta fue desarrollada como trabajo académico con foco en su aplicabilidad práctica en el ámbito productivo.

---

## 🧩 Funcionalidades principales

### 📍 Costo Sanitario
- Carga de productos fitosanitarios (nombre, tipo, precio, dosis, etc.)
- Comparación entre tratamientos (Plan A vs. Plan B)
- Cálculo por hectárea y tratamiento

### 📍 Fertilización
- Carga de fertilizantes con propiedades y precios
- Definición de diferentes planes de fertilización
- Cálculo de costos totales y por hectárea
- Gráficos comparativos dinámicos

### 📍 Maquinaria
- Carga de datos económicos de maquinaria (combustible, mantenimiento, etc.)
- Estimación de costos operativos por hectárea según el tipo de labor

### ✨ Extras
- Visualización gráfica de comparativas
- Exportación / impresión de resultados
- UI responsiva optimizada para dispositivos móviles y escritorio

---

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [React Router](https://reactrouter.com/)

---
## 👥 Autores
Este proyecto fue desarrollado por estudiantes de la Tecnicatura Universitaria en Desarrollo Web (Unco), en el marco de la materia Programación Web Avanzada.

Tomás Acuña

Facundo Garcia

Rodrigo Villablanca

Rocio Fernandez

Brisa Celayes

Florencia Russo

Araceli Mondaca

Alexis Cruz


Docente responsable: Agustin Chiarotto

## 🚀 Instalación y ejecución local

```bash
# Clonar el repositorio
git clone https://github.com/TomasAcua/proyectoINTA.git

# Instalar dependencias
npm install
```

Crear archivo `.env` en la raíz del proyecto y agregar los siguientes tokens:

```env
VITE_API_TOKEN_PRODUCTOS=
VITE_API_TOKEN_MAQUINARIA=
```

**Nota:** El archivo `.env` está en el `.gitignore` y no se sube al repositorio.

```bash
# Ejecutar en modo desarrollo
npm run dev
```