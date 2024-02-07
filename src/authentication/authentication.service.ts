import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from '../dto/CreateUserDto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (
      !createUserDto.firstName ||
      !createUserDto.lastName ||
      !createUserDto.emailAddresses
    ) {
      throw new Error('First name, last name, and email are required');
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(clerkId: string): Promise<User> {
    if (!clerkId) {
      throw new Error('Clerk ID is required');
    }
    return this.userModel.findOne({ clerkId }).exec();
  }

  async updateUser(
    clerkId: string,
    updateUserDto: CreateUserDto,
  ): Promise<User> {
    if (!clerkId) {
      throw new Error('Clerk ID is required');
    }
    if (
      !updateUserDto.firstName ||
      !updateUserDto.lastName ||
      !updateUserDto.emailAddresses
    ) {
      throw new Error('First name, last name, and email are required');
    }
    return this.userModel
      .findOneAndUpdate({ clerkId }, updateUserDto, { new: true })
      .exec();
  }

  async removeUser(clerkId: string): Promise<User> {
    if (!clerkId) {
      throw new Error('Clerk ID is required');
    }
    return this.userModel.findOneAndDelete({ clerkId }).exec();
  }
}
