# MazeEditorComponent

Editor interactivo para diseñar y editar laberintos en la aplicación Unmapped.

## Uso

### Importar el componente

```typescript
import { MazeEditorComponent } from './maze-editor/maze-editor.component';

@Component({
  selector: 'app-root',
  imports: [MazeEditorComponent],
  template: '<app-maze-editor (mapChange)="onMapChange($event)"></app-maze-editor>'
})
export class AppComponent {
  onMapChange(map: MazeMap) {
    console.log('Map updated:', map);
  }
}
```

## API

### Inputs

- `@Input() map: MazeMap | null` — Mapa inicial (opcional). Si no se proporciona, se usa un default 8x8.

### Outputs

- `@Output() mapChange: EventEmitter<MazeMap>` — Emitido cuando el usuario modifica el mapa.

### Métodos Públicos

- `export(): MazeMap` — Retorna una copia del mapa actual.
- `import(mapData: MazeMap): void` — Carga un mapa validado en el editor.
- `newMap(size: number): void` — Crea un nuevo mapa vacío con tamaño específico.
- `undo(): void` — Deshace la última acción (si hay historial).
- `redo(): void` — Rehace la última acción deshecha.
- `downloadMap(): void` — Descarga el mapa como JSON.

## Modelo de Datos

```typescript
interface MazeMap {
  size: number;           // Dimensión cuadrada (NxN, default 8)
  cells: number[][];      // Matriz: 0=vacío, 1=muro
  start: { x: number; y: number };  // Posición de entrada
  goal: { x: number; y: number };   // Posición de meta
}
```

## Features

- ✅ Grid interactivo con Canvas
- ✅ Click para alternar muros (0 ↔ 1)
- ✅ Arrastrar para dibujar múltiples muros
- ✅ Definir entrada (start) y meta (goal)
- ✅ Historial Undo/Redo (stack de 30 snapshots)
- ✅ Crear nuevos mapas (5x5 a 50x50)
- ✅ Descargar JSON
- ✅ Validación de mapas al importar

## Restricciones

- Los laberintos **siempre son cuadrados** (NxN).
- Tamaño mínimo: 1x1. Tamaño máximo: 50x50.
- Las coordenadas de start y goal no se validan (pueden sobreponerse).

## Estilos CSS

Usa variables CSS globales definidas en `src/styles/variables.css`:

```css
--color-bg-dark
--color-text-primary
--color-accent
--cell-size
--empty-color
--wall-color
```

## Testing

### Tests Unitarios

```bash
npm test -- maze-editor.component
npm test -- map-repository.service
```

### Test Específicos

- Creación de componente
- Default 8x8
- Toggle de muros
- Set start/goal
- Export/Import
- Undo/Redo
- MapChange emitter

## Mejoras Futuras

- [ ] Touch events para mobile
- [ ] Herramienta de relleno (flood fill)
- [ ] Vista previa en tiempo real
- [ ] Validación de solvibilidad
- [ ] Importar desde archivo JSON
- [ ] Historial persistente en localStorage

## Integración con MapRepositoryService

El componente emite cambios via `mapChange`. Usa `MapRepositoryService` para persistencia:

```typescript
constructor(private repo: MapRepositoryService) {}

onMapChange(map: MazeMap) {
  this.repo.saveMap(map);
}
```
