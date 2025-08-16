// Environment configuration
const config = {
  PORT: process.env.PORT || 5001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-auth',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // Groq API configuration
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  
  // Supabase configuration (if needed)
  SUPABASE_URL: process.env.SUPABASE_URL || 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'your-anon-key',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'
};

module.exports = config;
