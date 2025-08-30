
const express=require('express');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    if (token == null) return res.sendStatus(401); // No token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Attach user information to the request
        next();
    });
};

router.post('/tasks', authenticateToken, (req, res) => {
    // ... rest of the task creation logic
});
// Inside the POST /api/tasks route handler, after authentication
router.post('/tasks', authenticateToken, (req, res) => {
    const { title, description } = req.body; // Assuming description is optional

    if (!title) {
        return res.status(400).json({ message: 'Title is required.' });
    }
    // ... continue to next steps
});
// / Inside the POST /api/tasks router,handler
router.post('/tasks', authenticateToken()), async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required.' });
    }

    const userId = req.user.id; // Assuming user ID is available in req.user

    const newTask = {
        title,
        description,
        userId, // Associate task with user
        completed: false // Default status
    };
    // ... continue to next steps
}
// Inside the POST /api/tasks route handler, using a hypothetical Task model
router.post('/tasks', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required.' });
    }
    const userId = req.user.id;

    try {
        // Assuming a Mongoose/Sequelize-like model
        const task = await Task.create({
            title,
            description,
            userId,
            completed: false
        });
        // ... continue to next step
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ message: 'Error creating task.' });
    }
});
// Inside the POST /api/tasks router handler, after saving to DB
router.post('/tasks', authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required.' });
    }
    const userId = req.user.id;

    try {
        const task = await Task.create({
            title,
            description,
            userId,
            completed: false
        });
        return res.status(201).json(task); // Return the created task with 201 status
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ message: 'Error creating task.' });
    }
});

module.exports = router; // Export the router if in a separate file
console.log('db connected successfully');

