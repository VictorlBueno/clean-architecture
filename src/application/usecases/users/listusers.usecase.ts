import {UserRepository} from "@/domain/repositories/user.repository";
import {UserOutput, UserOutputMapper} from "@/application/dtos/users/user-output";
import {UseCase as DefaultUseCase} from "@/application/shared/usecases/use-case";
import {SearchInput} from "@/application/shared/dtos/search-inputs";
import {PaginationOutput, PaginationOutputMapper} from "@/application/shared/dtos/pagination-output";

export namespace ListUsersUsecase {
    export type Input = SearchInput;

    export type Output = PaginationOutput<UserOutput>;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const params = new UserRepository.SearchParams(input);

            const searchResult = await this.userRepository.search(params);

            return this.toOutput(searchResult);
        }

        private toOutput(searchResult: UserRepository.SearchResult): Output {
            const items = searchResult.items.map(item => {
                return UserOutputMapper.toOutput(item);
            });

            return PaginationOutputMapper.toOutput(items, searchResult);
        }
    }
}