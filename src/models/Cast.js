import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        match: [/^[a-zA-Z 0-9]+$/,'Director should be alphanumeric, digit and whitespaces only!']
    },
    age: {
        type: Number,
        min: 1,
        max: 120,

    },
    born: {
        type: String,
        minLength: 10,
        match: /^[a-zA-Z 0-9]+$/,
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
});

const Cast = model('Cast', castSchema);

export default Cast;