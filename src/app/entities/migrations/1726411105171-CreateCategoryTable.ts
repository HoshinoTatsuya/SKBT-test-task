import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCategory1726411105171 implements MigrationInterface {
  public name = 'CreateCategory1726411105171'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(`ms-category`, true)

    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },

          {
            name: 'created_date',
            type: 'timestamp',
            isNullable: false,
            default: `now()`,
          },
          {
            name: 'updated_date',
            type: 'timestamp',
            default: `now()`,
          },
          {
            name: 'deleted_date',
            type: 'timestamp',
          },
          {
            name: 'slug',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'character varying',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
          },
        ],
        uniques: [
          {
            name: 'UQ_420d9f679d41281f282f5bc7d09',
            columnNames: ['slug'],
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`)
  }
}
