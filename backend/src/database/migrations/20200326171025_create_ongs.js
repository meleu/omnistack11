
exports.up = (knex) => knex.schema.createTable('ongs', (table) => {
  table.string('id').primary();
  table.string('name').notNullable();
  table.string('email').notNullable();
  table.string('whatsapp').notNullable();
  table.string('city').notNullable();
  table.string('state', 2).notNullable();
});

exports.down = (knex) => knex.schema.dropTable('ongs');
