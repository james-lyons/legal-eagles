// SECTION MOdules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// SECTION Instanced Modules
const app = express();

// SECTION Global Variables
const PORT = process.env.PORT || 4000;
const routes = require('./routes');
const secret = require('./secret.js')

// SECTION Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// SECTION Middleware
app.use((req, res, next) => {
    const url = req.url;
    const method = req.method;
    const requestedAt = new Date().toLocaleDateString();
    console.table({ url, method, requestedAt });
    next();
});

// SECTION User Sessions
app.use(session({
    secret: `${ secret }`,
    resave: false,
    saveUninitialized: false
}));

const corsOptions = {
    origin: "https://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// SECTION Routes
// Home root
app.get('/', (req, res) => {
    res.send('<h1>Legal Eagles!</h1>')
});

// Auth Route
app.use('/auth', routes.auth);

// User Routes
app.use('/attorney', routes.attorney);
app.use('/client', routes.client);
app.use('/review', routes.review);

// SECTION Server Listener
app.listen(PORT, () => console.log(`Listening on port: ${ PORT }`));