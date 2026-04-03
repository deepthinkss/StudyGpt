exports.up = (pgm) => {
  pgm.createTable('chunks', {
    id: {
      type: 'uuid',
      notNull: true,
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
     content: {
      type: 'TEXT',
      notNull: true,
    },
    vector: {
      type: 'vector(768)',
      notNull: true,
      unique: true
    },
    source: {
      type: 'varchar(256)',
      notNull: true,
    },
    chunk_type: {
        type: 'varchar(64)',
        notNull: true
    },
    subject: {
        type: 'varchar(64)',
        notNull: true
    },
    metadata: {
        type : 'JSONB',
        notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('chunks');
};