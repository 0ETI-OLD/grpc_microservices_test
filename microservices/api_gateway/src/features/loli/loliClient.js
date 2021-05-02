const path = require("path");

const PROTO_PATH = path.join(__dirname, "../../proto/loli.proto");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const loliProto = grpc.loadPackageDefinition(packageDefinition).loli;

const loliClient = new loliProto.LoliService(
  "loli_service:40000",
  grpc.credentials.createInsecure()
);

module.exports = { loliClient };
