<?php
require_once('../db/db.php');

$type =  $_POST['type'];
function register_user()
{
  global $conn;
  $name    = $_POST['name'];
  $email = $_POST['email'];
  $last_name   = $_POST['last_name'];
  $password   = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $sql = "INSERT INTO tiempo_digital.user (email, password, name, last_name) VALUES ('$email', '$password', '$name', '$last_name')";
  $response = array('status' => 'success', 'message' => 'OK');

  try{
    $conn->query($sql);
  }catch(Exception $e){
    $response = array('status' => 'error', 'message' => $e->getCode());
  }finally{
    echo json_encode($response);
  }
}

function login()
{

}

if($type == 'login'){
  login();
} else {
  register_user();
}
?>