const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    database: 'todo_svelte_app',
    port: '5432',
});

app.use(bodyParser.json());


app.get("/todos", async (req, res) => {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(result.rows);
});

app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const completed = req.body;

   try{
        const res = await pool.query('UPDATE todos SET completed = $1 WHERE id = $2 ', [completed, id]);

        if(res.rowCount === 0){
            return res.status(404).send();
        }
    } catch (error) {
        res.status(500).json({error});
    }
});

app.post('/todos', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO todos (title, description, completed, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [title, description, false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create TODO item' });
  }
});


app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'TODO item not found' });
    }

    res.status(200).json({ message: 'TODO item deleted successfully', deleted: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete TODO item' });
  }
});



app.listen(5000, () => console.log('Server running on post http://localhost:5000 '));

