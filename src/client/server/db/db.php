<?php
//FORA DO CAMPUS
$bd_host = "200.19.1.18";

//DENTRO DO CAMPUS
//$bd_host = "192.168.20.18";

$base_de_dados = "christianmedeiros";
$bd_usuario = "christianmedeiros";
$bd_senha = "123456";

try {
  $dsn_pgsql = "pgsql:host=$bd_host;port=5432;dbname=$base_de_dados;";
  // make a database connection
  $conn = new PDO(
    $dsn_pgsql,
    $bd_usuario,
    $bd_senha,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
} catch (PDOException $e) {
  die($e->getMessage());
}
?>