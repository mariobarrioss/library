const myLibrary = localStorage.getItem('library') ? JSON.parse(localStorage.getItem('library')) : [];
const inventory = document.querySelector('#inventory');

const storeLibrary = () => localStorage.setItem('library', JSON.stringify(myLibrary));

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status === true ? 'Already read!' : 'Not read yet!';
  }
}

function resetForm() {
  document.querySelector('[name="book-title"]').value = '';
  document.querySelector('[name="book-author"]').value = '';
  document.querySelector('[name="book-pages"]').value = '';
  document.querySelector('[name="book-status"]').checked = false;
};

function changeBookStatus(book, button) {
  if (book.status === 'Already read!') {
    book.status = 'Not read yet!';
    button.innerHTML = book.status;
    button.classList.remove('is-success');
  } else {
    book.status = 'Already read!';
    button.innerHTML = book.status;
    button.classList.add('is-success');
  }
  storeLibrary();
};

function removeBook(bookIndex) {
  localStorage.clear();
  myLibrary.splice(bookIndex, 1);
  storeLibrary();
};

function addChangeListeners() {
  const changeButtons = document.querySelectorAll('.change-btn');
  changeButtons.forEach((button) => {
    button.onclick = () => {
      const { dataset: { bookIndex } } = button;
      const book = myLibrary[bookIndex];
      changeBookStatus(book, button);
    };
  });
};

function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      const { dataset: { bookIndex } } = button;
      const targetBook = document.querySelector(`li[data-book-index="${bookIndex}"]`);
      removeBook(bookIndex);
      inventory.removeChild(targetBook);
    };
  });
};

function createInventory(library) {
  inventory.innerHTML = '';
  library.forEach((book) => {
    const li = document.createElement('li');
    li.className = 'column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd';
    const bookIndex = library.indexOf(book);
    li.setAttribute('data-book-index', `${bookIndex}`);
    const statusColor = book.status === 'Already read!' ? 'is-success' : '';
    const bookContent = `<div class="card">
                          <div class="card-image">
                            <figure class="image is-4by3">
                              <img src="https://source.unsplash.com/t7zYZzO_CX0/1600x900" alt="Book cover">
                            </figure>
                          </div>
                          <div class="card-content">
                            <div class="media">
                              <div class="media-left">
                                <figure class="image is-48x48">
                                  <img src="https://source.unsplash.com/-FVaZbu6ZAE/1600x900" alt="Book thumbnail">
                                </figure>
                              </div>
                              <div class="media-content">
                                <p class="title is-4">${book.title}</p>
                                <p class="subtitle is-6">${book.author}</p>
                              </div>
                            </div>
                            <div class="content">
                              Number of pages:
                              <br>
                              ${book.pages}
                            </div>
                          </div>
                          <footer class="card-footer">
                            <button data-book-index="${bookIndex}" class="button ${statusColor} change-btn card-footer-item">${book.status}</button>
                            <button data-book-index="${bookIndex}" class="button is-danger delete-btn card-footer-item" >Delete</button>
                          </footer>
                        </div>`;
    li.insertAdjacentHTML('beforeend', bookContent);
    inventory.appendChild(li);
  });
  addChangeListeners();
  addDeleteListeners();
};

function addBookToLibrary() {
  const title = document.querySelector('[name="book-title"]').value;
  const author = document.querySelector('[name="book-author"]').value;
  const pages = document.querySelector('[name="book-pages"]').value;
  const status = document.querySelector('[name="book-status"]').checked;
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
  createInventory(myLibrary);
  resetForm();
  storeLibrary();
};

const addNewButton = document.querySelector('#new-book-btn');
const bookForm = document.querySelector('#book-form');

const bookFormToggle = () => bookForm.classList.toggle('is-hidden');
addNewButton.addEventListener('click', () => bookFormToggle());

const saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', () => {
  bookFormToggle();
  addBookToLibrary();
});

createInventory(myLibrary);
