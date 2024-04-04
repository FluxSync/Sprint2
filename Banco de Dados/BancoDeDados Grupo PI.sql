create database grupo_pi;
use grupo_pi;

create table cadastro (
idCadastro int primary key auto_increment,
nome varchar(45) not null unique,
senha varchar(45) not null,
cnpj char(14) not null unique,
email varchar(50) not null unique,
constraint chkEmail check (email like ("%@%")),
telefone char(12) not null unique);

insert into cadastro values
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


create table empresa (
idEmpresa int primary key auto_increment,
nomEmpresa varchar(50) not null unique,
fkCadastro int not null, 
constraint fkCadastroEmpresa foreign key (fkCadastro) references cadastro(idCadastro));


insert into empresa values
(default,'Grupo Carrefour', 1),
(default,'Assaí Atacadista', 2),
(default,'Grupo Mateus', 3),
(default,'Dia Brasil', 4),
(default,'Supermercados BH', 5),
(default,'Grupo Muffato', 6),
(default,'Grupo Pereira', 7),
(default,'Cencosud Brasil', 8),
(default,'Mart Minas & Dom Atacadista', 9),
(default,'Sonda Supermercados', 10);


create table prateleira (
idPrateleira int primary key auto_increment,
nomeProduto varchar(45) not null,
fkEmpresa int, 
constraint fkPrateleiraEmpresa foreign key (fkEmpresa) references empresa(idEmpresa),
fkCadastro int, 
constraint fkPrateleiraCadastro foreign key (fkCadastro) references cadastro(idCadastro));


insert into prateleira values 
(default,'Bolacha', 1, 1),
(default,'Refrigerante',2, 2),
(default,'Desinfetante', 3, 3),
(default,'Detergente', 4, 4),
(default,'Cerveja', 5, 5);

create table sensor (
idSensor int primary key auto_increment,
nomeSensor varchar(45),
registroHora datetime not null,
fkPrateleira int,
constraint fkSensorPrateleira foreign key (fkPrateleira) references prateleira(idPrateleira),
fkEmpresa int,
constraint fkSensorEmpresa foreign key (fkEmpresa) references empresa(idEmpresa),
fkCadastro int,
constraint fkSensorCadastro foreign key (fkCadastro) references cadastro(idCadastro));


insert into sensor values
(default,'TRC5000', '2024-04-03 10:00:00', 1, 1, 1),
(default,'TRC5000', '2024-04-03 10:15:00', 2, 2, 2),
(default,'TRC5000', '2024-04-03 10:30:00', 3, 3, 3),
(default,'TRC5000', '2024-04-03 10:45:00', 4, 4, 4),
(default,'TRC5000', '2024-04-03 11:00:00', 5, 5, 5);

SELECT 
    s.idSensor, 
    s.nomeSensor, 
    s.registroHora, 
    p.nomeProduto AS nomeProdutoPrateleira, 
    e.nomEmpresa AS nomeEmpresa, 
    c.email AS emailCadastro 
FROM 
    sensor s
JOIN 
    prateleira p ON s.fkPrateleira = p.idPrateleira
JOIN 
    empresa e ON s.fkEmpresa = e.idEmpresa
JOIN 
    cadastro c ON s.fkCadastro = c.idCadastro;




