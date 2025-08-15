-- Create a test user for login testing
-- This script should be run AFTER the database tables are created

-- First, you need to create the user through Supabase Auth
-- You can do this by:
-- 1. Using the signup form at /signup
-- 2. Or manually in Supabase dashboard

-- Test user credentials to create:
-- Email: test@eduvora.com
-- Password: TestUser123!

-- After creating the user through auth, this will ensure they have a profile
INSERT INTO profiles (id, email, full_name, subscription_tier, created_at, updated_at)
SELECT 
  auth.uid(),
  'test@eduvora.com',
  'Test User',
  'free',
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE email = 'test@eduvora.com'
);

-- Create a sample AI companion for the test user
INSERT INTO ai_companions (user_id, name, subject, personality, difficulty_level, description, created_at, updated_at)
SELECT 
  auth.uid(),
  'Math Tutor',
  'Mathematics',
  'patient',
  'intermediate',
  'A friendly math tutor to help with algebra and calculus',
  now(),
  now()
WHERE EXISTS (
  SELECT 1 FROM profiles WHERE email = 'test@eduvora.com'
);
