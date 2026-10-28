const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de registro en tiempo real
app.use((req, res, next) => {
    console.log(`[PETICIÓN] -> ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Servidor de Verificación Afnan Activo');
});

// Ruta dinámica que captura cualquier hash del QR y responde con el estado exacto "genuine"
app.get('/verify/:id', (req, res) => {
    const codigoId = req.params.id;
    console.log(`✔ Verificando hash con estado genuine: ${codigoId}`);
    
    res.send(`
        <!DOCTYPE html>
        <html lang="en" style="height: 100%;">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Afnan Perfumes — Security Label Check</title>
            <style>
                body {
                    background-color: #0d1b2a;
                    color: #ffffff;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    min-height: 100%;
                }
                .g2 {
                    background-color: #0d1b2a;
                    padding: 50px 20px;
                    text-align: center;
                    min-height: 100vh;
                    box-sizing: border-box;
                }
                .g2-hero {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #2e7d32;
                    color: #ffffff;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                }
                h2 { font-size: 26px; margin-top: 0; margin-bottom: 15px; }
                p { font-size: 16px; line-height: 1.5; color: #f8f9fa; }
                .footer-id {
                    max-width: 600px;
                    margin: 30px auto 0 auto;
                    font-size: 12px;
                    color: #90e0ef;
                    word-break: break-all;
                    background: #1b263b;
                    padding: 15px;
                    border-radius: 6px;
                }
            </style>
        </head>
        <body style="position: relative; min-height: 100%; top: 0px;">
            <!-- Estructura oficial exacta con data-state="genuine" -->
            <div class="g2" data-state="genuine">
                <header class="g2-hero">
                    <h2>Label verified.</h2>
                    <p>This security label is registered to Afnan. To confirm the bottle itself, scan the QR code inside the box.</p>
                </header>
                <div class="footer-id">
                    <strong>Hash / ID Validados en la Nube:</strong><br>${codigoId}
                </div>
            </div>
        </body>
        </html>
    `);
});

// Manejador por defecto para cualquier otra ruta (simulando danger si no existe)
app.get('*', (req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en" style="height: 100%;">
        <head>
            <meta charset="UTF-8">
            <title>Afnan Perfumes - Alert</title>
            <style>
                body { background-color: #0d1b2a; color: #fff; font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .g2 { background-color: #0d1b2a; padding: 50px; }
                .g2-hero { background-color: #b71c1c; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto; }
            </style>
        </head>
        <body>
            <div class="g2" data-state="danger">
                <div class="g2-hero">
                    <h2>Fake product suspected.</h2>
                    <p>This product may not be genuine. Please scan the QR code inside the box to verify the bottle itself.</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
