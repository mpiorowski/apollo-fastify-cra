# apollo-fastify-graphql

### Simple forum with live chat application using:

- fastify
- cra
- apollo graphql with ws
- postgres
- docker

# Deploy

```
sh start-db.sh # run docker database
```
Give it one second to start and then run:
```
sh start-migrate.sh # run migration
```

Run this two commands in two terminals:

```
sh start-back.sh # run backend
```

```
sh start-front.sh # run frontend
```
access: `localhost:3000`  
On development env user is created without authorization, just write your email.  
