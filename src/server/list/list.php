<?php
require_once('../db/db.php');

$function = $_POST['function'];

function insert_list()
{
  $response = array('status' => 'success', 'message' => 'OK');

  global $conn;
  $name = $_POST['name'];
  $desc = $_POST['desc'];
  $parent = isset($_POST['parent']) ? intval($_POST['parent']) : null;
  $owner_id = intval($_POST['owner_id']);
  $color = null;

  try {
    $stmt = $conn->prepare("INSERT INTO tiempo_digital.tb_list (name, parent_id, owner_id, is_system_default, color, description) VALUES (:name, :parent_id, :owner_id, false, :color, :description)");
    $stmt->execute(array('name' => $name, 'parent_id' => $parent, 'owner_id' => $owner_id, 'color' => $color, 'description' => $desc));
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}

function get_lists_by_user() {
  global $conn;
  $user_id = $_POST['user_id'];
  $response = array('status' => 'success', 'message' => 'OK', 'lists' => array());

  try {
    $stmt = $conn->prepare("SELECT * FROM tiempo_digital.tb_list WHERE owner_id = :owner_id");
    $stmt->execute(array('owner_id' => $user_id));
    $lists = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['lists'] = $lists;
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}

function delete_list_by_id() {
  global $conn;
  $id = $_POST['id'];
  $response = array('status' => 'success', 'message' => 'OK');

  try {
    $stmt = $conn->prepare("DELETE FROM tiempo_digital.tb_list WHERE id = :id");
    $stmt->execute(array('id' => $id));
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}

function update_list() {
  global $conn;
  $id = $_POST['id'];
  $name = $_POST['name'];
  $desc = $_POST['desc'];
  $color = $_POST['color'];
  $response = array('status' => 'success', 'message' => 'OK');

  try {
    $stmt = $conn->prepare("UPDATE tiempo_digital.tb_list SET name = :name, color = :color, description = :description WHERE id = :id");
    $stmt->execute(array('name' => $name, 'color' => $color, 'description' => $desc, 'id' => $id));
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}

switch ($_POST['function']) {
  case 'insert':
    insert_list();
    break;
  case 'getall':
    get_lists_by_user();
    break;
  case 'delete':
    delete_list_by_id();
    break;
  case 'update':
    update_list();
    break;
  default:
    break;
}

?>