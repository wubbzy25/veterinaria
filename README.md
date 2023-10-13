# Veterinaria API

Bienvenido a la documentación de la API de Veterinaria. Esta API proporciona acceso a la gestión de animales y servicios de autenticación. A continuación, se describen los endpoints y servicios disponibles.

## Endpoints

### Crear un Animal

Este endpoint te permite crear un nuevo animal en la base de datos.

- **URL**: `POST /animals`
- **Parámetros de la solicitud**:
  - `AnimalDto` (Cuerpo de la solicitud): Un objeto que describe las propiedades del animal a crear. Debe incluir los siguientes campos:
    - `name` (string): El nombre del animal.
    - `Especie` (string): La especie del animal.
    - `Raza` (string): La raza del animal.
    - `Genero` (string): El género del animal.
    - `Edad` (number): La edad del animal.
- **Respuesta exitosa**:
  - Código de estado: 200 (OK)
  - Cuerpo de la respuesta: El animal creado.
- **Respuesta de error**:
  - Código de estado: 404 (Not Found)
  - Error al crear el usuario

### Listar Animales

Este endpoint te permite obtener una lista de todos los animales en la base de datos.

- **URL**: `GET /animals`
- **Respuesta exitosa**:
  - Código de estado: 200 (OK)
  - Cuerpo de la respuesta: Una lista de animales.

### Obtener un Animal por ID

Este endpoint te permite obtener los detalles de un animal según su ID.

- **URL**: `GET /animals/:id`
- **Parámetros de la solicitud**:
  - `id` (Parámetro de ruta): El ID del animal.
- **Respuesta exitosa**:
  - Código de estado: 200 (OK)
  - Cuerpo de la respuesta: Los detalles del animal.

### Actualizar un Animal

Este endpoint te permite actualizar los detalles de un animal según su ID.

- **URL**: `PATCH /animals/:id`
- **Parámetros de la solicitud**:
  - `id` (Parámetro de ruta): El ID del animal.
  - `AnimalDto` (Cuerpo de la solicitud): Un objeto que describe las propiedades del animal a crear. Debe incluir los siguientes campos:
    - `name` (string): El nombre del animal.
    - `Especie` (string): La especie del animal.
    - `Raza` (string): La raza del animal.
    - `Genero` (string): El género del animal.
    - `Edad` (number): La edad del animal.
- **Respuesta exitosa**:
  - Código de estado: 200 (OK)
  - Cuerpo de la respuesta: "Animal Actualizado" si la actualización fue exitosa.

### Eliminar un Animal

Este endpoint te permite eliminar un animal según su ID.

- **URL**: `DELETE /animals/:id`
- **Parámetros de la solicitud**:
  - `id` (Parámetro de ruta): El ID del animal.
- **Respuesta exitosa**:
  - Código de estado: 202 (Accepted)
  - Cuerpo de la respuesta: "Animal Eliminado" si la eliminación fue exitosa.

### Registro de Usuario

Este endpoint te permite registrar un nuevo usuario en la base de datos.

- **URL**: `POST /register`
- **Parámetros de la solicitud**:
  - `RegisterUserDto` (Cuerpo de la solicitud): Un objeto que describe las propiedades del usuario a registrar. Debe incluir los siguientes campos:
    - `gmail` (string): El correo electrónico del usuario.
    - `password` (string): La contraseña del usuario.
    - `Role` (string): El rol del usuario.
- **Respuesta exitosa**:
  - Código de estado: 200 (OK)
  - Cuerpo de la respuesta: El usuario registrado.
- **Respuesta de error**:
  - Código de estado: 400 (Bad Request)
  - Cuerpo de la respuesta: "Usuario Duplicado" si se encuentra un usuario con el mismo correo electrónico.

### Inicio de Sesión

Este endpoint te permite iniciar sesión como usuario registrado.

- **URL**: `POST /login`
- **Parámetros de la solicitud**:
  - `LoginUserDto` (Cuerpo de la solicitud): Un objeto que describe las credenciales de inicio de sesión del usuario. Debe incluir los siguientes campos:
    - `gmail` (string): El correo electrónico del usuario.
    - `password` (string): La contraseña del usuario.
- **Respuesta exitosa**:
  - Código de estado: 200 (OK)
  - Cuerpo de la respuesta: Un mensaje de "Logeado Exitosamente" y un token de acceso.
- **Respuesta de error**:
  - Código de estado: 400 (Bad Request)
  - Cuerpo de la respuesta: "La contraseña no es correcta" si la contraseña no coincide con el usuario.
  - Código de estado: 404 (Not Found)
  - Cuerpo de la respuesta: "El correo electrónico no existe o está incorrecto" si el correo electrónico no se encuentra en la base de datos.

