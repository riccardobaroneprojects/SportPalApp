import { Tables, TablesInsert, TablesUpdate } from './supabase';

// Player Table Types
export type Player = Tables<'players'>;
export type PlayerInsert = TablesInsert<'players'>;
export type PlayerUpdate = TablesUpdate<'players'>;

// Player sports Table Types
export type Player_sports = Tables<'player_sports'>;
export type Player_sportsInsert = TablesInsert<'player_sports'>;
export type Player_sportsUpdate = TablesUpdate<'player_sports'>;

// Users table Types
export type Users = Tables<'users'>;
export type UsersInsert = TablesInsert<'users'>;
export type UsersUpdate = TablesUpdate<'users'>;

// Player announcement Types
export type Announcement = Tables<'announcement'>;
export type AnnouncementInsert = TablesInsert<'announcement'>;
export type AnnouncementUpdate = TablesUpdate<'announcement'>;

// Player Table Types
export type Announcement_members = Tables<'announcement_members'>;
export type Announcement_membersInsert = TablesInsert<'announcement_members'>;
export type Announcement_membersUpdate = TablesUpdate<'announcement_members'>;