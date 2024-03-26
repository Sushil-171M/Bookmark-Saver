window.addEventListener("load", async () => {
  const responseGet = await fetch("https://crudcrud.com/api/3a0b8f19659745ceb5d4c867a4bf0846/BookMarkSaver", {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const dataGet = await responseGet.json();
  dataGet.forEach((item) => {
    const listElement = document.createElement("li");
    listElement.id = item._id;
    listElement.innerHTML = `${item.data.title} \u200B   <a href=${item.data.url}>${item.data.url}</a> \u200B <button type="button" onclick="deleteListItem(event)">Delete</button> <button type="button" onclick="editListItem(event)">Edit</button>`;
    bookmarkList.appendChild(listElement);
  })
})

const formSubmitHandler = (event) => {
  event.preventDefault();
  const title = event.target.title.value;
  const url = event.target.url.value;
  addElementToUl({ title, url });
};

const deleteListItem = async (event, edit = false) => {
  const listItem = event.target.closest("li");
  const id = listItem.getAttribute("id");

  const response = await fetch('https://crudcrud.com/api/3a0b8f19659745ceb5d4c867a4bf0846/BookMarkSaver/' + id, {
    method: 'DELETE',
  })

  if (listItem && listItem.parentNode) {
    listItem.parentNode.removeChild(listItem);
  }

  console.log('Item Removed from List')
};


const editListItem = async (event) => {
  const titleBookmarkForm = document.getElementById("titleBookmarkForm");
  const listItem = event.target.closest("li");
  const id = listItem.getAttribute("id");

  const [title, url] = listItem.textContent.split("\u200B");
  titleBookmarkForm.title.value = title;
  titleBookmarkForm.url.value = url.trim();
  deleteListItem(event, true);
};

const addElementToUl = async (item) => {
  const bookmarkList = document.getElementById("bookmarkList");

  console.log('item', item);
  const data = {
    title: item.title,
    url: item.url
  }
  const response = await fetch("https://crudcrud.com/api/3a0b8f19659745ceb5d4c867a4bf0846/BookMarkSaver", {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

  const responseJson = await response.json();
  const listElement = document.createElement("li");
  listElement.id = responseJson._id;
  listElement.innerHTML = `${item.title} \u200B             <a href=${item.url}>${item.url}</a> \u200B             <button type="button" onclick="deleteListItem(event)">Delete</button>                  <button type="button" onclick="editListItem(event)">Edit</button>`;
  bookmarkList.appendChild(listElement);
};

