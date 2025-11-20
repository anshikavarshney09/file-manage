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


connectToDB();


app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use('/', moreRouter);
app.use('/user', userRoutes);


app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
