# Aula 5 - Funcionalidades avançadas

Não anotei tudo, foquei apenas na parte relacionada a testes com Jest.

## Testes Automatizados

```
npm install jest -D
npx jest --init
```

Respostas às perguntas do `--init`:

- Would you like to use Jest when running "test" script in "package.json"? - Yes
- Choose the test environment that will be used for testing - node
- Do you want Jest to add coverage reports? - no
- Automatically clear mock calls and instance between every test? - yes

Criar no diretório `backend/` os diretórios:

- `tests/`:
    - `integration/`
    - `unit/`

### Teste Unitário

No exemplo, foi criado a função/arquivo `src/utils/generateUniqueId.js`:
```js
const crypto = require('crypto');

module.exports = function generateUniqueId() {
	return crypto.randomBytes(4).toString('HEX');
}
```

E então no diretório `tests/unit/generateUniqueId.spec.js`:
```js
const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});
```

Agora podemos executar
```
npm test
```

E checar se o teste vai passar ou falhar.


### Teste de Integração


Adicionar a seguinte entrada ao arquivo `knexfile.js`:

```js
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
  },
```

Instalar o `cross-env`:
```
npm install cross-env
```

Editar o `scripts.test` em `packages.json`:
```json
    "test": "cross-env NODE_ENV=test jest"
```

Alterar o `src/database/connection` para:
```js
const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;
```

Instalar o `supertest`:
```
npm install supertest -D
```

É necessário dividir o `src/index.js` em dois arquivos:

- `src/app.js`:
```js
// ... conteúdo original do antigo src/index.js,
// trocando a linha do listen() por:
module.exports = app;
```

- `src/server.js`
```js
const app = require('./app');

app.listen(3333);
```

Criar o arquivo `tests/integration/ong.spec.js`:
```js
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "4700000000",
        city: "Rio do Sul",
        state: "SC"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
```

