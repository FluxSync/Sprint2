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
senhaGestor varchar(50) not null,
constraint chkEmailGestor check (emailGestor like ("%@%")),
constraint fkGestorUsuario foreign key (fkUsuario) references usuario(idUsuario));

create table setorMercado(
idSetor int primary key auto_increment,
nomeSetor varchar(45),
fkGestor int, constraint fkGestorSetor foreign key (fkGestor) references gestor(idGestor));

create table gondola (
idGondola int primary key auto_increment,
qtdGondolas int not null,
qtdPrateleiras int not null,
tamanhoGondola float not null,
fkSetor int, 
constraint fkGondolaSetor foreign key (fkSetor) references setorMercado(idSetor));

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


INSERT INTO usuario (nomeEmpresa, senha, cnpj, emailEmpresa, telefoneContato)
VALUES
('Empresa A', 'senha123', '12345678000199', 'contato@empresaA.com', '11987654321'),
('Empresa B', 'senha123', '98765432000166', 'contato@empresaB.com', '21987654321');

-- Inserção de dados na tabela 'gestor'
INSERT INTO gestor (fkUsuario, nomeGestor, emailGestor, senhaGestor)
VALUES
(1, 'Gestor A1', 'gestorA1@empresaA.com', 'senhaGestorA1'),
(1, 'Gestor A2', 'gestorA2@empresaA.com', 'senhaGestorA2'),
(2, 'Gestor B1', 'gestorB1@empresaB.com', 'senhaGestorB1');

-- Inserção de dados na tabela 'setorMercado'
INSERT INTO setorMercado (nomeSetor, fkGestor)
VALUES
('Alimentos', 1),
('Bebidas', 2),
('Higiene', 3);

-- Inserção de dados na tabela 'gondola'
INSERT INTO gondola (qtdGondolas, qtdPrateleiras, tamanhoGondola, fkSetor)
VALUES
(10, 5, 1.5, 1), -- Setor Alimentos
(8, 4, 1.2, 2),  -- Setor Bebidas
(6, 3, 1.0, 3);  -- Setor Higiene

-- Inserção de dados na tabela 'sensor'
INSERT INTO sensor (nomeSensor, tipoSensor, fkGondola)
VALUES
('Sensor A1', 'Tipo 1', 1),
('Sensor A2', 'Tipo 2', 1),
('Sensor B1', 'Tipo 1', 2),
('Sensor B2', 'Tipo 2', 2),
('Sensor H1', 'Tipo 1', 3);

-- Inserção de dados na tabela 'registroSensor'
INSERT INTO registroSensor (fkSensor, horaRegistro, statusSensor)
VALUES
(1, '2024-06-01 08:00:00', '1'),
(1, '2024-06-01 15:00:00', '0'),
(1, '2024-08-01 09:00:00', '1'),
(2, '2024-06-01 13:00:00', '0'),
(3, '2024-06-01 10:00:00', '1'),
(3, '2024-06-01 14:00:00', '0'),
(4, '2024-06-01 11:00:00', '1'),
(4, '2024-06-01 15:00:00', '0'),
(5, '2024-06-01 12:00:00', '1'),
(5, '2024-06-01 16:00:00', '0'),
(1, '2024-06-01 08:00:00', '1'),
(1, '2024-06-01 12:00:00', '0'),
(2, '2024-06-01 09:00:00', '1'),
(2, '2024-06-01 13:00:00', '0'),
(3, '2024-06-01 10:00:00', '1'),
(3, '2024-06-01 14:00:00', '0'),
(4, '2024-06-01 11:00:00', '1'),
(4, '2024-06-01 15:00:00', '0'),
(5, '2024-06-01 12:00:00', '1'),
(5, '2024-06-01 16:00:00', '0');


INSERT INTO sensor (nomeSensor, tipoSensor, fkGondola)
VALUES 
    ('Sensor1', 'Tipo1', 1),
    ('Sensor2', 'Tipo2', 2);

-- Inserir registros de sensores
INSERT INTO registroSensor (fkSensor, horaRegistro, statusSensor)
VALUES
    (1, '2024-06-11 08:00:00', '1'),
    (1, '2024-06-11 08:05:00', '0'),
    (1, '2024-06-11 08:10:00', '1'),
    (1, '2024-06-11 08:15:00', '0'),
    (2, '2024-06-11 08:00:00', '1'),
    (2, '2024-06-11 08:05:00', '1'),
    (2, '2024-06-11 08:10:00', '0'),
    (2, '2024-06-11 08:15:00', '1');








