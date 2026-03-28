const {userModel} = require('../../models/index.js');
const UserRepository = require('../Repositories/UserRepo.js');
const UserService = require('../Services/user.service.js');

const userRepo = new UserRepository(userModel);
const userService = new UserService(userRepo);

async function signUp(req, res) {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
        };
        //User Check by email
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser === null) {
            await userService.signUp(req.body);
            res.status(201).json({ success: true, message: 'User signed up successfully' });
        } else {
            res.status(400).json({ success: false, message: 'User with this email already exists' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        };
        //Check Email
        const existingUser = await userService.getUserByEmail(email);
        if(existingUser){
            await userService.signIn(email, password);
            res.status(200).json({ success: true, message: 'User signed in successfully' });
        } else {
            res.status(400).json({success: false, message: 'User not Registered'});
        }; 
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

async function getUser(req, res) {
    try {
        const email = req.params;
        if(!email){
            return res.status(400).json({success:false, message: 'Email is required'});
        };
        const user = await userService.getUserByEmail(email);
        if(user){
            res.status(200).json({success: true, user: user});
        } else {
            res.status(404).json({success: false, message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error: ',Error:error.message });
    };
};

module.exports = {
    signUp,
    signIn,
    getUser
};
