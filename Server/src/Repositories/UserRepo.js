    

class UserRepo {
    constructor(userModel) {
        this.user = userModel; 
    };

    async createUser(user) {
        try {
            await this.user.create({
                name: user.name,
                email: user.email
            });
            console.log('User created successfully');
        } catch (error) {
            throw error;
        }
    };

    async updateUser(id, user) {
        try {
            await this.user.update({
                name: user.name,
                email: user.email, 
            }, {
                where: {
                    id: id
                }
            });
            console.log('User updated successfully');
        } catch (error) {
            throw error;
            console.error('Error updating user:', error);
        }
    };

    async deleteUser(id) {
        try {
            await this.user.destroy({
                where: {id: id}
            });
            console.log('User deleted successfully');
        } catch (error) {
            throw error;
            console.error('Error deleting user:', error);
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.user.findOne({
                where: {
                    email: email
                }
            });
            console.log('User retrieved successfully');
        } catch (error) {
            throw error;
            console.error('Error retrieving user:', error);
        }
    };

    async getUserById(id) {
        try {
            return await this.user.findOne({
                where: {id: id}
            });
            console.log('User retrieved successfully');
        } catch (error) {
            throw error;
            console.error('Error retrieving user:', error);
        }
    };
};

module.exports = UserRepo;