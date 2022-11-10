import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Category } from '../entities/note.entity';

export class CreateNoteDto {
  @ApiProperty({ example: 'newTitle' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'newContent' })
  @IsNotEmpty()
  content: string;
  
  @ApiProperty({ example: 'newAuthor' })
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: Category.PUBLIC })
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category

  constructor(
    title: string,
    content: string,
    author: string,
    category: Category,
  ) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.category = category;
  }
}
