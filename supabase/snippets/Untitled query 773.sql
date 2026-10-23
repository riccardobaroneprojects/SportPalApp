-- 1. Drop the trigger from the auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Drop the associated trigger function
DROP FUNCTION IF EXISTS public.handle_new_user_signup();