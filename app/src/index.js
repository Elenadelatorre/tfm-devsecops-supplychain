const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Hardening de cabeceras HTTP
app.use(helmet());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('Servicio Web DevSecOps Seguro - TFM Ciberseguridad');
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

// PRUEBA DE FUGA DE CREDENCIALES
const AWS_SECRET_KEY = 'AKIAIMNOXYZKEYEXAMPLE1234567890123456';
