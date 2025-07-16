/*
  # Create jobs table and related tables

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `location` (text)
      - `type` (text)
      - `salary` (text)
      - `description` (text)
      - `requirements` (text array)
      - `responsibilities` (text array)
      - `benefits` (text array)
      - `skills` (text array)
      - `posted_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `job_id` (uuid, foreign key to jobs)
      - `status` (text)
      - `applied_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  salary text,
  description text NOT NULL,
  requirements text[],
  responsibilities text[],
  benefits text[],
  skills text[],
  posted_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  status text DEFAULT 'Applied',
  applied_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, job_id)
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Jobs policies (public read, admin write)
CREATE POLICY "Anyone can view jobs"
  ON jobs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Applications policies
CREATE POLICY "Users can view their own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample jobs
INSERT INTO jobs (title, company, location, type, salary, description, requirements, responsibilities, benefits, skills) VALUES
(
  'Senior Frontend Developer',
  'TechCorp Inc.',
  'San Francisco, CA',
  'Full-time',
  '$120,000 - $150,000',
  'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing user interface components and implementing them following well-known React.js workflows.',
  ARRAY[
    '5+ years of experience in frontend development',
    'Strong proficiency in React.js and its core principles',
    'Experience with popular React.js workflows (such as Flux or Redux)',
    'Familiarity with newer specifications of EcmaScript'
  ],
  ARRAY[
    'Developing new user-facing features using React.js',
    'Building reusable components and front-end libraries for future use',
    'Translating designs and wireframes into high quality code',
    'Optimizing components for maximum performance'
  ],
  ARRAY[
    'Competitive salary and equity package',
    'Health, dental, and vision insurance',
    'Flexible working hours and remote work options',
    'Professional development opportunities'
  ],
  ARRAY['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML']
),
(
  'Backend Engineer',
  'DataFlow Solutions',
  'New York, NY',
  'Full-time',
  '$110,000 - $140,000',
  'Join our backend team to build scalable and robust server-side applications. Experience with Node.js and database management is required.',
  ARRAY[
    '3+ years of backend development experience',
    'Strong knowledge of Node.js and Express.js',
    'Experience with SQL and NoSQL databases',
    'Understanding of RESTful API design'
  ],
  ARRAY[
    'Design and implement scalable backend services',
    'Develop and maintain APIs',
    'Optimize database queries and performance',
    'Collaborate with frontend developers'
  ],
  ARRAY[
    'Competitive salary',
    'Health insurance',
    'Remote work flexibility',
    '401(k) matching'
  ],
  ARRAY['Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker']
);