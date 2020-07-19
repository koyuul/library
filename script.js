let myLibrary = [];

function Book(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
}

function addBookToLibrary(author, title, pages){
    book = new Book(author, title, pages);
    myLibrary.push(book);
}

addBookToLibrary("john hopkins", "hap", 124);
addBookToLibrary("mary moe", "jobs", 1255);

window.onload = render();

function render (){
    const current = document.getElementById("card")
    if (current.innerHTML!= "") current.innerHTML = "";
    for(const key in myLibrary) {
        const book = myLibrary[key]
        const card = document.createElement("div");
        const cont = document.createTextNode(`${book.title} by ${book.author}, ${book.pages} pgs.`);
        card.appendChild(cont);

        const deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "delete");
        deleteButton.style.color="red";
        deleteButton.addEventListener("click", function(){
            if (confirm(`are you sure you want to delete ${book.title}?`)){
                myLibrary.pop(key)
                card.remove();
            }
        })
        
        
        card.appendChild(deleteButton)


        current.appendChild(card);
    }
}

const submitElement = document.getElementById("submit");

submitElement.addEventListener("click", function(){
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    console.log("submitting")

    if (isNaN(pages)){
        alert("pages must be a number");
        return false;
    }

    for(const i in myLibrary){
        const book  = myLibrary[i];
        if (book.title === title && book.author === author){
            alert("this book is already in your library")
            return false;
        }
    }

    addBookToLibrary(author, title, pages)
    render();
});