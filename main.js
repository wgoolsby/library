let myLibrary = [
    {
        title: 'Why We Sleep: Unlocking the Power of Sleep and Dreams',
        author: 'Matthew Walker',
        pages: '369',
        read: false,
    },
    {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        pages: '279',
        read: true,
    },
    {
        title: 'The Design of Future Things',
        author: 'Donald A. Norman',
        pages: '240',
        read: false,
    },
    {
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        pages: '662',
        read: true,
    },
    {
        title: "The Wise Man's Fear",
        author: 'Patrick Rothfuss',
        pages: '994',
        read: true,
    },
    {
        title: 'The Dark Monk',
        author: 'Oliver Pötzsch',
        pages: '514',
        read: false,
    },
];

let defaultForm = {
    title: '',
    author: '',
    pages: '',
    read: false,
};
const library = document.getElementById('library');
const errorMessage = document.getElementById('error-message');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
function resetForm() {
    document.getElementById('new-book-title').value = defaultForm.title;
    document.getElementById('new-book-author').value = defaultForm.author;
    document.getElementById('new-book-pages').value = defaultForm.pages;
    document.getElementById('new-book-read').checked = defaultForm.read;

    errorMessage.textContent = '';
}
function toggleForm() {
    const showButton = document.getElementById('show-form');
    const hideButton = document.getElementById('hide-form');
    //remove hidden from hidden elements
    const formContainer = document.getElementById('form-container');

    if (showButton.classList.contains('hidden')) {
        showButton.classList.remove('hidden');
        hideButton.classList.add('hidden');
        formContainer.classList.add('hidden');
        resetForm();
    } else {
        showButton.classList.add('hidden');
        hideButton.classList.remove('hidden');
        formContainer.classList.remove('hidden');
    }
    //clear out any old junk
    resetForm();
}
function addBookToLibrary() {
    const form = document.getElementById('new-book-form');
    let isValidForm = form.checkValidity();

    // I need validation here.
    const newTitle = document.getElementById('new-book-title').value;
    const newAuthor = document.getElementById('new-book-author').value;
    const newPages = document.getElementById('new-book-pages').value;
    const newRead = document.getElementById('new-book-read').checked;
    const newBook = new Book(newTitle, newAuthor, newPages, newRead);

    if (isValidForm) {
        pushIntoArray(newBook);

        createBookCard(newBook, myLibrary.length - 1);
        resetForm();
        toggleForm();
    } else {
        errorMessage.textContent =
            'You are missing required or have input invalid data.';
        document.getElementById('error-handling').appendChild(errorMessage);
    }
}
function removeBookFromLibrary(index) {
    //can improve this to allow undo by not destroying the original array
    myLibrary.splice(index, 1);
    console.log(myLibrary);
    const removedElement = document.querySelector(`[data-key="${index}"]`);
    removedElement.parentNode.removeChild(removedElement);
}
function changeBookStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    const statusText = getBookStatus(myLibrary[index].read);
    const parentElement = document.querySelector(`[data-key="${index}"]`);
    const readButton = parentElement.children[1].firstChild;
    readButton.textContent = `Mark as ${statusText}`;
}
function createBookCard(book, index) {
    const statusText = getBookStatus(book.read);

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
    removeBook.setAttribute(
        'onclick',
        `removeBookFromLibrary(${bookCard.dataset.key})`
    );
    removeBook.textContent = 'Delete';
    removeBook.classList.add('button-default');
    removeBook.classList.add('button-remove');
    removeBook.id = 'remove-button';

    //create a toggle status book button
    const markRead = document.createElement('button');
    markRead.setAttribute('name', 'set-status');
    markRead.setAttribute('type', 'button');
    markRead.setAttribute(
        'onclick',
        `changeBookStatus(${bookCard.dataset.key})`
    );
    markRead.textContent = `Mark as ${statusText}`;
    markRead.classList.add('button-default');
    markRead.id = 'read-button';

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
    //clear out any old junk
    resetForm();
}
function pushIntoArray(newBook) {
    myLibrary.push(newBook);
}

render();
