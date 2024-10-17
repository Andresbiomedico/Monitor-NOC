# Guía de Configuración de Testing https://gist.github.com/Klerith/98d7b1bc0f1525e892f260813cad1007

## 1. Instalaciones de desarrollo (super test es útil para probar Express)
```npm install -D jest @types/jest ts-jest supertest ```
## 2. Crear archivo de configuración de Jest
```npx jest --init```
## 3. En el archivo jest.config.js configurar
```
    preset: 'ts-jest',
    testEnvironment: "jest-environment-node",
    
    // Opcional - The paths to modules that run some
    // code to configure or set up the testing
    // environment before each test
    // setupFiles: ['dotenv/config'], 
```
## 1. Crear scripts en el package.json
```
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage", 
```