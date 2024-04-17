create database grupo_pi;
use grupo_pi;

create table usuario(
idUsuario int primary key auto_increment,
nomeEmpresa varchar(45) not null unique,
senha varchar(45) not null,
cnpj char(14) not null unique,
emailEmpresa varchar(50) not null unique,
constraint chkEmail check (emailEmpresa like ("%@%")),
nomeGestor varchar(45) not null,
emailGestor varchar(50) not null,
constraint chkEmailGestor check (emailGestor like ("%@%")),
telefone char(12) not null unique);


insert into usuario values
(default, 'Empresa1', 'senha123', '12345678901234', 'empresa1@example.com', 'Gestor1', 'gestor1@example.com', '11-345678901'),
(default, 'Empresa2', 'senha456', '23456789012345', 'empresa2@example.com', 'Gestor2', 'gestor2@example.com', '11-456789012'),
(default, 'Empresa3', 'senha789', '34567890123456', 'empresa3@example.com', 'Gestor3', 'gestor3@example.com', '11-989894545'),
(default, 'Empresa5', 'senhadef', '56778901234567', 'empresa5@example.com', 'Gestor5', 'gestor5@example.com', '11-778901234'),
(default, 'Empresa6', 'senhaghi', '67890123456789', 'empresa6@example.com', 'Gestor6', 'gestor6@example.com', '11-901234567'),
(default, 'Empresa7', 'senhajkl', '78901234567890', 'empresa7@example.com', 'Gestor7', 'gestor7@example.com', '11-012345678'),
(default, 'Empresa8', 'senhamno', '89012345678901', 'empresa8@example.com', 'Gestor8', 'gestor8@example.com', '11-123456789'),
(default, 'Empresa9', 'senhapqr', '90123456789012', 'empresa9@example.com', 'Gestor9', 'gestor9@example.com', '11-234567890');


create table setorMercado (
idSetor int primary key auto_increment,
nomeSetor varchar(45),
fkUsuario int, 
constraint fkUsuarioSetorMercado foreign key (fkUsuario) references usuario(idUsuario));

insert into setorMercado values
(default, 'Limpeza', 1),
(default, 'Açougue', 2),
(default, 'Padaria', 3),
(default, 'Bebidas', 4),
(default, 'Enlatados', 5),
(default, 'Congelados', 6),
(default, 'Laticínios', 7),
(default, 'Hortifruti', 8);


create table gondola (
idGondola int primary key auto_increment,
qtdPrateleiras int not null,
tamanhoGondola float not null,
fkSetor int, 
constraint fkGondolaSetor foreign key (fkSetor) references setorMercado(idSetor));

insert into gondola values 
(default, 4, 2.0, 1),
(default, 5, 2.0, 2),
(default, 3, 2.0, 3),
(default, 6, 2.0, 4),
(default, 4, 2.0, 5),
(default, 7, 2.0, 6),
(default, 4, 2.0, 7),
(default, 5, 2.0, 8);

select*from gondola;

create table sensor (
idSensor int primary key auto_increment,
nomeSensor varchar(45),
tipoSensor varchar(45),
fkGondola int,
constraint fkSensorGondola foreign key (fkGondola) references gondola(idGondola));

insert into sensor values
(default, 'TRC5000', 'Bloqueio', 1),
(default, 'TRC5000', 'Bloqueio', 2),
(default, 'TRC5000', 'Bloqueio', 3),
(default, 'TRC5000', 'Bloqueio', 4),
(default, 'TRC5000', 'Bloqueio', 5),
(default, 'TRC5000', 'Bloqueio', 6),
(default, 'TRC5000', 'Bloqueio', 7),
(default, 'TRC5000', 'Bloqueio', 8),
(default, 'TRC5000', 'Bloqueio', 1),
(default, 'TRC5000', 'Bloqueio', 2),
(default, 'TRC5000', 'Bloqueio', 1),
(default, 'TRC5000', 'Bloqueio', 3),
(default, 'TRC5000', 'Bloqueio', 4),
(default, 'TRC5000', 'Bloqueio', 5),
(default, 'TRC5000', 'Bloqueio', 6),
(default, 'TRC5000', 'Bloqueio', 7),
(default, 'TRC5000', 'Bloqueio', 8),
(default, 'TRC5000', 'Bloqueio', 1),
(default, 'TRC5000', 'Bloqueio', 2),
(default, 'TRC5000', 'Bloqueio', 3),
(default, 'TRC5000', 'Bloqueio', 4),
(default, 'TRC5000', 'Bloqueio', 5),
(default, 'TRC5000', 'Bloqueio', 6),
(default, 'TRC5000', 'Bloqueio', 7),
(default, 'TRC5000', 'Bloqueio', 8);


create table registroSensor (
idRegistro int auto_increment,
fkSensor int, 
constraint pkComposta primary key (idRegistro, fkSensor),
horaRegistro datetime,
statusSensor varchar(45), constraint chkStatus check (statusSensor in ("0","1")),
constraint fkSensorRegistroSensor foreign key (fkSensor) references sensor (idSensor));

drop table registroSensor;
insert into registroSensor values
(default, 1, '2024-04-09 08:00:00', '0'),
(default, 2, '2024-04-09 08:15:00', '1'),
(default, 3, '2024-04-09 08:30:00', '1'),
(default, 4, '2024-04-09 09:00:00', '0'),
(default, 5, '2024-04-09 09:15:00', '1'),
(default, 6, '2024-04-09 09:30:00', '1');


