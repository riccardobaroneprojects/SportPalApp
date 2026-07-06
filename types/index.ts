import { Tables, TablesInsert, TablesUpdate } from './supabase';

// Player Table Types
export type Player = Tables<'Player'>;
export type PlayerInsert = TablesInsert<'Player'>;
export type PlayerUpdate = TablesUpdate<'Player'>;

// Player announcement Types
export type Announcement = Tables<'Announcement'>;
export type AnnouncementInsert = TablesInsert<'Announcement'>;
export type AnnouncementUpdate = TablesUpdate<'Announcement'>;

// Player Table Types
export type Announcement_members = Tables<'Announcement_members'>;
export type Announcement_membersInsert = TablesInsert<'Announcement_members'>;
export type Announcement_membersUpdate = TablesUpdate<'Announcement_members'>;