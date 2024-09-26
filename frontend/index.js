import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const shoppingList = document.getElementById('shopping-list');
  const addItemForm = document.getElementById('add-item-form');
  const newItemInput = document.getElementById('new-item-input');

  // Function to render the shopping list
  async function renderShoppingList() {
    const items = await backend.getItems();
    shoppingList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="${item.completed ? 'completed' : ''}">${item.name}</span>
        <div>
          <button class="toggle-btn ${item.completed ? 'completed' : ''}" data-id="${item.id}">
            <i class="fas ${item.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
          </button>
          <button class="delete-btn" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      shoppingList.appendChild(li);
    });
  }

  // Add new item
  addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = newItemInput.value.trim();
    if (name) {
      await backend.addItem(name);
      newItemInput.value = '';
      renderShoppingList();
    }
  });

  // Toggle item status
  shoppingList.addEventListener('click', async (e) => {
    if (e.target.closest('.toggle-btn')) {
      const id = Number(e.target.closest('.toggle-btn').dataset.id);
      const completed = !e.target.closest('.toggle-btn').classList.contains('completed');
      await backend.updateItemStatus(id, completed);
      renderShoppingList();
    }
  });

  // Delete item
  shoppingList.addEventListener('click', async (e) => {
    if (e.target.closest('.delete-btn')) {
      const id = Number(e.target.closest('.delete-btn').dataset.id);
      await backend.deleteItem(id);
      renderShoppingList();
    }
  });

  // Initial render
  renderShoppingList();
});
