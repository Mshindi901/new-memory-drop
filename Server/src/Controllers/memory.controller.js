const memoryService = require('../Services/memory.service.js');
const {memoryModel} = require('../../models/index.js');
const memoryRepo = require('../Repositories/memory.repository.js');
const Supabase = require('../middleware/supabase.js');

const MemoryRepo = new memoryRepo(memoryModel);
const MemoryService = new memoryService(MemoryRepo);

async function createMemory(req, res){
    try {
        const {name, visibility} = req.body;
        const {creatorId} = req.params;
        const file  = req.file;
        if(!name || !creatorId || !file || !visibility){
            return res.status(400).json({
                success: false,
                message: 'Name, File and Visibility are required'
            });
        };
        const {error} = await Supabase.storage.from('memory-drop').upload(`memories/${file.originalname}`, file.buffer, {cacheControl: '3600', upsert: false});
        if(error){
            return res.status(500).json({
                success: false,
                message: 'Error uploading file to Supabase'
            });
        };
        const {data} = await Supabase.storage.from('memory-drop').getPublicUrl(`memories/${file.originalname}`);
        let mediaPath = data.publicUrl;
        const memory = await MemoryService.createMemory(name, mediaPath, creatorId, visibility);
        if(!memory){
            return res.status(500).json({
                success: false,
                message: 'Error creating memory'
            });
        };
        res.status(201).json({
            success: true,
            message: 'Memory created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server error'
        });
    };
};

async function getMemories(req, res){
    try {
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        };
        const memories = await MemoryService.getMemories(userId);
        res.status(200).json({
            success: true,
            message: 'Memories retrieved successfully',
            data: memories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server error'
        });
    }
};

async function updateMemory(req, res){
    try {
        const {memoryId} = req.params;
        const {name} = req.body;
        const file  = req.file;

        if(!memoryId || !name || !file){
            return res.status(400).json({
                success: false,
                message: 'Memory ID, Name and File are required'
            });
        };
        //check if memory exists
        const existingMemory = await MemoryService.getMemoryById(memoryId);
        if(!existingMemory){
            return res.status(404).json({
                success: false,
                message: 'Memory not found'
            });
        };
        //delete old file from supabase
        const oldFilePath = existingMemory.mediaPath.split('/').slice(-2).join('/');
        const {error: deleteError} = await Supabase.storage.from('memory-drop').remove([oldFilePath]);
        if(deleteError){
            return res.status(500).json({
                success: false,
                message: 'Error deleting old file from Supabase'
            });
        };

        //upload new file to supabase
        const {error} = await Supabase.storage.from('memory-drop').upload(`memories/${file.originalname}`, file.buffer, {cacheControl: '3600', upsert: false});
        if(error){
            return res.status(500).json({
                success: false,
                message: 'Error uploading file to Supabase'
            });
        };
        const {data} = await Supabase.storage.from('memory-drop').getPublicUrl(`memories/${file.originalname}`);
        let mediaPath = data.publicUrl;
        const memory = await MemoryService.updateMemory(memoryId, name, mediaPath);
        if(!memory){
            return res.status(500).json({
                success: false,
                message: 'Error updating memory'
            });
        };
        res.status(200).json({
            success: true,
            message: 'Memory updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server error'
        });
    }
};

async function deleteMemory(req, res){
    try {
        const memoryId = req.params.memoryId;
        if(!memoryId){
            return res.status(400).json({
                success: false,
                message: 'Memory ID is required'
            });
        };
        //check if memory exists
        const existingMemory = await MemoryService.getMemoryById(memoryId);
        if(!existingMemory){
            return res.status(404).json({
                success: false,
                message: 'Memory not found'
            });
        };

        //delete file from supabase
        const filePath = existingMemory.mediaPath.split('/').slice(-2).join('/');
        const {error: deleteError} = await Supabase.storage.from('memory-drop').remove([filePath]);
        if(deleteError){
            return res.status(500).json({
                success: false,
                message: 'Error deleting file from Supabase'
            });
        };
        const memory = await MemoryService.deleteMemory(memoryId);
        if(!memory){
            return res.status(500).json({
                success: false,
                message: 'Error deleting memory'
            });
        };
        res.status(200).json({
            success: true,
            message: 'Memory deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server error'
        });
    }
};

module.exports = {
    createMemory,
    getMemories,
    updateMemory,
    deleteMemory
};