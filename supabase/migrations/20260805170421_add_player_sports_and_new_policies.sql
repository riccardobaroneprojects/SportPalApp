drop policy "Enable delete for users based on user_id" on "public"."Announcement";

drop policy "Enable read access for all users" on "public"."Announcement";

drop policy "Enable update for users based on user_id" on "public"."Announcement";

drop policy "Enable read access for all users" on "public"."Players";

drop policy "Enable update for users based on user_id" on "public"."Players";

drop policy "Enable read access for owner" on "public"."Users";

revoke delete on table "public"."Announcement" from "anon";

revoke insert on table "public"."Announcement" from "anon";

revoke references on table "public"."Announcement" from "anon";

revoke select on table "public"."Announcement" from "anon";

revoke trigger on table "public"."Announcement" from "anon";

revoke truncate on table "public"."Announcement" from "anon";

revoke update on table "public"."Announcement" from "anon";

revoke delete on table "public"."Announcement" from "authenticated";

revoke insert on table "public"."Announcement" from "authenticated";

revoke references on table "public"."Announcement" from "authenticated";

revoke select on table "public"."Announcement" from "authenticated";

revoke trigger on table "public"."Announcement" from "authenticated";

revoke truncate on table "public"."Announcement" from "authenticated";

revoke update on table "public"."Announcement" from "authenticated";

revoke delete on table "public"."Announcement" from "service_role";

revoke insert on table "public"."Announcement" from "service_role";

revoke references on table "public"."Announcement" from "service_role";

revoke select on table "public"."Announcement" from "service_role";

revoke trigger on table "public"."Announcement" from "service_role";

revoke truncate on table "public"."Announcement" from "service_role";

revoke update on table "public"."Announcement" from "service_role";

revoke delete on table "public"."Announcement_members" from "anon";

revoke insert on table "public"."Announcement_members" from "anon";

revoke references on table "public"."Announcement_members" from "anon";

revoke select on table "public"."Announcement_members" from "anon";

revoke trigger on table "public"."Announcement_members" from "anon";

revoke truncate on table "public"."Announcement_members" from "anon";

revoke update on table "public"."Announcement_members" from "anon";

revoke delete on table "public"."Announcement_members" from "authenticated";

revoke insert on table "public"."Announcement_members" from "authenticated";

revoke references on table "public"."Announcement_members" from "authenticated";

revoke select on table "public"."Announcement_members" from "authenticated";

revoke trigger on table "public"."Announcement_members" from "authenticated";

revoke truncate on table "public"."Announcement_members" from "authenticated";

revoke update on table "public"."Announcement_members" from "authenticated";

revoke delete on table "public"."Announcement_members" from "service_role";

revoke insert on table "public"."Announcement_members" from "service_role";

revoke references on table "public"."Announcement_members" from "service_role";

revoke select on table "public"."Announcement_members" from "service_role";

revoke trigger on table "public"."Announcement_members" from "service_role";

revoke truncate on table "public"."Announcement_members" from "service_role";

revoke update on table "public"."Announcement_members" from "service_role";

revoke delete on table "public"."Players" from "anon";

revoke insert on table "public"."Players" from "anon";

revoke references on table "public"."Players" from "anon";

revoke select on table "public"."Players" from "anon";

revoke trigger on table "public"."Players" from "anon";

revoke truncate on table "public"."Players" from "anon";

revoke update on table "public"."Players" from "anon";

revoke delete on table "public"."Players" from "authenticated";

revoke insert on table "public"."Players" from "authenticated";

revoke references on table "public"."Players" from "authenticated";

revoke select on table "public"."Players" from "authenticated";

revoke trigger on table "public"."Players" from "authenticated";

revoke truncate on table "public"."Players" from "authenticated";

revoke update on table "public"."Players" from "authenticated";

revoke delete on table "public"."Players" from "service_role";

revoke insert on table "public"."Players" from "service_role";

revoke references on table "public"."Players" from "service_role";

revoke select on table "public"."Players" from "service_role";

revoke trigger on table "public"."Players" from "service_role";

revoke truncate on table "public"."Players" from "service_role";

revoke update on table "public"."Players" from "service_role";

revoke delete on table "public"."Users" from "anon";

revoke insert on table "public"."Users" from "anon";

revoke references on table "public"."Users" from "anon";

revoke select on table "public"."Users" from "anon";

revoke trigger on table "public"."Users" from "anon";

revoke truncate on table "public"."Users" from "anon";

revoke update on table "public"."Users" from "anon";

revoke delete on table "public"."Users" from "authenticated";

revoke insert on table "public"."Users" from "authenticated";

revoke references on table "public"."Users" from "authenticated";

revoke select on table "public"."Users" from "authenticated";

revoke trigger on table "public"."Users" from "authenticated";

revoke truncate on table "public"."Users" from "authenticated";

revoke update on table "public"."Users" from "authenticated";

revoke delete on table "public"."Users" from "service_role";

revoke insert on table "public"."Users" from "service_role";

revoke references on table "public"."Users" from "service_role";

revoke select on table "public"."Users" from "service_role";

