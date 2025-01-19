import {Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, Put, Query} from "@nestjs/common";
import {SignupDto} from "@/infrastructure/dtos/signup.dto";
import {UpdateUserDto} from "@/infrastructure/dtos/update-user.dto";
import {SignupUseCase} from "@/application/usecases/users/signup.usecase";
import {SigninUseCase} from "@/application/usecases/users/signin.usecase";
import {UpdatePasswordUseCase} from "@/application/usecases/users/updatepassword.usecase";
import {UpdateUserUseCase} from "@/application/usecases/users/updateuser.usecase";
import {DeleteUserUseCase} from "@/application/usecases/users/deleteUserUseCase";
import {ListUsersUsecase} from "@/application/usecases/users/listusers.usecase";
import {GetUserUsecase} from "@/application/usecases/users/getuser.usecase";
import {SigninDto} from "@/infrastructure/dtos/signin.dto";
import {ListUsersDto} from "@/infrastructure/dtos/list-users.dto";
import {UpdatePasswordDto} from "@/infrastructure/dtos/update-password.dto";

@Controller("users")
export class UsersController {
    @Inject(SignupUseCase.UseCase)
    private signupUseCase: SignupUseCase.UseCase;

    @Inject(SigninUseCase.UseCase)
    private signinUseCase: SigninUseCase.UseCase;

    @Inject(UpdateUserUseCase.UseCase)
    private updateUserUseCase: UpdateUserUseCase.UseCase;

    @Inject(UpdatePasswordUseCase.UseCase)
    private updatePasswordUseCase: UpdatePasswordUseCase.UseCase;

    @Inject(DeleteUserUseCase.UseCase)
    private deleteUserUseCase: DeleteUserUseCase.UseCase;

    @Inject(GetUserUsecase.UseCase)
    private getUserUsecase: GetUserUsecase.UseCase;

    @Inject(ListUsersUsecase.UseCase)
    private listUsersUsecase: ListUsersUsecase.UseCase;

    @Post()
    async create(@Body() signupDto: SignupDto) {
        return this.signupUseCase.execute(signupDto);
    }

    @HttpCode(200)
    @Post("login")
    async login(@Body() signinDto: SigninDto) {
        return this.signinUseCase.execute(signinDto);
    }

    @Get()
    async search(@Query() searchParams: ListUsersDto) {
        return this.listUsersUsecase.execute(searchParams);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.getUserUsecase.execute({id});
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.updateUserUseCase.execute({id, ...updateUserDto});
    }


    @Patch(":id")
    async updatePassword(@Param("id") id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.updatePasswordUseCase.execute({id, ...updatePasswordDto});
    }

    @HttpCode(204)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.deleteUserUseCase.execute({id});
    }
}