const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

//      ** o programa deve esperar a operacao connection('ongs')... para entao prosseguir com a execucao
module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        // os campos preenchidos no JSON sao repassados a seus respectivos campos na aplicacao
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};