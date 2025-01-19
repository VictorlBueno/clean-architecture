import {UserRepository} from "@/domain/repositories/user.repository";
import {UserOutput} from "@/application/dtos/users/user-output";

export namespace GetuserUsecase {
    export type Input = {
        id: string;
    }

    export type Output = UserOutput;

    export class UseCase {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = await this.userRepository.findById(input.id);

            return entity.toJSON();
        }
    }
}