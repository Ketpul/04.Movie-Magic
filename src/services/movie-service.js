import { v4 as uuid } from 'uuid';
import movies from "../movies.js";

export default {
    getAll(){
        return movies;
    },
    findMovie(movieId) {
        const result = movies.find(movie => movie.id == movieId);

        return result;
    },
    create(movieData) {
        const newid = uuid();

        movies.push({
            id: newid,
            ...movieData
        });

        return newid;
    }
}
