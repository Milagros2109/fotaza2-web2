import { Client } from 'pg';
import { dbConfig } from './config.js';

export async function connectDatabase() {
  try {
    const client = new Client(dbConfig);
    await client.connect();
    console.log('Conexión a PostgreSQL exitosa');
    await client.end();
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error);
    throw error;
  }
}