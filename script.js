// ===============================
// Select DOM Elements
// ===============================
const input = document.getElementById('todo-input'); // Input field
const addBtn = document.getElementById('add-btn');   // Add button
const list = document.getElementById('todo-list');   // UL/OL list

// ===============================
// Load saved todos from localStorage
// ===============================
const saved = localStorage.getItem('todos'); // Get stored data
const todos = saved ? JSON.parse(saved) : []; // Convert to array or empty

// ===============================
// Save todos to localStorage
// ===============================
function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ===============================
// Create a single todo item (LI)
// ===============================
function createTodoNode(todo, index){
    const li = document.createElement('li'); // List item

    // ---------- Checkbox ----------
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed; // Convert to boolean

    // ---------- Todo Text ----------
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    // Apply strike-through if completed
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }

    // Toggle complete status
    checkbox.addEventListener("change", ()=>{
        todo.completed = checkbox.checked;

        // Update UI
        textSpan.style.textDecoration = todo.completed 
            ? 'line-through' 
            : 'none';

        saveTodos(); // Save changes
    });

    // ---------- Edit on double click ----------
    textSpan.addEventListener("dblclick", ()=>{
        const newText = prompt("Edit todo", todo.text);

        if(newText !== null){
            todo.text = newText.trim(); // Update text
            textSpan.textContent = todo.text; // Update UI
            saveTodos(); // Save changes
        }
    });

    // ---------- Delete Button ----------
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";

    delBtn.addEventListener('click', ()=>{
        todos.splice(index, 1); // Remove from array
        render();               // Re-render list
        saveTodos();            // Save changes
    });

    // Append elements to LI
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// ===============================
// Render all todos
// ===============================
function render(){
    list.innerHTML = ''; // Clear list

    // Loop through todos and create UI
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// ===============================
// Add new todo
// ===============================
function addTodo(){
    const text = input.value.trim(); // Get input

    if(!text) return; // Prevent empty input

    // Add new object
    todos.push({
        text: text,
        completed: false
    });

    input.value = ''; // Clear input

    render();     // Update UI
    saveTodos();  // Save data
}

// ===============================
// Event Listeners
// ===============================
addBtn.addEventListener("click", addTodo);

// Initial render
render();