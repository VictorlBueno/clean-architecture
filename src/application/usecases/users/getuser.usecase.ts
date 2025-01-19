import {UserRepository} from "@/domain/repositories/user.repository";

export namespace GetuserUsecase {
    export type Input = {
        id: string;
    }

    export type Output = {
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
    }

    export class UseCase {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = await this.userRepository.findById(input.id);

            return entity.toJSON();
        }
    }
}