import { DataSource } from 'typeorm';
import { User } from './src/password-reset/user.entity'; // Adjust path as needed
import 'reflect-metadata';

export default new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User],
  migrations: ['src/migrations/*.ts'], // Adjust path to match your migrations folder
  synchronize: false, // Use migrations instead of synchronize in production
});
