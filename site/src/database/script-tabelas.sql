create database flux;

use flux;

create table gestor (
	idGestor int primary key auto_increment,
    nomeGestor varchar(80),
    emailGestor varchar(100),
    senhaGestor varchar(100)
);

select * from gestor;


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




-- CLIENTE PODER ESCOLHER QUAL SETOR ELE QUER VER
select setorMercado from gondola;



-- VER OS DADOS DO SETOR QUE ELE ESCOLHEU
SELECT 
    g.setorMercado,
    COUNT(g.idGondola) AS quantidade_gondolas,
    SUM(g.qtdPrateleiras) AS quantidade_prateleiras,
    COUNT(s.idSensor) AS quantidade_sensores
FROM 
    gondola g
LEFT JOIN 
    sensor s ON g.idGondola = s.fkGondola
where g.setorMercado = 'Limpeza';



-- PARA VER QUANTAS GONDOLAS VAZIAS POSSUE
SELECT 
    g.idGondola,
    g.qtdPrateleiras,
    g.tamanhoGondola,
    g.setorMercado
FROM 
    gondola g
JOIN 
    sensor s ON g.idGondola = s.fkGondola
JOIN 
    registroSensor rs ON s.idSensor = rs.fkSensor
WHERE 
    rs.statusSensor = '0' and g.setorMercado = 'Alimentos';
    
   
   
   
   
-- SELECT PARA VER QUANTAS GONDOLAS TEM NO SETOR E QUAIS ESTÃO CHEIAS E VAZIAS   
SELECT 
    g.idGondola,
    g.setorMercado,
    rs.statusSensor
FROM 
    gondola g
JOIN 
    sensor s ON g.idGondola = s.fkGondola
JOIN 
    registroSensor rs ON s.idSensor = rs.fkSensor
WHERE 
     g.setorMercado = 'Alimentos';
     
     
     
 
    
-- VER O TOTAL DE REPOSIÇÕES NO MÊS
    SELECT 
    g.idGondola,
    DATE_FORMAT(horaRegistro, '%m') AS mes_ano,
    COUNT(*) AS total_reposicoes
FROM 
    (SELECT 
         rs.idRegistro,
         rs.fkSensor,
         rs.horaRegistro,
         rs.statusSensor,
         LAG(rs.statusSensor) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS statusAnterior
     FROM 
         registroSensor rs) AS subquery
JOIN 
    sensor s ON subquery.fkSensor = s.idSensor
JOIN 
    gondola g ON s.fkGondola = g.idGondola
WHERE 
    (statusSensor = '1' AND statusAnterior = '0')
GROUP BY 
    g.idGondola, mes_ano
ORDER BY 
    total_reposicoes DESC;
    
    
    
    
    
    
    -- TEMPO TOTAL SEM ESTOQUE NA SEMANA
    WITH StatusChanges AS (
    SELECT 
        rs.idRegistro,
        rs.fkSensor,
        rs.horaRegistro,
        rs.statusSensor,
        LAG(rs.statusSensor) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS statusAnterior,
        LAG(rs.horaRegistro) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS horaAnterior
    FROM 
        registroSensor rs
),
PeriodsWithoutStock AS (
    SELECT 
        fkSensor,
        horaAnterior AS inicioPeriodo,
        horaRegistro AS fimPeriodo,
        TIMESTAMPDIFF(SECOND, horaAnterior, horaRegistro) AS duracao
    FROM 
        StatusChanges
    WHERE 
        statusAnterior = '1' AND statusSensor = '0'
)
SELECT 
    YEARWEEK(inicioPeriodo, 1) AS semana_ano,
    fkSensor,
    SEC_TO_TIME(SUM(duracao)) AS total_tempo_sem_estoque
FROM 
    PeriodsWithoutStock
WHERE 
    YEARWEEK(inicioPeriodo, 1) = YEARWEEK(NOW() - INTERVAL 1 WEEK, 1)
