import { Schema, model, Types } from 'mongoose';

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:250,
        match: [/^[a-zA-Z 0-9]+$/,'Director should be alphanumeric, digit and whitespaces only!']
    }, 
    category: String,
    genre: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:250,
        match: [/^[a-zA-Z 0-9]+$/,'Genre should be alphanumeric, digit and whitespaces only!']
    }, 
    director: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:250,
        match: [/^[a-zA-Z 0-9]+$/,'Director should be alphanumeric, digit and whitespaces only!']
    }, 
    year: {
        type: Number,
        min: 1900,
        max: 2025,
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        minLength: 20,
        match: /^[a-zA-Z 0-9]+$/,
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;
