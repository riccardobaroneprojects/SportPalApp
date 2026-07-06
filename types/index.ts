import { Tables, TablesInsert, TablesUpdate } from './supabase';

// Player Table Types
export type Player = Tables<'Player'>;
export type PlayerInsert = TablesInsert<'Player'>;
export type PlayerUpdate = TablesUpdate<'Player'>;