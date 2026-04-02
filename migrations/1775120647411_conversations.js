exports.up = (pgm) => {
    pgm.createTable("conversations", {
        id: {
            type : 'uuid',
            notNull : true,
            primaryKey: true,
            default: pgm.func('gen_random_uuid()')
        },
        user_id: {
            type: 'uuid',
            references: 'users(id)',
            notNull : true
        },
        messages: {
            type: 'JSONB',
            notNull : true
        },
        subject: { 
            type: 'varchar(64)',
            notNull : true
        },
        created_at: {
            type: 'timestamp',
            notNull : true,
            default: pgm.func('current_timestamp')
        }
    })
}

exports.down = (pgm)=>{
    pgm.dropTable('conversations')
}