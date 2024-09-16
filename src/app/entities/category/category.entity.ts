/* eslint-disable import/no-cycle */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from '../base/base.entity'

@Entity({ name: CategoryEntity.tableName })
export class CategoryEntity extends BaseEntity {
  /** @description Название таблицы */
  public static tableName = 'categories'

  private static _fields = {
    id: 'id',
    slug: 'slug',
    name: 'name',
    description: 'description',
    active: 'active',
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ name: 'slug', type: 'varchar', nullable: false, unique: true })
  public slug: string

  @Column({ name: 'name', type: 'varchar', nullable: false })
  public name: string

  @Column({ name: 'description', type: 'varchar', nullable: true })
  public description?: string

  @Column({
    name: 'active',
    type: 'bool',
    nullable: false,
  })
  public active: boolean

  public static getFieldsName(alias: string = CategoryEntity.tableName): Record<keyof CategoryEntity, string> {
    return {
      ...BaseEntity.getBaseFieldsName(alias),
      id: `${alias}.${CategoryEntity._fields.id}`,
      slug: `${alias}.${CategoryEntity._fields.slug}`,
      name: `${alias}.${CategoryEntity._fields.name}`,
      description: `${alias}.${CategoryEntity._fields.description}`,
      active: `${alias}.${CategoryEntity._fields.active}`,
    }
  }
}
