import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export class BaseEntity {
  private static _baseFields = {
    createdDate: 'createdDate',
    updatedDate: 'updatedDate',
    deletedDate: 'deletedDate',
  }

  @CreateDateColumn({ name: 'created_date', type: 'timestamp', nullable: false })
  public createdDate: Date

  @UpdateDateColumn({ name: 'updated_date', type: 'timestamp', nullable: true })
  public updatedDate?: Date

  @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp', nullable: true })
  public deletedDate?: Date

  protected static get getAllBaseFieldsName(): Record<keyof BaseEntity, string> {
    return BaseEntity._baseFields
  }

  protected static getBaseFieldsName(alias: string): Record<keyof BaseEntity, string> {
    return {
      createdDate: `${alias}.${BaseEntity._baseFields.createdDate}`,
      updatedDate: `${alias}.${BaseEntity._baseFields.updatedDate}`,
      deletedDate: `${alias}.${BaseEntity._baseFields.deletedDate}`,
    }
  }
}
