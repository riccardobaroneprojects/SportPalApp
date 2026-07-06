revoke delete on table "public"."Test" from "anon";

revoke insert on table "public"."Test" from "anon";

revoke references on table "public"."Test" from "anon";

revoke select on table "public"."Test" from "anon";

revoke trigger on table "public"."Test" from "anon";

revoke truncate on table "public"."Test" from "anon";

revoke update on table "public"."Test" from "anon";

revoke delete on table "public"."Test" from "authenticated";

revoke insert on table "public"."Test" from "authenticated";

revoke references on table "public"."Test" from "authenticated";

revoke select on table "public"."Test" from "authenticated";

revoke trigger on table "public"."Test" from "authenticated";

revoke truncate on table "public"."Test" from "authenticated";

revoke update on table "public"."Test" from "authenticated";

revoke delete on table "public"."Test" from "service_role";

revoke insert on table "public"."Test" from "service_role";

revoke references on table "public"."Test" from "service_role";

revoke select on table "public"."Test" from "service_role";

revoke trigger on table "public"."Test" from "service_role";

revoke truncate on table "public"."Test" from "service_role";

revoke update on table "public"."Test" from "service_role";

alter table "public"."Test" drop constraint "Test_pkey";

drop index if exists "public"."Test_pkey";

drop table "public"."Test";


  create table "public"."Player" (
    "id" uuid not null,
    "first_name" text not null,
    "surname" text,
    "username" text,
    "avatar_url" text,
    "bio" text,
    "gender" text,
    "birth_year" smallint,
    "home" text,
    "is_onboarded" boolean not null default false
      );


alter table "public"."Player" enable row level security;

CREATE UNIQUE INDEX "Player_pkey" ON public."Player" USING btree (id);

CREATE UNIQUE INDEX "Player_username_key" ON public."Player" USING btree (username);

alter table "public"."Player" add constraint "Player_pkey" PRIMARY KEY using index "Player_pkey";

alter table "public"."Player" add constraint "Player_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Player" validate constraint "Player_id_fkey";

alter table "public"."Player" add constraint "Player_username_key" UNIQUE using index "Player_username_key";

grant delete on table "public"."Player" to "anon";

grant insert on table "public"."Player" to "anon";

grant references on table "public"."Player" to "anon";

grant select on table "public"."Player" to "anon";

grant trigger on table "public"."Player" to "anon";

grant truncate on table "public"."Player" to "anon";

grant update on table "public"."Player" to "anon";

grant delete on table "public"."Player" to "authenticated";

grant insert on table "public"."Player" to "authenticated";

grant references on table "public"."Player" to "authenticated";

grant select on table "public"."Player" to "authenticated";

grant trigger on table "public"."Player" to "authenticated";

grant truncate on table "public"."Player" to "authenticated";

grant update on table "public"."Player" to "authenticated";

grant delete on table "public"."Player" to "service_role";

grant insert on table "public"."Player" to "service_role";

grant references on table "public"."Player" to "service_role";

grant select on table "public"."Player" to "service_role";

grant trigger on table "public"."Player" to "service_role";

grant truncate on table "public"."Player" to "service_role";

grant update on table "public"."Player" to "service_role";


  create policy "Enable read access for all users"
  on "public"."Player"
  as permissive
  for select
  to public
using (true);



  create policy "Enable update for users based on user_id"
  on "public"."Player"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) = id))
with check ((auth.uid() = id));



