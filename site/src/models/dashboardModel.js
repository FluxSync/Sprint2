var database = require("../database/config")

function setores() {
    var instrucaoSql = `
    select nomeSetor from setorMercado;
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verSetor(setor) {
    var instrucaoSql = `
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
    sm.nomeSetor = '${setor}'
GROUP BY 
    sm.nomeSetor;
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function gondolas() {
    var instrucaoSql = `
SELECT 
    sm.nomeSetor AS nome_do_setor,
    COUNT(g.idGondola) AS TotalGondolas,
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
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function velocidadeUltimaReposicao() {
    var instrucaoSql = `
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
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimaEstocagem() {
    var instrucaoSql = `
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
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function horasSemEstoque() {
    var instrucaoSql = `
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
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function messesComMaisReposicao() {
    var instrucaoSql = `
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
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function grafico() {
    var instrucaoSql = `
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
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    setores,
    verSetor,
    gondolas,
    velocidadeUltimaReposicao,
    ultimaEstocagem,
    horasSemEstoque,
    messesComMaisReposicao,
    grafico
};
