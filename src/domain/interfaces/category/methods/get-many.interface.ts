import { IBasePagination } from '../../../../infrastructure/libs/paginations/base-pagination.interface'

export interface IGetMany extends IBasePagination {
  sort?: string
  name?: string
  description?: string
  active?: boolean
  search?: string
}
