# Prompt: Migración Foundation Kit a @adsmurai/dsr-react

> Este prompt está diseñado para ser ejecutado en un proyecto Foundation Kit generado desde Lovable.

---

## Contexto

Estás ejecutándote dentro del nuevo proyecto base generado desde Lovable (Foundation Kit actualizado).

Este proyecto debe convertirse en el **template oficial** que consume la librería UI `@adsmurai/dsr-react`.

### Arquitectura

```
Lovable Template (Foundation Kit)
        ↓
@adsmurai/dsr-react         ← Contrato UI público (este paquete)
        ↓
@adsmurai/design-system-react  ← Interno (NO importar directamente)
```

### Sobre @adsmurai/dsr-react

Es una librería wrapper que:
- Encapsula el Design System interno (DSR)
- Proporciona una API pública estable
- Es compatible con Lovable Design System integration
- Exporta ~100 componentes UI, hooks y utilidades

**Versión actual:** `0.1.1-snapshot.8`

---

## Objetivo Principal

1. Migrar Foundation Kit para usar **EXCLUSIVAMENTE**:
   - `@adsmurai/dsr-react` → Componentes, hooks, utilidades
   - `@adsmurai/dsr-react/enums` → Todos los enums
   - `@adsmurai/dsr-react/types` → Tipos TypeScript

2. **Eliminar** cualquier uso directo de:
   - `@adsmurai/design-system-react`
   - Componentes UI locales que dupliquen funcionalidad

3. Preparar el proyecto como **template limpio** para Lovable

4. Generar **documentación técnica** del proceso

---

## Reglas de Importación (CRÍTICO)

### Imports Correctos

```tsx
// Componentes, hooks, utilidades
import {
  Button,
  Input,
  Card,
  Select,
  useIsMobile,
  cn
} from '@adsmurai/dsr-react';

// Enums (SIEMPRE desde /enums)
import {
  IconsEnum,
  ButtonVariantEnum,
  ThemesEnum
} from '@adsmurai/dsr-react/enums';

// Types (SIEMPRE desde /types)
import type {
  ButtonProps,
  InputProps,
  SelectOption
} from '@adsmurai/dsr-react/types';
```

### Imports PROHIBIDOS

```tsx
// NUNCA hacer esto:
import { IconsEnum } from '@adsmurai/dsr-react';           // enums no en root
import type { ButtonProps } from '@adsmurai/dsr-react';    // types no en root
import { Button } from '@adsmurai/dsr-react/components/ui/button'; // path interno
import { Button } from '@adsmurai/design-system-react';    // DSR directo
```

---

## Componentes Disponibles

### Forms & Inputs
`Button`, `Checkbox`, `Switch`, `Input`, `Textarea`, `InputSearch`, `InputCurrency`, `Select`, `SelectWithSearch`, `RadioGroup`, `Slider`, `Label`, `MultiTextField`, `Form` (+ subcomponentes)

### Display
`Badge`, `Chip`, `Tag`, `StatusTag`, `Icon`, `Typography`, `Alert`, `Progress`, `Skeleton`, `Avatar`, `Image`, `Logo`, `SocialIcon`, `ProcessingIcon`

### Navigation
`Tabs`, `Pagination`, `Stepper`, `Breadcrumbs`, `NavigationMenu`

### Containers
`Card`, `Modal`, `Drawer`, `Dialog`, `AlertDialog`, `Sheet`, `Tooltip`, `Popover`, `Collapsable`, `HoverCard`, `ScrollArea`, `ResizablePanel`

### Data Display
`DataTable`, `Table`, `LineChart`, `BarChart`, `DonutChart`, `ProgressPieChart`, `ChartLegend`, `EventList`, `TreeView`

### Interactive
`IconButton`, `ActionMenu`, `BulkAction`, `DropdownMenu`, `ContextMenu`, `Menubar`, `Command`, `ToggleButton`, `ToggleButtonGroup`

### Feedback
`Toaster`, `toast`, `useToast`, `Sonner`, `BaseMessage`, `Description`, `TipItem`

### Layout
`Separator`, `Sidebar` (+ subcomponentes)

### Uploads & Pickers
`Uploader`, `FileBox`, `Calendar`, `DatePicker`, `DateRangePicker`

### Advanced
`AdvancedSearchBar`, `ContentToggler`, `SelectionCard`, `RichTextEditor`, `LinkText`, `Empty`, `NoResults`

### Hooks
`useIsMobile`, `useCopyToClipboard`, `useToast`, `useSidebar`

### Utilidades
`cn()` - Merge de clases (clsx + tailwind-merge)

---

## Configuración Técnica

### Instalación

```bash
# Configurar registry para @adsmurai
npm config set @adsmurai:registry https://gitlab.com/api/v4/projects/44725271/packages/npm/

# Instalar la librería
npm install @adsmurai/dsr-react@snapshot
```

### Peer Dependencies Requeridas

El proyecto destino DEBE tener instaladas:

```json
{
  "dependencies": {
    "@adsmurai/design-system-react": ">=9.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "tailwindcss": ">=3.0.0"
  },
  "devDependencies": {
    "react-hook-form": ">=7.0.0",  // Opcional, para Form
    "zod": ">=3.0.0"               // Opcional, para validación
  }
}
```

### Tailwind CSS

El proyecto DEBE usar Tailwind CSS 3.x. La librería usa clases de Tailwind internamente.

---

## Restricciones Importantes

