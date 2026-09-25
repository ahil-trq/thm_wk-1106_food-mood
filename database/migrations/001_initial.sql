CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  user_id_hash TEXT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS restaurant_references (
  restaurant_key TEXT PRIMARY KEY,
  osm_type VARCHAR(16) NOT NULL,
  osm_id BIGINT,
  external_id TEXT,
  name VARCHAR(200) NOT NULL,
  address VARCHAR(300),
  cuisines TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (osm_type, osm_id)
);

CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_hash TEXT NOT NULL REFERENCES users(user_id_hash) ON DELETE CASCADE,
  restaurant_key TEXT NOT NULL REFERENCES restaurant_references(restaurant_key) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id_hash, restaurant_key)
);

CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_hash TEXT NOT NULL REFERENCES users(user_id_hash) ON DELETE CASCADE,
  restaurant_key TEXT NOT NULL REFERENCES restaurant_references(restaurant_key) ON DELETE CASCADE,
  visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_hash TEXT NOT NULL REFERENCES users(user_id_hash) ON DELETE CASCADE,
  restaurant_key TEXT NOT NULL REFERENCES restaurant_references(restaurant_key) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment VARCHAR(280),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id_hash, restaurant_key)
);

CREATE INDEX IF NOT EXISTS visits_user_idx ON visits(user_id_hash);
CREATE INDEX IF NOT EXISTS reviews_restaurant_idx ON reviews(restaurant_key);
