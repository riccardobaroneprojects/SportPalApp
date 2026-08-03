import { Tables, TablesInsert, TablesUpdate } from './supabase';

// Player Table Types
export type Player = Tables<'Players'>;
export type PlayerInsert = TablesInsert<'Players'>;
export type PlayerUpdate = TablesUpdate<'Players'>;

// Users table Types
export type Users = Tables<'Users'>;
export type UsersInsert = TablesInsert<'Users'>;
export type UsersUpdate = TablesUpdate<'Users'>;

// Player announcement Types
export type Announcement = Tables<'Announcement'>;
export type AnnouncementInsert = TablesInsert<'Announcement'>;
export type AnnouncementUpdate = TablesUpdate<'Announcement'>;

// Player Table Types
export type Announcement_members = Tables<'Announcement_members'>;
export type Announcement_membersInsert = TablesInsert<'Announcement_members'>;
export type Announcement_membersUpdate = TablesUpdate<'Announcement_members'>;