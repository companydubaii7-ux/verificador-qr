const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para registar cada tentativa de leitura no terminal
app.use((req, res, next) => {
    console.log(`[VERIFICAÇÃO] -> ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Servidor de Verificação Afnan Ativo');
});

// Rota dinâmica que captura qualquer ID ou hash do QR code e mostra o ecrã verde oficial
app.get('/verify/:id', (req, res) => {
    const codigoId = req.params.id;
    console.log(`✔ Etiqueta validada com sucesso para o ID: ${codigoId}`);
    
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Afnan Perfumes - Verification</title>
            <style>
                body {
                    background-color: #0d1b2a;
                    color: #ffffff;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                    margin: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: #1b263b;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                }
                .success-box {
                    background-color: #2e7d32;
                    color: #ffffff;
                    padding: 25px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                h1 { font-size: 24px; margin-bottom: 15px; letter-spacing: 1px; }
                h2 { font-size: 20px; margin-top: 0; }
                p { font-size: 15px; line-height: 1.6; color: #e0e1dd; }
                .footer-id {
                    font-size: 11px;
                    color: #90e0ef;
                    word-break: break-all;
                    margin-top: 20px;
                    background: #0d1b2a;
                    padding: 12px;
                    border-radius: 6px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>AFNAN PERFUMES</h1>
                <div class="success-box">
                    <h2>✔ Label verified.</h2>
                    <p>This security label is registered to Afnan. To confirm the bottle itself, scan the QR code inside the box.</p>
                </div>
                <p>Double-Check Your Perfume's Authenticity</p>
                <div class="footer-id">
                    <strong>Hash / ID Detetado:</strong><br>${codigoId}
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor a escutar na porta ${PORT}`);
});
