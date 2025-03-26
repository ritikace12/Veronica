require('dotenv').config(); // Load environment variables
const app = require("./src/app");

const PORT = process.env.PORT || 3000; // Use Render's assigned port

// Default Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
