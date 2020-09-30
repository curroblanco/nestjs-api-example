import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/auth.decorator';
  import { UserDTO } from './user.dto';
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Get()
    async getAllUsers(): Promise<UserDTO[]> {
      return await this.usersService.getAllUsers();
    }
  
    @Get('/me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getUserById(@Auth() { id }: UserDTO): Promise<UserDTO> {
        return await this.usersService.getUserById(id);
    }
  
    @Post()
    async newUser(@Body() user: UserDTO): Promise<UserDTO> {
      return await this.usersService.newUser(user);
    }
  
    @Put()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async updateUser(
      @Request() req: any,
      @Body() user: UserDTO
    ): Promise<UserDTO> {
      const { id } = req.user;
      return await this.usersService.updateUser(id, user);
    }
  
    @Delete()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@Request() req: any): Promise<void> {
      const { id } = req.user;
      return await this.usersService.deleteUser(id);
    }
  }