import { showToast } from '../../utils/utils.js';

const user_id = JSON.parse(localStorage.getItem('user')).id;
let global_lists, global_book, global_edit_book;

document.addEventListener('DOMContentLoaded', () => {
  const searchBookModal = document.getElementById('searchBookModal');
  const bookInput = document.getElementById('bookInput');
  const searchBook = document.getElementById('searchBook');
  const bookModal = document.getElementById('bookModal');
  const addBook = document.getElementById('addBook');

  searchBookModal.addEventListener('click', buscarLivro);
  bookModal.addEventListener('hidden.bs.modal', cleanBookData)
  searchBook.addEventListener('click', () => $('#bookModal').modal('show'));
  addBook.addEventListener('click', (event) => {
    addBookToList(event);
  });

  bookInput.addEventListener('input', () => {
    searchBookModal.disabled = !bookInput.value;
  });

  const changeBookListBtn = document.getElementById('changeBookList');
  changeBookListBtn.addEventListener('click', (event) => {
    changeBookList(event);
  });
});


//FUNCTIONS//
const changeBookList = (event) => {
  event.preventDefault();
  event.target.checkValidity();

  const formData = {
    list_id: $("#destinyList").val() || null,
    book_id: global_edit_book,
    function: 'alter',
  };

  $.ajax({
    type: 'post',
    url: '../../../server/book/book.php',
    data: formData,
    success: (jsonResponse) => {
      console.log(jsonResponse)
      const response = JSON.parse(jsonResponse);

      if (response.status === 'error') {
        showToast('Algo deu errado ao tentar alterar seu livro', 'error');
      } else {
        removeBookWrappers();
        buildListBooks();
        showToast('Livro alterado com sucesso', 'success');
        $('#changeListModal').modal('hide')
      }
    },
  });

}

const removeBookWrappers = () => {
  const bookWrappers = document.querySelectorAll('.book-wrapper');
  bookWrappers.forEach(wrapper => wrapper.remove());
}

export const buildListBooks = async () => {
  const books = await getAllBooksFromList();
  const bookList = document.getElementById('bookList');

  for (const book of books) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';

    const bookWrapper = document.createElement('div');
    bookWrapper.classList.add('book-wrapper', 'd-flex', 'flex-row');
    bookWrapper.setAttribute('data-bs-toggle', 'dropdown');

    const bookCoverWrapper = document.createElement('div');
    bookCoverWrapper.style.marginRight = '50px';

    const bookCover = document.createElement('img');
    bookCover.alt = 'Capa livro';
    bookCover.classList.add('book-thumb-dynamic');
    bookCover.src = book.cover_url || 'https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_a89d30d13cf9c94cbf2cf9f8dc03ec0ff6d28f14.jpg';

    bookCoverWrapper.appendChild(bookCover);

    const bookInfoWrapper = document.createElement('div');
    bookInfoWrapper.classList.add('d-flex', 'flex-column');

    const bookTitle = document.createElement('span');
    bookTitle.id = 'bookTitleDynamic';
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement('span');
    bookAuthor.id = 'bookAuthorDynamic';
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement('span');
    bookPages.id = 'bookPagesDynamic';
    bookPages.textContent = `${book.lines_number} páginas`;

    const bookSynopsis = document.createElement('p');
    bookSynopsis.id = 'synopsisDynamic';
    bookSynopsis.textContent = book.synopsis;
    bookSynopsis.setAttribute('style', 'margin-top: 20px');

    bookInfoWrapper.appendChild(bookTitle);
    bookInfoWrapper.appendChild(bookAuthor);
    bookInfoWrapper.appendChild(bookPages);
    bookInfoWrapper.appendChild(bookSynopsis);

    bookWrapper.appendChild(bookCoverWrapper);
    bookWrapper.appendChild(bookInfoWrapper);

    dropdown.appendChild(bookWrapper);

    const dropdownMenu = document.createElement('ul');
    dropdownMenu.className = 'dropdown-menu dropdown-menu-dark';

    const changeList = document.createElement('li');
    changeList.classList.add('changeList');

    const changeLink = document.createElement('a');
    changeLink.className = 'dropdown-item';
    changeLink.textContent = 'Mudar de lista';
    changeLink.setAttribute('bookId', book.id);

    changeList.appendChild(changeLink);
    dropdownMenu.appendChild(changeList);

    const deleteBook = document.createElement('li');
    deleteBook.classList.add('deleteBook');

    const deleteLink = document.createElement('a');
    deleteLink.className = 'dropdown-item';
    deleteLink.textContent = 'Excluir';
    deleteLink.setAttribute('bookId', book.id);

    deleteBook.appendChild(deleteLink);
    dropdownMenu.appendChild(deleteBook);

    dropdown.appendChild(dropdownMenu);
    bookList.appendChild(dropdown);
  }

  addBookEvent();
};


