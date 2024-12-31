import './app.css';
import TodoApp from './TodoApp.svelte';

const app = new TodoApp({
    target: document.getElementById('app'),
});

export default app;

