import express from 'express';
import redisMiddleware from '../middleware/redis';

export default () => {
    const router = express.Router();

    router.get('/', redisMiddleware, async(req, res, next) => {
        try {
            res.status(200).json(res.locals.searchResult);
        } catch(e) {
            res.status(500).json({
                error: 'Internal Sever Error'
            });
            next(e);
        }
    });

    return router;
}
