# Cros To Do List API
Boas vindas ao Cros To Do List API, onde pode se registrar, autenticar e criar listas de afazeres!

## Objetivos:

Construir uma API que permita aos usuários criar e editar tarefas.

## Como rodar a aplicação no computador:

#### Seu computador precisa de Git (para versionamento do código), Node.js & npm (para executar a aplicação). Clique nos links, caso ainda não tenha instalado algum desses:

 - [ ] [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
 - [ ] [Node.js e npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Agora sim estamos prontos para instalar o projeto.

## Instalando a aplicação:

1. Primeiro, abra um novo terminal e clone o repositório utilizando o comando 
`git clone git@github.com:DanielDaher/cros_todolist_api.git`

2. Em seguida, digite `cd cros-todolist-api` para entrar no diretório (pasta) do projeto, que acabou de ser criada.

3. No terminal, execute `npm install` para instalar as dependências necessárias.

4. Execute também o comando `npx prisma generate`.

5. Crie, na raiz do projeto, um arquivo com o nome `.env` e coloque as seguintes variáveis (uma por linha):
  `DATABASE_URL="postgresql://postgres:choque_de_cultura123@db.mtttndyqehnthxkarimo.supabase.co:5432/postgres"`
  `PORT=3000`
  `NODE_ENV=development`
  `JWT_ACCESS_SECRET=SECRET123`
  `JWT_REFRESH_SECRET=ANOTHER_SECRET123`
 Salve as modificações!

6. Com o comando `npm run dev`, o backend da aplicação já estará funcionando. Aguarde alguns segundos, que o terminal mostrará a mensagem `Listening: http://localhost:3000`, o que significa que está tudo certo.

7. Agora você pode abrir seu navegador e digitar a url http://localhost:3000/swagger.

## Como usar o site?

1. Após acessar a url http://localhost:3000/swagger, clique em `POST: /users` para criar um usuário. Clique no botão `Try it out` e edite o JSON, colocando as informações que deseja. Aperte o botão `execute`.

2. Em seguida, repita este mesmo passo, mas agora clicando em`POST: /login`, passando no JSON o email e senha que você cadastrou. Após executar, verá que na sessão `Responses` existirá um Response Body.

3. Copie o token do Response Body, mas apenas o que está dentro das strings.

4. Vá até o topo da página, onde encontrará, no canto superior direito, o botão `Authorize`. Clique nele.

5. Cole o token no input value e clique em Authorize. Em seguida, feche o modal clicando em `close`.

6. Agora você está autenticado e poderá usar as demais rotas. Basta clicar nelas, clicar em `Try it out` e colocar as informações que deseja!

7. IMPORTANTE: Ao editar tarefas ou buscar pelo id, é preciso passa-lo no input correspondente.
