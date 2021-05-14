import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CoffeeService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwrek Roast',
      brand: 'Buddy Brew',
      flavours: ['chocolate, vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  fincOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      return new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  createCoffee(dto: any) {
    this.coffees.push(dto);
    return dto;
  }

  update(id: string, updateCoffeeDTO: UpdateCoffeeDto) {
    const existingCoffee = this.fincOne(id);
    if (existingCoffee) {
      // update the existing coffee
      existingCoffee.name = updateCoffeeDTO.name;
    }
    console.log(existingCoffee);
  }

  remove(id: string) {
    const index = this.coffees.findIndex((item) => item.id === +id);
    if (index >= 0) {
      this.coffees.splice(index, 1);
    }
  }
}
