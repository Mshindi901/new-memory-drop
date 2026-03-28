class MemoryRepository {
    constructor(MemoryModel) {
        this.MemoryModel = MemoryModel;
    };

    async createMemory(memoryData) {
        try {
            await this.MemoryModel.create({
                id: memoryData.id,
                createdBy: memoryData.createdBy,
                name: memoryData.name,
                mediaPath: memoryData.mediaPath,
                visibility: memoryData.visibility || 'private',
            });
            console.log('Memory created successfully');
        } catch (error) {
            console.error('Error creating memory:', error);
            throw error;
            return null;
        };
    };

    async updateMemory(memoryId, updatedData) {
        try {
            await this.MemoryModel.update(updatedData, {
                where: { id: memoryId }
            });
            console.log('Memory updated successfully');
        } catch (error) {
            console.error('Error updating memory:', error);
            throw error;
            return null;
        };
    };

    async deleteMemory(memoryId) {
        try {
            await this.MemoryModel.destroy({
                where: { id: memoryId }
            });
            console.log('Memory deleted successfully');
        } catch (error) {
            console.error('Error deleting memory:', error);
            throw error;
            return null;
        };
    };

    async getMemoryByCreatorId(creatorId) {
        try {
            const memories = await this.MemoryModel.findAll({
                where: { createdBy: creatorId }
            });
            
            return memories;
        } catch (error) {
            console.error('Error fetching memories:', error);
            throw error;
            return null;
        }
    };

    async getMemoryById(memoryId) {
        try {
            const memory = await this.MemoryModel.findOne({
                where: { id: memoryId }
            });
            return memory;
        } catch (error) {
            console.error('Error fetching memory:', error);
            throw error;
            return null;
        };
    };
};

module.exports = MemoryRepository;