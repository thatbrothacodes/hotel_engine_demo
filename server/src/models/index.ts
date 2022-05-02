import { createClient } from 'redis';

const host = (process.env.NODE_ENV) ? 'redis' : 'localhost'

export default createClient({
    socket: {
        host: `${host}`
    } 
});
