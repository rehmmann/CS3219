DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS role;
CREATE TYPE role AS ENUM ('USER', 'ADMIN');
CREATE TABLE users (
	id SERIAL,
	username VARCHAR(30),
 	email VARCHAR(254) UNIQUE,
	password VARCHAR(128),
	role role DEFAULT 'USER',
	salt VARCHAR(32),
	PRIMARY KEY (email, password)
);
INSERT INTO users ("username", "email", "password", "salt") VALUES ('Alan Walker', 'alanwalker@gmail.com', '8979679e286b9130417aae3aeb750f78f07019c5ed3d409d13a228f990e5970cb8b3151d18e561cc3f00d1be20b0e369db6e86fdadc8bd68414010d6b245aa5e', 'caa238d2878974b52f64ec4cbec3953c');
INSERT INTO users ("username", "email", "password", "salt") VALUES ('Blan Runner', 'blanrunner@gmail.com', '2b85ab9b8a235e66367110c3453d61544ba58dccae3f98e1744322e6d4ea90309772deb4c71ba142781c8cb8ce9a3bebbcbc3fb7df58169a4441555dc609d347', 'c72f4b31f3df795404eb314d635c366a');
GRANT ALL PRIVILEGES ON TABLE users TO me;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO me;

--user 1 password: password1
--user 2 password: password2