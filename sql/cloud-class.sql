DROP DATABASE
IF
	EXISTS db_cloud_class;
CREATE DATABASE db_cloud_class CHARACTER 
SET utf8mb4;
USE db_cloud_class;
DROP TABLE
IF
	EXISTS course;
CREATE TABLE course (
	course_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	course_title VARCHAR ( 120 ) NOT NULL,
	sub VARCHAR ( 40 ) NOT NULL,
	grade VARCHAR ( 40 ) NOT NULL,
	course_intro LONGTEXT,
	chapter_count INT,
	register_count INT DEFAULT 0,
	max_register INT,
	price DECIMAL ( 10, 2 ) 
) COMMENT = '课程表';
DROP TABLE
IF
	EXISTS student;
CREATE TABLE student (
	stu_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	stu_pwd VARCHAR ( 16 ) NOT NULL,
	stu_name VARCHAR ( 28 ) NOT NULL,
	gender INT DEFAULT 2 COMMENT '0 男 / 1 女/ 2 保密',
	avatar VARCHAR ( 200 ),
/* 此处应有默认值 */
	phone CHAR ( 11 ) NOT NULL,
	email VARCHAR ( 100 ) 
) COMMENT = '用户表';
DROP TABLE
IF
	EXISTS teacher;
CREATE TABLE teacher (
	teacher_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	teacher_name VARCHAR ( 28 ) NOT NULL,
	avatar VARCHAR ( 200 ),
/* 此处应有默认值 */
	certify_id CHAR ( 17 ) NOT NULL,
	sub VARCHAR ( 40 ) NOT NULL,
	grade VARCHAR ( 40 ) NOT NULL,
	age INT,
	gender INT DEFAULT 2 COMMENT '0 男； 1 女； 2 保密',
	teacher_intro LONGTEXT 
) COMMENT = '教师表';
DROP TABLE
IF
	EXISTS teaching;
