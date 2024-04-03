import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Folder } from '../../folder/entity/folder.entity';

@Entity({ schema: 'cocrafter', name: 'file' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('bytea')
  data: Buffer;

  @ManyToOne(() => Folder, (folder) => folder.files)
  @JoinColumn({ name: 'folder_id' })
  folder: Folder;
}
