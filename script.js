const app = document.getElementById('app') || document.body;

const title = document.createElement('h1');
title.textContent = 'Shopping List';
app.appendChild(title);

// Input de texto
const itemInput = document.createElement('input');
itemInput.type = 'text';
itemInput.placeholder = 'Add a new item';
itemInput.id = 'itemInput';
app.appendChild(itemInput);

// Botão de adicionar
const addButton = document.createElement('button');
addButton.textContent = 'Add';
addButton.id = 'addButton';
app.appendChild(addButton);

// Lista
const shoppingList = document.createElement('ul');
shoppingList.id = 'shoppingList';
app.appendChild(shoppingList);

// Função para adicionar item à DOM
function addItemToDOM(itemText) {
    const li = document.createElement('li');

    const textSpan = document.createElement('span');
    textSpan.textContent = itemText;
    li.appendChild(textSpan);

    // Botão Editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
        if (editButton.textContent === 'Edit') {
            // Troca texto por input
            const input = document.createElement('input');
            input.type = 'text';
            input.value = textSpan.textContent;
            li.insertBefore(input, textSpan);
            li.removeChild(textSpan);
            editButton.textContent = 'Save';
        } else {
            // Salvar novo texto
            const input = li.querySelector('input');
            const newText = input.value.trim();

            if (!newText) {
                alert('Item cannot be empty!');
                return;
            }

            const newSpan = document.createElement('span');
            newSpan.textContent = newText;
            li.insertBefore(newSpan, input);
            li.removeChild(input);
            editButton.textContent = 'Edit';
        }
    });
    li.appendChild(editButton);

    // Botão Remover
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
        li.remove();
    });
    li.appendChild(removeButton);

    shoppingList.appendChild(li);
}

// Verifica se item já existe na lista
function itemExists(itemText) {
    const items = document.querySelectorAll('#shoppingList li span');
    return Array.from(items).some(span =>
        span.textContent.trim().toLowerCase() === itemText.toLowerCase()
    );
}

// Evento de clique no botão "Add"
addButton.addEventListener('click', function () {
    const itemText = itemInput.value.trim();

    if (!itemText) {
        window.alert('Please enter an item!');
        return;
    }

    if (itemExists(itemText)) {
        window.alert('This item is already in the list!');
        return;
    }

    addItemToDOM(itemText);
    itemInput.value = '';
});

// Evento Enter no input
itemInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addButton.click();
    }
});
