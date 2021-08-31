CREATE TABLE news (
   id_news serial UNIQUE,
   url text DEFAULT NULL UNIQUE,
   source_name varchar(50) DEFAULT NULL,
   title varchar(100) DEFAULT NULL,
   publish_date date DEFAULT CURRENT_TIMESTAMP,
   content text,
  PRIMARY KEY (id_news)
);

CREATE TABLE keywords (
   id_word serial UNIQUE,
   id_news int NOT NULL,
   word varchar(50) DEFAULT NULL,
   foreign key(id_news) references news(id_news)
);

CREATE TABLE users (
   id serial PRIMARY key,
   uuid varchar(64) not null UNIQUE,
   username varchar(255) not null UNIQUE,
   password varchar(255) not null,
   authority boolean not null DEFAULT TRUE
);


CREATE TABLE ActionLogs(
   id serial PRIMARY KEY,
   username varchar(255) not null,
   action varchar(255) not null,
   Operation_time TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE LabelDiscription(
   label varchar(255) PRIMARY KEY ,
   content text,
   book_index varchar(255),
   page_num varchar(255)
);