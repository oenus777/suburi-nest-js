import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        this.usersService.findAll();        
    }

    @Get(':id')
    async findOne(id: number) {
        this.usersService.findOne(id);
    }

    @Post()
    async create(user: Partial<User>) {
        this.usersService.create(user);
    }

    @Patch(':id')
    async update(id: number, user: Partial<User>) {
        this.usersService.update(id, user);
    }

    @Delete(':id')
    async delete(id: number) {
        this.usersService.delete(id);
    }
}
