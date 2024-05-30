create database flux;

use flux;

create table gestor (
	idGestor int primary key auto_increment,
    nomeGestor varchar(80),
    emailGestor varchar(100),
    senhaGestor varchar(100)
);

select * from gestor;
