import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Note } from '../entities/note.entity';

type NoteProperties = Required<NoteDto>;
export enum Category {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  FAMILY = 'FAMILY',
}

export class NoteDto {
  @ApiProperty()
  id: number;
  @ApiProperty({ example: 'newTitle' })
  title: string;
  @ApiProperty({ example: 'newContent' })
  content: string;
  @ApiProperty({ example: 'newAuthor' })
  author: string;
  @ApiProperty({ enum: Category })
  @IsEnum(Category, { each: true })
  category: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(value: Note) {
    this.id = value.id ?? 0;
    this.title = value.title ?? '';
    this.content = value.content ?? '';
    this.author = value.author ?? '';
    this.category = value.category ?? Category.PUBLIC;
    this.createdAt = value.createdAt ?? new Date();
    this.updatedAt = value.updatedAt ?? new Date();
  }
}
