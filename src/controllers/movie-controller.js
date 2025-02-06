import { Router } from 'express';
import { getErrorMessage } from "../utils/error-utils.js"

import movieService from "../services/movie-service.js"
import castService from '../services/cast-services.js';
import { isAuthorized } from '../middlewares/auth-middleware.js';


const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter).lean();

    res.render('search', { movies, filter });
});

movieController.get('/create', isAuthorized, (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;

    await movieService.create(newMovie, userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOneWithCasts(movieId).lean();

    const isCreator = movie.creator?.equals(req.user?.id);

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll({ exclude: movie.casts }).lean();

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attachCast(movieId, castId)

    res.redirect(`/movies/${movieId}/details`)
});

movieController.get('/:movieId/delete', isAuthorized, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    if (movie.creator?.equals(req.user?.id)) {
        await movieService.delete(movieId);
        return res.redirect('/');
    }

    return res.redirect('/404');

});


movieController.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    const categories = getCategoriesViewData(movie.category);

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    try {
        await movieService.update(movieId, movieData);

    } catch (err) {
        return res.render('movie/edit', {movie: movieData, error: getErrorMessage(err)})
    }


    res.redirect(`/movies/${movieId}/details`)
});

function getCategoriesViewData(category) {
    const categoriesMap = {
        'tv-show': 'tv-show',
        'animation': 'animation',
        'movie': 'movie',
        'documentary': 'documentary',
        'short-film': 'short-film',
    };

    const categories = Object.keys(categoriesMap).map(value => ({
        value: value, label: categoriesMap[value], selected: value === category ? 'selected' : '',
    }));

    return categories;
}
export default movieController;