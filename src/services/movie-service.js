import { v4 as uuid } from 'uuid';
import movies from "../movies.js";

export default {
    getAll(filter = {}){
        let result = movies;

        if(filter.search){
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        }
        return result;
    },
    findMovie(movieId) {
        const result = movies.find(movie => movie.id == movieId);

        return result;
    },
    create(movieData) {
        const newid = uuid();

        movies.push({
            id: newid,
            ...movieData,
            rating: Numner(movieData.rating),
        });

        return newid;
    }
}
