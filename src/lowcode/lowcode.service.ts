import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LowcodePageEntity } from './lowcode.entity';
import { makeResError, makeResSuccess, formatDateTime } from '../../utils';

@Injectable()
export class LowcodeService {
  constructor(
    @InjectRepository(LowcodePageEntity)
    private readonly repo: Repository<LowcodePageEntity>,
  ) {}

  async createProject(pageData: PageData, createUser = '') {
    if (!pageData) {
      return makeResError(-1, '缺少页面数据');
    }
    const entity = this.repo.create({
      nodes: JSON.stringify(pageData.nodes ?? []),
      importedApis: JSON.stringify(pageData.importedApis ?? []),
      create_user: createUser,
      update_user: createUser,
    });
    const saved = await this.repo.save(entity);
    return makeResSuccess({ id: saved.page_id });
  }

  async saveProject(
    projectId: string | number,
    pageData: PageData,
    updateUser = '',
  ) {
    if (!projectId) {
      return makeResError(-1, '缺少项目ID');
    }
    if (!pageData) {
      return makeResError(-1, '缺少页面数据');
    }
    const id =
      typeof projectId === 'string' ? parseInt(projectId, 10) : projectId;
    const exist = await this.repo.findOne({ where: { page_id: id } });
    if (!exist) {
      return makeResError(-1, '项目不存在');
    }
    exist.nodes = JSON.stringify(pageData.nodes ?? []);
    exist.importedApis = JSON.stringify(pageData.importedApis ?? []);
    exist.update_user = updateUser;
    await this.repo.save(exist);
    return makeResSuccess({ id });
  }

  async getProject(projectId: string | number) {
    if (!projectId) {
      return makeResError(-1, '缺少项目ID');
    }
    const id =
      typeof projectId === 'string' ? parseInt(projectId, 10) : projectId;
    const item = await this.repo.findOne({ where: { page_id: id } });
    if (!item) {
      return makeResError(-1, '项目不存在');
    }
    const pageData: PageData = {
      nodes: JSON.parse(item.nodes || '[]'),
      importedApis: JSON.parse(item.importedApis || '[]'),
    } as PageData;
    return makeResSuccess({
      id: item.page_id,
      pageData,
      meta: {
        createUser: item.create_user,
        updateUser: item.update_user,
        createTime: formatDateTime(item.create_time),
        updateTime: formatDateTime(item.update_time),
      },
    });
  }

  async deleteProject(projectId: string | number) {
    if (!projectId) {
      return makeResError(-1, '缺少项目ID');
    }
    const id =
      typeof projectId === 'string' ? parseInt(projectId, 10) : projectId;
    const res = await this.repo.delete({ page_id: id });
    if (!res.affected) {
      return makeResError(-1, '删除失败或项目不存在');
    }
    return makeResSuccess({ id });
  }

  async getProjectList(page = 1, pageSize = 10) {
    const take = Math.max(1, Math.min(100, pageSize));
    const skip = Math.max(0, (Math.max(1, page) - 1) * take);
    const [items, total] = await this.repo.findAndCount({
      select: [
        'page_id',
        'create_user',
        'update_user',
        'create_time',
        'update_time',
      ],
      order: { update_time: 'DESC', page_id: 'DESC' },
      take,
      skip,
    });
    return makeResSuccess({
      total,
      page,
      pageSize: take,
      records: items.map((i) => ({
        id: i.page_id,
        createUser: i.create_user,
        updateUser: i.update_user,
        createTime: formatDateTime(i.create_time),
        updateTime: formatDateTime(i.update_time),
      })),
    });
  }
}
