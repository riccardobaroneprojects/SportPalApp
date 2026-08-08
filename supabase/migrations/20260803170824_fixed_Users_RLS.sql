set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public."Users" (id, account_type)
  VALUES (new.id, NULL);
  RETURN new;
END;
$function$
;


