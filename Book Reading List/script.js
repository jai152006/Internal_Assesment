function addBook() {

    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;

    if (title === "" || author === "") {
        alert("Please enter book title and author.");
        return;
    }

    const list = document.getElementById("bookList");

    const item = document.createElement("li");

    item.innerHTML =
        title + " - " + author +
        ' <button onclick="this.parentElement.remove()">Delete</button>';

    list.appendChild(item);

    document.getElementById("bookTitle").value = "";
    document.getElementById("author").value = "";
}