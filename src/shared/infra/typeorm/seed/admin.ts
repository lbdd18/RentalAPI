import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid"
import { hash } from "bcryptjs"

async function create() {
  const connection = getConnection();
  await connection.query(`INSERT INTO USERS(id, name, email, password, isAdmin, created_at)
    values('${uuid()}', 'Luciano', 'luciano@email.com' , '${await hash("mypass", 8)}', true, ${new Date()})
  `)
}

create().then(() => console.log("User admin created!"));