const express = require('express')
const uuid = require('uuid')
//import cors from "cors";

const port = 3000
const app = express();
app.use(express.json());
//app.use(cors());


/*
- GET          => Buscar informações no back-end
- POST         => Criar informações no back-end
- PUT / PATH   => Alterar/Atualizar informações no back-end
- DELETE       => Deletar informações no back-end

- Middleware   => INTERCEPTADOR => Tem o poder de alterar e parar dados da requisição
*/

const users = []

const checkUserId = (request, response, next) => {
  const { id } = request.params;

  const index = users.findIndex(user => user.id === id);

  if (index < 0) {
    return response.status(404).json({ Error: 'User not found' });
  }

  request.userIndex = index;
  request.userId = id;

  next();

}


app.get('/users', (request, response) => {
  return response.json(users);

})

app.post('/users', (request, response) => {
  const { name, age } = request.body

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.status(201).json(user);

})

app.put('/users/:id', checkUserId, (request, response) => {
  const { name, age } = request.body;
  const index = request.userIndex;
  const id = request.userid;

  const updateUser = { id, name, age };

  users[index] = updateUser;

  return response.json(updateUser);

})

app.delete('/users/:id', checkUserId, (request, response) => {
  const index = request.userIndex;


  users.splice(index,);

  return response.status(204).json();

})

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
})
