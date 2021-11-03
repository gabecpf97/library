// Library array that store all the books
let myLibrary = [];

/**
 * A book class that store all its data
 */
class Book {
    /**
     * Constructor that create an book object that
     * hold's book's name, author, number of pages
     * and whether or not that person have read it
     * @param {*} name name of book
     * @param {*} author book's author
     * @param {*} pages number of pages
     * @param {*} read read it or not
     */
    constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = (read == "Yes") ? true : false;
    }

    /**
     * Book toString method that return a string
     * represent the object's data
     * @returns String of object's data
     */
    toString() {
        let haveRead = '';
        if (this.read)
            haveRead = 'Have read this book';
        else
            haveRead = 'Have not read this book';
        return `${this.name} by ${this.author}. ${this.pages} pages. ${haveRead}`;
    }

    /**
     * Method that changes the status of whether the 
     * book has been read or not
     */
    changeStatus() {
        if (this.read)
        this.read = false;
         else
        this.read = true;
    }
}

/**
 * Function that add book to library
 * @param {*} book book object
 */
function addBookToLibrary(book) {
    myLibrary.push(book);
    storingLibraryToLocal();
}

/**
 * Function that remove book from library
 * and display the updated library
 * @param {*} name book object
 */
function removeBook(name) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].name === name)
            myLibrary.splice(i, 1);
    }
    displayAllBook();
}

/**
 * Function that change the status of the book
 * and display the updated library
 * @param {*} book book object
 */
function changeRead(book){
    book.changeStatus();
    displayAllBook();
}

/**
 * Function that dispaly the library to the user
 */
function displayAllBook(){
    const container = document.querySelector('.container');
    if (container.firstChild)
        container.removeChild(container.lastChild);
    const allBooks = document.createElement('div');
    allBooks.classList.add('allBooks');
    myLibrary.forEach(book => createCard(book, allBooks));
    container.appendChild(allBooks);
}

/**
 * Function that create each section for each book, 
 * with button to remove this book from library and
 * button to change the status
 * @param {*} book book object
 * @param {*} allBooks div that show all dispaly
 */
function createCard(book, allBooks) {
    let card = document.createElement('div');
    let bookInfo = document.createElement('p');
    card.classList.add('book');
    bookInfo.classList.add('info');
    bookInfo.textContent = book.toString();
    const removeIt = document.createElement('button');
    removeIt.textContent = 'remove this book';
    removeIt.addEventListener('click', () => {
        removeBook(book.name);
    });
    const changeR = document.createElement('button');
    changeR.textContent = "Read/UnRead";
    changeR.addEventListener('click', () => {
        changeRead(book);
    });
    card.appendChild(bookInfo);
    card.appendChild(removeIt);
    card.appendChild(changeR);
    allBooks.appendChild(card);
}

// Button that add book to library
const form = document.querySelector('.form');
document.querySelector('.add').addEventListener('click', () => {
    if (document.querySelector('.created')) {
        document.querySelector('.add').textContent = "NEW BOOK";
        form.removeChild(document.querySelector('.created'));
    } else {
        document.querySelector('.add').textContent = "CANCEL";
        createForm();
    }
});

/**
 * Function that create a form that ask user for info
 * to create a book that will be store in the library, after 
 * it is added to library, the form will be removed
 */
function createForm() {
    const created = document.createElement('div');
    created.classList.add('created');
    const prompt_name = document.createElement('h2');
    const input_name = document.createElement('input');
    const prompt_author = document.createElement('h2');
    const input_author = document.createElement('input');
    const prompt_pages = document.createElement('h2');
    const input_pages = document.createElement('input');
    const prompt_read = document.createElement('h2');
    const input_read = document.createElement('select');
    const read_true = document.createElement('option');
    const read_false = document.createElement('option');
    const addIt = document.createElement('button');
    
    prompt_name.textContent = "Book's Title?";
    prompt_author.textContent = "Book's author?";
    prompt_pages.textContent = "Book's amount of pages?";
    prompt_read.textContent = "Have you read this book?"
    read_true.textContent = 'Yes';
    read_false.textContent = 'No';
    addIt.textContent = "Add Book to Library";
    input_name.classList.add('name');
    input_author.classList.add('author');
    input_pages.classList.add('pages');
    input_read.classList.add('read');
    addIt.classList.add('finForm');
    
    input_read.appendChild(read_true);
    input_read.appendChild(read_false);
    created.appendChild(prompt_name);
    created.appendChild(input_name);
    created.appendChild(prompt_author);
    created.appendChild(input_author);
    created.appendChild(prompt_pages);
    created.appendChild(input_pages);
    created.appendChild(prompt_read);
    created.appendChild(input_read);
    created.appendChild(addIt);
    form.appendChild(created);

    const finForm = document.querySelector('.finForm');
    finForm.addEventListener('click', (e) => {
        const name = document.querySelector('.name').value;
        const author = document.querySelector('.author').value;
        const pages = document.querySelector('.pages').value;
        const read = document.querySelector('.read').value;
        addBookToLibrary(new Book(name, author, pages, read));
        form.removeChild(created);
        document.querySelector('.add').textContent = "NEW BOOK";
        displayAllBook();
    });
}

/**
 * Function that store library entry into user's local storage
 */
function storingLibraryToLocal() {
    localStorage.setItem('library_arr', JSON.stringify(myLibrary));
}

/**
 * Function that retrieve library entry from user's local storage
 * if there is any
 */
function getLibraryFromLocal() {
    let lib_arr = localStorage.getItem('library_arr');
    if (lib_arr !== null) {
        lib_arr = lib_arr.substring(2, lib_arr.length - 2).split('},{');
        lib_arr.forEach(entry => {
            entry = entry.replace(/"/g, "");
            let values = entry.split(',');
            let name = values[0].substring(5);
            let author = values[1].substring(7);
            let pages = values[2].substring(6);
            let read = values[3].substring(5);
            addBookToLibrary(new Book(name, author, pages, read));
        });
    }
}

getLibraryFromLocal();
displayAllBook();