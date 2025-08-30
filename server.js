const express = require('express');
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.get('/health',(req,res) => {
    res.json({
        status:'ok',
        timestamp: new Date().toISOString()
    });
});
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})