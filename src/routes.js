import { Router } from 'express';
import hoemeController from './controllers/homeController.js';

const routes = Router();

routes.use(hoemeController);

routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;
