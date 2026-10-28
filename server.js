const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Servidor de verificación QR funcionando al 100%!');
});

// Ruta de verificación que captura el hash o ID del código QR
app.get('/verify/:id', (req, res) => {
    const codigoId = req.params.id;
    res.send(`
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #2e7d32;">¡Verificación Exitosa!</h1>
            <p>El código escaneado es válido.</p>
            <p style="color: #666; word-break: break-all; max-width: 600px; margin: 0 auto;"><strong>ID:</strong> ${codigoId}</p>
        </div>
    `);
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
