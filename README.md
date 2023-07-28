# node-with-docker

Repositório usado para treinamentos de back-end durante as Férias de Alto Impacto do CITi, a maior empresa júnior de tecnologia do Brasil.

### .env

Para rodar, crie um arquivo .env, copie e cole os valores abaixo
```dotenv
PROJECT_NAME=nodewdocker

DATABASE_DB=nodewdocker
DATABASE_TYPE=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=docker
DATABASE_HOST=nodewdocker-db
DATABASE_PORT=5432

SERVER_PORT=3001

DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}

DATABASE_TEST_DB=postgres
DATABASE_TEST_USER=postgres
DATABASE_TEST_PASSWORD=postgres
DATABASE_TEST_HOST=localhost
DATABASE_TEST_PORT=5433

DATABASE_TEST_URL=postgres://postgres:postgres@localhost:5433/postgres

JWT_ACCESS_TOKEN_SECRET=farniubntuibnjouwtwe
JWT_REFRESH_TOKEN_SECRET=gaerguarngnruea
```
