create database grupo_pi;
use grupo_pi;

create table mercado (
idMercado int primary key auto_increment,
nome varchar(45) not null unique,
senha varchar(45) not null,
cnpj char(14) not null unique,
email varchar(50) not null unique,
constraint chkEmail check (email like ("%@%")),
telefone char(12) not null unique);


insert into mercado values
(default,'Empresa A', 'senha123', '85794158000145', 'empresaA@email.com', '11-123456789'),
(default,'Empresa B', 'senha456', '56713648000190', 'empresaB@email.com', '11-987654321'),
(default,'Empresa C', 'senha789', '26476185000180', 'empresaC@email.com', '11-678901234'),
(default,'Empresa D', 'senhaabc', '23479516000170', 'empresaD@email.com', '11-210987654'),
(default,'Empresa E', 'senhadef', '03248791000160', 'empresaE@email.com', '11-543210987'),
(default,'Empresa F', 'senhaghi', '34867195000150', 'empresaF@email.com', '11-890123456'),
(default,'Empresa G', 'senhijkl', '67913468000140', 'empresaG@email.com', '11-345678901'),
(default,'Empresa H', 'senhamno', '52347167000110', 'empresaH@email.com', '11-567890123'),
(default,'Empresa I', 'senhapqr', '12547895000130', 'empresaI@email.com', '11-901234567'),
(default,'Empresa J', 'senha123', '66479551000120', 'empresaJ@email.com', '11-230987654');

select*from mercado;

create table prateleira (
idPrateleira int primary key auto_increment,
nomeProduto varchar(45) not null,
qtdMax_Produto int not null,
Setor varchar(45),
fkMercado int, 
constraint fkPrateleiraMercado foreign key (fkMercado) references mercado(idMercado));


insert into prateleira values 
(default,'Bolacha', 30 ,'Industrializados', 1),
(default,'Refrigerante', 25, 'Bebidas', 2),
(default,'Desinfetante', 23, 'Higiene e Limpeza', 3),
(default,'Detergente', 28, 'Higiene e Limpeza', 4),
(default,'Cerveja', 30, 'Bebidas', 5);

create table sensor (
idSensor int primary key auto_increment,
nomeSensor varchar(45),
tipoSensor varchar(45),
fkPrateleira int,
constraint fkSensorPrateleira foreign key (fkPrateleira) references prateleira(idPrateleira));


insert into sensor values
(default,'TRC5000', 'Sensor de Bloqueio', 1);


create table registroSensor (
idRegistro int primary key auto_increment,
horaRegistro datetime,
statusSensor varchar(45),
fkSensor int,
constraint fkSensorRegistroSensor foreign key (fkSensor) references sensor (idSensor));

insert into registroSensor values
(default, '2024-04-09 08:00:00', 'Ativo', 1),
(default, '2024-04-09 08:15:00', 'Inativo', 1),
(default, '2024-04-09 08:30:00', 'Ativo', 1);


