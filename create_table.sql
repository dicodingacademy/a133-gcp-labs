mysql -h 34.101.180.100 -u root -p

create database my_database;

use my_database

CREATE TABLE records (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(25) NOT NULL,
    amount DOUBLE NOT NULL,
    date DATETIME NOT NULL,
    notes TEXT,
    attachment VARCHAR(255)
);

SHOW TABLES;