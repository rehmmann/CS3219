DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS role;
CREATE TYPE role AS ENUM ('USER', 'ADMIN');
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(30),
 	email VARCHAR(254),
	password VARCHAR(500),
	role role DEFAULT 'USER'
);
INSERT INTO users ("username", "email", "password") VALUES ('Alan Walker', 'alanwalker@gmail.com', 'darkside');
INSERT INTO users ("username", "email", "password") VALUES ('Blan Runner', 'blanrunner@gmail.com', 'brightside');