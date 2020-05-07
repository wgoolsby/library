let myLibrary = [
    {
        title: 'Book 1',
        author: 'Author 1',
        pages: '632',
        read: true,
    },
    {
        title: 'Book 2',
        author: 'Author 1',
        pages: '164',
        read: false,
    },
    {
        title: 'Book 3',
        author: 'Author 2',
        pages: '479',
        read: false,
    },
    {
        title: 'Book 1',
        author: 'Author 1',
        pages: '632',
        read: true,
    },
    {
        title: 'Book 2',
        author: 'Author 1',
        pages: '164',
        read: false,
    },
    {
        title: 'Book 3',
        author: 'Author 2',
        pages: '479',
        read: false,
    },
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

document.getElementById('submit').onclick = addBookToLibrary;

const showButton = document.getElementById('show-form');
const hideButton = document.getElementById('hide-form');
//remove hidden from hidden elements
const formContainer = document.getElementById('form-container');

function toggleForm() {
    if (showButton.classList.contains('hidden')) {
        showButton.classList.remove('hidden');
        hideButton.classList.add('hidden');
        formContainer.classList.add('hidden');
    } else {
        showButton.classList.add('hidden');
        hideButton.classList.remove('hidden');
        formContainer.classList.remove('hidden');
    }
}

function addBookToLibrary() {
    console.log('it works');
}
function removeBookFromLibrary() {}
function markBookStatus() {}

function createBookCard(book, index) {
    console.log('Creating card for: ', book, index);

    const statusText = getBookStatus(book.read);

    const library = document.getElementById('library');

    //main container
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.key = index;

    const bookData = document.createElement('div');
    bookData.classList.add('book-data');

    //title
    const title = document.createElement('h5');
    title.classList.add('book-info');
    title.classList.add('title');
    title.textContent = book.title;

    //author
    const author = document.createElement('h6');
    author.classList.add('book-info');
    author.classList.add('author');
    author.textContent = book.author;

    //page count
    const pages = document.createElement('p');
    pages.classList.add('book-info');
    pages.classList.add('pages');
    pages.textContent = `${book.pages} pages`;

    // status
    // const readState = document.createElement('p');
    // readState.classList.add('book-info');
    // readState.classList.add('status');
    // readState.textContent = statusText.currentStatus;

    //put the metadata in the container
    bookData.appendChild(title);
    bookData.appendChild(author);
    bookData.appendChild(pages);
    // bookData.appendChild(readState);

    //create an actions container
    const bookActions = document.createElement('div');
    bookActions.classList.add('book-actions');

    //create a remove book button
    const removeBook = document.createElement('button');
    removeBook.setAttribute('name', 'remove-book');
    removeBook.setAttribute('type', 'button');
    removeBook.textContent = 'Remove book';
    removeBook.classList.add('button-remove');

    //create a remove book button
    const markRead = document.createElement('button');
    markRead.setAttribute('name', 'set-status');
    markRead.setAttribute('type', 'button');
    markRead.textContent = `Mark as ${statusText}`;
    markRead.classList.add('button-default');

    //collect the actions
    bookActions.appendChild(markRead);
    // bookActions.appendChild(document.createElement('br'));
    bookActions.appendChild(removeBook);

    //collect the sections into the card
    bookCard.appendChild(bookData);
    bookCard.appendChild(bookActions);

    //stick it on the library shelf
    library.appendChild(bookCard);
}

function getBookStatus(status) {
    if (status) {
        return 'unread';
    } else {
        return 'read';
    }
}

function render() {
    //renders the page
    myLibrary.forEach((book, index) => createBookCard(book, index));
}

render();
