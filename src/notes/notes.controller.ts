import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { NoteDto } from './dto/note.dto'
import { Category } from './entities/note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The note has been successfully created.',
    type: NoteDto,
  })
  @ApiConflictResponse({
    description: 'Title or content is empty',
  })
  async create(@Body() createNoteDto: CreateNoteDto): Promise<NoteDto> {
    const note = await this.notesService.create(createNoteDto);
    return new NoteDto(note);
  }

  @Get()
  @ApiQuery({
    name: 'category',
    required: false,
  })
  @ApiOkResponse({
    description: 'List of notes',
    type: [NoteDto],
  })
  async findAll(
    @Query('category') category?: Category,
  ): Promise<NoteDto[]> {

    const notes = await this.notesService.findAll({
      category,
    });
    return notes.map((note) => new NoteDto(note));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The note',
    type: NoteDto,
  })
  @ApiNotFoundResponse({
    description: 'Note not found',
  })
  async findOne(@Param('id') id: string): Promise<NoteDto> {
    const note = await this.notesService.findOne(+id);
    return new NoteDto(note);
  }

  @Patch(':id')
  @ApiNoContentResponse({
    description: 'Successful update',
  })
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<void> {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Successful deletion',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.notesService.remove(+id);
  }
}
