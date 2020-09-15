let myLibrary = [];

window.onload = function() { document.getElementById("addForm").style.display = "none";
}

window.addEventListener("load", showBooks());

var form = document.getElementById("addForm");

function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);

function showForm() {
    document.getElementById("addForm").style.display = "block";
}

function Book(title,author,pages,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = myLibrary.length + 1;
}

function retrieveTitle() { 
  let title = document.getElementById("form-title").value;
  return title;
}

function retrieveAuthor() {
  let author = document.getElementById("form-author").value;
  return author;
}

function retrievePages() {
  let pages = document.getElementById("form-pages").value;
  return pages;
}

function retrieveRead() {
  let read = document.getElementById('form-read').checked;
  return read;
}

function addBookToLibrary() {
  if(retrieveTitle() != "" && retrieveAuthor() != "" && retrievePages() != "")
  { 
    var book = new Book(retrieveTitle(),retrieveAuthor(),retrievePages(),retrieveRead()); 
    myLibrary.push(book);
    document.getElementById("addForm").style.display = "none";
    document.getElementById("addForm").reset();
    showBooks();
  }
    
}

function showBooks() {
  table = document.createElement("table");
    row = table.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = "Title";
    cell = row.insertCell();
    cell.innerHTML = "Author";
    cell = row.insertCell();
    cell.innerHTML = "Pages";
    cell = row.insertCell();
    cell.innerHTML = "Read";
    row = table.insertRow();

    for (var i of myLibrary) {
        var cell = row.insertCell();
        cell.innerHTML = i.title;
        cell = row.insertCell();
        cell.innerHTML = i.author;
        cell = row.insertCell();
        cell.innerHTML = i.pages;
        cell = row.insertCell();
        cell.innerHTML = i.read ? "<input type='checkbox' onclick='check($book)' checked>".replace('$book', i.id) : "<input type='checkbox' onclick='check($book)'>".replace('$book', i.id);
        cell = row.insertCell();
        cell.innerHTML = "<button onclick='removeBookFromLibrary($id)'>remove from library</button>".replace('$id', i.id);
        row = table.insertRow();
    }
    list = document.getElementById("books");
    list.querySelectorAll('*').forEach(n => n.remove());
    document.getElementById("books").appendChild(table);
}

function removeBookFromLibrary(id) {
  myLibrary.splice(id-1,1);
  for(i=0;i < myLibrary.length; i++) {
    myLibrary[i].id = i + 1;
  }
  showBooks();
}

function check(book) {
  myLibrary[book - 1].read = !myLibrary[book - 1].read;
}