import {IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import {UserProps} from "@/domain/entities/user.entity";
import {ClassValidatorFields} from "@/domain/shared/validators/class-validator-fields";

export class UserRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(255)
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    constructor({...userProps}: UserProps) {
        Object.assign(this, userProps);
    }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
    validate(data: UserProps): boolean {
        return super.validate(new UserRules(data ?? {} as UserProps));
    }
}

export class UserValidatorFactory {
    static create(): UserValidator {
        return new UserValidator();
    }
}