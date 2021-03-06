CREATE EXTENSION IF NOT EXISTS pgaudit;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION trigger_set_timestamp ()
  RETURNS TRIGGER
  AS $$
BEGIN
  NEW.updated = NOW();
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