CREATE TABLE teaching (
	course_id CHAR ( 11 ),
	teacher_id CHAR ( 11 ),
	FOREIGN KEY ( course_id ) REFERENCES course ( course_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( teacher_id ) REFERENCES teacher ( teacher_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY ( course_id, teacher_id ) 
) COMMENT = '课程-教师关系表';
DROP TABLE
IF
	EXISTS stu_course;
CREATE TABLE stu_course (
	stu_id CHAR ( 11 ),
	course_id CHAR ( 11 ),
	is_incart INT DEFAULT 0 COMMENT '0 未在购物车； 1 已在购物车',
	has_buyed INT DEFAULT 0 COMMENT '0 未购买； 1 已购买',
	FOREIGN KEY ( stu_id ) REFERENCES student ( stu_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( course_id ) REFERENCES course ( course_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY ( stu_id, course_id ) 
) COMMENT = '用户-课程关系表';
DROP TABLE
IF
	EXISTS learn_progress;
CREATE TABLE learn_progress (
	stu_id CHAR ( 11 ),
	course_id CHAR ( 11 ),
	cur_chapter_order INT,
	cur_chapter_title VARCHAR ( 120 ),
	start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY ( stu_id ) REFERENCES student ( stu_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( course_id ) REFERENCES course ( course_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY ( stu_id, course_id ) 
) COMMENT = '用户-课程学习进度表';
DROP TABLE
IF
	EXISTS chapter;
CREATE TABLE chapter (
	chapter_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	course_id CHAR ( 11 ),
	chapter_title VARCHAR ( 120 ),
	chapter_order INT,
	video_url VARCHAR ( 200 ),
	FOREIGN KEY ( course_id ) REFERENCES course ( course_id ) ON UPDATE CASCADE ON DELETE CASCADE 
) COMMENT = '课程章节表';
DROP TABLE
IF
	EXISTS coursedoc;
CREATE TABLE coursedoc (
	doc_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	download_link VARCHAR ( 200 ),
	course_id CHAR ( 11 ),
	chapter_id CHAR ( 11 ),
	FOREIGN KEY ( course_id ) REFERENCES course ( course_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( chapter_id ) REFERENCES chapter ( chapter_id ) ON UPDATE CASCADE ON DELETE CASCADE 
) COMMENT = '课程-课件表';
DROP TABLE
IF
	EXISTS post;
CREATE TABLE post (
	post_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	user_id CHAR ( 11 ),
	post_title VARCHAR ( 120 ) NOT NULL,
	post_detail LONGTEXT,
	post_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	teacher_reply INT DEFAULT 0 COMMENT '0 : 无教师参与 / 1 : 有教师参与',
	course_id CHAR ( 11 ),
	chapter_id CHAR ( 11 ),
	FOREIGN KEY ( course_id ) REFERENCES course ( course_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( chapter_id ) REFERENCES chapter ( chapter_id ) ON UPDATE CASCADE ON DELETE CASCADE 
) COMMENT = '课程答疑表';
DROP TABLE
IF
	EXISTS reply;
CREATE TABLE reply (
	reply_id CHAR ( 11 ),
	reply_detail LONGTEXT,
	reply_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id CHAR ( 11 ),
	post_id CHAR ( 11 ),
	FOREIGN KEY ( post_id ) REFERENCES post ( post_id ) ON UPDATE CASCADE ON DELETE CASCADE 
) COMMENT = '课程答疑-回复表';
DROP TABLE
IF
	EXISTS test;
CREATE TABLE test (
	test_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	test_title VARCHAR ( 120 ) NOT NULL,
	course_id CHAR ( 11 ),
	chapter_id CHAR ( 11 ),
	FOREIGN KEY ( course_id ) REFERENCES course ( course_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( chapter_id ) REFERENCES chapter ( chapter_id ) ON UPDATE CASCADE ON DELETE CASCADE 
) COMMENT = '课程测验表';
DROP TABLE
IF
	EXISTS stu_test;
CREATE TABLE stu_test (
	test_id CHAR ( 11 ),
	stu_id CHAR ( 11 ),
	score DECIMAL ( 3, 2 ) DEFAULT NULL,
	is_summited INT DEFAULT 0 COMMENT '0 (未提交) / 1 (提交)',
	is_marked INT DEFAULT 0 COMMENT '0 (未批改) / 1 (已批改)',
	FOREIGN KEY ( test_id ) REFERENCES test ( test_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( stu_id ) REFERENCES student ( stu_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY ( stu_id, test_id ) 
) COMMENT = '用户-测验关系表';
DROP TABLE
IF
	EXISTS key_point;
CREATE TABLE key_point ( key_point_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY, sub VARCHAR ( 20 ), keyword VARCHAR ( 40 ) ) COMMENT = '科目知识点表';
DROP TABLE
IF
	EXISTS question;
CREATE TABLE question (
	question_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	test_id CHAR ( 11 ),
	key_point_id CHAR ( 11 ),
	q_type VARCHAR ( 40 ) COMMENT '题目类型(选择 0 / 非选择 1)',
	q_detail LONGTEXT,
	q_anwser TINYTEXT,
	q_annotation LONGTEXT,
	point DECIMAL ( 2, 1 ),
	FOREIGN KEY ( test_id ) REFERENCES test ( test_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( key_point_id ) REFERENCES key_point ( key_point_id ) ON UPDATE CASCADE ON DELETE CASCADE 
) COMMENT = '课程测验题目表';
DROP TABLE
IF
	EXISTS stu_question;
CREATE TABLE stu_question (
	stu_id CHAR ( 11 ),
	question_id CHAR ( 11 ),
	is_right INT COMMENT '0 ：正确 / 1 ：错误',
	is_collected INT DEFAULT 0 COMMENT '0 ：未收藏 / 1 ：已收藏',
	FOREIGN KEY ( question_id ) REFERENCES question ( question_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY ( stu_id ) REFERENCES student ( stu_id ) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY ( stu_id, question_id ) 
) COMMENT = '用户-测验题目关系表';
DROP TABLE
IF
	EXISTS message;
CREATE TABLE message (
	mes_id CHAR ( 11 ) NOT NULL UNIQUE PRIMARY KEY,
	receiver_id CHAR ( 11 ) NOT NULL,
	send_id CHAR ( 11 ),
	mes_title VARCHAR ( 120 ),
	mes_detaile TINYTEXT,
is_readed INT DEFAULT 0 COMMENT '0 : 未读 / 1 : 已读' 
) COMMENT = '消息表';