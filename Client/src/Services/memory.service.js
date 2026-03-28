class MemoryService {
    constructor(memoryRepo){
        this.memoryRepo = memoryRepo
    };

    async createMemory(userId, name, mediaPath, visibility) {
        try {
            const newMemory = await this.memoryRepo.createMemory({
                createdBy: userId,
                name,
                mediaPath,
                visibility: visibility || 'private',
            });
            if (!newMemory) {
                throw new Error('Failed to create memory');
                return null;
            };
            console.log('Memory created successfully:', newMemory);
        } catch (error) {
            console.error('Error creating memory:', error);
            throw error;
        }
    };

    async updateMemory(memoryId, name, mediaPath, visibility) {
        try {
            const memory = await this.memoryRepo.getMemoryById(memoryId);
            if (!memory) {
                throw new Error('Memory not found');
                return null;
            }
            const updatedMemory = await this.memoryRepo.updateMemory(memoryId, { name, mediaPath, visibility: visibility || 'private' });
            console.log('Memory updated successfully:', updatedMemory);
        } catch (error) {
            console.error('Error updating memory:', error);
            throw error;
        }
    };

    async deleteMemory(memoryId) {
        try {
            const memory = await this.memoryRepo.getMemoryById(memoryId);
            if (!memory) {
                throw new Error('Memory not found');
                return null;
            }
            const deletedMemory = await this.memoryRepo.deleteMemory(memoryId);
            console.log('Memory deleted successfully:', deletedMemory);
        } catch (error) {
            console.error('Error deleting memory:', error);
            throw error;
        }
    };

    async getMemoriesByCreatorId(userId) {
        try {
            const memories = await this.memoryRepo.getMemoryByCreatorId(userId);
            if (!memories) {
                throw new Error('No memories found for this user');
                return null;
            };
            console.log('Memories fetched successfully:');
            return memories;
        } catch (error) {
            console.error('Error fetching memories:', error);
            throw error;
        }
    };

    async getMemoryById(memoryId) {
        try {
            const memory = await this.memoryRepo.getMemoryById(memoryId);
            if (!memory) {
                throw new Error('Memory not found');
                return null;
            }
            console.log('Memory fetched successfully:', memory);
            return memory;
        } catch (error) {
            console.error('Error fetching memory:', error);
            throw error;
        }
    };
};

module.exports = MemoryService;