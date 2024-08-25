# Space Tracker API

This is a RESTful API for managing galaxies, planets, and stars. It is built using Node.js and Sequelize, and it supports basic CRUD operations.

## Endpoints

### 1. Galaxies

- **Get All Galaxies**
    ```bash
    curl -X GET http://localhost:3000/galaxies
    ```

- **GET Galaxies by ID**
    ```bash
    curl -X GET http://localhost:3000/galaxies/3
    ```

- **Create New Galaxy**
    ```bash
    curl -X POST http://localhost:3000/galaxies \
    -H "Content-Type: application/json" \
    -d '{"name": "Milky Way", "size": 100000, "description": "Our galaxy"}'
    ```

- **Update Galaxy By ID**
    ```bash
    curl -X PUT http://localhost:3000/galaxies/3 \
    -H "Content-Type: application/json" \
    -d '{"name": "Andromeda", "size": 220000, "description": "The nearest galaxy to us."}'
    ```

- **Delete Galaxy By ID**
    ```bash
    curl -X DELETE http://localhost:3000/galaxies/3
    ```

### 2. Planets

- **Get All Planets**
    ```bash
    curl -X GET http://localhost:3000/planets
    ```

- **GET Planets by ID**
    ```bash
    curl -X GET http://localhost:3000/planets/3
    ```

- **Create New Planet**
    ```bash
    curl -X POST http://localhost:3000/planets \
    -H "Content-Type: application/json" \
    -d '{"name": "Earth", "size": 12742, "description": "The third planet from the Sun."}'
    ```

- **Update Planet By ID**
    ```bash
    curl -X PUT http://localhost:3000/planets/3 \
    -H "Content-Type: application/json" \
    -d '{"name": "Mars", "size": 6779, "description": "The fourth planet from the Sun."}'
    ```

- **Delete Planet By ID**
    ```bash
    curl -X DELETE http://localhost:3000/planets/3
    ```

### 3. Stars

- **Get All Stars**
    ```bash
    curl -X GET http://localhost:3000/stars
    ```

- **GET Stars by ID**
    ```bash
    curl -X GET http://localhost:3000/stars/3
    ```

- **Create New Star**
    ```bash
    curl -X POST http://localhost:3000/stars \
    -H "Content-Type: application/json" \
    -d '{"name": "Sun", "size": 1392000, "description": "The star at the center of our solar system."}'
    ```

- **Update Star By ID**
    ```bash
    curl -X PUT http://localhost:3000/stars/3 \
    -H "Content-Type: application/json" \
    -d '{"name": "Sirius", "size": 118955, "description": "The brightest star in the night sky."}'
    ```

- **Delete Star By ID**
    ```bash
    curl -X DELETE http://localhost:3000/stars/3
    ```


