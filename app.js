const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');
const cors=require('cors');
const axios=require('axios');







//task
const taskSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true,
      maxlength:100
    },
    description:{
      type:String,
      maxlength:500
    },
    status:{
      type:String,
      enum:['pending', 'in-progress', 'completed'],
      default:'pending'
    },
    priority:{
      type:String,
      enum:['low', 'medium', 'high'],
      default:'medium'
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User', // Assumes a 'User' model exists
      required:true
    },
    createdAt:{
      type:Date,
      default:Date.now
    },
    updatedAt:{
      type:Date,
      default:Date.now
    }
  });
  
  // Optional: Add a pre-save hook to update updatedAt on every save
  taskSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Task = mongoose.model('Task', taskSchema);
  
  module.exports = Task;
  console.log('db connected successfully');

//hash
  const jwt = require('jsonwebtoken');
  
  const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a strong, environment-variable-based secret
  const SALT_ROUNDS = 10;
  const TOKEN_EXPIRATION = '24h';
  
  /**
   * Hashes a plain-text password using bcrypt.
   * @param {string} password - The plain-text password to hash.
   * @returns {Promise<string>} - The hashed password.
   */
  async function hashPassword(password) {
      try {
          const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
          return hashedPassword;
      } catch (error) {
          console.error('Error hashing password:', error);
          throw new Error('Failed to hash password');
      }
  }
  
  /**
   * Compares a plain-text password with a hashed password.
   * @param {string} password - The plain-text password.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>} - True if passwords match, false otherwise.
   */
  async function comparePassword(password, hashedPassword) {
      try {
          const isMatch = await bcrypt.compare(password, hashedPassword);
          return isMatch;
      } catch (error) {
          console.error('Error comparing password:', error);
          throw new Error('Failed to compare password');
      }
  }
  
  /**
   * Generates a JSON Web Token (JWT).
   * @param {object} payload - The data to include in the token.
   * @returns {string} - The generated JWT token.
   */
  function generateToken(payload) {
      try {
          const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
          return token;
      } catch (error) {
          console.error('Error generating token:', error);
          throw new Error('Failed to generate token');
      }
  }
  
  /**
   * Verifies and decodes a JSON Web Token (JWT).
   * @param {string} token - The JWT token to verify.
   * @returns {object} - The decoded payload if the token is valid.
   * @throws {Error} - If the token is invalid or expired.
   */
  function verifyToken(token) {
      try {
          const decoded = jwt.verify(token, JWT_SECRET);
          return decoded;
      } catch (error) {
          console.error('Error verifying token:', error);
          if (error.name === 'TokenExpiredError') {
              throw new Error('Token expired');
          }
          throw new Error('Invalid token');
      }
  }
  
  module.exports = {
      hashPassword,
      comparePassword,
      generateToken,
      verifyToken,
  };
  console.log('db connected successfully');



//authnetication
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

