import { makeSignature } from "../auth/makeSignature";

const router = require("express").Router();


router.post('/', makeSignature);

export default { router };