CREATE TABLE IF NOT EXISTS student (id serial PRIMARY KEY, email varchar(1000),pwd varchar(65535),username varchar(1000) unique, learnstyle varchar(1000));

CREATE TABLE IF NOT EXISTS client (id serial PRIMARY KEY, email varchar(1000),pwd varchar(65535),clientname varchar(1000) unique);

CREATE TABLE IF NOT EXISTS firstquiz (id serial PRIMARY KEY, question varchar(2000),choice1 varchar(1000),choice2 varchar(1000),choice3 varchar(1000),choice4 varchar(1000));

CREATE TABLE IF NOT EXISTS course (id serial PRIMARY KEY, coursename varchar(1000) unique,coursedescription varchar(65535),CONSTRAINT clientid FOREIGN KEY (id) REFERENCES client(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS lesson (id serial PRIMARY KEY, lessonname varchar(1000),lessondescription varchar(65535),CONSTRAINT courseid FOREIGN KEY (id) REFERENCES course(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS material (id serial PRIMARY KEY, visual varchar(65535), auditory varchar(65535), reading varchar(65535),difficulty varchar(1000),CONSTRAINT lessonid FOREIGN KEY (id) REFERENCES lesson(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS questionnaire (id serial PRIMARY KEY, question varchar(65535),choice1 varchar(1000),choice2 varchar(1000),choice3 varchar(1000),choice4 varchar(1000),answer varchar(65535),difficulty varchar(1000),CONSTRAINT lessonid FOREIGN KEY (id) REFERENCES lesson(id) ON DELETE CASCADE,CONSTRAINT materialid FOREIGN KEY (id) REFERENCES material(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS materialprogress (id serial PRIMARY KEY, notattempted boolean,inprogress boolean,completed boolean,CONSTRAINT lessonid FOREIGN KEY (id) REFERENCES lesson(id) ON DELETE CASCADE,CONSTRAINT materialid FOREIGN KEY (id) REFERENCES material(id) ON DELETE CASCADE,CONSTRAINT studentid FOREIGN KEY (id) REFERENCES student(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS progress (id serial PRIMARY KEY,progress float,CONSTRAINT courseid FOREIGN KEY (id) REFERENCES course(id) ON DELETE CASCADE,CONSTRAINT studentid FOREIGN KEY (id) REFERENCES student(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS feedback (id serial PRIMARY KEY, mood varchar(65535),CONSTRAINT studentid FOREIGN KEY (id) REFERENCES student(id) ON DELETE CASCADE);