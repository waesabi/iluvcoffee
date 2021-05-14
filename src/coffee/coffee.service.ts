import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeeService {

  constructor(@InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>) {}

  findAll() {
    return this.coffeeRepository.find()
  }

  async fincOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id)
    if (!coffee) {
      return new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  createCoffee(createCoffeeDTO: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDTO)
    return this.coffeeRepository.save(coffee)
  }

  async update(id: string, updateCoffeeDTO: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDTO
    })
    if(!coffee) {
      return new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.coffeeRepository.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }
}