revoke trigger on table "public"."Users" from "service_role";

revoke truncate on table "public"."Users" from "service_role";

revoke update on table "public"."Users" from "service_role";

alter table "public"."Announcement" drop constraint "Announcement_owner_fkey";

alter table "public"."Announcement_members" drop constraint "annouuncement_members_announcement_fkey";

alter table "public"."Announcement_members" drop constraint "annouuncement_members_player_fkey";

alter table "public"."Players" drop constraint "Player_username_key";

alter table "public"."Players" drop constraint "Players_id_fkey";

alter table "public"."Users" drop constraint "user_id_fkey";

alter table "public"."Announcement" drop constraint "Announcement_pkey";

alter table "public"."Announcement_members" drop constraint "annouuncement_members_pkey";

alter table "public"."Players" drop constraint "Player_pkey";

alter table "public"."Users" drop constraint "user_pkey";

drop index if exists "public"."Announcement_pkey";

drop index if exists "public"."annouuncement_members_pkey";

drop index if exists "public"."unique_announcement_player";

drop index if exists "public"."Player_pkey";

drop index if exists "public"."Player_username_key";

drop index if exists "public"."user_pkey";

drop table "public"."Announcement";

drop table "public"."Announcement_members";

drop table "public"."Players";

drop table "public"."Users";


  create table "public"."announcement" (
    "id" uuid not null default gen_random_uuid(),
    "owner" uuid not null,
    "sport" public.sport not null,
    "age" public.age_group not null,
    "gender" public.gender not null,
    "skill_level" public.skill_level not null,
    "description" text not null,
    "max_players" smallint not null,
    "created_at" timestamp with time zone not null default now(),
    "location_name" text not null,
    "latitude" double precision not null,
    "longitude" double precision not null,
    "min_players" smallint not null
      );


alter table "public"."announcement" enable row level security;


  create table "public"."announcement_members" (
    "announcement_id" uuid not null,
    "player_id" uuid not null
      );


alter table "public"."announcement_members" enable row level security;


  create table "public"."player_sports" (
    "player_id" uuid not null,
    "sport" public.sport not null,
    "skill_level" public.skill_level not null
      );


alter table "public"."player_sports" enable row level security;


  create table "public"."players" (
    "id" uuid not null,
    "first_name" text not null,
    "surname" text,
    "username" text,
    "avatar_url" text,
    "bio" text,
    "gender" text,
    "birth_year" smallint,
    "home" text,
    "is_onboarded" boolean not null default false,
    "terms_and_age_accepted_at" timestamp without time zone
      );


alter table "public"."players" enable row level security;


  create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "account_type" text
      );


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX announcement_members_pkey ON public.announcement_members USING btree (announcement_id, player_id);

CREATE UNIQUE INDEX announcement_pkey ON public.announcement USING btree (id);

CREATE UNIQUE INDEX player_sports_pkey ON public.player_sports USING btree (player_id, sport);

CREATE UNIQUE INDEX "Player_pkey" ON public.players USING btree (id);

CREATE UNIQUE INDEX "Player_username_key" ON public.players USING btree (username);

CREATE UNIQUE INDEX user_pkey ON public.users USING btree (id);

alter table "public"."announcement" add constraint "announcement_pkey" PRIMARY KEY using index "announcement_pkey";

alter table "public"."announcement_members" add constraint "announcement_members_pkey" PRIMARY KEY using index "announcement_members_pkey";

alter table "public"."player_sports" add constraint "player_sports_pkey" PRIMARY KEY using index "player_sports_pkey";

alter table "public"."players" add constraint "Player_pkey" PRIMARY KEY using index "Player_pkey";

