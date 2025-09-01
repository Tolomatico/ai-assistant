const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ejecutar git para obtener todos los archivos TS/TSX
const files = execSync('git ls-files "**/*.ts" "**/*.tsx"', { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

console.log(`Procesando ${files.length} archivos...`);

files.forEach(file => {
  const filePath = path.resolve(file);
  try {
    // Leer el contenido del archivo
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Normalizar finales de línea a LF
    const normalizedContent = content.replace(/\r\n/g, '\n');
    
    // Si hubo cambios, escribir el archivo
    if (content !== normalizedContent) {
      fs.writeFileSync(filePath, normalizedContent, 'utf8');
      console.log(`Corregido: ${file}`);
    } else {
      console.log(`Sin cambios: ${file}`);
    }
  } catch (error) {
    console.error(`Error procesando ${file}:`, error.message);
  }
});

console.log('Proceso completado.');