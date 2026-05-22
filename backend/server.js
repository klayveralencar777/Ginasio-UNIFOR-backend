import express from 'express'

import AuthRouter from './src/routes/auth.routes.js'
import AlunoRouter from './src/routes/aluno.routes.js'
import FuncionarioRouter from './src/routes/funcionario.routes.js'
import EstrangeiroRouter from './src/routes/estrangeiro.routes.js'
import PlaceRouter from './src/routes/place.routes.js'
import SchedulingRouter from './src/routes/scheduling.routes.js'
import exceptionHandler from './src/middlewares/exception.middleware.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use('/auth', AuthRouter);
app.use('/alunos', AlunoRouter);
app.use('/funcionarios', FuncionarioRouter);
app.use('/estrangeiros', EstrangeiroRouter);
app.use('/places', PlaceRouter);
app.use('/schedulings', SchedulingRouter);
app.use(exceptionHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})