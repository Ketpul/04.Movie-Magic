import { Router } from 'express';

import hoemeController from './controllers/homeController.js';
import movieController from './controllers/movie-controller.js';
import castController from './controllers/cast-controller.js';

const routes = Router();

routes.use(hoemeController);
routes.use('/movies', movieController);
routes.use('/casts', castController);

routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;
