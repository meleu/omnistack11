## Aula 2

### Ferramentas e bibliotecas

#### Insomnia

Baixar e instalar o [insomnia](https://insomnia.rest/)

#### nodemon

Instalar o `nodemon`:
```
npm install nodemon
```

No arquivo `package.json`, na propriedade `scripts`:
```json
"scripts": {
  "start": "nodemon src/index.js"
}
```

#### knex e sqlite3

[00:30:00]

Usaremos o sqlite3 como banco de dados e o [knex.js](http://knexjs.org/) como query builder.

```
npm install knex sqlite3
npx knex init
```

Após esses comandos o arquivo `knexfile.js` será criado. Alterar a propriedade `development` para:
```js
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  }
```

#### cors

Middleware muito interessante para usar em conjunto com o express.js. Serve para garantir que a interação está sendo realizada a partir de um host específico.

```
npm install cors
```

### Entidades e Funcionalidades

[00:35:00]

Como já temos o layout disponível, podemos pensar nas entidades e funcionalidades da aplicação.

**Entidades**:

- ONG
- casos (incident)

**Funcionalidades**:

- login/logout de ONG
- cadastro de ONG
- cadastrar casos
- deletar casos
- listar todos os casos
- listar casos específicos de uma ONG
- entrar em contato com a ONG


### Migrations

Uma vez definidas as entidades que precisarão ser armazenadas no banco de dados e tendo `knexfile.js` já devidamente configurado, devemos executar:

```
npx knex migrate:make create_ongs
```

Isso criará a migration `src/database/migrations/*create_ongs.js`. Adicionar o seguinte código:
```js
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
}
```

Em seguida executar:
```
npx knex migrate:latest
```

Agora criar uma migration para os casos:
```
npx knex migrate:make create_incidents
```

Em `src/database/migrations/*create_incidents.js`, adicionar o seguinte código:
```js
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('value').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
}
```

Em seguida executar:
```
npx knex migrate:latest
```

**OBSERVAÇÃO**:

Caso necessite desfazer a última migration:
```
npx knex migrate:rollback
```

Listar migrations já executadas:
```
npx knex migrate:status
```

Para ver quais comandos disponíveis:
```
npx knex
```

### `.gitignore`

http://gitignore.io/api/vim,node,code,linux


### `src/database/connection.js`

```js
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;
```

### `src/controllers/OngController.js`

https://github.com/meleu/omnistack11/blob/master/backend/src/controllers/OngController.js


### `src/controllers/IncidentController.js`

https://github.com/meleu/omnistack11/blob/master/backend/src/controllers/IncidentController.js


### `src/controllers/ProfileController.js`

https://github.com/meleu/omnistack11/blob/master/backend/src/controllers/ProfileController.js


### `src/controllers/SessionController.js`

https://github.com/meleu/omnistack11/blob/master/backend/src/controllers/SessionController.js


### `src/routes.js`

```js
const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;
```


### `src/index.js`

```js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
```

### endpoints a serem testados no insomnia

- `POST /sessions`
    - envia: `id` dentro do body
    - recebe: nome da ONG
- `GET /ongs`
    - recebe: lista de ONGs
- `POST /ongs`
    - envia: `name`, `email`, `whatsapp`, `city`, `state` dentro do body
    - recebe: id e outros dados da ONG recém cadastrada.
- `GET /profile`
    - envia: `ong_id` no cabeçalho `Authorization`
    - recebe: lista de casos (incidents)
- `GET /incidents`
    - recebe: `page` via query parameter
    - envia:
        - 5 últimos casos
        - cabeçalho `X-Total-Count` com o total de casos desta ONG
- `POST /incidents`
    - envia: `title`, `description`, `value` dentro de body
    - recebe: informações sobre o caso recém criado
- `DELETE /incidents`
    - envia:
        - `id` do caso via parâmetro da url
        - `ong_id` via cabeçalho `Authorization`

## Aula 3

Dentro do diretório `frontent`, excluir os seguintes arquivos:

- `README.md`
- `src/`:
    - `App.css`
    - `App.test.js`
    - `index.css`
    - `logo.svg`
    - `serviceWorker.js`
    - `setupTests.js`
- `public/`:
    - `robots.txt`
    - `manifest.json`
    - `logo*.png`

No arquivo `src/index.js`, remover importação do arquivo `./index.css` e linhas relacionadas ao `serviceWorker`.

No arquivo `src/App.js`, remover importação do `./App.css` e `logo.svg`, e dentro de `funcion App()` retornar apenas um `<h1>Hello World</h1>`.

No arquivo `public/index.html`, remover de `<meta name="description" ...` até antes de `<title>`, remover os comentários. Setar o `<title>Be The Hero</title>`.

Por fim mandar um `npm start` para checar se o Hello World vai funcionar deboas.

### Conceitos

**Componentes**

Um componente React é uma função que retorna código html.

**JSX**

JSX é formato de arquivo que aceita XML dentro do código JavaScript.

**Propriedades**

Podemos mandar propriedades para os Components usando atributos na função que invoca o componente.

[00:16:15] A propriedade `children` retorna todos elementos filhos do componente.


### assets

Colocar `heroes.png` e `logo.svg` em `src/assets/`.

Também instalar `react-icons` para obter ícones que ajudarão no design.

```
npm install react-icons
```

### Adicionando Rotas

```
npm install react-router-dom
```

Criar o arquivo de rotas `src/routes.js`:

```js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
      </Switch>
    </BrowserRouter>
  );
}
```

Agora o `src/App.js` vai ficar assim:

```js
import React from 'react';

import './global.css';

import Routes from './routes';

function App() {
  return <Routes />;
}

export default App;
```

Criar o `src/global.css`

```css
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  font: 400 14px Roboto, sans-serif;
  background: #f0f0f5;
  -webkit-font-smoothing: antialiased;
}

input, button, textarea {
  font: 400 14px Roboto, sans-serif;
}

button {
  cursor: pointer;
}

form input {
  width: 100%;
  height: 60px;
  color: #333;
  border: 1px solid #dcdce6;
  border-radius: 8px;
  padding: 0 24px;
}

.button {
  width: 100%;
  height: 60px;
  background: #e02041;
  border: 0;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  margin-top: 16px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  line-height: 60px;
  transition: filter 0.2s;
}

.button:hover {
  filter: brightness(80%);
}

.back-link {
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #41414d;
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.back-link svg {
  margin-right: 8px;
}

.back-link:hover {
  opacity: 0.8;
}
```


### Página de Logon

A página de logon será a página incial (conforme pode ser visto no `src/routes.js`).

Criar `src/pages/Logon/index.js`:

```js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import imgLogo from '../../assets/logo.svg';
import imgHeroes from '../../assets/heroes.png';


export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={imgLogo} alt="Be The Hero" />

        <form>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID" />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={imgHeroes} alt="Heroes" />
    </div>
  );
}
```

Criar `src/pages/Logon/styles.css`:

```css
.logon-container {
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logon-container section.form {
  width: 100%;
  max-width: 350px;
  margin-right: 30px;
}

.logon-container section.form form {
  margin-top: 100px;
}

.logon-container section.form form h1 {
  font-size: 32px;
  margin-bottom: 32px;
}
```


### Página de Cadastro

Lembrar dos 3 passos ao adicionar um novo componente/página:
1. Criar entrada para a página no `src/routes.js`;
2. Criar arquivo `src/pages/NovaPagina/index.js`;
3. Criar estilização da NovaPagina em `src/pages/NovaPagina/styles.css`.

Criar entrada para `Register` em `src/routes.js`:
```js
// ...
import Register from './pages/Register';
// ...
        <Route path="/register" component={Register} />
// ...
```

Criar `src/pages/Register/index.js`:
```js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import imgLogo from '../../assets/logo.svg';

export default function Register() {
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={imgLogo} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a
            encontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>

        <form>
          <input placeholder="Nome da ONG" />
          <input type="Email" placeholder="email" />
          <input placeholder="WhatsApp" />
          <div className="input-group">
            <input placeholder="Cidade" />
            <input placeholder="UF" style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
```

Criar `src/pages/Register/styles.css`:
```css
.register-container {
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
}

.register-container .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-container .content section {
  width: 100%;
  max-width: 380px;
}

.register-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.register-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.register-container .content form {
  width: 100%;
  max-width: 450px;
}

.register-container .content form input {
  margin-top: 8px;
}

.register-container .content form .input-group {
  display: flex;
}

.register-container .content form .input-group input + input {
  margin-left: 8px;
}
```

### Listar casos de uma ONG

Criar entrada para `Profile` em `src/routes.js`:
```js
// ...
import Profile from './pages/Profile';
// ...
        <Route path="/profile" component={Profile} />
// ...
```

Criar `src/pages/Profile/index.js` (por enquanto ainda com dados estáticos):
```js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import imgLogo from '../../assets/logo.svg';

export default function Profile() {
  return (
    <div className="profile-container">
      <header>
        <img src={imgLogo} alt="Be The Hero" />
        <span>Bem vinda, APAD</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        <li>
          <strong>CASO:</strong>
          <p>
            Caso teste...
          </p>

          <strong>DESCRIÇÃO:</strong>
          <p>
            Descrição teste...
          </p>

          <strong>VALOR:</strong>
          <p>R$ 120,00</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
        <li>
          <strong>CASO:</strong>
          <p>
            Caso teste...
          </p>

          <strong>DESCRIÇÃO:</strong>
          <p>
            Descrição teste...
          </p>

          <strong>VALOR:</strong>
          <p>R$ 120,00</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
        <li>
          <strong>CASO:</strong>
          <p>
            Caso teste...
          </p>

          <strong>DESCRIÇÃO:</strong>
          <p>
            Descrição teste...
          </p>

          <strong>VALOR:</strong>
          <p>R$ 120,00</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
        <li>
          <strong>CASO:</strong>
          <p>
            Caso teste...
          </p>

          <strong>DESCRIÇÃO:</strong>
          <p>
            Descrição teste...
          </p>

          <strong>VALOR:</strong>
          <p>R$ 120,00</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
        <li>
          <strong>CASO:</strong>
          <p>
            Caso teste...
          </p>

          <strong>DESCRIÇÃO:</strong>
          <p>
            Descrição teste...
          </p>

          <strong>VALOR:</strong>
          <p>R$ 120,00</p>

          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
      </ul>

    </div>
  );
}
```

Criar `src/pages/Profile/styles.css`:
```css
.profile-container {
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
}

.profile-container header {
  display: flex;
  align-items: center;
}

.profile-container header span {
  font-size: 20px;
  margin-left: 24px;
}

.profile-container header img {
  height: 64px;
}

.profile-container header a {
  width: 260px;
  margin-left: auto;
  margin-top: 0;
}

.profile-container header button {
  height: 60px;
  width: 60px;
  border-radius: 4px;
  border: 1px solid #dcdce6;
  background: transparent;
  margin-left: 16px;
  transition: border-color 0.2s;
}

.profile-container header button:hover {
  border-color: #999;
}

.profile-container h1 {
  margin-top: 80px;
  margin-bottom: 24px;
}

.profile-container ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  list-style: none;
}

.profile-container ul li {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;
}

.profile-container ul li button {
  position: absolute;
  right: 24px;
  top: 24px;
  border: 0;
}

.profile-container ul li button:hover {
  opacity: 0.8;
}

.profile-container ul li strong {
  display: block;
  margin-bottom: 16px;
  color: #41414d;
}

.profile-container ul li p + strong {
  margin-top: 32px;
}

.profile-container ul li p {
  color: #737380;
  line-height: 21px;
  font-size: 16px;
}
```

### Cadastrando novo caso

01h 6min

