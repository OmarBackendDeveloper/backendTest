# AIMAGE - TEST Backend

## Descrizione

Questo progetto è la parte backend di un'applicazione di autenticazione con registrazione e login, utilizzando Node.js con Express. L'applicazione si connette a un database MongoDB e utilizza JWT per l'autenticazione.

## Prerequisiti

- Node.js
- MongoDB

## Installazione

### Clona la Repository

git clone https://github.com/OmarBackendDeveloper/backendTest.git
cd backendTest


### Configurazione delle Variabili d'Ambiente

Crea un file `.env` nella root del progetto e aggiungi le seguenti variabili d'ambiente:

MONGO_URI=mongodb+srv://moukassi1998:abc1234@cluster001.w5s1w2r.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0
PORT=3080


### Installazione delle Dipendenze

npm install


### Avvio del Server Backend

npm start


Il server backend sarà disponibile all'indirizzo [http://localhost:3080](http://localhost:3080).

## Endpoint del Backend

- **POST /register**: Registra o aggiorna un utente.
- **POST /auth**: Autentica un utente e restituisce un token JWT.
- **POST /refresh-token**: Restituisce un nuovo token JWT.
- **GET /data**: Restituisce la lista di tutti gli utenti (protetto da autenticazione JWT).
- **GET /export**: Esporta i dati degli utenti (protetto da autenticazione JWT).

## Tecnologie Utilizzate

- **Backend**: Node.js, Express, Mongoose, JWT
- **Database**: MongoDB

