# Despliegue en Render

Este documento contiene las instrucciones para desplegar la aplicación backend en Render.

## Configuración necesaria

### 1. Variables de entorno en Render

En el dashboard de Render, configura las siguientes variables de entorno:

```env
NODE_ENV=production
PORT=10000
OPENAI_API_KEY=tu_api_key_de_openrouter
ELEVENLABS_API_KEY=tu_api_key_de_elevenlabs
MONGO_URL=tu_uri_de_mongodb
```

### 2. Configuración del servicio

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`
- **Runtime**: Node.js

### 3. Puerto

El servidor está configurado para escuchar en el puerto que proporciona Render a través de la variable de entorno `PORT`.

### 4. CORS

El servidor tiene CORS habilitado para permitir conexiones desde el frontend.

## Solución de problemas comunes

### Error: "No open ports detected"

Si ves este error, verifica:

1. **Variable PORT**: Asegúrate de que la variable `PORT` esté configurada en Render
2. **Start Command**: Verifica que el comando de inicio sea `npm run start:prod`
3. **Build**: Asegúrate de que el build se complete correctamente

### Error: "Application failed to start"

1. Verifica que todas las variables de entorno estén configuradas
2. Revisa los logs de Render para más detalles
3. Asegúrate de que MongoDB esté accesible desde Render

## Verificación del despliegue

1. Una vez desplegado, el servidor debería estar disponible en la URL proporcionada por Render
2. Puedes probar el endpoint de salud: `https://tu-app.onrender.com/health`
3. Verifica que los logs muestren: "🚀 Application is running on: http://localhost:PORT"
4. El endpoint de salud debería devolver:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-01-XX...",
     "message": "Server is running"
   }
   ```

## Notas importantes

- El servidor escucha en `0.0.0.0` para aceptar conexiones desde cualquier IP
- Asegúrate de que tu base de datos MongoDB esté accesible desde Render
- Las variables de entorno son sensibles, no las compartas en el código
