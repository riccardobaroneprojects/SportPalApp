CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER -- <--- THIS turns Security Definer ON
SET search_path = public
AS $$
BEGIN
  INSERT INTO public."Users" (id, account_type)
  VALUES (new.id, NULL);
  RETURN new;
END;
$$;