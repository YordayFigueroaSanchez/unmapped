# Propuesta: Crear `GameComponent`

## Objetivo
Desarrollar un componente independiente que permita jugar el laberinto
en el navegador. Debe encargarse de renderizar el mapa, manejar entrada del
jugador y exponer eventos/cambios de estado para que otras partes de la
aplicación (por ejemplo un servicio de puntuación o un UI de resultados) se
puedan conectar.

## Contexto
Hasta ahora existe un editor de laberintos (`MazeEditorComponent`) y un
servicio de repositorio. Falta el componente de juego real donde un jugador
recorre el laberinto descubriendo muros dinámicamente y buscando la salida.

## Alcance
- UI de juego con canvas o DOM que muestra el laberinto y el jugador.
- Entrada del teclado/gestos para mover al jugador en las cuatro direcciones.
- Estado visible: posición actual, camino recorrido, muros descubiertos.
- Integración con `MapRepositoryService` para cargar mapas guardados.

## Stakeholders
- Equipo de frontend; la UI interactiva.
- QA para tests unitarios/E2E.

## Requisitos de éxito
1. El componente es standalone y funciona fuera de cualquier módulo.
2. Se puede navegar por un laberinto de tamaño variable.
3. Los tests cubren las funcionalidades básicas (movimiento, límites, final).
4. Documentación clara para desarrolladores.

---

## Tareas principales
1. Diseño e implementación de la lógica de juego.
2. Renderizado del tablero y el jugador con canvas.
3. Manejo de entrada del usuario.
4. Conexión con el repositorio de mapas.
5. Tests y documentación.


