import { db } from "./src/database/config"
import {build} from "./src/app";

const server = build({
    logger: true
});

const PORT = process.env.APP_PORT || 3001;

server.listen(PORT, '0.0.0.0', (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
    dbConnection();
})

async function dbConnection() {
    await db.sync();
}
