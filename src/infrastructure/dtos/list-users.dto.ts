import {ListUsersUsecase} from "@/application/usecases/users/listusers.usecase";
import {SortDirection} from "@/domain/shared/repositories/searchable-repository-contracts";

export class ListUsersDto implements ListUsersUsecase.Input {
    page?: number;
    perPage?: number;
    sort?: string;
    sortDir?: SortDirection;
    filter?: string;
}