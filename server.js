// ... (mantén todo tu código de rutas igual arriba) ...

// Asegúrate de pasar '0.0.0.0' para que atienda peticiones de la red Wi-Fi
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de verificación activo en la red local: http://10.67.203.223:${PORT}`);
});
