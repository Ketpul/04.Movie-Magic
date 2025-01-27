import { v4 as uuid } from 'uuid';
//import movies from "../movies.js";
import Movie from "../models/Movie.js";

export default {
     getAll(filter = {}){
        // if(filter.search){
        //     result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        // }

        // if (filter.genre) {
        //     result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
        // }

        // if (filter.year) {
        //     result = result.filter(movie => movie.year === filter.year);
        // }
        return Movie.find({});
    },
    getOne(movieId) {
        const result = Movie.findById(movieId);

        return result;
    },
    create(movieData) {
        const newid = uuid();

        Movie.push({
            id: newid,
            ...movieData,
            rating: Numner(movieData.rating),
        });

        return newid;
    }
}
