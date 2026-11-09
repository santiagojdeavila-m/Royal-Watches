const bcrypt = require("bcrypt");

const RONDAS = 10;

async function hashearPassword(passwordPlano) {
    return await bcrypt.hash(passwordPlano, RONDAS);
}

async function compararPassword(passwordPlano, hashGuardado) {
    return await bcrypt.compare(passwordPlano, hashGuardado);
}

module.exports = { hashearPassword, compararPassword };