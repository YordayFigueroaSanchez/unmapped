# Diseño: `MazeEditorComponent`

## Resumen
Standalone Angular component que renderiza un grid interactivo (Canvas preferido para >50x50). Mantiene estado local del `MazeMap` y expone `mapChange` cuando cambia.

## Archivos a crear/modificar
- `src/app/maze-editor/maze-editor.component.ts` (nuevo)
- `src/app/maze-editor/maze-editor.component.html` (nuevo)
- `src/app/maze-editor/maze-editor.component.css` (nuevo)
- `src/app/services/map-repository.service.ts` (modificar para integrar persistencia si falta)
- Tests: `maze-editor.component.spec.ts`

## API propuesta
- Inputs: `@Input() map: MazeMap | null`
- Outputs: `@Output() mapChange = new EventEmitter<MazeMap>()`
- Public methods: `export(): MazeMap`, `import(map: MazeMap)`

## Modelo de datos
- `size`: dimensión del laberinto cuadrado (NxN). **Default: 8**
- `cells`: matriz de NxNx; `0` = vacío, `1` = muro
- `start` y `goal`: coordenadas de entrada y meta
- Ejemplo:
```json
{
  "size": 8,
  "cells": [[0,1,...],[...],...],
  "start": {"x":0,"y":0},
  "goal": {"x":7,"y":7}
}
```

## Render y eventos
- Usar Canvas para render y eventos pointer (pointerdown/pointermove/pointerup)
- Historico simple para undo: stack de snapshots (cap 30)
- Representación interna: `cells: number[][]` y `start`, `goal`

## Integración con Signals
- Exponer `Signal<MazeMap>` o convertir `@Input` a Signal local si el proyecto lo usa

## Pruebas
- Unit tests: toggling walls, set start/goal, export/import
- E2E minimal: abrir componente y crear un mapa

