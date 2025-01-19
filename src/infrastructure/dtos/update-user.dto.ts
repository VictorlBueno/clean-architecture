import {UpdateUserUseCase} from "@/application/usecases/users/updateuser.usecase";

export class UpdateUserDto implements Omit<UpdateUserUseCase.Input, "id"> {
    name: string;
}