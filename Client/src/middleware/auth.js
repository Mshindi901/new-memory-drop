const {betterAuth} = require('better-auth');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    authUrl: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
    } 
});

module.exports = authMiddleware;