## 📌 API ENDPOINTS - USERS
### GET /api/v1/users
Obtener lista de usuarios con filtros opcionales.
*Query Parameters:*
- role (opcional): Filtrar por rol (admin, user)
- search (opcional): Buscar por nombre
- limit (opcional): Máximo de resultados (default: 100)
*Ejemplo:*
```bash
curl http:localhost:3000/api/v1/users?role=admin&search=carlos

Response (200 OK):

{
 "success": true,
 "data": [
 {
 "id": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
 "name": "Carlos Navia",
 "email": "carlos@example.com",
 "role": "admin",
 "createdAt": "2025-09-12T12:00:00Z"
 }
 ],
 "total": 1
}

GET /api/v1/users/:id

Obtener un usuario específico por ID.
Ejemplo: 
curl http:localhost:3000/api/v1/users/b42f53fa-7b30-4b91-8d36-dc1c6ef27611
Response (200 OK):
{
 "success": true,
 "data": {
 "id": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
 "name": "Carlos Navia",
 "email": "carlos@example.com",
 "role": "admin",
 "createdAt": "2025-09-12T12:00:00Z"
 }
}

Response (404 Not Found):

{
 "success": false,
 "error": "Usuario no encontrado"
}

POST /api/v1/users
Crear un nuevo usuario.

Body (JSON):
{
 "name": "Juan Pérez",
 "email": "juan@example.com",
 "role": "user"
}

Código Significado
200 OK - Solicitud exitosa
201 Created - Recurso creado
400 Bad Request - Datos inválidos
404 Not Found - Recurso no encontrado
500 Internal Server Error - Error del servidor