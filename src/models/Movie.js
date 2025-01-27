import { Schema, } from 'mongoose';

const movieSchema = new Schema({
    titile: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageURL: String,
    rating: Number,
    description: String,
});

const Movie = model('Movie', movieSchema);

export default Movie;