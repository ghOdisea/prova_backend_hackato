
# PROVA_BACKEND_HACKATO_GONZALO_FOURTANE

## Descripción

Desenvolupar una API per a una aplicació web que gestioni usuaris i activitats. Aquest servei ha de permetre el registre d'usuaris, la gestió de dades de les activitats i la importació/exportació d'aquestes activitats en format JSON.

## Características

1. Gestió d'Usuaris: Pots utilitzar les dades dels usuaris que consideris: nom, cognoms, edad, email...etc.

      • Registre de nous usuaris
      
      • Actualització de dades de l'usuari:
      
      • Eliminació d'usuaris

      • Consulta d'informació d'usuaris
2. Gestió d'activitats:

      • Creació d'una nova activitat

      • Consulta d'activitats

      • Apuntar-se a una activitat
3. Exportació d'activitats:

      • Exportar activitats en format JSON
4. Importació d'activitats:

      • Importar activitats des d'un arxiu JSON
5. Configuració de la Base de Dades:

      • Establir una connexió amb una base de dades, que pot ser MySQL o MongoDB, per emmagatzemar les dades d'usuaris i activitats.

## Tecnologías Utilizadas

- **Node.js**
- **Express**
- **MongoDB**
- **TypeScript**
- **Jest**

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/ghOdisea/PROVA_BACKEND_HACKATO.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:

   ```bash
   DB_URI=<tu_uri_de_mongodb>
   PORT=<puerto>
   NODE_ENV="development"
   ```

4. Inicia la aplicación:

   ```bash
   npm start
   ```

## Uso

- Para utilizar las rutas desde el archivo "api.http", debes tener instalada la extension de {REST client} en VSCode.

## Testing

1. Para correr el testing:

   ```bash
   npm test
   ```
