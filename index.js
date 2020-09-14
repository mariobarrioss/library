const myLibrary = localStorage.getItem('library') ? JSON.parse(localStorage.getItem('library')) : [];
const inventory = document.querySelector('#inventory');

const storeLibrary = () => localStorage.setItem('library', JSON.stringify(myLibrary));

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status === true ? 'Already read!' : 'Not read yet!';
  this.info = () => `${this.title}, by ${this.author}, ${this.pages} pages, ${this.status}.`;
}

const resetForm = () => {
  document.querySelector('[name="book-title"]').value = '';
  document.querySelector('[name="book-author"]').value = '';
  document.querySelector('[name="book-pages"]').value = '';
  document.querySelector('[name="book-status"]').checked = false;
};

const createInventory = (library) => {
  inventory.innerHTML = '';
  library.forEach((book) => {
    const bookIndex = library.indexOf(book);
    const statusColor = book.status === 'Already read!' ? 'is-success' : '';
    const bookContent = `<li class="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
                          <div class="card">
                            <div class="card-image">
                              <figure class="image is-4by3">
                                <img src="./assets/images/default-cover.jpg" alt="Book cover">
                              </figure>
                            </div>
                            <div class="card-content">
                              <div class="media">
                                <div class="media-left">
                                  <figure class="image is-48x48">
                                    <img src="./assets/images/default-thumbnail.jpg" alt="Book thumbnail">
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
                              <button data-book-index="${bookIndex}" class="button ${statusColor} card-footer-item" onclick="changeBookStatus(${bookIndex});">${book.status}</button>
                              <button class="button is-danger card-footer-item" onclick="removeBook(${bookIndex});">Delete</button>
                            </footer>
                          </div>
                        </li>`;
    inventory.insertAdjacentHTML('beforeend', bookContent);
  });
};

const addBookToLibrary = () => {
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

const changeBookStatus = (bookIndex) => {
  const book = myLibrary[bookIndex];

  if (book.status === 'Already read!') {
    book.status = 'Not read yet!';
  } else {
    book.status = 'Already read!';
  }
  storeLibrary();
  createInventory(myLibrary);
};

const removeBook = (bookIndex) => {
  localStorage.clear();
  myLibrary.splice(bookIndex, 1);
  storeLibrary();
  createInventory(myLibrary);
};

createInventory(myLibrary);
