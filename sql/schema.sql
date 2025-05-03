create database userdb;
use userdb;


create table users(
    rollno int,
    age int,
    name varchar(20),
    email varchar(50) UNIQUE
);
