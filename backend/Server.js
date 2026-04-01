import "dotenv/config"
import pool from "./src/config/pool.js"
import app from "./src/App.js"

const port = process.env.PORT || 3000

try
{
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows[0])

    app.listen(port, ()=>{
    console.log(`listening on port ${port}`)})
}

catch(err){
    console.log(err)
    process.exit(1)
}