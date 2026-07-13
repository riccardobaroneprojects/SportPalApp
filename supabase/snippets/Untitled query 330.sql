CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS trigger
LANGUAGE plpgsql
-- Secure the search_path by forcing it to look only at public or pg_catalog
SET search_path = public, pg_catalog 
AS $$
BEGIN
  INSERT INTO public."Users" (id, account_type)
  VALUES (new.id, NULL);
  RETURN new;
END;
$$;