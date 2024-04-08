// Create a counter for unique IDs
let expenseIdCounter = 1;

function handleFormSubmit(event) {
  event.preventDefault();

  const amount = event.target.expense_amount.value;
  const description = event.target.desc.value;
  const category = event.target.cate_gory.value;

  const expenseEntry = {
    id: expenseIdCounter++,
    amount: amount,
    description: description,
    category: category,
  };

  // Create a new element to display the recorded user entry
  const entryElement = document.createElement("div");
  entryElement.setAttribute("data-id", expenseEntry.id);
  entryElement.innerHTML = `<span>Amount: ${amount}</span>
                            <span>Description: ${description}</span>
                            <span>Category: ${category}</span>
                            <button class="edit-btn" onclick="editExpense(${expenseEntry.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteExpense(${expenseEntry.id})">Delete</button>`;

  // Append the new element to the "expenseListContainer" div
  document.getElementById("expenseListContainer").appendChild(entryElement);

  // Clear the form after submission
  event.target.reset();
}

function editExpense(expenseId) {
  const entryElement = document.querySelector(`[data-id="${expenseId}"]`);
  if (entryElement) {
    // Get the existing values
    const existingAmount = entryElement
      .querySelector("span:nth-child(1)")
      .textContent.split(": ")[1];
    const existingDescription = entryElement
      .querySelector("span:nth-child(2)")
      .textContent.split(": ")[1];
    const existingCategory = entryElement
      .querySelector("span:nth-child(3)")
      .textContent.split(": ")[1];

    // Prompt the user for updated values
    const newAmount = prompt("Enter new amount:", existingAmount);
    const newDescription = prompt(
      "Enter new description:",
      existingDescription
    );
    const newCategory = prompt("Enter new category:", existingCategory);

    // Update the entryElement with the new values
    entryElement.querySelector(
      "span:nth-child(1)"
    ).textContent = `Amount: ${newAmount}`;
    entryElement.querySelector(
      "span:nth-child(2)"
    ).textContent = `Description: ${newDescription}`;
    entryElement.querySelector(
      "span:nth-child(3)"
    ).textContent = `Category: ${newCategory}`;
  }
}

function deleteExpense(expenseId) {
  const entryElement = document.querySelector(`[data-id="${expenseId}"]`);
  if (entryElement) {
    document.getElementById("expenseListContainer").removeChild(entryElement);
  }
}
