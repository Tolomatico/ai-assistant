# Configuración de OpenRouter

Este proyecto está configurado para usar OpenAI a través de OpenRouter. Aquí están las instrucciones para configurarlo correctamente.

## Pasos para configurar OpenRouter

### 1. Obtener API Key de OpenRouter

1. Ve a [OpenRouter](https://openrouter.ai/)
2. Crea una cuenta o inicia sesión
3. Ve a la sección de API Keys
4. Crea una nueva API Key
5. Copia la API Key

### 2. Configurar variables de entorno

1. En el directorio `back/`, crea un archivo `.env` basado en `.env-template`
2. Agrega tu API Key de OpenRouter:

```env
OPENAI_API_KEY=tu_api_key_de_openrouter_aqui
ELEVENLABS_API_KEY=tu_api_key_de_elevenlabs_aqui
```

### 3. Modelos configurados

El proyecto está configurado para usar los siguientes modelos a través de OpenRouter:

- **GPT-3.5 Turbo**: `openai/gpt-3.5-turbo`
- **GPT-4**: `openai/gpt-4`
- **DALL-E 3**: `openai/dall-e-3`

### 4. Verificar configuración

Los servicios ya están configurados con la URL base de OpenRouter:
- `gpt.service.ts`
- `tolo-assistant.service.ts`

Ambos usan: `baseURL: 'https://openrouter.ai/api/v1'`

### 5. Probar la configuración

1. Inicia el servidor backend:
```bash
cd back
npm run start:dev
```

2. Prueba los endpoints para verificar que funcionan correctamente con OpenRouter.

## Notas importantes

- OpenRouter requiere que los modelos se especifiquen con el prefijo del proveedor (ej: `openai/gpt-3.5-turbo`)
- Los precios pueden variar según el modelo y proveedor seleccionado
- Puedes cambiar entre diferentes proveedores de modelos desde el dashboard de OpenRouter
