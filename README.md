![Logo TripCode](https://res.cloudinary.com/df2gu30lb/image/upload/v1709795888/logo-tripcode_hoo2vp.png)

# TripCode (Startup B2B)

## Descripción
Esta es una plataforma B2B que simplifica el desarrollo de software, sitios web y aplicaciones. A partir de la solicitud del cliente, nuestros gerentes de proyecto acuerdan los requisitos en reuniones personalizadas. Luego crean proyectos en GitHub, asignando hasta dos desarrolladores por proyecto, visibles en sus paneles individuales. Una solución integral que optimiza la comunicación y la gestión de proyectos, aumentando la eficiencia y la satisfacción del cliente.

## Tecnologías
La aplicación está creada con las siguientes tecnologías:

 - Next.js 13: Un marco de trabajo de React que permite funcionalidades como la generación de sitios estáticos y la representación del lado del servidor.
 - TypeScript: Un superconjunto de JavaScript que añade tipado estático y objetos basados en clases.
 - Prisma: Un ORM de Node.js y TypeScript para bases de datos SQL y NoSQL.
 - MongoDB: Una base de datos NoSQL, orientada a documentos y de código abierto.

## Instalación
Para instalar y ejecutar esta aplicación, necesitarás Node.js y npm instalados en tu computadora. A continuación, puedes seguir estos pasos:

 - Clona este repositorio
 - Instala las dependencias con `npm install`
 - Ejecuta la aplicación con `npm run dev`
## Cómo Utilizar Este Proyecto

#### Clonar el Repositorio:

```bash
    git clone https://github.com/FoulTrip/TripCode.git
    cd tripcode
```
#### Instalar Dependencias:

```bash
    npm install
```
#### Generar Claves VAPID para (Service Worker):

```bash
    npx web-push generate-vapid-keys
```
Copia las claves generadas y agrégales a tu archivo .env.

#### Generar Claves API de paypal | https://developer.paypal.com/home
Copia el CLIENT_ID y SECRET_KEY y pegalos en .env

#### Ejecutar la Aplicación:

```bash
    npm run dev
```

