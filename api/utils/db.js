// Load environment variables using dotenv
require('dotenv').config()

// Destructure the environment variables for the database instance username, password, host, port, and name
const {
    DB_INSTANCE_USERNAME,
    DB_INSTANCE_PASSWORD,
    DB_INSTANCE_HOST,
    DB_INSTANCE_PORT,
    DB_NAME
} = process.env

// Import pg-promise library and create a connection to the database using the environment variables
const pgp = require('pg-promise')(/* options */)
const db = pgp(`postgres://${DB_INSTANCE_USERNAME}:${DB_INSTANCE_PASSWORD}@${DB_INSTANCE_HOST}:${DB_INSTANCE_PORT}/${DB_NAME}`)

// Function to retrieve an existing explanation from the database based on a given keyword
async function getExistingExplanation(keyword) {
    try {
        // Use the 'oneOrNone' method of the pg-promise library to execute a SQL query and retrieve the first result (or null if no results are returned)
        const data = await db.oneOrNone(`SELECT * FROM keywords where keyword = '${keyword.toLowerCase()}' LIMIT 1`);
        // If data exists, return the 'explanation' column value from the result object, otherwise return null
        return data?.explanation;
    } catch(err) {
        // If an error occurs, return null
        return null;
    }
}

// Function to save a new explanation to the database for a given keyword
async function saveNewExplanation({keyword, explanation}) {
    try {
        // Execute a SQL query using the 'query' method of the pg-promise library to insert a new row into the 'keywords' table with the given 'keyword' and 'explanation', or update the 'explanation' column value for the existing 'keyword' if it already exists
        // The 'no-template-curly-in-string' eslint rule is disabled for this line because we need to use template literals for the SQL query syntax
        await db.query('INSERT INTO keywords (keyword, explanation) VALUES(${keyword}, ${explanation}) ON CONFLICT (keyword) DO UPDATE SET explanation = ${explanation}', {keyword: keyword.toLowerCase(), explanation});
    } catch(err) {
        // If an error occurs, log the error to the console
        console.log(err);
    }
}

// Export the 'getExistingExplanation' and 'saveNewExplanation' functions so they can be used by other modules
module.exports = {
    getExistingExplanation,
    saveNewExplanation
};
