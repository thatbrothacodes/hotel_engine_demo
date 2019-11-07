import redis from 'redis';
import axios from 'axios';

const client = redis.createClient({
    port: 6379,
    host: (process.env.NODE_ENV) ? 'redis' : 'localhost'
});

export default (req, res, next) => {
    const apiUrl = `https://api.github.com/search${req.originalUrl}`;
    let key = "__express__" + req.originalUrl || req.url;

    client.get(key, (err, reply) => {
        if(err) {
            res.status(500).json({
                error: 'Internal Sever Error'
            });
        }
        if(reply) {
            res.locals.searchResult = JSON.parse(reply);
            next();
        } else {
            axios.get(apiUrl)
                .then(externalRes => {
                    client.set(key, JSON.stringify(externalRes.data));
                    res.locals.searchResult = externalRes.data;
                    next();
                }).catch(() => {
                    res.status(500).json({
                        error: 'Internal Sever Error'
                    });
                });
        }
    });
};
