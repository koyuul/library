let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = false;
    this.id = 000000;
}

function addBookToLibrary(author, title, pages, read){
    book = new Book(author, title, pages, read);
    
    //determine ID
    id = Math.round((Math.random()*1000000));
    while((id.toString().length === 5) || (myLibrary.includes(id))){
        id = Math.round((Math.random()* 1000000));
    }
    book.id = id;
    
    console.log(book.id)
    myLibrary.push(book);
    saveCard(book);
    return book;
}

addBookToLibrary("john hopkins", "hap", 124, false);
addBookToLibrary("mary moe", "jobs", 1255, false);

window.onload = render();

function render (){
    const current = document.getElementById("card")
    if (current.innerHTML!= "") current.innerHTML = "";
    for(const key in myLibrary) {
        const book = myLibrary[key]
        const card = document.createElement("div");
        const cont = document.createTextNode(`${book.title} by ${book.author}, ${book.pages} pgs. Status: `);
        card.appendChild(cont);

        const readButton = document.createElement("input");
        readButton.setAttribute("type", "button");
        readButton.setAttribute("value", "unread");
        readButton.addEventListener("click", function(){
            const readStatus = readButton.value;
            if (readStatus === "unread") {
                readButton.value = "reading";
                readButton.style.color = "yellow";
            }
            if (readStatus === "reading") {
                readButton.value = "finished";
                readButton.style.color = "green";
            }
            if (readStatus === "finished"){
                readButton.value = "unread";
                readButton.style.color = "black";
            }
            saveCard(book);
        })
        card.appendChild(readButton);


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
        card.appendChild(deleteButton);


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

    addBookToLibrary(author, title, pages, false);
    render();
});

function recreateCards(book){
    const title = localStorage.getItem(book.id+"title");
    const author = localStorage.getItem(book.id+"author");
    const pages = localStorage.getItem(book.id+"pages");
    const readStatus = localStorage.getItem(book.id+"readValue");
    const id = localStorage.getItem(book.id);

    const returnHash = new Hash
}

function saveCard(book){
    console.log("saving")
    const title = localStorage.setItem(book.id+"title", book.title);
    const author = localStorage.setItem(book.id+"author", book.author);
    const pages = localStorage.setItem(book.id+"pages", book.pages);
    const readStatus = localStorage.setItem(book.id+"readValue", book.read.value);
    const id = localStorage.setItem(book.id, book.id);
};