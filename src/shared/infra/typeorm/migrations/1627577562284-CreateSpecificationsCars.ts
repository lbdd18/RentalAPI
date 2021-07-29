import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateSpecificationsCars1627577562284
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'specifications_cars',
                columns: [
                    {
                        name: 'car_id',
                        type: 'uuid',
                    },
                    {
                        name: 'specification_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ],
            })
        );

        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'FK_spefications_cars_specification_id_specifcations_id',
                referencedTableName: 'specifications',
                referencedColumnNames: ['id'],
                columnNames: ['specification_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'FK_spefications_cars_car_id_cars_id',
                referencedTableName: 'cars',
                referencedColumnNames: ['id'],
                columnNames: ['car_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'spefications_cars',
            'FK_spefications_cars_specification_id_specifcations_id'
        );
        await queryRunner.dropForeignKey(
            'spefications_cars',
            'FK_spefications_cars_car_id_cars_id'
        );
        await queryRunner.dropTable('spefications_cars');
    }
}
