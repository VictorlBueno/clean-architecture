import {UpdatePasswordUseCase} from "@/application/usecases/users/updatepassword.usecase";

export class UpdatePasswordDto implements Omit<UpdatePasswordUseCase.Input, "id"> {
    password: string;
    oldPassword: string;
}