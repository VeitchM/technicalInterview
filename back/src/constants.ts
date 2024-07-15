require('dotenv').config();

export const constants = {
  database: {
    server: process.env.DB_HOST, 
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  },

};
