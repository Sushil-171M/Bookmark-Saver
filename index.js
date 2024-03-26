const formSubmitHandler = (event) => {
  // event.preventDefault();
  const title = event.target.title.value;
  const url = event.target.url.value;
  addElementToUl({ title, url });
};

const deleteListItem = (event) => {
  console.log(event.target)
  const listItem = event.target.parentNode;
  if (listItem && listItem.parentNode) {
    listItem.parentNode.removeChild(listItem);
  }
};
const editListItem = (event) => {
  const titleBookmarkForm = document.getElementById("titleBookmarkForm");
  const listItem = event.target.closest("li");
  const [title, url] = listItem.textContent.split("\u200B");
  titleBookmarkForm.title.value = title;
  titleBookmarkForm.url.value = url;
  deleteListItem(event);
};

const addElementToUl = async (item) => {
  const bookmarkList = document.getElementById("bookmarkList");
  
  const data = {
    title: item.title,
    url: item.url
  }
  const response = await fetch("https://crudcrud.com/api/eba154d7c77c498091809a488b7f3b5a/BookMarkSaver", { method: "POST",
    body: JSON.stringify({ data }),
    headers: {
    "Content-type": "application/json; charset=UTF-8"
  }  
});

const responseGet = await fetch("https://crudcrud.com/api/eba154d7c77c498091809a488b7f3b5a/BookMarkSaver")
  const dataGet = await responseGet.json();
  dataGet.forEach((item)=>{
    const listElement = document.createElement("li");
    listElement.innerHTML = `${item.data.title} \u200B + <a href=${item.data.url}>${item.data.url}</a> \u200B<button type="button" onclick="deleteListItem(event)">Delete</button> <button type="button" onclick="editListItem(event)">Edit</button>`;
    bookmarkList.appendChild(listElement);
  })

};

