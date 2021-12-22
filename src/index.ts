import { db } from "./database/config"
import app from "./app";

const PORT = Number(process.env.APP_PORT) || 3001;
app.listen(PORT, () => {
    dbConnection();
})

async function dbConnection() {
    await db.sync();
}
