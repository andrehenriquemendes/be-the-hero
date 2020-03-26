const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        /* Paginação */
        //      se o parametro page n existir na query -> por padrao sera 1
        const { page = 1 } = request.query;
        
        // Conta o numero de Resultados (incidents) encontrados
        const [count] = await connection('incidents').count();

        // Paginação
        //      limit(5) -> 5 resultados p pagina
        //      offset() -> pula de 5 em 5 de acordo com 'page' atual
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        // E retorna o count para o header    
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        // Para identificar qual a ONG esta criando um Incident, precisamos de uma autenticacao
        // Ela nao eh feita pelo body, mas sim pelo header, utilizando o id
        //      ** authorization => eh o nome do header utilizado no Insomnia
        const ong_id = request.headers.authorization;
        
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        // 24/03 1:14:00
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        // Se a ong logada quiser excluir um incident de outra ong -> retorn 401 (nao autorizado)
        if(incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();
        
        // Status 204 -> resposta que deu sucesso, mas nao tem conteudo
        // send() -> envia resposta sem corpo nenhum  
        return response.status(204).send();
    }
};