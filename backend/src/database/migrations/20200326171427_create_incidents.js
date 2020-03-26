
exports.up = (knex) => knex.schema.createTable('incidents', (table) => {
  table.increments();

  table.string('title').notNullable();
  table.string('description').notNullable();
  table.string('value').notNullable();

  table.string('ong_id').notNullable();

  table.foreign('ong_id').references('id').inTable('ongs');
});

exports.down = (knex) => knex.schema.dropTable('incidents');
