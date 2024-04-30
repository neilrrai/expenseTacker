function handleFormSubmit(event) {
  event.preventDefault();

  console.log("Form submitted!");

  const expenseData = {
    expense: event.target.expense.value,
    description: event.target.description.value,
    category: event.target.category.value,
  };

  // using API to store our data into server
  axios
    .post(`${apiUrl}/ExpenseTracker`, expenseData)
    .then((res) => displayData(res.data))
    .catch((err) => console.log(err));

  // making input field empty after submission
  document.getElementById("expense").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
}
let apiUrl = "https://crudcrud.com/api/344fe9107860481ea63b85ab3cd9aec6";

function displayData(expenseData) {
  const newLi = document.createElement("li"); // main li tag

  const newLiText = document.createTextNode(
    `${expenseData.expense} - ${expenseData.description} - ${expenseData.category}  `
  ); // adding it to node
  newLi.appendChild(newLiText); // adding expesnse data to main li.

  // adding delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  newLi.appendChild(deleteBtn);

  // ADDING EDIT BUTTON
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  newLi.appendChild(editBtn);

  const expenseList = document.querySelector("ul"); // slecting ul tag
  expenseList.appendChild(newLi); // finally adding newLi tag to ul
  //delete button functionality
  deleteBtn.addEventListener("click", function (event) {
    axios
      .delete(`${apiUrl}/ExpenseTracker/${expenseData._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(expenseData._id);

    expenseList.removeChild(event.target.parentElement);
  });

  //edit button functionality
  editBtn.addEventListener("click", function (event) {
    expenseList.removeChild(event.target.parentElement); // deleting that line from screen
    axios
      .delete(`${apiUrl}/ExpenseTracker/${expenseData._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    document.getElementById("expense").value = expenseData.expense;
    document.getElementById("description").value = expenseData.description;
    document.getElementById("category").value = expenseData.category;
  });
}
// here I added window for reaload screen, so as screen is reloaded or open data will fetch from api and showed on screen
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${apiUrl}/ExpenseTracker`)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        displayData(res.data[i]);
      }
    })

    .catch((err) => console.log(err));
});
