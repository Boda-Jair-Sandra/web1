const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el módulo cors
const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de tener esto también

const app = express();
const port = process.env.PORT || 9000;

// Middleware para permitir CORS
app.use(cors()); // Esto habilita CORS para todas las rutas

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((error) => console.error('Error al conectar con MongoDB:', error));

// Definir el esquema y el modelo de MongoDB para los formularios
const AsistenciaSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    telefono: String,
    acompanantes: Number,
    motivo: String,
});

const Asistencia = mongoose.model('Asistencia', AsistenciaSchema);

// Ruta para confirmar asistencia
app.post('/acepto', async (req, res) => {
    try {
        const nuevoRegistro = new Asistencia({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            acompanantes: req.body.acompanantes,
        });
        await nuevoRegistro.save();
        res.send("Asistencia confirmada");
    } catch (error) {
        res.status(500).send("Error al guardar en la base de datos: " + error.message);
    }
});

// Ruta para rechazar asistencia
app.post('/declino', async (req, res) => {
    try {
        const nuevoRegistro = new Asistencia({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            motivo: req.body.motivo,
        });
        await nuevoRegistro.save();
        res.send("Asistencia rechazada");
    } catch (error) {
        res.status(500).send("Error al guardar en la base de datos: " + error.message);
    }
});

app.get('/', (req, res) => {
    res.send("Bienvenido a mi API");
});

// Iniciar el servidor
app.listen(port, () => console.log('Servidor escuchando en el puerto', port));
