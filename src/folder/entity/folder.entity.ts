import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { File } from '../../file/entity/file.entity';

@Entity({ schema: 'cocrafter', name: 'folder' })
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => File, (file) => file.folder, { cascade: true })
  files: File[];
}
