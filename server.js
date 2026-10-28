const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ... el resto de tus rutas y configuraciones ...

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de verificación activo en el puerto ${PORT}`);
});
