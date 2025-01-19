import {SignupUseCase} from "@/application/usecases/users/signup.usecase";

export class SignupDto implements SignupUseCase.Input {
    email: string;
    name: string;
    password: string;
}