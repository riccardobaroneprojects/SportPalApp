alter table "public"."players" drop column "birth_year";

alter table "public"."players" add column "birth_date" date;

alter table "public"."players" add column "latitude" bigint;

alter table "public"."players" add column "longitude" bigint;


