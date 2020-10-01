import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export default class addAvatarFielToUsers1601508759760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'usuarios',
            new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
        }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('usuarios', 'avatar');
    }

}
