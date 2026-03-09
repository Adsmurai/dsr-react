# @adsmurai/dsr-react

Adsmurai Design System React - UI component library wrapping DSR components with standardized React APIs.

> **Internal Use Only** - This package is intended for Adsmurai projects.

## Installation

```bash
npm install @adsmurai/dsr-react
```

## Peer Dependencies

This package requires the following peer dependencies:

| Package | Version | Required |
|---------|---------|----------|
| `@adsmurai/design-system-react` | `>=9.0.0` | Yes |
| `react` | `>=18.0.0` | Yes |
| `react-dom` | `>=18.0.0` | Yes |
| `tailwindcss` | `>=3.0.0` | Yes |
| `react-hook-form` | `>=7.0.0` | Optional |
| `zod` | `>=3.0.0` | Optional |

## Usage

```tsx
import { Button, Card, Input, useIsMobile } from '@adsmurai/dsr-react';

function App() {
  const isMobile = useIsMobile();

  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  );
}
```

## License

UNLICENSED - Proprietary
