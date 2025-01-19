import {Module} from "@nestjs/common";
import {SignupUseCase} from "@/application/usecases/users/signup.usecase";
import {
    UserInMemoryRepository,
} from "@/infrastructure/repositories/database/in-memory/repositories/user-in-memory.repository";
import {BcryptjsHashProvider} from "@/infrastructure/providers/hash-provider/bcryptjs-hash.provider";
import {UserRepository} from "@/domain/repositories/user.repository";
import {SigninUseCase} from "@/application/usecases/users/signin.usecase";
import {GetUserUsecase} from "@/application/usecases/users/getuser.usecase";
import {ListUsersUsecase} from "@/application/usecases/users/listusers.usecase";
import {UpdateUserUseCase} from "@/application/usecases/users/updateuser.usecase";
import {UpdatePasswordUseCase} from "@/application/usecases/users/updatepassword.usecase";
import {DeleteUserUseCase} from "@/application/usecases/users/deleteUserUseCase";
import {UsersController} from "@/infrastructure/controllers/users.controller";

@Module({
    controllers: [UsersController],
    providers: [
        {
            provide: "UserRepository", // nome a ser usado.
            useClass: UserInMemoryRepository, // classe a ser usada
        },
        {
            provide: "HashProvider",
            useClass: BcryptjsHashProvider,
        },
        {
            provide: SignupUseCase.UseCase,
            useFactory: ( // dependências deste provider
                userRepository: UserRepository.Repository,
                hashProvider: BcryptjsHashProvider,
            ) => {
                return new SignupUseCase.UseCase(userRepository, hashProvider);
            },
            inject: ["UserRepository", "HashProvider"], // qual dos providers deve ser usado
        },
        {
            provide: SigninUseCase.UseCase,
            useFactory: (
                userRepository: UserRepository.Repository,
                hashProvider: BcryptjsHashProvider,
            ) => {
                return new SigninUseCase.UseCase(userRepository, hashProvider);
            },
            inject: ["UserRepository", "HashProvider"],
        },
        {
            provide: GetUserUsecase.UseCase,
            useFactory: (
                userRepository: UserRepository.Repository,
            ) => {
                return new GetUserUsecase.UseCase(userRepository);
            },
            inject: ["UserRepository"],
        },
        {
            provide: ListUsersUsecase.UseCase,
            useFactory: (
                userRepository: UserRepository.Repository,
            ) => {
                return new ListUsersUsecase.UseCase(userRepository);
            },
            inject: ["UserRepository"],
        },
        {
            provide: UpdateUserUseCase.UseCase,
            useFactory: (
                userRepository: UserRepository.Repository,
            ) => {
                return new UpdateUserUseCase.UseCase(userRepository);
            },
            inject: ["UserRepository"],
        },
        {
            provide: UpdatePasswordUseCase.UseCase,
            useFactory: (
                userRepository: UserRepository.Repository,
                hashProvider: BcryptjsHashProvider,
            ) => {
                return new UpdatePasswordUseCase.UseCase(userRepository, hashProvider);
            },
            inject: ["UserRepository", "HashProvider"],
        },
        {
            provide: DeleteUserUseCase.UseCase,
            useFactory: (
                userRepository: UserRepository.Repository,
            ) => {
                return new DeleteUserUseCase.UseCase(userRepository);
            },
            inject: ["UserRepository"],
        },
    ],
})

export class UsersModule {
}
