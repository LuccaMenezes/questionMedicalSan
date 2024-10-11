const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:5173'}));

app.use(express.static('public'));

const UserRoutes = require('./routes/UsersRoutes')
const MatrizRoutes = require('./routes/MatrizRoutes')
const StringRoutes = require('./routes/StringRoutes')

app.use('/users', UserRoutes)
app.use('/matriz', MatrizRoutes)
app.use('/string', StringRoutes)

app.listen(5000);