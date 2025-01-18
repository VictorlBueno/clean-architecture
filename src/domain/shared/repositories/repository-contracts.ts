import {Entity} from "@/domain/shared/entities/entity";

export interface RepositoryInterface<E extends Entity> {
    insert(E): Promise<void>;

    findById(id: string): Promise<E>;

    findAll(): Promise<E[]>;

    update(E): Promise<void>;

    delete(id: string): Promise<void>;
}