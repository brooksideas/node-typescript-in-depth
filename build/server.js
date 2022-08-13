"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const AuthorRouter_1 = __importDefault(require("./routes/AuthorRouter"));
const BookRouter_1 = __importDefault(require("./routes/BookRouter"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const FlowerRouter_1 = __importDefault(require("./routes/FlowerRouter"));
const CustomerRouter_1 = __importDefault(require("./routes/CustomerRouter"));
const router = (0, express_1.default)();
/** Connect to Mongo config.mongo.url*/
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('Mongo connected successfully.');
    StartServer();
})
    .catch((error) => Logging_1.default.error(error));
/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging_1.default.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the res */
            Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/authors', AuthorRouter_1.default);
    router.use('/books', BookRouter_1.default);
    router.use('/users', UserRouter_1.default);
    router.use('/flowers', FlowerRouter_1.default);
    router.use('/customers', CustomerRouter_1.default);
    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ health: 'API Health is Good!' }));
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        res.status(404).json({
            message: error.message
        });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
};
//# sourceMappingURL=server.js.map