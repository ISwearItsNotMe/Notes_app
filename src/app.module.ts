import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    NotesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3300,
      username: 'root',
      password: '*****', // need to change this line
      database: 'note',
      synchronize: true,
      autoLoadEntities: true,
    }),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/messaging'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
