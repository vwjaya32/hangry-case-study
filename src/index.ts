import { config } from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import http from 'http';

config();
// Connect to Database
const uri = process.env.DB_URL;
if (!uri) {
    throw new Error('URL Database tidak ditemukan');
}

const db = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDB() {
    try {
      await db.connect();
      await db.db("admin").command({ ping: 1 });
      console.log("Database telah terhubung");
    } finally {
      await db.close();
    }
}
connectToDB();


const requestListener = (
    request: http.IncomingMessage, 
    response: http.ServerResponse): void => {
    response.setHeader('Content-Type', 'text/plain');
    response.statusCode = 200;
    response.end('Selamat Datang');
};

const server = http.createServer(requestListener);
 
const port: number = parseInt(process.env.PORT ?? '5001', 10);
const host: string = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});