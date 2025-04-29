\# 📡 App Conecta — Proyecto Completo (Frontend + Backend)

\*\*App Conecta\*\* es una aplicación web desarrollada con \*\*React + TypeScript\*\* en el frontend y \*\*Spring Boot\*\* en el backend, utilizando \*\*MySQL\*\* como base de datos.

Permite gestionar usuarios, autenticación mediante JWT y la organización de intereses comunes entre miembros de una red social temática.

\---

\## 📌 Requisitos mínimos para la instalación

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu máquina:

- [Node.js](https://nodejs.org/en) (v18 o superior)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) (v1.22 o superior)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Java JDK 17](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) (v8 o superior)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

\---

\## 📦 Clonar los repositorios

\### 📥 Clonar el Frontend (React)

\```bash

git clone https://github.com/Martin8510/app-conecta.git

cd app-conecta

📥 Clonar el Backend (Spring Boot)

git clone https://github.com/Martin8510/intereses-comunes.git

cd intereses-comunes


⚙️ Instalación y configuración paso a paso

🚀 Instalación y configuración del Frontend (React)

1. Instalar Visual Studio Code.
2. Abrir Visual Studio Code y cargar la carpeta app-conecta.

3. Instalar las dependencias del proyecto:

yarn install

4. Crear un archivo .env en la raíz de app-conecta con el siguiente contenido:

VITE\_API\_BASE\_URL=http://localhost:8080

5. Ejecutar la aplicación en modo desarrollo:

yarn run dev

6. Abrir el navegador y acceder a:

http://localhost:5173


🚀 Instalación y configuración del Backend (Spring Boot)

1. Instalar IntelliJ IDEA.
2. Abrir IntelliJ IDEA y cargar la carpeta intereses-comunes.
3. Verificar la configuración de la base de datos en src/main/resources/application.yml:

spring:
datasource:url: mysql://localhost:3306/red_social_intereses_comunes
username: root
password: 12345678

4. Desde MySQL Workbench, crear la base de datos ejecutando:

CREATE DATABASE red\_social\_intereses\_comunes;

5. En IntelliJ, localizar y ejecutar la clase:

InteresesComunesApplication.java

6. El backend quedará disponible en:

http://localhost:8080

📄 Licencia

Este proyecto está licenciado bajo la licencia MIT.


Notas:

Es necesario tener tanto el backend como el frontend ejecutándose en paralelo para que la aplicación funcione correctamente.

Se recomienda respetar las versiones indicadas de cada herramienta para evitar incompatibilidades.

Recuerda configurar correctamente las credenciales de base de datos en application.yml según tu entorno local.






