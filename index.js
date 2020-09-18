const myLibrary = localStorage.getItem('library') ? JSON.parse(localstorage.getItem('library')) : [];
const inventory = document.querySelector('#inventory');

const storeLibrary = () => localStorage.setItem('library', JSON.stringify(myLibrary));

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status === true ? 'Already Read!' : 'Not read yet!';
  }
}

const resetForm = () => {
  document.querySelector('[name="book-title"]').value = '';
  document.querySelector('[name="book-author"]').value = '';
  document.querySelector('[name="book-pages"]').value = '';
  document.querySelector('[name="book-status"]').checked = false;
};

const changeBookStatus = (book, button) => {
  if (book.status === 'Already read!') {
    book.status = 'Not read yet!';
    button.innerHTML = book.status;
    button.classList.remove('is-success');
  } else {
    book.status = 'Already Read!';
    button.innerHTML = book.status;
    button.classList.add('is-success');
  }
  storeLibrary();
};

const removeBook = (bookIndex) {
  localStorage.clear();
  myLibrary.splice(bookIndex, 1);
  storeLibrary();
};
