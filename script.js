let myLibrary = [];

function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = author.split(' ').join('')+title.split(' ').join('');
    
    this.cardElement = document.createElement("div");
    this.cont = document.createTextNode(`${title} by ${author}, ${pages} pgs. Status: `);

    //deal with read button
    this.readButton = document.createElement("input");
    this.readButton.value = this.readStatus;
    this.readButton.type = "button";

    this.readButton.addEventListener("click", function(){
        if (this.readStatus === "unread"){
            this.readStatus = "reading"
            this.readButton.style.color = "yellow"
        }
        else if (this.readStatus === "reading"){
            this.readStatus = "finished"
            this.readButton.style.color = "green"
        }
        else if (this.readStatus === "finished"){
            this.readStatus = "unread"
            this.readButton.style.color = "black"
        }
        this.readButton.value = this.readStatus;
        saveCard(this)
    }.bind(this))


    this.deleteButton = document.createElement("input");
    this.deleteButton.setAttribute("type", "button");
    this.deleteButton.setAttribute("value", "delete");
    this.deleteButton.style.color="red";
    this.deleteButton.addEventListener("click", function(){
        if (confirm(`are you sure you want to delete ${title}?`)){
            myLibrary.pop()
            localStorage.removeItem(book.id)
            this.cardElement.remove()
        } 
    }.bind(this))

    this.cardElement.appendChild(this.cont);
    this.cardElement.appendChild(this.readButton);
    this.cardElement.appendChild(this.deleteButton);

}



function addBookToLibrary(author, title, pages, readStatus){
    book = new Book(author, title, pages, readStatus);
    //determine ID

    
    myLibrary.push(book);
    saveCard(book);
    return book;
}


addBookToLibrary("mary moe", "jobs", 1255, "unread");
addBookToLibrary("john hopkins", "hap", 124, "unread");

window.onload = render();
window.onload = recreateCards


function recreateCards(){
    if (localStorage.length > 0){
        const idArray = [];
        myLibrary.forEach(book => {
            idArray.push(book.id)
        });
        console.log(idArray)
        for(let i = localStorage.length; i > 0; i--){
            const lsBook = JSON.parse(localStorage.getItem(localStorage.key(i-1)))
            if (!idArray.includes(lsBook.id)){
                addBookToLibrary(lsBook.author, lsBook.title, lsBook.pages, lsBook.readStatus);
                render();
            }
        }
    }
}
function render (){
    const current = document.getElementById("card") 
    if (current.innerHTML!= "") current.innerHTML = ""; //empty on reload

    for(const key in myLibrary) {
        //create content
        const book = myLibrary[key];
        current.appendChild(book.cardElement);
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

    addBookToLibrary(author, title, pages, "unread");
    render();
});

function recreateCard(book){
    console.log (JSON.parse(localStorage.getItem(book.id)))
    return JSON.parse(localStorage.getItem(book.id))
}

function saveCard(book){

    const storeObj = {
        title: book.title,
        author: book.author,
        pages: book.pages,
        readStatus: book.readStatus,
        id: book.id
    }

    localStorage.setItem(book.id, JSON.stringify(storeObj))


    console.log("savin")
};