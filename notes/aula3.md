# Aula 3

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

## Conceitos

**Componentes**

Um componente React é uma função que retorna código html.

**JSX**

JSX é formato de arquivo que aceita XML dentro do código JavaScript.

**Propriedades**

Podemos mandar propriedades para os Components usando atributos na função que invoca o componente.

[00:16:15] A propriedade `children` retorna todos elementos filhos do componente.


## assets

Colocar `heroes.png` e `logo.svg` em `src/assets/`.

Também instalar `react-icons` para obter ícones que ajudarão no design.

```
npm install react-icons
```

## Adicionando Rotas

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


## Página de Logon

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


## Página de Cadastro

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

## Listar casos de uma ONG

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

## Cadastrando novo caso

Criar entrada para `NewIncident` em `src/routes.js`:
```js
// ...
import NewIncident from './pages/NewIncident';
// ...
        <Route path="/incident/new" component={NewIncident} />
// ...
```

Criar o `src/pages/NewIncident/index.js`:
```js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import imgLogo from '../../assets/logo.svg';

export default function NewIncident() {
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={imgLogo} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o seu pefil.
          </Link>
        </section>

        <form>
          <input placeholder="Título do caso" />
          <textarea placeholder="Descrição" />
          <input placeholder="Valor em reais" />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
```

Criar o `src/pages/NewIncident/styles.css`:
```css
.new-incident-container {
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
}

.new-incident-container .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-incident-container .content section {
  width: 100%;
  max-width: 380px;
}

.new-incident-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.new-incident-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.new-incident-container .content form {
  width: 100%;
  max-width: 450px;
}

.new-incident-container .content form input,
.new-incident-container .content form textarea {
  margin-top: 8px;
}
```

Também foi necessário adicionar o seguinte ao `src/global.css`:
```css
/* logo abaixo do bloco 'form input' */

form textarea {
  width: 100%;
  min-height: 140px;
  color: #333;
  border: 1px solid #dcdce6;
  border-radius: 8px;
  padding: 16px 24px;
  line-height: 24px;
  resize: vertical;
}
```

## Integrando com o backend

Ir no diretório do backend a inicializá-lo:
```
cd path/to/backend
npm start
```

Voltando ao frontend...

Para acessar a API do backend, vamos usar o `axios`:
```
npm install axios
```

Criar o arquivo `src/services/api.js`:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
```

### Cadastro

No arquivo `src/pages/Register/index.js`:

```js
// importar useState e useHistory:
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

//... importar api.js
import api from '../../services/api.js

//... antes do return, adicionar o seguinte:
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state,
    };

    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente');
    }
  }


//... alterar o <form> para o seguinte:
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
```

Testar criando uma conta.

### Logon

```js
// importar useState e useHistory:
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

//... importar api.js
import api from '../../services/api.js

//... antes do return, adicionar o seguinte:
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

//... no <form> adicionar/alterar o seguinte:
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
//...
```

Testar se a tela de logon vai funcionar.


### ONG visualizando seus próprios casos


```js
// importar useState, useEffect e useHistory:
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

//... importar api.js
import api from '../../services/api.js

//... antes do return, adicionar o seguinte:
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      },
    }).then((response) => setIncidents(response.data));
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

//... alterações no return():
        <span> Bem vinda, {ongName}</span>

//... chamar handleLogout no button de logout
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>

//... lista de casos cadastrados:
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>
              {incident.title}
            </p>

            <strong>DESCRIÇÃO:</strong>
            <p>
              {incident.description}
            </p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
```



### Cadastrar novo caso

```js
// importar useState e useHistory:
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

//... importar api.js
import api from '../../services/api.js

//... antes do return, adicionar o seguinte:
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

//... alterar o <form>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
```

