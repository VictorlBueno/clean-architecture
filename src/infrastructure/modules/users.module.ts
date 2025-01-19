import {Module} from "@nestjs/common";
import {SignupUseCase} from "@/application/usecases/users/signup.usecase";
import {
    UserInMemoryRepository,
} from "@/infrastructure/repositories/database/in-memory/repositories/user-in-memory.repository";
import {BcryptjsHashProvider} from "@/infrastructure/providers/hash-provider/bcryptjs-hash.provider";
import {UserRepository} from "@/domain/repositories/user.repository";

@Module({
    controllers: [],
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
    ],
})

export class UsersModule {
}
