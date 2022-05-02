import repositoriesRouter from './repositories';

export default (router, db) => {
    router.use('/repositories', repositoriesRouter(db));
    
    return router;
};
