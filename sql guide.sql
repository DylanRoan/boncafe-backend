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
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    confirmed BOOLEAN NOT NULL DEFAULT FALSE
);

--Create client table from code
CREATE TABLE <code> (
    machine TEXT,
    serial TEXT,
    model TEXT,
    maintenance_due DATE
);

--Sample client table
INSERT INTO <code> (machine, serial, model, maintenance_due)
VALUES 
('Capitani Candi Elite', 'EZDDBXSO', '834923', '2023-02-25'),
('CafeMatic 8', '34SECKE2',	'627204', '2023-02-15'),
('Marco - Ottomatic Coffeemaker', 'JW1VCCMO', '803228',	'2023-03-08'),
('ESPRESSO - AV', 'GWM7EB5Y', '791852', '2023-03-05'),
('Linea Mini Grey Gloss', 'LSBQI44F', '140567', '2023-02-03')

-- 😭