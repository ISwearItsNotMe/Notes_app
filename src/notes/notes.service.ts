import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ListFilter } from './entities/filter.entity';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesRepository.save({
      ...createNoteDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll(filter: ListFilter): Promise<Note[]> {
    return this.notesRepository.findBy(filter);
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.notesRepository.findOneById(id);
    if (note == null) {
      throw new NotFoundException('note not found');
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<void> {
    const result = await this.notesRepository.update(id, {
      ...updateNoteDto,
      updatedAt: new Date(),
    });
    if (result.affected == 0) {
      throw new NotFoundException('note not found');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('note not found');
    }
  }
}
