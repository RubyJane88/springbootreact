set transaction read write;

ALTER TABLE course
    ALTER COLUMN department SET NOT NULL;