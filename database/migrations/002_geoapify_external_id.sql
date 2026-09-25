ALTER TABLE restaurant_references
  ADD COLUMN IF NOT EXISTS external_id TEXT;

ALTER TABLE restaurant_references
  ALTER COLUMN osm_id DROP NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS restaurant_references_external_id_idx
  ON restaurant_references (osm_type, external_id)
  WHERE external_id IS NOT NULL;