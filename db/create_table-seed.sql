DROP TABLE if EXISTS "users";
DROP TABLE if EXISTS "scores";
DROP TABLE if EXISTS "assets";


CREATE TABLE "users" (
  "user_id" serial primary key,
  "auth_id" text,
  "username" text,
  "icon" text
);

CREATE TABLE "scores" (
  "score_id" serial primary key,
  "time" integer,
  "points" integer,
  "user_id" integer references users(user_id)
);

CREATE TABLE "assets" (
  "asset_id" serial primary key,
  "asset_type" text,
  "asset_name" text,
  "asset_url" text
);