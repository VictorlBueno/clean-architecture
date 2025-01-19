import {BadRequestError} from "@/application/shared/errors/bad-request-error";
import {UserRepository} from "@/domain/repositories/user.repository";
import {HashProvider} from "@/application/shared/providers/hash-provider";
import {UserOutput, UserOutputMapper} from "@/application/dtos/users/user-output";
import {UseCase as DefaultUseCase} from "@/application/shared/usecases/use-case";
import {InvalidCredentialsError} from "@/application/shared/errors/invalid-credentials-error";

export namespace SigninUseCase {
    export type Input = {
        email: string;
        password: string;
    }

    export type Output = UserOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private userRepository: UserRepository.Repository,
            private hashProvider: HashProvider,
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const {email, password} = input;

            if (!email || !password) {
                throw new BadRequestError("Input data not provided");
            }

            const entity = await this.userRepository.findByEmail(email);

            const hashPasswordMatches = await this.hashProvider.compareHash(
                password,
                entity.password,
            );

            if (!hashPasswordMatches) {
                throw new InvalidCredentialsError("Invalid credentials");
            }

            return UserOutputMapper.toOutput(entity);
        }
    }
}