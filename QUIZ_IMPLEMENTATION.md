# Quiz Feature Implementation Plan

## Overview
Implement a KBC-style quiz system with revision test → quiz → snapshot feedback flow.

## User Flow
1. User completes Practice Exercises
2. Clicks "Unlock Quiz" button
3. **Quiz Configuration Page:**
   - Select difficulty mix (Easy/Medium/Hard)
   - See explanation: 5 revision + 10 quiz questions
   - Warning: Don't abandon (uses Gemini tokens)
   - "Enter the Hot Seat" button with Python Bachchan welcome

4. **Revision Test (5 questions):**
   - Questions from chapter exercises in selected mix
   - Each question has: Skip, AI Hint, Submit buttons
   - Must complete all 5 (Skip or Submit)
   
5. **Revision Snapshot:**
   - Gemini analyzes what was correct in each answer
   - Shows: "Easy (1/1), Medium (2/2), Hard (1/2)"
   - Positive message + "Good luck!"

6. **Quiz Test (10 AI-generated questions):**
   - Same UI as revision
   - Skip, AI Hint, Submit per question
   
7. **Chapter Quiz Snapshot:**
   - Same analysis format
   - Recommendations: proceed OR revisit specific aspects
   - Links to relevant exercises

## Database Schema

### `revision_attempts` table:
```sql
create table revision_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  chapter_id text not null,
  question_id text not null,
  difficulty text not null,
  code_submitted text,
  was_correct boolean,
  skipped boolean default false,
  created_at timestamp with time zone default now()
);
```

### `quiz_attempts` table:
```sql
create table quiz_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  chapter_id text not null,
  question_number integer not null,
  difficulty text not null,
  question_text text not null,
  code_submitted text,
  was_correct boolean,
  skipped boolean default false,
  created_at timestamp with time zone default now()
);
```

## Components to Create

1. **QuizConfigPage** - Difficulty selector + explanation
2. **QuizQuestion** - Reusable question component (Skip/Hint/Submit)
3. **RevisionSnapshot** - Analysis + scores by difficulty
4. **QuizSnapshot** - Final analysis + recommendations

## API Routes

1. **/api/generate-quiz** - Generate 10 AI questions based on chapter + difficulty mix
2. **/api/analyze-answer** - Gemini analyzes what was correct in user's code

## Implementation Steps

### Phase 1: UI Components (Current)
- [x] Add quiz section type
- [x] Add quiz icon
- [ ] Create QuizConfigPage component
- [ ] Create QuizQuestion component
- [ ] Add quiz rendering to main page

### Phase 2: Revision Test
- [ ] Select 5 questions from chapter exercises
- [ ] Implement Skip/Hint/Submit logic
- [ ] Track completion state

### Phase 3: Snapshots
- [ ] Create API route for answer analysis
- [ ] Build RevisionSnapshot component
- [ ] Build QuizSnapshot component

### Phase 4: AI Quiz Generation
- [ ] Create /api/generate-quiz route
- [ ] Implement quiz flow
- [ ] Handle quiz completion

### Phase 5: Database Logging
- [ ] Create Supabase tables
- [ ] Log revision attempts
- [ ] Log quiz attempts

## Next Immediate Steps
1. Create QuizConfigPage component
2. Add quiz section rendering to page.tsx
3. Implement difficulty selector UI
