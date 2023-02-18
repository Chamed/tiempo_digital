<?php

function db_insert_teste()
{
  global $conn;
  $sql = "INSERT INTO tiempo_digital.user (email, password, name, last_name) VALUES ('christian@example.com', 'password123', 'Anrique', 'Lastname')";
  $conn->query($sql);

  return null;
}

require_once("../db/db.php");

db_insert_teste();
?>