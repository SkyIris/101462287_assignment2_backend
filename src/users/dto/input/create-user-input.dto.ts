import {Field, InputType} from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput{
    @Field()
    readonly username: string;

    @Field()
    @IsNotEmpty()
    readonly password: string;
}