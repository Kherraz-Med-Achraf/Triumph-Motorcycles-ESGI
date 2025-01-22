import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
