import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import 'dotenv/config';

import routes from './routes.js'
import showRatingHelper from './helpers/rating-helper.js';
import { authMiddleware } from './middlewares/auth-middleware.js';

const app = express();

try {
    await mongoose.connect(process.env.DATABASE_URI);

    console.log('DB Connected Successfuly!');
} catch (error) {
    console.log('Connot connect to DB');
    console.error(error.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating: showRatingHelper
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware);



app.use(routes);

app.listen(5000, () => console.log('Server is listening on htpp://localhost:5000...'));