alter table "public"."users" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."announcement" add constraint "Announcement_owner_fkey" FOREIGN KEY (owner) REFERENCES public.players(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."announcement" validate constraint "Announcement_owner_fkey";

alter table "public"."announcement_members" add constraint "announcement_members_announcement_id_fkey" FOREIGN KEY (announcement_id) REFERENCES public.announcement(id) ON DELETE CASCADE not valid;

alter table "public"."announcement_members" validate constraint "announcement_members_announcement_id_fkey";

alter table "public"."announcement_members" add constraint "announcement_members_player_id_fkey" FOREIGN KEY (player_id) REFERENCES public.players(id) ON DELETE CASCADE not valid;

alter table "public"."announcement_members" validate constraint "announcement_members_player_id_fkey";

alter table "public"."player_sports" add constraint "player_sports_player_id_fkey" FOREIGN KEY (player_id) REFERENCES public.players(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."player_sports" validate constraint "player_sports_player_id_fkey";

alter table "public"."players" add constraint "Player_username_key" UNIQUE using index "Player_username_key";

alter table "public"."players" add constraint "Players_id_fkey" FOREIGN KEY (id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."players" validate constraint "Players_id_fkey";

alter table "public"."users" add constraint "user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "user_id_fkey";

grant delete on table "public"."announcement" to "anon";

grant insert on table "public"."announcement" to "anon";

grant references on table "public"."announcement" to "anon";

grant select on table "public"."announcement" to "anon";

grant trigger on table "public"."announcement" to "anon";

grant truncate on table "public"."announcement" to "anon";

grant update on table "public"."announcement" to "anon";

grant delete on table "public"."announcement" to "authenticated";

grant insert on table "public"."announcement" to "authenticated";

grant references on table "public"."announcement" to "authenticated";

grant select on table "public"."announcement" to "authenticated";

grant trigger on table "public"."announcement" to "authenticated";

grant truncate on table "public"."announcement" to "authenticated";

grant update on table "public"."announcement" to "authenticated";

grant delete on table "public"."announcement" to "service_role";

grant insert on table "public"."announcement" to "service_role";

grant references on table "public"."announcement" to "service_role";

grant select on table "public"."announcement" to "service_role";

grant trigger on table "public"."announcement" to "service_role";

grant truncate on table "public"."announcement" to "service_role";

grant update on table "public"."announcement" to "service_role";

grant delete on table "public"."announcement_members" to "anon";

grant insert on table "public"."announcement_members" to "anon";

grant references on table "public"."announcement_members" to "anon";

grant select on table "public"."announcement_members" to "anon";

grant trigger on table "public"."announcement_members" to "anon";

grant truncate on table "public"."announcement_members" to "anon";

grant update on table "public"."announcement_members" to "anon";

grant delete on table "public"."announcement_members" to "authenticated";

grant insert on table "public"."announcement_members" to "authenticated";

grant references on table "public"."announcement_members" to "authenticated";

grant select on table "public"."announcement_members" to "authenticated";

grant trigger on table "public"."announcement_members" to "authenticated";

grant truncate on table "public"."announcement_members" to "authenticated";

grant update on table "public"."announcement_members" to "authenticated";

grant delete on table "public"."announcement_members" to "service_role";

grant insert on table "public"."announcement_members" to "service_role";

grant references on table "public"."announcement_members" to "service_role";

grant select on table "public"."announcement_members" to "service_role";

grant trigger on table "public"."announcement_members" to "service_role";

grant truncate on table "public"."announcement_members" to "service_role";

grant update on table "public"."announcement_members" to "service_role";

grant delete on table "public"."player_sports" to "anon";

grant insert on table "public"."player_sports" to "anon";

grant references on table "public"."player_sports" to "anon";

grant select on table "public"."player_sports" to "anon";

grant trigger on table "public"."player_sports" to "anon";

grant truncate on table "public"."player_sports" to "anon";

grant update on table "public"."player_sports" to "anon";

grant delete on table "public"."player_sports" to "authenticated";

grant insert on table "public"."player_sports" to "authenticated";

grant references on table "public"."player_sports" to "authenticated";

grant select on table "public"."player_sports" to "authenticated";

grant trigger on table "public"."player_sports" to "authenticated";

grant truncate on table "public"."player_sports" to "authenticated";

grant update on table "public"."player_sports" to "authenticated";

grant delete on table "public"."player_sports" to "service_role";

grant insert on table "public"."player_sports" to "service_role";

grant references on table "public"."player_sports" to "service_role";

grant select on table "public"."player_sports" to "service_role";

grant trigger on table "public"."player_sports" to "service_role";

grant truncate on table "public"."player_sports" to "service_role";

grant update on table "public"."player_sports" to "service_role";

grant delete on table "public"."players" to "anon";

grant insert on table "public"."players" to "anon";

grant references on table "public"."players" to "anon";

grant select on table "public"."players" to "anon";

grant trigger on table "public"."players" to "anon";

grant truncate on table "public"."players" to "anon";

grant update on table "public"."players" to "anon";

grant delete on table "public"."players" to "authenticated";

grant insert on table "public"."players" to "authenticated";

grant references on table "public"."players" to "authenticated";

grant select on table "public"."players" to "authenticated";

grant trigger on table "public"."players" to "authenticated";

grant truncate on table "public"."players" to "authenticated";

grant update on table "public"."players" to "authenticated";

grant delete on table "public"."players" to "service_role";

grant insert on table "public"."players" to "service_role";

grant references on table "public"."players" to "service_role";

grant select on table "public"."players" to "service_role";

grant trigger on table "public"."players" to "service_role";

grant truncate on table "public"."players" to "service_role";

grant update on table "public"."players" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


  create policy "Allow owners to manage their announcements"
  on "public"."announcement"
  as permissive
  for all
  to authenticated
using ((owner = ( SELECT auth.uid() AS uid)))
with check ((owner = ( SELECT auth.uid() AS uid)));



  create policy "Allow public read access"
  on "public"."announcement"
  as permissive
  for select
  to public
using (true);



  create policy "Allow owners to manage their sports"
  on "public"."player_sports"
  as permissive
  for all
  to authenticated
using ((player_id = ( SELECT auth.uid() AS uid)))
with check ((player_id = ( SELECT auth.uid() AS uid)));



  create policy "Allow public read access"
  on "public"."player_sports"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."players"
  as permissive
  for select
  to public
using (true);



  create policy "Enable update for users based on user_id"
  on "public"."players"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));



  create policy "Enable read access for owner"
  on "public"."users"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = id));



