const dotenv = require('dotenv'); // Import dotenv to load environment variables
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET
}