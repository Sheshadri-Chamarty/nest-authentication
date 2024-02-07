import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/CreateUserDto';
import { User } from '../schemas/user.schema';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe({ transform: true })) // Apply validation pipe
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.findAllUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.authService.findUserById(id);
  }

  @Put('users/:id')
  @UsePipes(new ValidationPipe({ transform: true })) // Apply validation pipe
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.authService.removeUser(id);
  }
}
