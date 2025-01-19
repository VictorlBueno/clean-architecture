import {SigninUseCase} from "@/application/usecases/users/signin.usecase";

export class SigninDto implements SigninUseCase.Input {
    email: string;
    password: string;
}