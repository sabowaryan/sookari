/*
  # Fix user registration trigger

  1. Database Functions
    - Create or replace `handle_new_user` function to automatically create profile entries
    - Function extracts user metadata and creates profile with proper defaults

  2. Triggers
    - Create trigger on `auth.users` table to call `handle_new_user` function
    - Ensures profile is created automatically when user signs up

  3. Security
    - Update RLS policies to allow profile creation during registration
    - Add INSERT policy for new user profile creation
*/

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, is_verified, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    false,
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add INSERT policy for profiles to allow new user creation
DROP POLICY IF EXISTS "Users can insert own profile during registration" ON profiles;

CREATE POLICY "Users can insert own profile during registration"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Also add a policy to allow the trigger to insert (service role)
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;

CREATE POLICY "Service role can insert profiles"
  ON profiles
  FOR INSERT
  TO service_role
  WITH CHECK (true);