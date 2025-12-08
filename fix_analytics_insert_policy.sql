-- Fix the INSERT policy - it currently has NULL qual which prevents inserts
-- Drop and recreate with proper WITH CHECK clause

DROP POLICY IF EXISTS "Users can insert own analytics" ON analytics;

CREATE POLICY "Users can insert own analytics" ON analytics
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Verify it was created correctly
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'analytics' AND cmd = 'INSERT';



