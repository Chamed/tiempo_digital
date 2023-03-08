<?php
require_once('../db/db.php');

$type = $_POST['type'];
function register_user()
{
  $response = array('status' => 'success', 'message' => 'OK');

  global $conn;
  $name = $_POST['name'];
  $email = $_POST['email'];
  $last_name = $_POST['last_name'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  try {
    $stmt = $conn->prepare("INSERT INTO tiempo_digital.tb_user (email, password, first_name, last_name) VALUES (:email, :password, :first_name, :last_name)");
    $stmt->execute(array('email' => $email, 'password' => $password, 'first_name' => $name, 'last_name' => $last_name));
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getCode());
  } finally {
    echo json_encode($response);
  }
}


function login()
{
  $response = array('status' => 'error', 'message' => 'Incorrect email or password', 'user_data' => []);

  global $conn;
  $email = $_POST['email'];
  $password = $_POST['password'];

  try {
    $user_query = "SELECT * FROM tiempo_digital.tb_user WHERE email = :email";
    $stmt = $conn->prepare($user_query);
    $stmt->execute(array('email' => $email));
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $hashed_password = $user['password'];
    $hashed_password_verified = password_verify($password, $hashed_password);

    if ($hashed_password_verified) {
      session_start();

      unset($user['password']);
      $_SESSION['user_data'] = $user;

      $response['user_data'] = $user;
      $response['status'] = 'success';
      $response['message'] = 'OK';
    }
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getCode());
  } finally {
    echo json_encode($response);
  }
}

function logout()
{
  $response = array('status' => 'success', 'message' => 'OK');

  try {
    $_SESSION['user_data'] = null;
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}

if ($type == 'login') {
  login();
} else if ($type == 'register') {
  register_user();
} else {
  logout();
}
?>