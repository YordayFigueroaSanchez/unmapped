## Context

El `MazeEditorComponent` está completamente implementado pero no está conectado al sistema de rutas de Angular. Actualmente, `app-routing.ts` está vacío (array de rutas vacío), y `app.component.ts` no incluye un `<router-outlet>`. Necesitamos establecer la estructura de routing para permitir navegación a la sección del editor.

## Goals / Non-Goals

**Goals:**
- Crear una ruta `/editor` que renderize el `MazeEditorComponent`
- Incluir un navbar en `AppComponent` con navegación entre secciones principales
- Mantener el layout consistente con variables CSS existentes
- Asegurar que el routing funcione con standalone components

**Non-Goals:**
- Crear nuevas vistas de listado de mapas o hub central (futuro)
- Implementar lazy loading de rutas (se pueden agregar después)
- Cambiar la arquitectura de `MazeEditorComponent` o `MapRepositoryService`
- Agregar autenticación o guards de ruta

## Decisions

### 1. **Estructura de Rutas**
- Se define una única ruta inicial: `{ path: 'editor', component: MazeEditorComponent }`
- Se usa `redirectTo: 'editor'` como default para la ruta raíz (path: `''`)
- Array `applyRequires` de routing está en `app.routes.ts` (o `app-routing.ts` according to file naming convention)
- **Rationale**: Simple para MVP, fácil de extender con más rutas en el futuro

### 2. **Navegación en AppComponent**
- Se agrega un `<nav>` con class `navbar` en `app.component.html` antes del `<router-outlet>`
- Links de navegación: "Editor" (a `/editor`) y potencial "Home" (a `/`)
- Se usa `routerLink` directive para navegación sin recargar
- **Rationale**: Proporciona UX clara y consistente; navbar siempre visible

### 3. **Layout CSS**
- `AppComponent` template estructura: `<nav>` + `<main class="router-outlet-container">` + `<router-outlet>`
- Se agregan estilos flexbox para asegurar que el navbar está fijo o sticky, y el main ocupa espacio restante
- Se mantienen las variables CSS existentes (`--color-bg-dark`, `--spacing-*`)
- **Rationale**: Mejores prácticas de AccesibilityLayout y responsive design

### 4. **Imports en app.routes.ts**
- Se importa `Routes` desde `@angular/router`
- Se importa `MazeEditorComponent`
- Se define y exporta const `routes: Routes = [...]`
- Se importa en `bootstrapApplication()` vía `provideRouter(routes)`
- **Rationale**: Config explícita, fácil de mantener

## Risks / Trade-offs

| Risk / Trade-off | Mitigation |
|---|---|
| El navbar sin lazy loading hace que siempre se cargue el componente editor incluso si no se accede | En futuro se puede mover editor a lazy module. Por ahora, el bundle es pequeño. |
| Usar `/editor` como default puede confundir a usuarios esperando una "home page" | Documentar en README que `/editor` es la landing page. Agregar home page cuando sea necesario |
| El routing actualmente solo tiene una ruta explícita | Estructura preparada para agregar más rutas (home, play, settings) sin refactorizar |
| Standalone components requieren imports explícitos en AppComponent | Ya estamos usando standalone components; eso es standard en el proyecto |

## Migration Plan

1. Crear `app.routes.ts` con ruta `/editor` y redirect from `''`
2. Actualizar `main.ts` para usar `provideRouter(routes)`
3. Modificar `app.component.ts` para importar `RouterModule` y `RouterOutlet`
4. Actualizar `app.component.html` con navbar y `<router-outlet>`
5. Agregar estilos navbar en `app.component.css`
6. Verificar con `ng serve` que la navegación funciona
7. Compilar con `ng build` y validar

## Open Questions

- ¿Agregar icono o logo al navbar para volver a home? (decidir después si hay home page)
- ¿Usar guard para prevenir abandonar editor sin guardar mapas? (future enhancement)
- ¿Incluir breadcrumb en el navbar? (posible para futuras secciones)
