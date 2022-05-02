import axios from 'axios';

export default (db) => {
    return (req, res, next) => {
        const apiUrl = `https://api.github.com/search${req.originalUrl}`;
        let key = "__express__" + req.originalUrl || req.url;
        const apiClient = axios.create();

        return db.get(key)
                .then(reply => {
                    if(reply) {
                        res.locals.searchResult = JSON.parse(reply);
                        next();
                    } else {
                        apiClient.get(apiUrl)
                            .then(externalRes => {
                                db.set(key, JSON.stringify(externalRes.data));
                                res.locals.searchResult = externalRes.data;
                                next();
                            }).catch(() => {
                                res.status(500).json({
                                    error: 'Internal Sever Error'
                                });
                            });
                    }
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: 'Internal Sever Error'
                    });
                });
    }
};


