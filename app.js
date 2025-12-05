const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

dotenv.config();
const connectToDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const moreRouter = require('./routes/more.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectToDB();

// Middleware
app.use(express.static('public')); // serve CSS, JS, fonts, images
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"], 
        "style-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"], 
        "font-src": ["'self'", "https://cdn.jsdelivr.net"],
        "img-src": ["'self'", "data:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(cors());
const path = require('path');
// View engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/', moreRouter);
app.use('/user', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
