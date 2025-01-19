import {ListUsersUseCase} from "@/application/usecases/users/listUsersUseCase";
import {SortDirection} from "@/domain/shared/repositories/searchable-repository-contracts";

export class ListUsersDto implements ListUsersUseCase.Input {
    page?: number;
    perPage?: number;
    sort?: string;
    sortDir?: SortDirection;
    filter?: string;
}