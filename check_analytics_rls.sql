-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'analytics';

-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'analytics';

-- Test: Try to see if the policy allows inserts
-- Run this as the authenticated user in Supabase SQL Editor
-- (It should work if RLS is set up correctly)

-- If policies don't exist, create them:
DROP POLICY IF EXISTS "Users can insert own analytics" ON analytics;
DROP POLICY IF EXISTS "Users can read own analytics" ON analytics;
DROP POLICY IF EXISTS "Admins can read all analytics" ON analytics;

CREATE POLICY "Users can insert own analytics" ON analytics
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own analytics" ON analytics
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all analytics" ON analytics
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);



