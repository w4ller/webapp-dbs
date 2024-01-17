enum BlacklistQueryCommandsEnum {
    tables = "SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';",
    selectAllFrom = "SELECT * FROM"
}

export default BlacklistQueryCommandsEnum
