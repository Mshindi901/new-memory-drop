const express = require('express');
const router = express.Router();
const MemoryController = require('../Controllers/memory.controller.js');

router.post('/add', MemoryController.createMemory);
router.get('/get/:userId', MemoryController.getMemories);
router.delete('/delete/:memoryId', MemoryController.deleteMemory);
router.put('/update/:memoryId', MemoryController.updateMemory);

module.exports = router;

