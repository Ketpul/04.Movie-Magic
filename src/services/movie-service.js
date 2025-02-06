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
    getOneWithCasts(movieId) {
        return this.getOne(movieId).populate('casts');
    },
    create(movieData, createrId) {
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year:Number(movieData.year),
            creator: createrId,
        });

        return result;
    },
    attachCast(movieId, castId) {
        return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
    },
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData){
        return Movie.findByIdAndUpdate(movieId, movieData, {runValidators: true});
    }
}
