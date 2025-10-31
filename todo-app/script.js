// Simple To-Do app (no frameworks). Uses localStorage.
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const pendingListEl = document.getElementById('pendingList');
const completedListEl = document.getElementById('completedList');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');

let tasks = []; // {id, text, createdAt, completedAt|null, completed:boolean}

// Utilities
function save() {
  localStorage.setItem('todo_tasks_v1', JSON.stringify(tasks));
}
function load() {
  const raw = localStorage.getItem('todo_tasks_v1');
  if (raw) {
    try {
      tasks = JSON.parse(raw);
    } catch (e) {
      tasks = [];
    }
  } else {
    tasks = [];
  }
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}
function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleString();
}

// CRUD
function addTask(text) {
  const t = { id: uid(), text: text.trim(), createdAt: Date.now(), completedAt: null, completed: false };
  tasks.unshift(t);
  save();
  render();
}
function deleteTask(id) {
  if (!confirm('Delete this task?')) return;
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}
function editTask(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return;
  const current = tasks[idx].text;
  const val = prompt('Edit task', current);
  if (val === null) return; // canceled
  const newText = val.trim();
  if (!newText) { alert('Task cannot be empty'); return; }
  tasks[idx].text = newText;
  save();
  render();
}
function toggleComplete(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return;
  const t = tasks[idx];
  t.completed = !t.completed;
  t.completedAt = t.completed ? Date.now() : null;
  // move the item to head of appropriate list for visibility
  tasks.splice(idx,1);
  tasks.unshift(t);
  save();
  render();
}

// Render
function render() {
  pendingListEl.innerHTML = '';
  completedListEl.innerHTML = '';

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  if (pending.length === 0) {
    pendingListEl.innerHTML = `<li class="empty">No pending tasks — add one above.</li>`;
  } else {
    pending.forEach(t => {
      const li = buildTaskItem(t);
      pendingListEl.appendChild(li);
    });
  }

  if (completed.length === 0) {
    completedListEl.innerHTML = `<li class="empty">No completed tasks yet.</li>`;
  } else {
    completed.forEach(t => {
      const li = buildTaskItem(t);
      completedListEl.appendChild(li);
    });
  }

  pendingCount.textContent = `(${pending.length})`;
  completedCount.textContent = `(${completed.length})`;
}

function buildTaskItem(t) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const left = document.createElement('div');
  left.className = 'task-left';

  const checkbox = document.createElement('button');
  checkbox.className = 'checkbox';
  checkbox.title = t.completed ? 'Mark as pending' : 'Mark as completed';
  checkbox.innerHTML = t.completed ? '✓' : '';
  checkbox.addEventListener('click', () => toggleComplete(t.id));

  const textWrap = document.createElement('div');
  const text = document.createElement('div');
  text.className = 'task-text';
  text.textContent = t.text;
  if (t.completed) text.style.textDecoration = 'line-through';

  const meta = document.createElement('div');
  meta.className = 'task-meta';
  const created = `Added: ${formatDate(t.createdAt)}`;
  const completed = t.completedAt ? ` • Completed: ${formatDate(t.completedAt)}` : '';
  meta.textContent = created + completed;

  textWrap.appendChild(text);
  textWrap.appendChild(meta);

  left.appendChild(checkbox);
  left.appendChild(textWrap);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn edit';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => editTask(t.id));

  const delBtn = document.createElement('button');
  delBtn.className = 'btn delete';
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => deleteTask(t.id));

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(left);
  li.appendChild(actions);
  return li;
}

// Events
addBtn.addEventListener('click', () => {
  const val = taskInput.value.trim();
  if (!val) return;
  addTask(val);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

// Initialize
load();
render();

// Expose for debugging in console
window.todo = { tasks, addTask, deleteTask, editTask, toggleComplete };
