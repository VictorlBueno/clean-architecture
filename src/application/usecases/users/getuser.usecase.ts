import {UserRepository} from "@/domain/repositories/user.repository";
import {UserOutput, UserOutputMapper} from "@/application/dtos/users/user-output";
import {UseCase as DefaultUseCase} from "@/application/shared/usecases/use-case";

export namespace GetUserUsecase {
    export type Input = {
        id: string;
    }

    export type Output = UserOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = await this.userRepository.findById(input.id);

            return UserOutputMapper.toOutput(entity);
        }
    }
}