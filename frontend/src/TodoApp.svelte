<script>
    import { onMount } from 'svelte';
    import Particles from './Particles.svelte'; // Import the Particles component

    let todos = [];
    let newTodoTitle = '';
    let newTodoDescription = '';

    // Fetch todos from the backend
    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            if (response.ok) {
                todos = await response.json();
            }
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        }
    };

    // Add a new todo
    const addTodo = async () => {
        if (!newTodoTitle.trim() || !newTodoDescription.trim()) {
            alert('Title and description cannot be empty.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newTodoTitle,
                    description: newTodoDescription,
                    completed: false, // Default to incomplete
                }),
            });

            if (response.ok) {
                const newTodo = await response.json();
                todos = [...todos, newTodo];
                newTodoTitle = '';
                newTodoDescription = '';
            } else {
                console.error('Failed to add todo:', await response.text());
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    // Toggle the completion status of a todo
    const toggleCompletion = async (todo) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${todo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...todo,
                    completed: !todo.completed, // Toggle the completion status
                }),
            });

            if (response.ok) {
                const updatedTodo = await response.json();
                todos = todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
            } else {
                console.error('Failed to update todo:', await response.text());
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                todos = todos.filter((todo) => todo.id !== id);
            } else {
                console.error('Failed to delete todo:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Fetch todos when the component mounts
    onMount(() => {
        fetchTodos();
    });
</script>

<style>
    /* Catppuccin Mocha color variables */
    :root {
        --base: #1e1e2e;
        --mantle: #181825;
        --crust: #11111b;
        --text: #cdd6f4;
        --subtext1: #bac2de;
        --subtext0: #a6adc8;
        --overlay2: #9399b2;
        --overlay1: #7f849c;
        --overlay0: #6c7086;
        --surface2: #585b70;
        --surface1: #45475a;
        --surface0: #313244;
        --lavender: #b4befe;
        --blue: #89b4fa;
        --sapphire: #74c7ec;
        --sky: #89dceb;
        --teal: #94e2d5;
        --green: #a6e3a1;
        --yellow: #f9e2af;
        --peach: #fab387;
        --maroon: #eba0ac;
        --red: #f38ba8;
        --mauve: #cba6f7;
        --pink: #f5c2e7;
        --flamingo: #f2cdcd;
        --rosewater: #f5e0dc;
    }

    /* Apply JetBrains Mono font to the entire app */
    body {
        background-color: var(--base);
        color: var(--text);
        font-family: 'JetBrains Mono', monospace;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        color: var(--lavender);
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    h2 {
        color: var(--blue);
        font-size: 1.5rem;
        font-weight: semibold;
        margin-bottom: 1rem;
    }

    input, textarea {
        background-color: var(--surface0);
        color: var(--text);
        border: 1px solid var(--surface1);
        border-radius: 0.5rem;
        padding: 0.75rem;
        margin-bottom: 1rem;
        width: 100%;
        font-size: 1rem;
        font-family: 'JetBrains Mono', monospace; /* Apply font to inputs */
    }

    input::placeholder, textarea::placeholder {
        color: var(--overlay2);
    }

    button {
        background-color: var(--mauve);
        color: var(--base);
        border: none;
        border-radius: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
        font-family: 'JetBrains Mono', monospace; /* Apply font to buttons */
    }

    button:hover {
        background-color: var(--pink);
    }

    .todo-item {
        background-color: var(--surface0);
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .todo-item h3 {
        color: var(--lavender);
        font-size: 1.25rem;
        font-weight: bold;
        margin: 0;
    }

    .todo-item p {
        color: var(--subtext1);
        margin: 0.5rem 0 0 0;
    }

    .todo-item .status {
        color: var(--green);
        font-size: 0.875rem;
    }

    .todo-item .status.incomplete {
        color: var(--red);
    }

    .todo-item button {
        background-color: var(--red);
        color: var(--base);
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-family: 'JetBrains Mono', monospace; /* Apply font to buttons */
    }

    .todo-item button:hover {
        background-color: var(--maroon);
    }

    .no-tasks {
        color: var(--subtext1);
        text-align: center;
        margin-top: 2rem;
    }
</style>

<!-- Render the Particles component -->
<Particles />

<div class="container">
    <h1>TODO App</h1>

    <!-- Add TODO Form -->
    <div class="bg-surface0 p-6 rounded-lg shadow mb-6">
        <h2>Add a New Task</h2>
        <div class="mb-4">
            <input
                type="text"
                bind:value={newTodoTitle}
                placeholder="Task Title"
            />
            <textarea
                bind:value={newTodoDescription}
                placeholder="Task Description"
            ></textarea>
        </div>
        <button on:click={addTodo}>
            Add Task
        </button>
    </div>

    <!-- Todo List -->
    <ul>
        {#each todos as todo}
            <li class="todo-item">
                <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p class="status {todo.completed ? 'True' : 'False'}">
                        {todo.completed ? 'Incomplete' : 'Complete'}
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        on:change={() => toggleCompletion(todo)}
                        class="w-5 h-5 cursor-pointer"
                    />
                    <button on:click={() => deleteTodo(todo.id)}>
                        Delete
                    </button>
                </div>
            </li>
        {/each}
        {#if todos.length === 0}
            <p class="no-tasks">No tasks found. Add some!</p>
        {/if}
    </ul>
</div>
