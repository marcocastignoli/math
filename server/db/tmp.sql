CREATE TABLE users (
    user_id  INTEGER      PRIMARY KEY AUTOINCREMENT
                          NOT NULL,
    username VARCHAR (50) UNIQUE
                          NOT NULL,
    password VARCHAR (50) NOT NULL,
    role     INTEGER (1)  NOT NULL
                          DEFAULT (0) 
);
