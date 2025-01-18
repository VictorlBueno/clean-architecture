import {Entity} from "@/domain/shared/entities/entity";
import {SearchableRepositoryInterface} from "@/domain/shared/repositories/searchable-repository-contracts";
import {InMemoryRepository} from "@/domain/shared/repositories/in-memory.repository";

export abstract class InMemorySearchableRepository<E extends Entity>
    extends InMemoryRepository<E>
    implements SearchableRepositoryInterface<E, any, any> {

    search(props: any): Promise<any> {
        return Promise.resolve(undefined);
    }
}