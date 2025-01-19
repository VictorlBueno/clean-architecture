import {Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, Put, Query} from "@nestjs/common";
import {SignupDto} from "@/infrastructure/dtos/users/signup.dto";
import {UpdateUserDto} from "@/infrastructure/dtos/users/update-user.dto";
import {SignupUseCase} from "@/application/usecases/users/signup.usecase";
import {SigninUseCase} from "@/application/usecases/users/signin.usecase";
import {UpdatePasswordUseCase} from "@/application/usecases/users/updatepassword.usecase";
import {UpdateUserUseCase} from "@/application/usecases/users/updateuser.usecase";
import {DeleteUserUseCase} from "@/application/usecases/users/deleteUserUseCase";
import {SigninDto} from "@/infrastructure/dtos/users/signin.dto";
import {ListUsersDto} from "@/infrastructure/dtos/users/list-users.dto";
import {UpdatePasswordDto} from "@/infrastructure/dtos/users/update-password.dto";
import {GetUserUseCase} from "@/application/usecases/users/getUserUseCase";
import {ListUsersUseCase} from "@/application/usecases/users/listUsersUseCase";

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

    @Inject(GetUserUseCase.UseCase)
    private getUserUseCase: GetUserUseCase.UseCase;

    @Inject(ListUsersUseCase.UseCase)
    private listUsersUseCase: ListUsersUseCase.UseCase;

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
        return this.listUsersUseCase.execute(searchParams);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.getUserUseCase.execute({id});
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.updateUserUseCase.execute({id, ...updateUserDto});
    }

    @Patch(":id")
    async updatePassword(
        @Param("id") id: string,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ) {
        return this.updatePasswordUseCase.execute({id, ...updatePasswordDto});
    }

    @HttpCode(204)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        await this.deleteUserUseCase.execute({id});
    }
}