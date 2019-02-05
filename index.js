'use strict'
import app from './app';
var port = process.env.PORT || 3977;

app.listen(port, function () {
    console.log('express escuchando en el puerto: '+ port);
})
