import { BadRequestException, Body, Controller, Delete, Get, Inject, Patch, Post, Query } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { ICategory } from '../../../domain/interfaces'
import { BaseException } from '../../../infrastructure/libs/exceptions'
import { BaseApiErrorResponse } from '../../../infrastructure/libs/exceptions/decorators/base-api-error-response.decorator'
import { ShadowAgent } from '../../../infrastructure/libs/shadow-agent/decorators/shadow-agent.decorator'
import { GetShadowAgentModel } from '../../../infrastructure/libs/shadow-agent/models'
import { CATEGORY_USECASE } from '../../providers/category.provider'
import { externalsRoutes } from '../routes'

import { CreateDto } from './dtos/create.dto'
import { DeleteDto } from './dtos/delete.dto'
import { GetManyDto } from './dtos/get-many.dto'
import { GetOneDto } from './dtos/get-one.dto'
import { PartialUpdateDto } from './dtos/partial-update.dto'
import { CreatePresenter } from './presenters/create.presenter'
import { DeletePresenter } from './presenters/delete.presenter'
import { GetManyPresenter } from './presenters/get-many.presenter'
import { GetOnePresenter } from './presenters/get-one.presenter'
import { PartialUpdatePresenter } from './presenters/partial-update.presenter'

@Controller(externalsRoutes.msInfo.prefixes.category)
export class CategoryController {
  public constructor(
    @Inject(CATEGORY_USECASE)
    private readonly _categoryUsecase: ICategory,
  ) {}

  @Post(externalsRoutes.methods.category.create)
  @ApiOperation({
    description: 'Create category',
  })
  @ApiBody({
    required: true,
    type: CreateDto,
  })
  @ApiCreatedResponse({ type: CreatePresenter })
  @ApiResponse(BaseException.categorySchema.SLUG_ALREADY_EXIST)
  @BaseApiErrorResponse()
  public async create(
    @ShadowAgent() shadowData: GetShadowAgentModel,
    @Body() createData: CreateDto,
  ): Promise<CreatePresenter | BadRequestException> {
    const result = await this._categoryUsecase.createCategory(createData)

    if (result instanceof BaseException) {
      return BaseException.createError(result, shadowData.userLanguage)
    }

    return new CreatePresenter(result)
  }

  @Get(externalsRoutes.methods.category.getOne)
  @ApiOperation({
    description: 'Get one category',
  })
  @ApiOkResponse({ type: GetOnePresenter })
  @ApiResponse(BaseException.commonSchema.BAD_REQUEST)
  @ApiResponse(BaseException.categorySchema.CATEGORY_IS_NOT_FOUND)
  @BaseApiErrorResponse()
  public async getOne(
    @ShadowAgent() shadowData: GetShadowAgentModel,
    @Query() getOneData: GetOneDto,
  ): Promise<GetOnePresenter | BadRequestException> {
    const result = await this._categoryUsecase.getOne(getOneData)

    if (result instanceof BaseException) {
      return BaseException.createError(result, shadowData.userLanguage)
    }

    return new GetOnePresenter(result)
  }

  @Get(externalsRoutes.methods.category.getMany)
  @ApiOperation({
    description: 'Get many category',
  })
  @ApiOkResponse({ type: GetManyPresenter })
  @BaseApiErrorResponse()
  public async getMany(
    @ShadowAgent() shadowData: GetShadowAgentModel,
    @Query() getManyData: GetManyDto,
  ): Promise<GetManyPresenter | BadRequestException> {
    const result = await this._categoryUsecase.getMany(getManyData)

    if (result instanceof BaseException) {
      return BaseException.createError(result, shadowData.userLanguage)
    }

    return result
  }

  @Patch(externalsRoutes.methods.category.partialUpdate)
  @ApiOperation({
    description: 'Partial update category',
  })
  @ApiBody({
    type: PartialUpdateDto,
  })
  @ApiOkResponse({ type: PartialUpdatePresenter })
  @ApiResponse(BaseException.categorySchema.SLUG_ALREADY_EXIST)
  @ApiResponse(BaseException.categorySchema.CATEGORY_IS_NOT_FOUND)
  @BaseApiErrorResponse()
  public async partialUpdate(
    @ShadowAgent() shadowData: GetShadowAgentModel,
    @Body() partialUpdateData: PartialUpdateDto,
  ): Promise<PartialUpdatePresenter | BadRequestException> {
    const result = await this._categoryUsecase.partialUpdate(partialUpdateData)

    if (result instanceof BaseException) {
      return BaseException.createError(result, shadowData.userLanguage)
    }

    return new PartialUpdatePresenter(result)
  }

  @Delete(externalsRoutes.methods.category.delete)
  @ApiOperation({
    description: 'Delete category',
  })
  @ApiBody({
    type: DeleteDto,
  })
  @ApiResponse(BaseException.categorySchema.CATEGORY_IS_NOT_FOUND)
  @ApiOkResponse({ type: DeletePresenter })
  @BaseApiErrorResponse()
  public async delete(
    @ShadowAgent() shadowData: GetShadowAgentModel,
    @Body() deleteData: DeleteDto,
  ): Promise<DeletePresenter | BadRequestException> {
    const result = await this._categoryUsecase.delete(deleteData)

    if (result instanceof BaseException) {
      return BaseException.createError(result, shadowData.userLanguage)
    }

    return new DeletePresenter(result)
  }
}
