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

[01:04:10]


### `src/controllers/IncidentController.js`

[01:33:00]
[01:16:26]


### `src/controllers/ProfileController.js`

[01:19:55]


### `src/controllers/SessionController.js`

[01:23:35]


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
