import fs from 'fs';
import { ALL_OMNI_PRODUCTS } from '../src/data/departmentsData.js';

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function escapeArray(arr) {
  if (!arr || !Array.isArray(arr)) return "'{}'::jsonb";
  const json = JSON.stringify(arr);
  return escapeSql(json) + '::jsonb';
}

let sql = `-- ==========================================
-- IGNIS STORE & UNIVERSAL SHELL SUPABASE SCHEMA
-- ==========================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    department TEXT NOT NULL,
    department_name TEXT,
    item_type TEXT DEFAULT 'digital',
    title TEXT NOT NULL,
    studio TEXT,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    discount_percent INT DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    category TEXT,
    platforms JSONB DEFAULT '[]'::jsonb,
    cover_image TEXT,
    hero_banner TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    user_id UUID,
    customer_name TEXT,
    customer_email TEXT,
    total_amount NUMERIC(10, 2) NOT NULL,
    items JSONB NOT NULL,
    shipping_address JSONB,
    payment_method TEXT,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Loot History Table
CREATE TABLE IF NOT EXISTS public.loot_history (
    id TEXT PRIMARY KEY,
    user_id UUID,
    crate_id TEXT NOT NULL,
    crate_name TEXT NOT NULL,
    item_title TEXT NOT NULL,
    item_rarity TEXT NOT NULL,
    item_value NUMERIC(10, 2) NOT NULL,
    item_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS) & Public Read Access
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on products" ON public.products;
CREATE POLICY "Allow public read on products" ON public.products FOR SELECT USING (true);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public read on orders" ON public.orders;
CREATE POLICY "Allow public read on orders" ON public.orders FOR SELECT USING (true);

ALTER TABLE public.loot_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read/insert on loot_history" ON public.loot_history;
CREATE POLICY "Allow public read/insert on loot_history" ON public.loot_history FOR ALL USING (true);

-- 6. Insert All 120 Products Across 6 Storefronts
INSERT INTO public.products (
    id, department, department_name, item_type, title, studio,
    price, original_price, discount_percent, rating, review_count,
    category, platforms, cover_image, hero_banner, tags, features, description
) VALUES
`;

const valueRows = ALL_OMNI_PRODUCTS.map(p => {
  return '(' + [
    escapeSql(p.id),
    escapeSql(p.department),
    escapeSql(p.departmentName || 'IGNIS Gaming'),
    escapeSql(p.itemType || 'digital'),
    escapeSql(p.title),
    escapeSql(p.studio || 'Nexus Studios'),
    Number(p.price || 0),
    Number(p.originalPrice || p.price || 0),
    Number(p.discountPercent || 0),
    Number(p.rating || 5.0),
    Number(p.reviewCount || 0),
    escapeSql(p.category || 'General'),
    escapeArray(p.platforms || []),
    escapeSql(p.coverImage || ''),
    escapeSql(p.heroBanner || ''),
    escapeArray(p.tags || []),
    escapeArray(p.features || []),
    escapeSql(p.description || '')
  ].join(', ') + ')';
});

sql += valueRows.join(',\n') + `\nON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    price = EXCLUDED.price,
    cover_image = EXCLUDED.cover_image,
    hero_banner = EXCLUDED.hero_banner,
    description = EXCLUDED.description;
`;

fs.writeFileSync('supabase_schema_and_seed.sql', sql, 'utf8');
console.log('SUCCESS: supabase_schema_and_seed.sql generated. Size:', (sql.length / 1024).toFixed(1), 'KB');
