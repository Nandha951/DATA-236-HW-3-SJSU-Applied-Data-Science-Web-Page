const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

// Sample user data
const users = {
    'nandha': 'password'
};

// Sample courses data
const courses = [
  { "name": "DATA 200", "description": "Computational Programming for Data Analytics" },
  { "name": "DATA 201", "description": "Database Technologies for Data Analytics" },
  { "name": "DATA 202", "description": "Mathematics for Applied Data Science" },
  { "name": "DATA 220", "description": "Mathematical Methods for Data Analytics" },
  { "name": "DATA 225", "description": "Database Systems for Analytics" },
  { "name": "DATA 226", "description": "Data Warehouse and Pipeline" },
  { "name": "DATA 228", "description": "Big Data Technologies and Applications" },
  { "name": "DATA 230", "description": "Business Intelligence and Data Visualization" },
  { "name": "DATA 236", "description": "Distributed Systems for Data Engineering" },
  { "name": "DATA 240", "description": "Data Mining and Analytics" },
  { "name": "DATA 245", "description": "Machine Learning Technologies" },
  { "name": "DATA 250", "description": "Large Scale Data Analytics" },
  { "name": "DATA 255", "description": "Deep Learning Technologies" },
  { "name": "DATA 260", "description": "Applied Intelligent Systems" },
  { "name": "DATA 265", "description": "Large Language Model Applications" },
  { "name": "DATA 266", "description": "Generative Model Applications" },
  { "name": "DATA 270", "description": "Data Analytics Processes" },
  { "name": "DATA 292", "description": "Special Topics in Data Analytics" },
  { "name": "DATA 294", "description": "Data Analytics Seminar" },
  { "name": "DATA 295", "description": "Special Problems in Data Analytics" },
  { "name": "DATA 297", "description": "Data Analytics Internship" },
  { "name": "DATA 298A", "description": "MSDA Project I" },
  { "name": "DATA 298B", "description": "MSDA Project II" },
  { "name": "DATA 299A", "description": "MSDA Thesis I" },
  { "name": "DATA 299B", "description": "MSDA Thesis II" }
];

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Routes
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        req.session.user = { username };
        res.redirect('/dashboard');
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { 
        user: req.session.user,
        courses: courses
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});