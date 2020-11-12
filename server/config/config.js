//======================
//       Puerto
//======================
process.env.PORT = process.env.PORT || 3000;
//======================
//       Entorno
//======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//======================
// Vencimiento del Token
//======================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//======================
// Semilla del token
//======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';
//======================
//       DataBase
//======================
let urlDb;
if (process.env.NODE_ENV == 'dev') {
    urlDb = 'mongodb://localhost:27017/cafe';
} else {
    urlDb = process.env.MONGO_URI;
}
process.env.URLDB = urlDb;