- **NO** crear monorepo
- **NO** refactorizar componentes internos de la librería
- **NO** cambiar APIs públicas
- **NO** modificar comportamiento visual
- **Mantener** el proyecto funcional en todo momento
- **Trabajar** de forma incremental y validable

---

## Fases de Trabajo

### FASE 1 — Análisis Inicial

**Objetivo:** Entender el estado actual antes de hacer cambios.

**Tareas:**
1. Analizar estructura de carpetas del Foundation Kit
2. Listar todos los archivos en `src/components/ui/` (si existe)
3. Buscar imports de:
   - `@adsmurai/design-system-react`
   - Componentes UI locales
4. Identificar duplicaciones con dsr-react
5. Verificar `package.json` actual

**Entregable:**
- Lista de componentes locales a eliminar
- Lista de imports a migrar
- Plan de migración ordenado por dependencias

**NO ejecutes cambios todavía. Espera confirmación.**

---

### FASE 2 — Integración dsr-react

**Objetivo:** Instalar y configurar la librería.

**Tareas:**
1. Agregar configuración de registry npm (si no existe `.npmrc`):
   ```
   @adsmurai:registry=https://gitlab.com/api/v4/projects/44725271/packages/npm/
   ```

2. Instalar dependencias:
   ```bash
   npm install @adsmurai/dsr-react@snapshot
   ```

3. Verificar peer dependencies instaladas

4. Actualizar imports archivo por archivo:
   - Componentes → `@adsmurai/dsr-react`
   - Enums → `@adsmurai/dsr-react/enums`
   - Types → `@adsmurai/dsr-react/types`

5. Eliminar componentes UI locales que ahora vienen de la librería

6. Ejecutar `npm run build` para verificar que compila

**Entregable:**
- Proyecto compilando sin errores
- Todos los imports migrados

---

### FASE 3 — Limpieza de Template

**Objetivo:** Dejar un starter limpio para Lovable.

**Eliminar:**
- Showcase UI interno (páginas de demo de componentes)
- Documentación interna específica del proyecto anterior
- Configuraciones de tooling obsoletas
- Archivos de ejemplo que no aplican

**Mantener:**
- Infraestructura base (vite, typescript, tailwind)
- Sistema de routing
- Layouts base
- Providers necesarios
- Configuración de autenticación (si aplica)

**Entregable:**
- Proyecto limpio y mínimo
- Solo lo necesario para empezar un nuevo proyecto

---

### FASE 4 — Validación

**Objetivo:** Verificar que todo funciona correctamente.

**Ejecutar:**
```bash
npm run dev      # Debe iniciar sin errores
npm run build    # Debe compilar sin errores
npm run lint     # Debe pasar sin errores críticos
```

**Verificar manualmente:**
- Renderizado correcto de componentes
- Tipos TypeScript correctos (sin errores en IDE)
- Imports limpios (sin warnings de imports no usados)
- Estilos aplicados correctamente

**Entregable:**
- Checklist de validación completado
- Screenshots o confirmación de funcionamiento

---

### FASE 5 — Documentación

**Objetivo:** Crear documentación para futuros proyectos.

**Crear archivo:** `FOUNDATION-KIT-GUIDE.md`

**Contenido requerido:**

1. **Objetivo del template**
   - Para qué sirve este proyecto base
   - Qué incluye y qué no incluye

2. **Arquitectura final**
   - Diagrama de dependencias
   - Estructura de carpetas

3. **Dependencias críticas**
   - Lista de paquetes requeridos
   - Versiones mínimas

4. **Reglas de importación**
   - Ejemplos de imports correctos
   - Imports prohibidos

5. **Cómo actualizar dsr-react**
   ```bash
   npm update @adsmurai/dsr-react@snapshot
   ```

6. **Cómo crear nuevo proyecto desde Lovable**
   - Pasos para hacer remix
   - Configuraciones post-remix

7. **Qué NO hacer**
   - Lista de anti-patterns
   - Errores comunes a evitar

8. **Checklist de validación**
   - Lista de verificaciones para nuevo proyecto

9. **Troubleshooting**
   - Errores comunes y soluciones

---

## Forma de Trabajo

1. **Primero** entrega FASE 1 (análisis + plan)
2. **NO** ejecutes cambios sin mi aprobación
3. Después iremos **fase por fase** con confirmación
4. Ante dudas, **pregunta** antes de asumir

---

## Referencias

- Documentación de la librería: Ver `claude.md` en el repo de dsr-react
- Changelog: Ver `CHANGELOG.md` para cambios recientes
- Componentes disponibles: Ver `src/components/ui/index.ts`

---

## Notas Adicionales

### Diferencias de API comunes

| Patrón Anterior | Patrón dsr-react |
|-----------------|------------------|
| `<Button onClick={fn}>Text</Button>` | `<Button onClick={fn}>Text</Button>` (igual) |
| `import { IconsEnum } from 'dsr'` | `import { IconsEnum } from '@adsmurai/dsr-react/enums'` |
| `interface Props { ... }` local | `import type { ButtonProps } from '@adsmurai/dsr-react/types'` |

### Componentes que pueden tener nombres diferentes

- `InputField` en DSR → `Input` en dsr-react
- `CheckBox` en DSR → `Checkbox` en dsr-react
- `SelectField` en DSR → `Select` en dsr-react

### Callbacks adaptados

Los componentes de dsr-react adaptan los callbacks de DSR para ser compatibles con react-hook-form:
- `onBlur` recibe eventos sintéticos, no valores raw
- `onChange` en inputs recibe `ChangeEvent`, no string directo
