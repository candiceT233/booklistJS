// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


// UI class
class UI {
  constructor() { }
  // add a book to list
  addBooktoList(book) {
    // create row element and insert
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href = "#" class = "delete">X<a></td>
    `;
    //get access to book-list
    const list = document.getElementById('book-list');
    // append to list
    //row.className = "u-full-width";
    list.appendChild(row);
  }

  clearInputFields() {
    // clear input fields?
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(message, className) {
    // create element
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    // insert text to element
    div.appendChild(document.createTextNode(message));
    // insert element
    const container = document.querySelector('.container');
    const bookform = document.querySelector('#book-form');
    container.insertBefore(div, bookform);
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  // remove book from list
  removeBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      this.showAlert('Book removed!', 'success');
    }
  }
}



/**
 * Event listener for book form
 */
document.getElementById('book-form').addEventListener('submit', e => {

const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;

const book = new Book(title,author,isbn);
const bookListUi = new UI();

// validate
if(title == '' || author == '' || isbn == ''){
  bookListUi.showAlert('Please fill in all field.','error');
} else {
  bookListUi.showAlert('Book Added!','success');
  bookListUi.addBooktoList(book);
  Store.addBookToLS(book);
  bookListUi.clearInputFields();
}
e.preventDefault();
})

/**
 * Event listener for book list
 */
document.getElementById('book-list-tabel').addEventListener('click', e=>{
const bookListUi = new UI();
bookListUi.removeBook(e.target);
// remove from ls using isbn as identifier
Store.removeBookFromLS(e.target.parentElement.previousElementSibling.textContent);

e.preventDefault();
})

// Local storage
class Store {

  static getBookFromLS(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books')); // get books from LS to books as JS object
    }
    return books;
  }

  static addBookToLS(book){
    const books = Store.getBookFromLS();
    books.push(book);
    console.log(books);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displaysBookFromLS(){
    const books = Store.getBookFromLS();
    const bookListUi = new UI();
    books.forEach(function(book){
      bookListUi.addBooktoList(book);
    });
  }

  static removeBookFromLS(isbn){
    const books = Store.getBookFromLS();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1); // 
      }
    });
    // update local storage
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded',Store.displaysBookFromLS);