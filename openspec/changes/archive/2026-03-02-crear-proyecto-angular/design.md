# Diseño: Proyecto base Angular

## Estructura de carpetas
```
src/
  app/
    maze-editor/          # Componente editor
    game/                 # Componente juego
    services/             # Servicios (repository, game, etc.)
    app.component.ts      # Root component (standalone)
    app-routing.ts        # Routing
  styles/
    variables.css         # Variables CSS globales
    global.css            # Estilos globales
  assets/                 # Imágenes, datos estáticos
  main.ts                 # Entry point
  index.html              # Template HTML
angular.json              # Configuración Angular CLI
tsconfig.json             # Configuración TypeScript
jest.config.js            # Configuración Jest
package.json              # Dependencias
```

## Configuración clave
- **standalone: true** en todos los componentes (sin NgModules)
- **Signals** para estado reactivo (no BehaviorSubject/NgRx)
- **Canvas** para renderizado del tablero
- **localStorage** para persistencia (sin backend)

## Dependencias principales
- `@angular/core` 17+
- `@angular/common`
- `@angular/platform-browser`
- `typescript` 5+
- `jest` y `@angular/core/testing`
- `@testing-library/angular`

## Comando de creación
```bash
ng new unmapped \
  --skip-git \
  --routing \
  --style=css \
  --skip-install
```

Luego instalar Jest en lugar de Karma.
