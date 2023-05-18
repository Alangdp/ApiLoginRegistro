
# Documentação da API RESTful de Registro e Gerenciamento de Usuários

Esta API permite o registro, login e gerenciamento de usuários, bem como operações relacionadas a bancos de dados. Cada banco de dados é identificado por um token e senha exclusivos, fornecidos ao criar um novo banco de dados.

# Rotas de Usuários

### Registrar um usuário

Endpoint: `/api/user/register`
Método: `POST`
Descrição: Cria um novo usuário no sistema.

## Pode receber

| Campo     | Tipo    | Restrições                          | Único    | Requerido |
|-----------|---------|-------------------------------------|----------|-----------|
| name      | string  | Mínimo de 3 caracteres              | -        | Sim       |
| email     | string  | Deve ser um e-mail válido            | Sim      | Sim       |
| password  | string  | Mínimo de 5 caracteres e validação extra senha deve conter ao menos uma letra maisculo,minuscula um número e no minimo 8 caracteres         | -        | Sim       |
| cpf       | string  | Deve ser um CPF válido               | Sim      | Não       |
| endereco  | string  |                                     | -        | Não       |
| telefone  | string  | Deve ser um número de telefone válido| -        | Não       |
| bornDate  | Date    |                                     | -        | Não       |
| gender    | string  | Mínimo de 3 caracteres              | -        | Não       |
| type      | string  |                                     | -        | Sim       |
| dataBase  | string  |                                     | -        | Sim       |

### Deve ser enviado
Um Json com no minimo estes itens

```json
{
	"DBToken": "Token do banco de dados",
	"DBPassword" : "Senha do banco de dados",
	"name": "Nome do usuario a ser registrado",
	"email": "Email do usuario",
	"password": "Senha do usuario"
}
```

Sera retornado um json com 2 itens em caso de sucesso 
```json
{
   "status": "ok",
   "user": "dados do usuario"
}
```

## Logar um usuário

Endpoint: `/api/user/login`
Método: `POST`
Descrição: Realiza o login de um usuário no sistema.

### Deve ser enviado
Um Json com no minimo estes itens

```json
{
	"DBToken": "Token do banco de dados",
	"DBPassword" : "Senha do banco de dados",
	"email": "Email do usuario",
	"password": "Senha do usuario"
}
```

Sera retornado um json com 3 itens em caso de sucesso 
```json
{
   "status": "ok",
   "user": "dados do usuario",
   "login": true
}
```

### Atualizar um usuário

Endpoint: `/api/user/:id`
Método: `PUT`
Descrição: Atualiza as informações de um usuário existente.

### Deve ser enviado
Um Json com no minimo estes itens

```json
{
	"DBToken": "Token do banco de dados",
	"DBPassword" : "Senha do banco de dados",
	"Campos que demvem ser atualizados"
}
```

Sera retornado um json com 2 itens em caso de sucesso , demonstrando quantos campos foram atualizados
```json
{
   
	"status": "ok",
	"user": {
		"acknowledged": true,
		"modifiedCount": 1,
		"upsertedId": null,
		"upsertedCount": 0,
		"matchedCount": 1
	}

}
```

### Excluir um usuário

Endpoint: `/api/user/:id`
Método: `DELETE`
Descrição: Exclui um usuário do sistema.

### Deve ser enviado
Um Json com no minimo estes itens
```

```json
{
	"DBToken": "Token do banco de dados",
	"DBPassword" : "Senha do banco de dados",
}
```

sera retornado um json com 2 itens demontrando se o usuario foi apagado ou não

```json
	{
		"status": "ok",
		"user": {
			"acknowledged": true,
			"deletedCount": 1
		}
	}
```


### Obter todos os usuários

Endpoint: `/api/user`
Método: `GET`
Descrição: Retorna todos os usuários cadastrados no sistema.

### Deve ser enviado
Um Json com no minimo estes itens

```json
{
	"DBToken": "Token do banco de dados",
	"DBPassword" : "Senha do banco de dados"
}
```

sera retornado todos os usuarios que estiverem no banco de dados daquele token

# Rotas de Bancos de Dados

## Pode receber
| Campo      | Tipo    | Restrições                          | Único    | Requerido |
|------------|---------|-------------------------------------|----------|-----------|
| DBName     | string  | Mínimo de 4 caracteres              | -        | Sim       |
| DBToken    | string  | Mínimo de 4 caracteres              | Sim      | Sim       |
| DBPassword | string  | Mínimo de 5 caracteres              | -        | Sim       |
| CreateBy   | string  | Mínimo de 24 caracteres             | Sim      | Sim       |


### Criar um banco de dados

Endpoint: `/api/database/register`
Método: `POST`
Descrição: Cria um novo banco de dados e gera um token exclusivo.

### Deve ser enviado

Um Json com no minimo estes itens


```json
{
	"DBName" : "Nome do banco de dados",
	"DBPassword" : "Senha do banco de dados",
	"CreateBy": "Id do usuario que criou, deve ser valido" 
}
```
Retorna informaçoes do banco de dados

### Logar em um banco de dados

Endpoint: `/api/database/login`
Método: `POST`
Descrição: Realiza o login em um banco de dados existente usando o token fornecido.

### Deve ser enviado

Um Json com no minimo estes itens

```json
{
	"DBToken": "Token do banco de dados",
	"DBPassword" : "Senha do banco de dados"
}
```
### Atualizar um banco de dados

Endpoint: `/api/bancodedados/:id`
Método: `PUT`
Descrição: Atualiza as informações de um banco de dados existente.

### Deve ser enviado

Um Json com no minimo estes itens

```json
{
	"DBToken": "Token do banco de dados",
	"DBPassword" : "Senha do banco de dados",
	"DBNewPassword" : "Nova senha do banco de dados", Não necessario
	"DBName" : "Novo nome do banco de dados" Não necessario
}
```
## Autenticação
||
|-----|
| Autenticação ainda está em desenvolvimento !!!!|
