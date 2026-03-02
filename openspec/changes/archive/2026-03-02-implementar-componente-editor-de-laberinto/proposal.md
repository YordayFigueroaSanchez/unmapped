# Propuesta: Implementar `MazeEditorComponent`

## Qué
Implementar el componente Angular `MazeEditorComponent` que permite diseñar y editar laberintos dentro de la aplicación principal. El componente debe exponer un API para cargar/guardar mapas y emitir eventos cuando el mapa cambie.

## Por qué
- Integra el editor con la aplicación (desde el MVP web hacia la app Angular).
- Permite a diseñadores crear mapas dentro de la misma app, persistirlos y usarlos en el juego.

## Alcance
- Componente Angular standalone `MazeEditorComponent` con Inputs/Outputs:
  - `@Input() map: MazeMap | null`
  - `@Output() mapChange = new EventEmitter<MazeMap>()`
  - Métodos públicos: `export()`, `import(json)`
- UI mínima para pintar muros, definir inicio/meta y exportar/importar JSON
- Integración con `MapRepositoryService` para persistencia local
- **Restricción**: Los laberintos son siempre cuadrados (NxN)
- **Default**: 8x8 celdas

## Criterios de aceptación
- `MazeEditorComponent` compila en Angular CLI
- Permite crear y editar muros, start y goal
- Emitir `mapChange` cuando el usuario modifique el mapa
- Guardar/recuperar mapas desde `MapRepositoryService`

## Riesgos
- Cambios en la estructura de `MazeMap` requieren migración (marcar como [BREAKING])
- Canvas vs DOM: elegir Canvas si rendimiento lo exige
