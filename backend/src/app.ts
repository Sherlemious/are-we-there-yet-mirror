import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`[server] Server is Successfully Running, and App is listening on port ${port}`);
});

