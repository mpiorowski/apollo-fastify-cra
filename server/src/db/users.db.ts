import { Pool } from "pg";
import { User } from "../../../@types/users.types";

export async function findUserByEmail(email: string): Promise<User> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `select * from sys_users where email = '${email}'`;
    const res = await client.query(queryText);
    await client.query("COMMIT");
    return res.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function addUser(user: User): Promise<User> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "insert into sys_users (name, email, email_verified, image) values ($1, $2, $3, $4) returning *";
    const res = await client.query(queryText, [user.name, user.email, user.email_verified, user.image]);
    await client.query("COMMIT");
    return res.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function editUser(user: User): Promise<User> {
  const pool = new Pool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "update sys_users set name = $1, email = $2, email_verified = $3, image = $4 returning *";
    const res = await client.query(queryText, [user.name, user.email, user.email_verified, user.image]);
    await client.query("COMMIT");
    return res.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
