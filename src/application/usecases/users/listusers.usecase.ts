import {UserRepository} from "@/domain/repositories/user.repository";
import {UserOutput} from "@/application/dtos/users/user-output";
import {UseCase as DefaultUseCase} from "@/application/shared/usecases/use-case";
import {SearchInput} from "@/application/shared/dtos/search-inputs";

export namespace ListUsersUsecase {
    export type Input = SearchInput;

    export type Output = UserOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const params = new UserRepository.SearchParams(input)

            const searchResult = await this.userRepository.search(params);

            return
        }
    }
}