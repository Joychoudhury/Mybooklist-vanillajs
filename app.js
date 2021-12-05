// remove books
// store books in local storage
// retrieve books from local storage
// clear books from local storage 


// books temp array
books = JSON.parse(localStorage.getItem('books'));
// {
//     title: "The Design of EveryDay Things",
//     author: "Don Norman",
//     isbn: "978-0201633610"
// },
// {
//     title: "The Most Human Human",
//     author: "Brian Christian",
//     isbn: "978-0307463710"
// }

// variables

// event listeners

document.addEventListener('DOMContentLoaded', displayBooks);
document.getElementById('book-form').addEventListener('submit', e=>addBook(e));
document.getElementById('book-list').addEventListener('click', e=>removeBook(e));

// functions

function displayBooks(){
    if(books !== [] ){
        books.forEach(function(book){
            const list = document.getElementById('book-list');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><i class='fas fa-trash'></i></td>
            `;
            list.appendChild(tr);
        });
    }
}

function addBook(e){
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if(title === '' || author === '' || isbn === ''){
        showAlert('Please fill in all fields','red-alert');
    }else{
        const book = {
            title: title,
            author: author,
            isbn: isbn
        }
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        showAlert('Book added','green-alert');
        const list = document.getElementById('book-list');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><i class='fas fa-trash'></i></td>
        `;
        list.appendChild(tr);
        clearFields();

    }
}

function removeBook(e){
    if(e.target.classList.contains('fa-trash')){
        e.target.parentElement.parentElement.remove();
        showAlert('Book removed','green-alert');
        console.log(e.target.parentElement.previousElementSibling.textContent);
        
        var books = JSON.parse(localStorage.getItem('books'));
        books.forEach(function(book, index){
            if(book.isbn === e.target.parentElement.previousElementSibling.textContent){
                console.log(books);
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));

    }
}


function showAlert(msg, alertType){
    const newAlert = document.querySelector('.alert');
    newAlert.classList.add('alert-show');
    newAlert.classList.add(alertType);
    newAlert.innerText = msg;
    setTimeout(()=>{
        newAlert.classList.remove('alert-show');
        newAlert.classList.remove(alertType);
    },3000); 
}

function clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}