GROUP BY 
    semana_ano, fkSensor
ORDER BY 
    semana_ano, fkSensor;
    
    
    
    
    
    
    -- DATA DA ULTIMA ESTOCAGEM
    WITH StatusChanges AS (
    SELECT 
        rs.idRegistro,
        rs.fkSensor,
        rs.horaRegistro,
        rs.statusSensor,
        LAG(rs.statusSensor) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS statusAnterior
    FROM 
        registroSensor rs
)
SELECT 
    s.fkGondola,
    sc.fkSensor,
    MAX(sc.horaRegistro) AS ultima_estocagem
FROM 
    StatusChanges sc
JOIN 
    sensor s ON sc.fkSensor = s.idSensor
WHERE 
    sc.statusAnterior = '0' AND sc.statusSensor = '1'
GROUP BY 
    s.fkGondola, sc.fkSensor
ORDER BY 
    s.fkGondola, sc.fkSensor;
    
    
    
    -- VELOCIDADE DE REPOSIÇÃO
SELECT 
    TIME_FORMAT(
        SEC_TO_TIME(
            ABS(
                TIMESTAMPDIFF(SECOND, ultima_sem_estoque.horaRegistro, ultima_reposicao.horaRegistro)
            )
        ), '%H:%i:%s'
    ) AS tempo_reposicao_em_horas
FROM 
    (
        SELECT 
            MAX(horaRegistro) AS horaRegistro
        FROM 
            registroSensor
        WHERE 
            statusSensor = '1'
    ) AS ultima_reposicao,
    (
        SELECT 
            MAX(horaRegistro) AS horaRegistro
        FROM 
            registroSensor
        WHERE 
            horaRegistro < (
                SELECT 
                    MAX(horaRegistro)
                FROM 
                    registroSensor
                WHERE 
                    statusSensor = '1'
            )
            AND statusSensor = '0'
    ) AS ultima_sem_estoque;
    
    
    
    -- SELECT DO GRÁFICO (CHART JS)
    select statusSensor, horaRegistro from registroSensor;
    
    
    
    
INSERT INTO usuario (nomeEmpresa, senha, cnpj, emailEmpresa, telefoneContato) VALUES
('Empresa A', 'senhaA', '12345678000195', 'contato@empresaA.com', '11987654321'),
('Empresa B', 'senhaB', '98765432000145', 'contato@empresaB.com', '11987654322');

-- Inserir dados na tabela gestor
INSERT INTO gestor (fkUsuario, nomeGestor, emailGestor) VALUES
(1, 'Gestor A', 'gestorA@empresaA.com'),
(2, 'Gestor B', 'gestorB@empresaB.com');

-- Inserir dados na tabela gondola
INSERT INTO gondola (qtdPrateleiras, tamanhoGondola, setorMercado, fkGestor) VALUES
(5, 2.5, 'Alimentos', 1),
(4, 3.0, 'Bebidas', 1),
(6, 2.0, 'Higiene', 2);

-- Inserir dados na tabela sensor
INSERT INTO sensor (nomeSensor, tipoSensor, fkGondola) VALUES
('Sensor A1', 'Temperatura', 1),
('Sensor A2', 'Umidade', 1),
('Sensor B1', 'Peso', 2),
('Sensor C1', 'Temperatura', 3);

-- Inserir dados na tabela registroSensor
INSERT INTO registroSensor (fkSensor, horaRegistro, statusSensor) VALUES
(1, '2024-06-01 10:00:00', '0'),
(2, '2024-06-01 10:05:00', '1'),
(3, '2024-06-01 10:10:00', '0'),
(4, '2024-06-01 10:15:00', '1');

select * from sensor ;

update registroSensor set statusSensor = '0'
where idRegistro = 1;

INSERT INTO registroSensor (fkSensor, horaRegistro, statusSensor) VALUES
(1, '2024-06-05 18:00:00', '1');
