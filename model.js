let myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toString = function() {
    let haveRead = '';
    if (this.read)
        haveRead = 'Have read this book';
    else
        haveRead = 'Have not read this book';
    return `${this.name} by ${this.author}. ${this.pages} pages. ${haveRead}`;
}

Book.prototype.changeStatus = function() {
    if (this.read)
        this.read = false;
    else
        this.read = true;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBook(name) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].name === name)
            myLibrary.splice(i, 1);
    }
    displayAllBook();
}

function changeRead(book){
    book.changeStatus();
    displayAllBook();
}

function displayAllBook(){
    const container = document.querySelector('.container');
    if (container.firstChild)
        container.removeChild(container.firstChild);
    const allBooks = document.createElement('div');
    allBooks.classList.add('.allBooks');
    myLibrary.forEach(book => createCard(book, allBooks));
    container.appendChild(allBooks);
}

function createCard(book, allBooks) {
    let card = document.createElement('div');
    card.textContent = book.toString();
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
    card.appendChild(removeIt);
    card.appendChild(changeR);
    allBooks.appendChild(card);
}

document.querySelector('.displayLib').addEventListener('click', displayAllBook);
const form = document.querySelector('.form');
document.querySelector('.add').addEventListener('click', createForm);

function createForm() {
    const created = document.createElement('div');
    created.classList.add('.created');
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
        displayAllBook();
    });
}

let harryPorter = new Book('Harry Porter', 'J.K. Rowling', 'A lot', true);
let dune = new Book('Dune', 'Frank Herbert', 'IDK amount', false);
let badSeed = new Book('The Bad Seed', 'Jory John', 'Some amount', false);

addBookToLibrary(harryPorter);
addBookToLibrary(dune);
addBookToLibrary(badSeed);