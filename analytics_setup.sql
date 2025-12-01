-- Create analytics table to track page views
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  page_path TEXT NOT NULL,
  chapter_index INTEGER,
  chapter_title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);

-- Enable RLS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own analytics
CREATE POLICY "Users can insert own analytics" ON analytics
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can read their own analytics
CREATE POLICY "Users can read own analytics" ON analytics
FOR SELECT USING (auth.uid() = user_id);

-- Policy: Admins can read all analytics
CREATE POLICY "Admins can read all analytics" ON analytics
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);

