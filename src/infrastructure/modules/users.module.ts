import {Module} from "@nestjs/common";
import {SignupUseCase} from "@/application/usecases/users/signup.usecase";
import {BcryptjsHashProvider} from "@/infrastructure/providers/hash-provider/bcryptjs-hash.provider";
import {UserRepository} from "@/domain/repositories/user.repository";
import {SigninUseCase} from "@/application/usecases/users/signin.usecase";
import {GetUserUseCase} from "@/application/usecases/users/getUserUseCase";
import {ListUsersUseCase} from "@/application/usecases/users/listUsersUseCase";
import {UpdateUserUseCase} from "@/application/usecases/users/updateuser.usecase";
import {UpdatePasswordUseCase} from "@/application/usecases/users/updatepassword.usecase";
import {DeleteUserUseCase} from "@/application/usecases/users/deleteUserUseCase";
import {UsersController} from "@/infrastructure/controllers/users.controller";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";
import {UserPrismaRepository} from "@/infrastructure/repositories/database/prisma/user-prisma.repository";

@Module({
    controllers: [UsersController],
    providers: [
        {
            provide: "UserRepository",
            useFactory: (prismaService: PrismaService) => {
                return new UserPrismaRepository(prismaService);
            },
            inject: [PrismaService],
        },
        {
            provide: "HashProvider",  // nome a ser usado.
            useClass: BcryptjsHashProvider, // classe a ser usada
        },
        {
            provide: "PrismaService",
            useClass: PrismaService,
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
            provide: GetUserUseCase.UseCase,
            useFactory: (
                userRepository: UserRepository.Repository,
            ) => {
                return new GetUserUseCase.UseCase(userRepository);
            },
            inject: ["UserRepository"],
        },
        {
            provide: ListUsersUseCase.UseCase,
            useFactory: (
                userRepository: UserRepository.Repository,
            ) => {
                return new ListUsersUseCase.UseCase(userRepository);
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
