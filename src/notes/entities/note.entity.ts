import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

type NoteProperties = Required<Note>;
export enum Category {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  FAMILY = 'FAMILY',
}

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    public id?: number;
    
    @Column()
    public title?: string;

    @Column()
    public content?: string;
    
    @Column()
    public author?: string

    @Column({
        type: 'enum',
        enum: Category,
        default: Category.PUBLIC,
    })
    public category: Category = Category.PUBLIC;

    @Column()
    public createdAt: Date = new Date();
    
    @Column()
    public updatedAt: Date = new Date();

    public static fromProperties(value: NoteProperties): Note {
        const note = new Note();
        note.id = value.id;
        note.title = value.title;
        note.content = value.content;
        note.author = value.author;
        note.category = value.category;
        note.createdAt = value.createdAt;
        note.updatedAt = value.updatedAt;
        return note;
    }
}
