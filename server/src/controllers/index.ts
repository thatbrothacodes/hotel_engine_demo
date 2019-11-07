import repositoriesRouter from './repositories';

export default (router) => {
    router.use('/repositories', repositoriesRouter());
    
    return router;
};
