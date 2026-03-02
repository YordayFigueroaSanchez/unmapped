# Propuesta: Crear proyecto base Angular 17+

## Qué
Configurar un proyecto Angular 17+ con la estructura y dependencias necesarias para el juego Unmapped. Incluye setup de TypeScript, testing con Jest, y arquitectura standalone components.

## Por qué
- Proporciona la base para alojar componentes como `MazeEditorComponent`
- Sigue convenciones del proyecto: Signals, standalone, sin NgModules
- Permite development local con `ng serve` y builds optimizados

## Alcance
- Criar proyecto Angular CLI con configuración minimal
- Estructura de carpetas: `src/app/{maze-editor,game,services}`, `src/styles/`, `src/assets/`
- Dependencias: Angular 17+, TypeScript 5+, Jest (testing)
- Archivo principal: `app.component.ts` (standalone, vacío)
- `app-routing.ts` para routing básico
- Variables CSS globales en `styles/variables.css`

## Criterios de aceptación
- Proyecto compila sin errores (`ng build`)
- Servidor dev corre (`ng serve` → http://localhost:4200)
- Tests ejecutan (`npm test`)
- Estructura lista para agregar componentes

## Stack confirmado
- Framework: Angular 17+
- Lenguaje: TypeScript 5+
- Testing: Jest + Angular Testing Library
- Build: Angular CLI
- CSS: Sin frameworks de UI, variables custom
