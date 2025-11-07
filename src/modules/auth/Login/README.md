# Login Component

Un componente de login completo y funcional con manejo de formulario, validación y estilos modulares.

## Características

- ✅ **Validación completa**: Email y contraseña con validación en tiempo real
- ✅ **Manejo de estados**: Loading, errores y éxito
- ✅ **Estilos modulares**: Usando CSS Modules con variables CSS globales
- ✅ **Responsive**: Adaptable a dispositivos móviles
- ✅ **Accesibilidad**: Labels, ARIA attributes y navegación por teclado
- ✅ **TypeScript**: Completamente tipado
- ✅ **Servicios integrados**: Conexión con API backend

## Uso Básico

```tsx
import LoginTemplate from '@/modules/auth/Login/Login';
import { handleLogin } from '@/modules/auth/Login/services';

// Uso simple
<LoginTemplate />

// Con manejo personalizado
<LoginTemplate 
  onSubmit={handleLogin}
  isLoading={false}
/>
```

## Ejemplo Completo

```tsx
'use client';

import { useState } from 'react';
import LoginTemplate from '@/modules/auth/Login/Login';
import { handleLogin } from '@/modules/auth/Login/services';
import { LoginFormData } from '@/modules/auth/Login/dto/Login.types';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await handleLogin(data);
      // Redireccionar o actualizar estado global
      console.log('Login exitoso!');
    } catch (error) {
      console.error('Error en login:', error);
      // El error se maneja automáticamente en el componente
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginTemplate 
      onSubmit={handleLoginSubmit}
      isLoading={isLoading}
    />
  );
}
```

## Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `onSubmit` | `(data: LoginFormData) => Promise<void> \| void` | No | - | Función que se ejecuta al enviar el formulario |
| `isLoading` | `boolean` | No | `false` | Estado de carga externo |

## Tipos

### LoginFormData
```typescript
interface LoginFormData {
  email: string;
  password: string;
}
```

### LoginFormErrors
```typescript
interface LoginFormErrors {
  email?: string;
  password?: string;
}
```

## Servicios

El archivo `services.ts` incluye:

- `loginService`: Función base para hacer la petición al backend
- `handleLogin`: Función completa que incluye manejo de localStorage

## Estilos

Los estilos están definidos en `Login.module.css` y utilizan las variables CSS globales:

- `--primary`: Color principal para botones y enlaces
- `--secondary`: Color secundario para hover
- `--background`: Fondo principal
- `--foreground`: Color de texto
- `--surface`: Fondo de tarjetas
- `--error`: Color de errores

## Validaciones

- **Email**: Formato válido y campo requerido
- **Contraseña**: Mínimo 6 caracteres y campo requerido
- **Validación en tiempo real**: Se limpia el error al escribir

## Estados

1. **Inicial**: Formulario vacío listo para usar
2. **Loading**: Mostrando spinner mientras procesa
3. **Error**: Mostrando mensajes de error específicos
4. **Éxito**: Mostrando mensaje de confirmación