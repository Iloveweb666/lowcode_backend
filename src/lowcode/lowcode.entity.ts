import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lowcodePage')
export class LowcodePageEntity {
  @PrimaryGeneratedColumn()
  page_id: number; // 标记为主列，值自动生成

  @Column('text')
  nodes: string;

  @Column('text')
  importedApis: string;

  @Column({ length: '20', default: '' })
  create_user: string;

  @Column({ length: '20', default: '' })
  update_user: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
