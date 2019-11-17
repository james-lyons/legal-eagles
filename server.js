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
    secret: `${ process.env.SECRET }`,
    resave: false,
    saveUninitialized: false
}));

const corsOptions = {
    origin: 'https://legal-eagles-react.herokuapp.com/',
    methods: ["GET", "PUT", "POST", "HEAD", "DELETE", "OPTIONS"],
    headers: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('https://legal-eagles-react.herokuapp.com/', cors());

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