const addBookToList = (event) => {
  event.preventDefault();
  event.target.checkValidity();

  const formData = global_book;
  formData.list_id = document.getElementById('listSelect').value
  formData.function = 'insert';

  $.ajax({
    type: 'post',
    url: '../../../server/book/book.php',
    data: formData,
    success: (jsonResponse) => {
      const response = JSON.parse(jsonResponse);

      if (response.status === 'error') {
        showToast('Algo deu errado ao tentar inserir seu livro', 'error');
      } else {
        showToast('Livro inserido com sucesso', 'success');
        removeBookWrappers();
        buildListBooks();
        $('#bookModal').modal('hide')
      }
    },
  });

}

const getAllBooksFromList = async () => {
  const listId = localStorage.getItem('list');

  try {
    const response = await $.ajax({
      url: '../../../server/book/book.php',
      type: 'post',
      data: {
        list_id: listId,
        function: 'getall',
      },
      dataType: 'json',
    });

    return response.books;
  } catch (error) {
    throw error;
  }
}

const getAllLists = async () => {
  try {
    const response = await $.ajax({
      url: '../../../server/list/list.php',
      type: 'post',
      data: {
        user_id: user_id,
        function: 'getall',
      },
      dataType: 'json',
    });

    global_lists = response.lists;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const cleanBookData = () => {
  const bookData = document.querySelector('.book-data');
  const loadingBookData = document.querySelector('.loading-book-data');

  bookData.classList.add('hidden');
  loadingBookData.classList.add('hidden');

  const titleSpan = document.getElementById('bookTitle');
  const authorSpan = document.getElementById('bookAuthor');
  const pagesSpan = document.getElementById('bookPages');
  const synopsisPara = document.getElementById('synopsis');
  const bookThumbImg = document.querySelector('.book-thumb');

  global_book = null;
  bookInput.value = '';
  titleSpan.textContent = '';
  authorSpan.textContent = '';
  pagesSpan.textContent = '';
  synopsisPara.textContent = '';
  bookThumbImg.src = '';

  const listSelect = document.getElementById('listSelect');

  while (listSelect.options.length > 0) {
    listSelect.remove(0);
  }
};

const addBookEvent = () => {
  const changeLists = document.querySelectorAll('.changeList');

  changeLists.forEach(element => {
    element.addEventListener('click', (event) => {
      setListSelect('#destinyList');
      $('#changeListModal').modal('show')
      global_edit_book = event.target.closest('[bookId]').getAttribute('bookId');
    });
  });

  const deletes = document.querySelectorAll('.deleteBook');

  deletes.forEach(element => {
    element.addEventListener('click', (event) => {
      const targetId = event.target.closest('[bookId]').getAttribute('bookId');
      deleteBook(targetId);
    });
  });
}

const deleteBook = async (bookId) => {
  try {
    await $.ajax({
      url: '../../../server/book/book.php',
      type: 'post',
      data: {
        id: bookId,
        function: 'delete',
      },
      dataType: 'json',
    });

    removeBookWrappers();
    buildListBooks();
    showToast('Livro deletado com sucesso', 'success');
  } catch (error) {
    console.error(error);
    throw error;
  }
}


const buscarLivro = async () => {
  const livroInput = document.getElementById('bookInput').value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${livroInput}&printType=books`;
  const bookData = document.querySelector('.book-data');
  const loadingBookData = document.querySelector('.loading-book-data');

  bookData.classList.add('hidden');
  loadingBookData.classList.remove('hidden');


  try {
    const response = await fetch(url);
    const data = await response.json();
    const bookList = data.items.map(item => ({
      title: item.volumeInfo.title,
      synopsis: item.volumeInfo.description,
      stars: item.volumeInfo.averageRating || 0,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Desconhecido",
      cover_url: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
      lines_number: item.volumeInfo.pageCount || 0
    }));

    global_book = bookList[0];

    const titleSpan = document.getElementById('bookTitle');
    const authorSpan = document.getElementById('bookAuthor');
    const pagesSpan = document.getElementById('bookPages');
    const synopsisPara = document.getElementById('synopsis');
    const bookThumbImg = document.querySelector('.book-thumb');

    titleSpan.textContent = global_book.title;
    authorSpan.textContent = global_book.author;
    pagesSpan.textContent = global_book.pages;
    synopsisPara.textContent = global_book.synopsis;
    bookThumbImg.src = global_book.cover_url || 'https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_a89d30d13cf9c94cbf2cf9f8dc03ec0ff6d28f14.jpg';
    setListSelect('#listSelect');

    loadingBookData.classList.add('hidden');
    bookData.classList.remove('hidden');
  } catch (error) {
    console.error(`Erro ao buscar livros: ${error}`);
  }
};

const setListSelect = async (id) => {
  await getAllLists();

  const options = global_lists.map((list) => ({ id: list.id, name: list.name }));
  const listSelect = document.querySelector(id);

  for (const list of options) {
    const option = document.createElement('option');
    option.value = list.id;
    option.textContent = list.name;
    listSelect.appendChild(option);
  }
}
