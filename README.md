# 🧪 Taller: Sistema de Diseño Atómico en Angular

## EduAlert: arquitectura del taller

La librería `@brejcha13320/design-system-bootstrap` contiene componentes standalone organizados rigurosamente bajo la metodología **Atomic Design**, y el proyecto de demostración los presenta en las rutas `/atoms`, `/molecules` y `/organisms`.

```
projects/design-system-bootstrap/src/lib/
├── core/
│   ├── interfaces/core.interface.ts     contratos de navegación e iconos
│   └── models/edu-alert.models.ts       contratos de dominio (Student, StudentAlert, FormFieldConfig, etc.)
├── presentation/
│   ├── atoms/
│   │   ├── icon/                        IconAtom: renderizado de iconos tipados
│   │   ├── risk-badge/                  RiskBadgeComponent: nivel de riesgo (bajo, medio, alto)
│   │   └── action-button/               ActionButtonComponent: botón reutilizable con variantes y estados
│   ├── molecules/
│   │   ├── nav-link/                    NavLinkMolecule: enlaces de navegación
│   │   ├── alert-card/                  AlertCardComponent: tarjeta de estudiante + riesgo + acción
│   │   └── student-form-field/          StudentFormFieldComponent: campo de formulario con validación requerida
│   └── organisms/
│       ├── navbar/                      NavbarOrganism: barra de navegación principal
│       └── alerts-dashboard/            AlertsDashboardComponent: listado y filtrado reactivo de alertas
└── public-api.ts                        superficie pública exportada de la librería
```

Todos los componentes (`RiskBadgeComponent`, `ActionButtonComponent`, `AlertCardComponent`, `StudentFormFieldComponent`, `AlertsDashboardComponent`, `IconAtom`, `NavLinkMolecule` y `NavbarOrganism`) son standalone, usan tipado estricto con TypeScript y se exportan desde la API pública de la librería.

---

## 📋 Requisitos Previos

Antes de iniciar, asegúrate de tener instaladas las siguientes herramientas:

- Node.js (v18+)
- npm
- Angular CLI
- Git

Puedes verificar Angular CLI en consola con: `ng version`

---

## ▶️ Iniciar el Proyecto en Modo Desarrollo

Sigue estos pasos para compilar y ejecutar el proyecto localmente:

### 1️⃣ Instalar dependencias

```bash
npm i
```

### 2️⃣ Compilar la librería de componentes

```bash
npm run build
```

O en modo observación contínua:

```bash
npm run build:dev
```

### 3️⃣ Iniciar el showcase

```bash
npm run start
```

O directamente: `ng serve`

### 4️⃣ Abrir en el navegador

Accede a: `http://localhost:4200/`

- `/atoms`: Ejemplos interactivos de `RiskBadgeComponent` y `ActionButtonComponent` (variantes `primary`, `secondary`, `danger`, `disabled`).
- `/molecules`: Ejemplos interactivos de `AlertCardComponent` y `StudentFormFieldComponent` (validación en tiempo real y mensaje de error).
- `/organisms`: Ejemplo interactivo de `AlertsDashboardComponent` (filtrado por riesgo y captura de eventos).

---

## 🧪 Pruebas Unitarias y Cobertura (Jest)

El proyecto utiliza Jest configurado para Angular con cobertura completa (100%).

### ▶️ Ejecutar pruebas unitarias

```bash
npm test -- --runInBand
```

### 🔁 Ejecutar pruebas en modo watch

```bash
npm run test:watch
```

### 📊 Generar reporte de cobertura

```bash
npm run test:coverage
```

---

## 📘 Documentación Técnica con Compodoc

Genera la documentación estática a partir de los comentarios JSDoc tipados:

```bash
npm run compodoc
```

Para verificar la cobertura de la documentación técnica:

```bash
npx compodoc -p tsconfig.doc.json --coverageTest
```

---

## 🏗️ Compilación de Producción y Desarrollo

Para compilar tanto la librería como la aplicación del showcase:

```bash
# 1. Compilar librería
npm run build

# 2. Compilar aplicación showcase
npx ng build Angular-Standalone-Template --configuration development
```

Los artefactos se generan en `dist/design-system-bootstrap` y `dist/showcase`.