SELECT * FROM usuario;
SELECT * FROM gestor;
SELECT * FROM setorMercado;
SELECT * FROM sensor;
SELECT * FROM registroSensor;

select idSetor from setorMercado
order by idSetor desc limit 1;

-- CLIENTE PODER ESCOLHER QUAL SETOR ELE QUER VER
select nomeSetor from setorMercado;

SELECT *
FROM setorMercado
WHERE nomeSetor = 'Alimentos';



-- VER OS DADOS DO SETOR QUE ELE ESCOLHEU

SELECT 
    sm.nomeSetor AS nome_do_setor,
    COUNT(g.idGondola) AS quantidade_gondolas,
    SUM(g.qtdPrateleiras) AS quantidade_prateleiras,
    COUNT(s.idSensor) AS quantidade_sensores
FROM 
    setorMercado sm
LEFT JOIN 
    gondola g ON sm.idSetor = g.fkSetor
LEFT JOIN 
    sensor s ON g.idGondola = s.fkGondola
WHERE 
    sm.nomeSetor = 'Alimentos'
GROUP BY 
    sm.nomeSetor;


-- SELECT PARA VER QUANTAS GONDOLAS TEM NO SETOR E QUAIS ESTÃO CHEIAS E VAZIAS
SELECT 
    sm.nomeSetor AS nome_do_setor,
    COUNT(g.idGondola) AS TotalGondolas,
    SUM(CASE WHEN rs.statusSensor = '0' THEN 1 ELSE 0 END) AS GondolasCheias,
    SUM(CASE WHEN rs.statusSensor = '1' THEN 1 ELSE 0 END) AS GondolasVazias
FROM 
    setorMercado sm
JOIN 
    gondola g ON sm.idSetor = g.fkSetor
JOIN 
    sensor s ON g.idGondola = s.fkGondola
JOIN 
    registroSensor rs ON s.idSensor = rs.fkSensor
WHERE
    sm.nomeSetor = 'Alimentos'  -- Altere 'Alimentos' para o setor desejado
GROUP BY 
    sm.nomeSetor;
    
    
     

-- Consulta para verificar o total de reposições no mês e pegar os três meses com mais reposições
   WITH ReposicoesPorMes AS (
    SELECT 
        CASE 
            WHEN DATE_FORMAT(horaRegistro, '%m') = '01' THEN 'Janeiro'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '02' THEN 'Fevereiro'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '03' THEN 'Março'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '04' THEN 'Abril'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '05' THEN 'Maio'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '06' THEN 'Junho'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '07' THEN 'Julho'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '08' THEN 'Agosto'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '09' THEN 'Setembro'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '10' THEN 'Outubro'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '11' THEN 'Novembro'
            WHEN DATE_FORMAT(horaRegistro, '%m') = '12' THEN 'Dezembro'
        END AS mes_ano,
        DATE_FORMAT(horaRegistro, '%Y-%m') AS mes_numero,
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
        (subquery.statusSensor = '1' AND subquery.statusAnterior = '0')
    GROUP BY 
        mes_ano, mes_numero
)
SELECT 
    (SELECT mes_ano FROM ReposicoesPorMes ORDER BY total_reposicoes DESC LIMIT 1) AS mes1,
    (SELECT total_reposicoes FROM ReposicoesPorMes ORDER BY total_reposicoes DESC LIMIT 1) AS total_reposicoes1,
    (SELECT mes_ano FROM ReposicoesPorMes ORDER BY total_reposicoes DESC LIMIT 1 OFFSET 1) AS mes2,
    (SELECT total_reposicoes FROM ReposicoesPorMes ORDER BY total_reposicoes DESC LIMIT 1 OFFSET 1) AS total_reposicoes2,
    (SELECT mes_ano FROM ReposicoesPorMes ORDER BY total_reposicoes DESC LIMIT 1 OFFSET 2) AS mes3,
    (SELECT total_reposicoes FROM ReposicoesPorMes ORDER BY total_reposicoes DESC LIMIT 1 OFFSET 2) AS total_reposicoes3;
    
    
    
    
    -- TEMPO TOTAL SEM ESTOQUE NA SEMANA
    WITH StatusChanges AS (
    SELECT 
        rs.idRegistro,
        s.fkGondola,
        rs.horaRegistro,
        rs.statusSensor,
        LAG(rs.statusSensor) OVER (PARTITION BY s.fkGondola ORDER BY rs.horaRegistro) AS statusAnterior
    FROM 
        registroSensor rs
    JOIN 
        sensor s ON rs.fkSensor = s.idSensor
),
LastRestock AS (
    SELECT 
        fkGondola,
        MAX(horaRegistro) AS ultima_estocagem
    FROM 
        StatusChanges
    WHERE 
        statusAnterior = '0' AND statusSensor = '1'
    GROUP BY 
        fkGondola
)
SELECT 
    lr.fkGondola,
    DATE_FORMAT(lr.ultima_estocagem, '%d/%m/%Y') AS ultima_estocagem
