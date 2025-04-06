import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import {CreateUserInput} from './dto/input/create-user-input.dto';
import { GetUserArgs } from './dto/args/get-user-args.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './models/user.schema';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository){}

        async createUser(createUserData: CreateUserInput){
            await this.validateCreateUserData(createUserData);
            const userDocument = await this.usersRepository.create({
                ...createUserData,
                password: await bcrypt.hash(createUserData.password,7),
            });
            return this.toModel(userDocument)
        }

        private async validateCreateUserData(createUserData: CreateUserInput){
            try{
                await this.usersRepository.findOne({username: createUserData.username});
                throw new UnprocessableEntityException("username already exists")
            }
        
        catch(err){

        }
    }
            
    


    async getUser(getUserArgs: GetUserArgs){
        const userDocument = await this.usersRepository.findOne(getUserArgs)
        return this.toModel(userDocument)
    }
    
    private toModel(userDocument: UserDocument): User{
        return{
            _id: userDocument._id.toHexString(),
            username: userDocument.username
        };
    }
}
