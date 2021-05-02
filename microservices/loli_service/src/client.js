const path = require("path");

const PROTO_PATH = path.join(__dirname, "./proto/loli.proto");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const loliProto = grpc.loadPackageDefinition(packageDefinition).loli;

const client = new loliProto.LoliService(
  "0.0.0.0:40000",
  grpc.credentials.createInsecure()
);

// const l = {
//   id: 1,
//   firstName: "Marisa",
//   lastName: "Kirisame",
//   age: 14,
//   isLewded: false,
// };

// client.addLoli(l, (err, loli) => {
//   console.log(loli);
// });

// client.getLolis(null, (err, lolis) => {
//   console.log(lolis);
// });

module.exports = { client };
