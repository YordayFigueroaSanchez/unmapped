# Tareas: Crear `GameComponent`

## 1. Esqueleto y configuración

- [ ] 1.1 Generar componente standalone con CLI o manual (`ng g component game --standalone`).
- [ ] 1.2 Añadir ruta `/play` que carga `GameComponent` (similar a editor).
- [ ] 1.3 Importar y usar `GameComponent` en AppComponent navbar.

## 2. Lógica de juego

- [ ] 2.1 Definir modelo de estado (`position`, `seen`, `path`).
- [ ] 2.2 Implementar movimiento y colisiones usando Signals.
- [ ] 2.3 Logic para detectar meta y emitir `finished`.
- [ ] 2.4 Método público `loadMap(map: MazeMap)` y/o inyección del servicio.

## 3. Render y entrada

- [ ] 3.1 Dibujar el laberinto y jugador en canvas.
- [ ] 3.2 Descargar eventos de teclado/gesto e invocar mover.
- [ ] 3.3 Mostrar contador de pasos/tiempo y botón de reinicio.

## 4. Integración

- [ ] 4.1 Conectar `MapRepositoryService` para cargar mapas por ID.
- [ ] 4.2 Opcional: botón UI para seleccionar mapa disponible.

## 5. Pruebas

- [ ] 5.1 Unit tests de la clase lógica (sin DOM).
- [ ] 5.2 Tests de componente: inicialización y rendering básico.
- [ ] 5.3 E2E: navegar a `/play`, cargar un mapa y moverse hasta meta.

## 6. Documentación

- [ ] 6.1 Explicar uso en README general y/o un README en `src/app/game`.
- [ ] 6.2 Documentar API (inputs/outputs) y cómo cargar mapas.

## Estimación
- Total aproximado: 12h

## Notas
- Priorizar separación lógica/render para facilitar tests.
- Reutilizar utilidades existentes del editor si aplican.
