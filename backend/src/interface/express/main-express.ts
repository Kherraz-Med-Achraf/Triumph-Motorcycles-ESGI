import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('<h1 style="color: blue; font-family: Arial, sans-serif;">Hello from Express Youri le BG! 😎</h1>');});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
});
