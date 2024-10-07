import { Client, Account, Databases } from 'appwrite';

// Configurando o cliente Appwrite
const client = new Client();

client
  .setEndpoint('') // URL do seu Appwrite
  .setProject(''); // ID do seu projeto

// Inicializando Account e Database
const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