FROM 
    LastRestock lr
WHERE
    lr.fkGondola = 1; -- Filtro para pegar apenas uma gôndola específica
    
    
    
    
	
    -- DATA DA ULTIMA ESTOCAGEM
    WITH StatusChanges AS (
    SELECT 
        rs.idRegistro,
        rs.fkSensor,
        rs.horaRegistro,  -- Manter a data e hora completas para precisão
        rs.statusSensor,
        LAG(rs.statusSensor) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS statusAnterior
    FROM 
        registroSensor rs
),
LastRestock AS (
    SELECT 
        fkSensor,
        MAX(horaRegistro) AS ultima_estocagem
    FROM 
        StatusChanges
    WHERE 
        statusAnterior = '0' AND statusSensor = '1'
    GROUP BY 
        fkSensor
)
SELECT 
    s.fkGondola,
    lr.fkSensor,
    DATE_FORMAT(lr.ultima_estocagem, '%d/%m/%Y') AS ultima_estocagem
FROM 
    LastRestock lr
JOIN 
    sensor s ON lr.fkSensor = s.idSensor
ORDER BY 
    s.fkGondola, lr.fkSensor;
        
        
        
        
        
    
    -- VELOCIDADE DE REPOSIÇÃO
    SELECT 
    TIME_FORMAT(
        SEC_TO_TIME(
            ABS(
                TIMESTAMPDIFF(SECOND, ultima_sem_estoque.horaRegistro, ultima_reposicao.horaRegistro)
            )
        ), '%H:%i:%s'
    ) AS tempo_reposicao_em_horas,
    TIMESTAMPDIFF(SECOND, ultima_sem_estoque.horaRegistro, ultima_reposicao.horaRegistro) / 86400 AS tempo_reposicao_em_dias
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

SELECT 
    statusSensor, 
    DATE_FORMAT(horaRegistro, '%d/%m/%Y %H:%i:%s') AS horaRegistro 
FROM (
    SELECT 
        statusSensor, 
        horaRegistro
    FROM 
        registroSensor
    WHERE 
        fkSensor = 1
    ORDER BY 
        idRegistro desc
    LIMIT 7
) AS subquery
ORDER BY 
    horaRegistro ASC;
    
    
    
SELECT 
    TIME_FORMAT(
        SEC_TO_TIME(
            SUM(TIMESTAMPDIFF(SECOND, horaAnterior, horaRegistro))
        ), '%H:%i:%s'
    ) AS tempo_sensor_vazio
FROM 
    (
        SELECT 
            rs.idRegistro,
            rs.fkSensor,
            rs.horaRegistro,
            LAG(rs.horaRegistro) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS horaAnterior,
            rs.statusSensor,
            LAG(rs.statusSensor) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS statusAnterior
        FROM 
            registroSensor rs
    ) AS subquery
WHERE 
    statusSensor = '0' AND statusAnterior = '1';
    
    
    
    
-- TEMPO TOTAL SEM ESTOQUE NA SEMANA    
SELECT 
    TIME_FORMAT(
        SEC_TO_TIME(
            SUM(TIMESTAMPDIFF(SECOND, horaAnterior, horaRegistro))
        ), '%H:%i:%s'
    ) AS tempo_sensor_inativo
FROM 
    (
        SELECT 
            rs.idRegistro,
            rs.fkSensor,
            rs.horaRegistro,
            LAG(rs.horaRegistro) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS horaAnterior,
            rs.statusSensor,
            LAG(rs.statusSensor) OVER (PARTITION BY rs.fkSensor ORDER BY rs.horaRegistro) AS statusAnterior
        FROM 
            registroSensor rs
    ) AS subquery
WHERE 
    statusSensor = '0' AND statusAnterior = '1'
    AND YEARWEEK(horaRegistro, 1) = YEARWEEK(CURDATE(), 1);
   
   
   
   


    
    
 