import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import {User} from './models/user.model';
import {UserSchema} from './models/user.schema';
import {MongooseModule} from '@nestjs/mongoose';
import { UsersRepository } from './users.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{name:User.name, schema: UserSchema}])],
  providers: [UsersResolver, UsersService, UsersRepository]
})
export class UsersModule {}
