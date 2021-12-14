set transaction read write;

CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

ALTER TABLE student
    ALTER COLUMN gender TYPE gender
        USING (gender::gender)
