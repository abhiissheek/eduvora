const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config');

// Route files
const authRoutes = require('./routes/auth');
const companionRoutes = require('./routes/companions');

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware - Allow all origins for testing
app.use(cors({
  origin: true,
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', require('./routes/chat'));
app.use('/api/companions', companionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
