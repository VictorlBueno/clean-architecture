import {RepositoryInterface} from "@/domain/shared/repositories/repository-contracts";
import {Entity} from "@/domain/shared/entities/entity";
import {NotFoundError} from "@/domain/shared/errors/not-found-error";

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
    items: E[] = [];

    async delete(id: string): Promise<void> {
        await this._get(id);

        const index = this.items.findIndex(item => item._id === id);
        this.items.slice(index, 1);
    }

    async findAll(): Promise<E[]> {
        return this.items;
    }

    async findById(id: string): Promise<E> {
        return this._get(id);
    }

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async update(entity: E): Promise<void> {
        await this._get(entity._id);

        const index = this.items.findIndex(item => item._id === entity._id);
        this.items[index] = entity;
    }

    protected async _get(id: string): Promise<E> {
        const _id = `${id}`;
        const entity = this.items.find((item) => item._id === _id);

        if (!entity) {
            throw new NotFoundError("Entity not found.");
        }

        return entity;
    }
}