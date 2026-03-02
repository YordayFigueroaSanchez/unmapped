# Unmapped — Juego de Laberinto en Angular

Juego web interactivo donde el jugador navega por un laberinto descubriendo muros dinámicamente a medida que avanza.

## Requisitos

- **Node.js**: 18+ (actualmente soporta 24.12.0, aunque Angular advierte sobre compatibilidad)
- **npm**: 11.10.1+
- **Angular CLI**: 18.2.21+

## Instalación

```bash
# Clonar/descargar el repositorio
cd unmapped

# Instalar dependencias (ya ejecutado)
npm install

# (Opcional) Instalar dependencias de desarrollo
npm install --save-dev
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
ng serve

# El navegador se abrirá automáticamente en http://localhost:4200/
```

## Compilación

```bash
# Build optimizado para producción
ng build

# Output en dist/unmapped/
```

## Testing

```bash
# Ejecutar tests unitarios (Jest)
npm test

# Ejecutar tests E2E (si están configurados)
ng e2e
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── maze-editor/          # Componente editor de laberintos
│   ├── game/                 # Componente principal del juego
│   ├── services/             # Servicios (repository, game logic, etc.)
│   ├── app.component.ts      # Componente raíz
│   └── app-routing.ts        # Configuración de rutas
├── styles/
│   ├── variables.css         # Variables CSS globales
│   └── global.css            # Estilos globales
├── assets/                   # Recursos estáticos
├── main.ts                   # Entry point
└── index.html                # Template HTML
```

## Configuración clave

- **Framework**: Angular 17+ (standalone components)
- **Lenguaje**: TypeScript 5+
- **Reactividad**: Angular Signals
- **Renders**: Canvas API (tablero) + DOM (UI)
- **Testing**: Jest + Angular Testing Library
- **CSS**: Variables custom (sin frameworks externos)
- **Persistencia**: localStorage

## Convenciones del Proyecto

- Todos los componentes son **standalone** (no se usan NgModules)
- Estado reactivo con **Signals** (no BehaviorSubject ni NgRx)
- Nómina en **inglés** (código) y **español** (documentación)
- Canvas para game board, DOM para UI

## Próximos Pasos

1. Crear `MazeEditorComponent` para diseñar laberintos
2. Crear `GameComponent` para la lógica del juego
3. Crear servicios: `MapRepositoryService`, `GameService`
4. Configurar Jest para testing unitario
5. Agregar E2E tests

## Licencia

&copy; 2026 Unmapped. Todos los derechos reservados.
