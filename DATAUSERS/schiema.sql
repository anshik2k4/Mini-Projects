USE demo_app;

CREATE TABLE datauser (
    userid VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) UNIQUE NOT NULL

);


