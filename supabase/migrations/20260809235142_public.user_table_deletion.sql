drop policy "Enable read access for owner" on "public"."users";

revoke delete on table "public"."users" from "anon";

revoke insert on table "public"."users" from "anon";

revoke references on table "public"."users" from "anon";

revoke select on table "public"."users" from "anon";

revoke trigger on table "public"."users" from "anon";

revoke truncate on table "public"."users" from "anon";

revoke update on table "public"."users" from "anon";

revoke delete on table "public"."users" from "authenticated";

revoke insert on table "public"."users" from "authenticated";

revoke references on table "public"."users" from "authenticated";

revoke select on table "public"."users" from "authenticated";

revoke trigger on table "public"."users" from "authenticated";

revoke truncate on table "public"."users" from "authenticated";

revoke update on table "public"."users" from "authenticated";

revoke delete on table "public"."users" from "service_role";

revoke insert on table "public"."users" from "service_role";

revoke references on table "public"."users" from "service_role";

revoke select on table "public"."users" from "service_role";

revoke trigger on table "public"."users" from "service_role";

revoke truncate on table "public"."users" from "service_role";

revoke update on table "public"."users" from "service_role";

alter table "public"."players" drop constraint "Players_id_fkey";

alter table "public"."users" drop constraint "user_id_fkey";

drop function if exists "public"."handle_new_user_signup"();

alter table "public"."users" drop constraint "user_pkey";

drop index if exists "public"."user_pkey";

drop table "public"."users";

alter table "public"."players" drop column "is_onboarded";

alter table "public"."players" add constraint "players_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."players" validate constraint "players_id_fkey";

drop trigger if exists "on_auth_user_created" on "auth"."users";


