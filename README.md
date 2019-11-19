# Contacts Keeper App
Aplicación tipo agenda telefónica para guardar contactos en la nube. Desarrollada con Node JS, Express JS, MongoDB y React.

## Configuraciones previas
- **Variables de entorno**: Crear un archivo `.env` en el directorio raíz en el cual se incluirán las variables necesarias para el funcionamiento del backend.
- **Base de datos**: La aplicación utiliza MongoDB como base de datos para almacenar los contactos y la data del usuario. Una vez creada y configurada su base de datos, copiar la URL generada en el apartado **Connect Your Application** en MongoDB. La URL debe incluir tanto el nombre de usuario como la contraseña y debe almacenarla en la variable **MONGO_URI** el archivo `.env`.

![MongoDB Database URI](https://i.imgur.com/qya6M0p.jpg)

- **JWT Secret**: La aplicación utiliza tokens de JSON Web Token para autenticación de usuario, por lo que es necesario crear su secret para generar los tokens, el mismo debe almacenarse en la variable **JWT_SECRET** del archivo `.env`.

La apariencia final de su archivo `.env` debe ser como se muestra a continuación:

![Varibles de entorno](https://i.imgur.com/RKPAmGF.jpg)

## Cómo usar
1. Clonar el repositorio: `git clone https://github.com/J3duardo/contacts-keeper.git`
2. Instalar las dependencias del lado del cliente: `npm run clientinstall`
3. Instalar las dependencias del backend: `npm install`
4. Iniciar la aplicación en local: `npm run dev`

## Nota
Para inicializar la aplicación en local es necesario instalar `nodemon`, bien sea en global o como dependencia.