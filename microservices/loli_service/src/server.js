const path = require("path");

// MONGOLOID CONNECTION
const mongoose = require("mongoose");
mongoose.connect("mongodb://mongoose_loli_service:27017/loli", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Loli } = require("./models/Loli");

// GRPC
const PROTO_PATH = path.join(__dirname, "./proto/loli.proto");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const loliProto = grpc.loadPackageDefinition(packageDefinition).loli;

// LOLISERVICE IMPLEMENTATIONS
const addLoli = async (call, callback) => {
  var loli = await new Loli(call.request).save();
  loli.__v = undefined;
  callback(null, loli);
};

const getLoli = async (call, callback) => {
  const loli = await Loli.findOne(call.request);
  loli.__v = undefined;
  callback(null, loli);
};

const getLolis = async (call, callback) => {
  const lolis = await Loli.find({});
  callback(null, { lolis });
};

const updateLoli = async (call, callback) => {
  const updatedLoli = await Loli.findByIdAndUpdate(
    call.request._id,
    {
      firstName: call.request.firstName,
      lastName: call.request.lastName,
      age: call.request.age,
      isLewded: call.request.isLewded,
    },
    { new: true }
  );

  callback(null, updatedLoli);
};

const deleteLoli = async (call, callback) => {
  console.log(call.request);

  await Loli.findByIdAndDelete(call.request._id);

  callback(null, { message: "Deleted Successfully" });
};

const server = new grpc.Server();

server.addService(loliProto.LoliService.service, {
  addLoli,
  getLoli,
  getLolis,
  updateLoli,
  deleteLoli,
});

server.bindAsync("0.0.0.0:40000", grpc.credentials.createInsecure(), () => {
  console.log("LOLI SERVICE STARTED ON 0.0.0.0:40000");
  server.start();
});
