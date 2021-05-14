import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';

@Module({
  imports: [CoffeeModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password123A",
    database: "postgres",
    autoLoadEntities: true,
    synchronize: true // disable this on production  
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
