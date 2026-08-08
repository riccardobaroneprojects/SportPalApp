DROP TABLE IF EXISTS public.announcement_members;

CREATE TABLE public.announcement_members (
  announcement_id uuid REFERENCES public.announcement(id) ON DELETE CASCADE,
  player_id uuid REFERENCES public.players(id) ON DELETE CASCADE,
  PRIMARY KEY (announcement_id, player_id)
);