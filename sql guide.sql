--Create main table
CREATE TABLE main (
    name TEXT NOT NULL UNIQUE,
    start_date DATE,
    end_date DATE,
    code TEXT NOT NULL UNIQUE
);

--Creates codes table for authentication purposes
CREATE TABLE auth (
    code TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

--Create client table from code
CREATE TABLE <code> (
    machine TEXT,
    serial TEXT,
    model TEXT,
    maintenance_due DATE,
    maintain_count INT
);

--comment