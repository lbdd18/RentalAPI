import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  await connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
    values('${uuid()}', 'Luciano', 'luciano@email.com', 'AA-DD-14' , '${await hash(
    'mypass',
    8
  )}', true, 'now()')
  `);
}

create().then(() => console.log('User admin created!'));
