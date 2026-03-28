const authMiddleware = require('../middleware/auth.js');
class UserService {
    constructor(userRepository) {
        this.userRepo = userRepository;
    };

    async signUp(user){
        try {
            const data = await authMiddleware.api.signUpEmail({
                body: {
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            });
            if (!data || !data.user) {
                throw new Error('Failed to sign up user');
                console.error('Failed to sign up user:', data);
                return;
            }
            await this.userRepo.createUser({name: user.name, email: user.email});
            console.log('User signed up successfully✅');
        } catch (error) {
            console.error('Error occurred while signing up user:', error);
        };
    };

    async signIn(email, password) {
        try {
            const data = await authMiddleware.api.signInEmail({
                body: {
                    email: email,
                    password: password,
                    rememberMe: true   
                }
            });
            if (!data || !data.user) {
                throw new Error('Failed to sign in user');
                console.error('Failed to sign in user:', data);
                return;
            };
            console.log('User signed in successfully✅');
        } catch (error) {
            console.error('Error occurred while signing in user:', error);
        }
    };
    async signOut() {
        try {
            const data = await authMiddleware.api.signOut();
            if (!data || !data.success) {
                throw new Error('Failed to sign out user');
                console.error('Failed to sign out user:', data);
                return;
            };
            console.log('User signed out successfully✅');
        } catch (error) {
            console.error('Error occurred while signing out user:', error);
        };
    };

    async getUserByEmail(email) {
        try {
            const data =await this.userRepo.getUserByEmail(email);
            if (!data) {
                throw new Error('User not found');
                console.error('User not found with email:', email);
                return null;
            };
            console.log('User retrieved successfully✅');
            return data;
        } catch (error) {
            console.error('Error occurred while retrieving user:', error);
            throw error;
        }
    };

    async getUserById(id) {
        try {
            const data = await this.userRepo.getUserById(id);
            if (!data) {
                throw new Error('User not found');
                console.error('User not found with ID:', id);
                return null;
            }
            console.log('User retrieved successfully✅');
            return data;
        } catch (error) {
            console.error('Error occurred while retrieving user:', error);
            throw error;
        }
    };
};
module.exports = UserService;