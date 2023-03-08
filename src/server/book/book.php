<?php
require_once('../db/db.php');

$function = $_POST['function'];

function insert_book()
{
  $response = array('status' => 'success', 'message' => 'OK');

  global $conn;
  $title = $_POST['title'];
  $synopsis = $_POST['synopsis'];
  $stars = isset($_POST['stars']) ? floatval($_POST['stars']) : null;
  $author = $_POST['author'];
  $cover_url = isset($_POST['cover_url']) ? $_POST['cover_url'] : null;
  $lines_number = isset($_POST['lines_number']) ? intval($_POST['lines_number']) : null;
  $list_id = intval($_POST['list_id']);

  try {
    $stmt = $conn->prepare("INSERT INTO tiempo_digital.tb_book (title, synopsis, stars, author, cover_url, lines_number, list_id) VALUES (:title, :synopsis, :stars, :author, :cover_url, :lines_number, :list_id)");
    $stmt->execute(array('title' => $title, 'synopsis' => $synopsis, 'stars' => $stars, 'author' => $author, 'cover_url' => $cover_url, 'lines_number' => $lines_number, 'list_id' => $list_id));
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}

function get_books_by_list_id()
{
  global $conn;
  $list_id = intval($_POST['list_id']);
  $response = array('status' => 'success', 'message' => 'OK', 'books' => array());

  try {
    $stmt = $conn->prepare("SELECT * FROM tiempo_digital.tb_book WHERE list_id = :list_id");
    $stmt->execute(array('list_id' => $list_id));
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['books'] = $books;
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}

function delete_book_by_id()
{
  global $conn;
  $id = intval($_POST['id']);
  $response = array('status' => 'success', 'message' => 'OK');

  try {
    $stmt = $conn->prepare("DELETE FROM tiempo_digital.tb_book WHERE id = :id");
    $stmt->execute(array('id' => $id));
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}

function change_book_list() {
  global $conn;
  $response = array('status' => 'success', 'message' => 'OK');
  $book_id = intval($_POST['book_id']);
  $new_list_id = intval($_POST['list_id']);


  try {
    $stmt = $conn->prepare("UPDATE tiempo_digital.tb_book SET list_id = :list_id WHERE id = :id");
    $stmt->execute(array('list_id' => $new_list_id, 'id' => $book_id));
    $rows_updated = $stmt->rowCount();
    if ($rows_updated === 0) {
      $response = array('status' => 'error', 'message' => 'No rows were updated. Book ID may not exist.');
    }
  } catch (Exception $e) {
    $response = array('status' => 'error', 'message' => $e->getMessage());
  } finally {
    echo json_encode($response);
  }
}



switch ($_POST['function']) {
  case 'insert':
    insert_book();
    break;
  case 'getall':
    get_books_by_list_id();
    break;
  case 'delete':
    delete_book_by_id();
    break;
  case 'alter':
    change_book_list();
    break;
  default:
    break;
}