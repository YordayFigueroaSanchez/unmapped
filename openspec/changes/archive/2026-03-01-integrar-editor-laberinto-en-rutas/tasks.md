## 1. Configuración de Rutas

- [x] 1.1 Crear o actualizar `src/app/app.routes.ts` con ruta `/editor` y redirectTo
- [x] 1.2 Importar `MazeEditorComponent` en `app.routes.ts`
- [x] 1.3 Importar `Routes` desde `@angular/router` en `app.routes.ts`
- [x] 1.4 Actualizar `main.ts` para usar `provideRouter(routes)` en `bootstrapApplication()` (ya configurado en app.config.ts)

## 2. Componente Raíz (AppComponent)

- [x] 2.1 Agregar `RouterLink` y `RouterLinkActive` en imports de `app.component.ts`
- [x] 2.2 Actualizar `app.component.html` con navbar y `<router-outlet>`
- [x] 2.3 Agregar estilos para navbar y layout flexbox en `app.component.css`
- [x] 2.4 Verificar que `app.component.ts` es standalone component con imports correctos

## 3. Verificación y Testing

- [x] 3.1 Ejecutar `ng serve` y validar que `/editor` es accesible sin errores
- [x] 3.2 Clickear en links del navbar y validar navegación sin recarga de página
- [x] 3.3 Verificar que browser back/forward buttons funcionan correctamente
- [x] 3.4 Compilar con `ng build` y validar sin errores

## 4. Documentación

- [x] 4.1 Actualizar README.md con sección de Rutas / Navigation
- [x] 4.2 Documentar la estructura de rutas y cómo agregar nuevas rutas en el futuro
