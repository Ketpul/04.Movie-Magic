import { v4 as uuid } from 'uuid';
//import movies from "../movies.js";
import Movie from "../models/Movie.js";

export default {
     getAll(filter = {}){
        let result = Movie.find({});

        if(filter.search){
            result = result.find({title: filter.search});
        }

        if (filter.genre) {
            result = result.find({ genre: filter.genre});
        }

        if (filter.year) {
            result = result.where({year: Number(filter.year)});
        }
        return result;
    },
    getOne(movieId) {
        const result = Movie.findById(movieId);

        return result;
    },
    create(movieData) {

        Movie.push({
            id: newid,
            ...movieData,
            rating: Numner(movieData.rating),
        });

        return newid;
    }
}
