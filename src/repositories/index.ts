import { Pool } from 'pg';

export const schema = 'project0';

export const connectionPool: Pool = new Pool({
    user: process.env['DBEAVER_USERNAME'],
    host: process.env['DBEAVER_HOST'],
    database: process.env['DBEAVER_DATABASE'],
    password: process.env['DBEAVER_PASSWORD'],
    port: 5432,
    max: 5,
});