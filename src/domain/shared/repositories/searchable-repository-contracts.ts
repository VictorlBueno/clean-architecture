import {Entity} from "@/domain/shared/entities/entity";
import {RepositoryInterface} from "@/domain/shared/repositories/repository-contracts";

export interface SearchableRepositoryInterface<
    E extends Entity,
    SearchInput,
    SearchOutput,
> extends RepositoryInterface<E> {
    search(props: SearchInput): Promise<SearchOutput>;
}