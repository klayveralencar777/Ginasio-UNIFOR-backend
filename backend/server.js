import express from 'express'
import UserRouter from './src/routes/user.routes.js'
import AuthRouter from './src/routes/auth.routes.js'
const app = express();
const port = 3000;
app.use(express.json());
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})