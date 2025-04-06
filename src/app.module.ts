import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {ConfigModule} from '@nestjs/config'
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,}), GraphQLModule.forRoot<ApolloDriverConfig>
    ({autoSchemaFile:true, driver: ApolloDriver}),UsersModule, DatabaseModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
