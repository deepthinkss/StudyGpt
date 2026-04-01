import pool from "../config/pool.js"

export async function createUser(name, email, hashedPass){
    const query = "insert into users(name, email, password) values($1, $2, $3) returning name, email"
    const res = await pool.query(query, [name, email, hashedPass])

    return res.rows[0]

}

export async function getUserByEmail(email){
    const query = "select * from users where email = $1"
    const res = await pool.query(query, [email])

    return res.rows[0]
}