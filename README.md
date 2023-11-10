# Pasos para usar el crawler

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Ejecutar el comando `npm start -- --url URLPAGE --maxdist 4 --db pathToSaveFile`

## Ejemplo

```bash copy
npm start -- --url "https://www.foodsubs.com/" --maxdist 4 --db "./data"
```

## Nota

Se guardará un archivo llamado `links.json` en la carpeta `data` dentro del proyecto con los resultados del crawler.

# Para instalar como CLI

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Ejecutar el comando `npm run build` para generar el build del proyecto.
4. Ejecutar el comando `npm install -g .`. Ahora podrás ejecutar el comando `crawler` desde cualquier lugar de tu sistema.

## Ejemplo

```bash copy
crawler --url "https://www.foodsubs.com/" --maxdist 4 --db "./data"
```
