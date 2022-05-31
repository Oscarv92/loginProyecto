const mongoose = require('mongoose');

URL = ('mongodb://localhost/login1');

mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Conexión exitosa a la bd: ', db.connection.name))
    .catch(error => console.log(error))

module.exports = mongoose