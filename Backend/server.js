const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/todoapp';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const taskRoutes = require('./routes/taskRoutes');

// Serve Angular frontend static files
app.use(express.static(path.join(__dirname, '../FrontEnd/dist/todo-angular-app')));

// Use task routes
app.use('/api', taskRoutes);

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/dist/todo-angular-app/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
