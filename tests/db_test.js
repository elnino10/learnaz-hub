import dbClient from '../utils/db.js';

const testDBClient = async () => {
    try {
        console.log('Testing DBClient connection...');

        // Wait a moment to ensure the connection is established
        await new Promise(resolve => setTimeout(resolve, 1000));

        const isAlive = dbClient.isAlive();
        console.log(`Is the database connection alive? ${isAlive ? 'Yes' : 'No'}`);

        if (isAlive) {
            console.log('Database connection test passed.');
        } else {
            console.log('Database connection test failed.');
        }
    } catch (error) {
        console.error('An error occurred during the test:', error);
    } finally {
        await dbClient.client.close();
    }
};

testDBClient();
