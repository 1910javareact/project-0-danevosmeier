drop schema if exists project0 cascade;
create schema project0;
set schema 'project0';

create table users(
	user_id serial primary key,
    username text unique not null,
    "password" text not null,
    firstname text not null,
    lastname text not null,
    email text not null
);

create table roles(
	role_id serial primary key,
	role_name text  not null
);

create table users_join_roles(
	user_id int4 references users (user_id),
	role_id int4 references roles (role_id),
	constraint user_join_roles_PK primary key (user_id, role_id)
);

create table reimbursement_status(
	status_id serial primary key,
	status text not null
);

create table reimbursement_type(
	type_id serial primary key,
	type_name text not null
);

create table reimbursement(
	reimbursement_id serial primary key,
    author int4 not null references users (user_id),
    amount numeric(10,2) not null,
    date_submitted text not null,
    date_resolved text not null,
    description text not null,
    resolver int4 not null references users (user_id),
    status int4 not null references reimbursement_status(status_id), --references status (status_id),
    "type" int4 not null references reimbursement_type (type_id)
);

create table status_join_reimbursement(
	
	reimbursement_id int4 references reimbursement (reimbursement_id),
	status_id int4 references reimbursement_status (status_id),
	constraint status_join_reimbursement_PK primary key (reimbursement_id, status_id)
);

create table type_join_reimbursement(
	
	reimbursement_id int4 references reimbursement(reimbursement_id),
	type_id int4 references reimbursement_type (type_id),
	constraint type_join_reimbursement_PK primary key (type_id, reimbursement_id)
);


insert into roles(role_name) 
	values ('ADMIN'), --strings in sql are single qouted
		   ('FINANCE MANAGER'),
		   ('USER');
	  
insert into reimbursement_status(status)
	values ('PENDING'),
			('APPROVED'),
			('DENIED');
	
insert into reimbursement_type(type_name)
	values ('LODGING'),
			('TRAVEL'),
			('FOOD'),
			('OTHER');
		     	  
insert into users (username, "password", firstname, lastname, email)
	values('doc', 'password', 'Frederick', 'Frankenstein', 'vicmd@frankensteinneurology.com'),
		  ('igor', 'password', 'Ivan', 'Igor', 'igor@frankensteinneurology.com'),
		  ('inga', 'password', 'Inga', 'Schneider', 'inga@frankensteinneurology.com');

insert into users_join_roles
	values (1,1),
    	   (2,3),
    	   (3,2),
     	   (3,3);

insert into reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, "type")
	values(2, 200.00, '11/5/19', now(), 'Shovels', 3, 1, 4),
	(1, 150.00, '10/7/19', '10/10/19', 'Hay', 3, 1, 2);
	
insert into project0.status_join_reimbursement
	values (1, 1),
		   (2, 1);

insert into project0.type_join_reimbursement
	values (1, 4),
			(2, 2);

select * from roles;

select * from users;

select * from users_join_roles;

select * from reimbursement natural join users;

select * from reimbursement;

select * from reimbursement_status;

select * from reimbursement_type;

select * from users natural join users_join_roles natural join roles;

SELECT * FROM project0.users NATURAL JOIN project0.users_join_roles NATURAL JOIN project0.roles WHERE username = 'inga' and "password" = 'password';
 
SELECT * FROM project0.users NATURAL JOIN project0.users_join_roles NATURAL JOIN project0.roles;

SELECT * FROM project0.users NATURAL JOIN project0.users_join_roles NATURAL JOIN project0.roles WHERE user_id = 3;

SELECT * FROM project0.users NATURAL JOIN project0.users_join_roles NATURAL JOIN project0.roles WHERE user_id = 2;
					
select * from project0.reimbursement;

SELECT * FROM project0.reimbursement WHERE author = 2 ORDER BY date_submitted desc;
					
select * from reimbursement;

select * from 


-------------6/30

UPDATE project0.users SET username = 'inga', "password" = 'password1', firstname = 'Inga', lastname = 'Schneider', email = 'inga@frankensteinneurology.com' WHERE user_id = 3;

UPDATE project0.users_join_roles SET role_id = 2 WHERE user_id = 2;

SELECT * FROM project0.users NATURAL JOIN project0.users_join_roles NATURAL JOIN project0.roles WHERE user_id = $1;

SELECT * FROM users NATURAL JOIN users_join_roles NATURAL JOIN roles

select * from reimbursement

select * from reimbursement natural join reimbursement_type natural join reimbursement_status natural join status_join_reimbursement natural join type_join_reimbursement

INSERT INTO project0.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, "type") 
	values (2,100.00,11/7/19,11/21/19, 'Hotel',2, 1, 3);
	
SELECT * FROM project0.reimbursement WHERE reimbursement_id = 2;

UPDATE project0.reimbursement SET status = 1, description = 'Hotel' WHERE reimbursement_id = 2

SELECT * FROM users NATURAL JOIN users_join_roles NATURAL JOIN roles WHERE user_id = 1

SELECT * FROM users WHERE user_id = 3

UPDATE users SET username = 'doc', "password" = 'password2', firstname = 'Frederick', lastname = 'Frankenstein', email = 'vicmd@frankensteinneurology.com' WHERE user_id = 1

UPDATE users_join_roles SET role_id = 1 WHERE user_id = 1

select * from users natural join reimbursement

select * from reimbursement natural join status_join_reimbursement natural join reimbursement_status

select * from status_join_reimbursement

select * from users_join_roles

select * from reimbursement_status;

select * from type_join_reimbursement

select * from reimbursement;

create user new_user with password 'password1';

grant all privileges on all tables in schema project0 to new_user;

select * from pg_catalog.pg_user;

select * from project0.users

select * from user_sys_privs;

drop user new_user;