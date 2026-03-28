const express = require('express');
const cors = require('cors')
const authRoutes = require('./src/Routes/auth.routes.js');
const memoryRoutes = require('./src/Routes/memory.routes.js');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/memories', memoryRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});