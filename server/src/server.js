import app from './app.js';
import ApplicationDataSource from './data-source.js';

const port = process.env.PORT || 1234;

// IIFE
(async () => {
    try {
        await ApplicationDataSource.connect();   
        console.log('Database connection open');
        app.listen(port, () => {
            console.log(`server started at port ${port}`);
        })
    }
    catch (err) {
        console.error('sever crashed', err);
    }
})()