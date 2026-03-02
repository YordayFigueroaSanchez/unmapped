## Why

El editor de laberinto está implementado como componente standalone pero no está integrado en el sistema de rutas de la aplicación. Actualmente, la app no tiene forma de acceder al editor desde la interfaz de navegación. Necesitamos conectar el componente al sistema de routing para que sea accesible desde la aplicación principal.

## What Changes

- Se agrega una ruta `/editor` en `app-routing.ts` que renderiza el `MazeEditorComponent`
- Se modifica `app.component.html` para incluir un navbar con links de navegación
- Se crea un contenedor de rutas con `<router-outlet>` en el componente raíz
- Se modifica el CSS global para adaptar el layout a la existencia del navbar y router-outlet

## Capabilities

### New Capabilities

- `editor-route`: Ruta de navegación `/editor` que muestra el `MazeEditorComponent` permitiendo a usuarios crear y editar mapas de laberinto

### Modified Capabilities

- `routing-system`: El sistema de rutas necesita incluir la nueva ruta y asegurar el routing funcione correctamente con standalone components

## Impact

- **Archivos afectados**: `app-routing.ts`, `app.component.ts`, `app.component.html`, `app.component.css`
- **APIs**: Uso de `RouterModule`, `RouterOutlet`, `RouterLink` en el componente raíz
- **UX**: Se agrega un navbar para navegación entre la app y el editor
- **No se modifica**: `MazeEditorComponent` ni `MapRepositoryService` (ya implementados)
