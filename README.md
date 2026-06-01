# Jales Bookstore API 📚

API REST para prática de testes
https://jales-bookstore-api-1.onrender.com/swagger

---

## Endpoints

### Account
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/Account/v1/User` | ❌ | Criar usuário |
| POST | `/Account/v1/GenerateToken` | ❌ | Gerar JWT |
| POST | `/Account/v1/Authorized` | ✅ | Verificar token |
| GET | `/Account/v1/User/{UUID}` | ✅ | Buscar usuário |
| DELETE | `/Account/v1/User/{UUID}` | ✅ | Deletar usuário |

### BookStore
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/BookStore/v1/Books` | ❌ | Listar livros |
| GET | `/BookStore/v1/Book?ISBN=` | ❌ | Buscar por ISBN |
| POST | `/BookStore/v1/Books` | ✅ | Adicionar livros à coleção |
| DELETE | `/BookStore/v1/Books?UserId=` | ✅ | Limpar coleção |
| DELETE | `/BookStore/v1/Book` | ✅ | Remover livro da coleção |
| PUT | `/BookStore/v1/Books/{ISBN}` | ✅ | Substituir livro na coleção |

---

## Deploy no Render (Gratuito) — Passo a Passo

### Pré-requisitos
- Conta no [GitHub](https://github.com) (gratuita)
- Conta no [Render](https://render.com) (gratuita, sem cartão)

---

### 1. Criar repositório no GitHub

1. Acesse [github.com](https://github.com) → **New repository**
2. Nome: `jales-bookstore-api`
3. Visibilidade: **Public** (necessário para o free tier do Render)
4. Clique em **Create repository**

### 2. Subir o código

```bash
# Na pasta do projeto
git init
git add .
git commit -m "feat: initial Jales Bookstore API"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/jales-bookstore-api.git
git push -u origin main
```

### 3. Deploy no Render

1. Acesse [render.com](https://render.com) → **Sign Up** (pode usar conta GitHub)
2. No Dashboard → **New** → **Web Service**
3. Conecte sua conta GitHub e selecione o repositório `jales-bookstore-api`
4. Configure:
   - **Name:** `jales-bookstore-api`
   - **Region:** Oregon (US West) — menor latência para free tier
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Clique em **Create Web Service**

> O Render detectará automaticamente o `render.yaml` e criará a variável `JWT_SECRET` automaticamente.

### 4. Acessar a API

Após o deploy (3-5 minutos), a URL será:
```
https://jales-bookstore-api.onrender.com
```

- **Swagger UI:** `https://jales-bookstore-api.onrender.com/swagger`
- **Health check:** `https://jales-bookstore-api.onrender.com/health`

> ⚠️ **Free tier do Render:** A instância "dorme" após 15 minutos de inatividade. O primeiro acesso após o sleep demora ~30 segundos para "acordar". Para uso em aula, acesse a URL antes de começar para garantir que está ativa.

---

## Rodar localmente

```bash
npm install
npm start
# ou
npm run dev  # com hot reload (nodemon)
```

Acesse: `http://localhost:3000/swagger`

---

## Observações

- **Dados em memória:** os usuários criados são perdidos ao reiniciar a API (sem banco de dados externo).
- **Token JWT:** válido por 1 hora.
- **Senha:** mínimo 8 caracteres, deve conter maiúsculas, minúsculas, número e caractere especial (ex: `Senha@123`).
