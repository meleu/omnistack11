const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const limitPerPage = 5;
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(limitPerPage)
      .offset((page - 1) * limitPerPage)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.state',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    if (!ong_id) {
      return res.status(401).json({ error: 'Missing Authorization header.' });
    }

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    // if (incident.ong_id !== ong_id) {
    //   return res.status(401).json({ error: 'Operation not permitted.' });
    // }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  },
};
