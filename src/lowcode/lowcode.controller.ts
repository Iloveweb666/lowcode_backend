import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LowcodeService } from './lowcode.service';

@Controller('lowcode')
export class LowcodeController {
  constructor(private readonly lowcodeService: LowcodeService) {}

  // 兼容旧风格：POST /api/lowcode/createProject
  @Post('createProject')
  async createProjectAlias(
    @Body('pageData') pageData: PageData,
    @Body('createUser') createUser?: string,
  ) {
    return this.lowcodeService.createProject(pageData, createUser);
  }

  @Post('getProjectList')
  async getProjectList(
    @Body('pageNum') pageNum: number,
    @Body('pageSize') pageSize: number,
  ) {
    return this.lowcodeService.getProjectList(pageNum, pageSize);
  }

  // // REST 创建项目：POST /api/lowcode/projects
  // @Post('projects')
  // async createProject(
  //   @Body('pageData') pageData: PageData,
  //   @Body('createUser') createUser?: string,
  // ) {
  //   return this.lowcodeService.createProject(pageData, createUser);
  // }

  // // REST 保存项目：PUT /api/lowcode/projects/:id
  // @Put('projects/:id')
  // async saveProject(
  //   @Param('id') id: number,
  //   @Body('pageData') pageData: PageData,
  //   @Body('updateUser') updateUser?: string,
  // ) {
  //   return this.lowcodeService.saveProject(Number(id), pageData, updateUser);
  // }

  // // REST 获取项目：GET /api/lowcode/projects/:id
  // @Get('projects/:id')
  // async getProject(@Param('id') id: number) {
  //   return this.lowcodeService.getProject(Number(id));
  // }

  // // REST 删除项目：DELETE /api/lowcode/projects/:id
  // @Delete('projects/:id')
  // async deleteProject(@Param('id') id: number) {
  //   return this.lowcodeService.deleteProject(Number(id));
  // }

  // REST 分页列表：GET /api/lowcode/projects?page=&pageSize=
  // @Get('projects')
  // async getProjectList(
  //   @Query('page') page = 1,
  //   @Query('pageSize') pageSize = 10,
  // ) {
  //   return this.lowcodeService.getProjectList(Number(page), Number(pageSize));
  // }
}
