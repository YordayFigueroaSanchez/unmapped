# Diseño: `GameComponent`

## Resumen
Componente standalone que ofrece la experiencia de juego:
- Recibe un `MazeMap` (o carga uno vía `MapRepositoryService`).
- Renderiza el tablero y la posición del jugador usando Canvas.
- Detecta muros y revela celdas a medida que el jugador se mueve.
- Controla lógica de movimiento, colisiones y condición de victoria.

## API propuesta
- Inputs:
  - `@Input() map: MazeMap | null` (opcional, se puede inyectar/obtener)
  - `@Input() speed?: number` (ms por paso, default 200)
- Outputs:
  - `@Output() finished = new EventEmitter<void>()`
  - `@Output() positionChange = new EventEmitter<{x:number,y:number}>()`

## Estado interno
- `position: {x:number,y:number}` señal del jugador.
- `seen: boolean[][]` matriz de celdas descubiertas.
- `path: {x:number,y:number}[]` historial de pasos (para animaciones).

## Render y eventos
- Canvas 400x400px (ajustable) para tablero.
- Sección HTML para mostrar estadísticas (pasos, tiempo).
- Listeners de teclado: flechas/WASD y gestos táctiles.

## Integración
- `MapRepositoryService.load(id)` retorna `MazeMap`.
- El componente no debe manejar la persistencia; solo consumo.

## Archivos a crear/modificar
- `src/app/game/game.component.ts` (nuevo)
- `src/app/game/game.component.html` (nuevo)
- `src/app/game/game.component.css` (nuevo)
- Tests: `game.component.spec.ts` (nuevo)
- Posible utilidad: `src/app/game/game-utils.ts` (lógica separada)

## Pruebas sugeridas
1. Movimiento dentro de límites y rechazo de muros.
2. `finished` emitido cuando se alcanza la meta.
3. Cargar mapa mediante servicio.
4. Snapshot de `seen` tras varios pasos.

## Notas
- Mantener la lógica en un servicio o clase para facilitar tests.
- Evitar dependencias directas a DOM en la clase (usar `ElementRef` sólo en
  métodos de render).
