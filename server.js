const express = require('express');
const bodyParser = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'your-secret-key';

app.use(express.json());

// Пример данных книг
let books = [
  { id: 1, title: 'Node.js Basics', author: 'John Doe', isbn: '12345' },
  { id: 2, title: 'Learning Express', author: 'Jane Smith', isbn: '67890' },
  { id: 3, title: 'JavaScript Mastery', author: 'Jim Brown', isbn: '54321' },
];

// Пример отзывов
let reviews = {
  '12345': { review: 'Great book on Node.js' },
  '67890': { review: 'Very informative on Express' },
};

// Пример пользователей
let users = [];

// Task 1: Получить список всех книг
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 2: Получить книгу по ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// Task 3: Получить книги по автору
app.get('/books/author/:author', (req, res) => {
  const { author } = req.params;
  const authorBooks = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  if (authorBooks.length > 0) {
    res.json(authorBooks);
  } else {
    res.status(404).send('No books found for this author');
  }
});

// Task 4: Получить книги по названию
app.get('/books/title/:title', (req, res) => {
  const { title } = req.params;
  const titleBooks = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
  if (titleBooks.length > 0) {
    res.json(titleBooks);
  } else {
    res.status(404).send('No books found with this title');
  }
});

// Task 5: Получить отзыв о книге
app.get('/books/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const review = reviews[isbn];
  if (review) {
    res.json(review);
  } else {
    res.status(404).send('Review not found');
  }
});

// Task 6: Зарегистрировать нового пользователя
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    users.push({ username, password });
    res.status(201).send('User registered');
  } else {
    res.status(400).send('Invalid data');
  }
});

// Task 7: Войти как зарегистрированный пользователь
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Task 8: Добавить/изменить отзыв о книге
app.post('/books/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  if (review) {
    reviews[isbn] = { review };
    res.send('Review added/updated');
  } else {
    res.status(400).send('Review cannot be empty');
  }
});

// Task 9: Удалить отзыв о книге
app.delete('/books/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  if (reviews[isbn]) {
    delete reviews[isbn];
    res.send('Review deleted');
  } else {
    res.status(404).send('Review not found');
  }
});

// Task 10: Получить все книги с помощью async/await
app.get('/books/async', async (req, res) => {
  try {
    const bookList = await Promise.resolve(books);
    res.json(bookList);
  } catch (error) {
    res.status(500).send('Error fetching books');
  }
});

// Task 11: Поиск книги по ISBN с использованием Promises
app.get('/books/promise/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  new Promise((resolve, reject) => {
    const book = books.find(b => b.isbn === isbn);
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
  })
    .then(book => res.json(book))
    .catch(error => res.status(404).send(error));
});

// Task 12: Поиск книг по автору
app.get('/books/promise/author/:author', (req, res) => {
  const { author } = req.params;
  const authorBooks = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  if (authorBooks.length > 0) {
    res.json(authorBooks);
  } else {
    res.status(404).send('No books found for this author');
  }
});

// Task 13: Поиск книг по названию
app.get('/books/promise/title/:title', (req, res) => {
  const { title } = req.params;
  const titleBooks = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
  if (titleBooks.length > 0) {
    res.json(titleBooks);
  } else {
    res.status(404).send('No books found with this title');
  }
});

// Task 14: Финал: Сохраните этот код в GitHub
// Это задание не требует кода на сервере.

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
