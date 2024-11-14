import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class ClientTable1731422100037 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'clients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.addColumn(
            'invoices',
            new TableColumn({
                name: 'client_id',
                type: 'uuid',
                isNullable: false,
            }),
        );

        await queryRunner.createForeignKey(
            'invoices',
            new TableForeignKey({
                columnNames: ['client_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'clients',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('invoices');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('client_id') !== -1);
        await queryRunner.dropForeignKey('invoices', foreignKey);
        await queryRunner.dropColumn('invoices', 'client_id');

        await queryRunner.dropTable('clients');
    }
}