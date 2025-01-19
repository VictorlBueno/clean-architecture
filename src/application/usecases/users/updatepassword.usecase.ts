import {UserRepository} from "@/domain/repositories/user.repository";
import {UserOutput, UserOutputMapper} from "@/application/dtos/users/user-output";
import {UseCase as DefaultUseCase} from "@/application/shared/usecases/use-case";
import {InvalidPasswordError} from "@/application/shared/errors/invalid-password-error";
import {HashProvider} from "@/application/shared/providers/hash-provider";

export namespace UpdatePasswordUseCase {
    export type Input = {
        id: string;
        password: string;
        oldPassword: string;
    }

    export type Output = UserOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private userRepository: UserRepository.Repository,
            private hashProvider: HashProvider,
        ) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = await this.userRepository.findById(input.id);

            if (!input.password || !input.oldPassword) {
                throw new InvalidPasswordError("Old password and new password is required");
            }

            const checkOldPassword = await this.hashProvider.compareHash(input.oldPassword, entity.password);

            if (!checkOldPassword) {
                throw new InvalidPasswordError("Old password does not match");
            }

            const hashPassword = await this.hashProvider.generateHash(input.password);

            entity.updatePassword(hashPassword);

            await this.userRepository.update(entity);

            return UserOutputMapper.toOutput(entity);
        }
    }
}