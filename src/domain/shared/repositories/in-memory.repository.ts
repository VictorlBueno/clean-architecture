import {RepositoryInterface} from "@/domain/shared/repositories/repository-contracts";
import {Entity} from "@/domain/shared/entities/entity";

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
    items: E[] = [];

    async delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async findAll(): Promise<E[]> {
        return this.items;
    }

    async findById(id: string): Promise<E> {
        const _id = `${id}`;
        const entity = this.items.find((item) => item._id === _id);

        if (!entity) {
            throw new Error("Entity not found.");
        }

        return entity;
    }

    async insert(E): Promise<void> {
        this.items.push(new E());
    }

    async update(E): Promise<void> {
        return Promise.resolve(undefined);
    }
}