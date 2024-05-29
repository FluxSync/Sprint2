create database grupo_pi;
use grupo_pi;

create table usuario(
idUsuario int primary key auto_increment,
nomeEmpresa varchar(45) not null unique,
senha varchar(45) not null,
cnpj char(14) not null unique,
emailEmpresa varchar(50) not null unique,
constraint chkEmail check (emailEmpresa like ("%@%")),
telefoneContato char(12) not null unique);


create table gestor (
idGestor int auto_increment,
fkUsuario int,
constraint pkComposta primary key (idGestor, fkUsuario),
nomeGestor varchar(45) not null,
emailGestor varchar(50) not null unique,
constraint chkEmailGestor check (emailGestor like ("%@%")),
constraint fkGestorUsuario foreign key (fkUsuario) references usuario(idUsuario));


create table gondola (
idGondola int primary key auto_increment,
qtdPrateleiras int not null,
tamanhoGondola float not null,
setorMercado varchar(45) not null,
fkGestor int, 
constraint fkGondolaGestor foreign key (fkGestor) references gestor(idGestor));


create table sensor (
idSensor int primary key auto_increment,
nomeSensor varchar(45),
tipoSensor varchar(45),
fkGondola int,
constraint fkSensorGondola foreign key (fkGondola) references gondola(idGondola));


create table registroSensor (
idRegistro int auto_increment,
fkSensor int, 
constraint pkComposta primary key (idRegistro, fkSensor),
horaRegistro datetime,
statusSensor varchar(45), constraint chkStatus check (statusSensor in ("0","1")),
constraint fkSensorRegistroSensor foreign key (fkSensor) references sensor (idSensor));



