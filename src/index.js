import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import routes from './routes.js'
import showRatingHelper from './helpers/rating-helper.js';

const app = express();

try {
    const url = 'mongodb://localhost:27017/magic-movies-jan2025';

    await mongoose.connect(url);

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



app.use(routes);

app.listen(5000, () => console.log('Server is listening on htpp://localhost:5000...'));