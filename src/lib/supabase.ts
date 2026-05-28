import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================
// Types
// ============================================================

export type Vehicle = {
  id: string;
  name: string;
  model: string;
  year: number;
  category: string;
  price_per_day: number;
  passengers: number;
  transmission: string;
  fuel: string;
  description: string | null;
  images: string[];
  available: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  vehicle_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
  delivery_location: string;
  total_amount: number | null;
  status: string;
  license_url: string | null;
  stripe_payment_id: string | null;
  notes: string | null;
  created_at: string;
};
