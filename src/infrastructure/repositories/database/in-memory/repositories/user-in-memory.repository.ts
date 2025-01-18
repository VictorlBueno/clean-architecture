import {InMemoryRepository} from "@/domain/shared/repositories/in-memory.repository";
import {UserRepository} from "@/domain/repositories/user.repository";
import {UserEntity} from "@/domain/entities/user.entity";
import {NotFoundError} from "@/domain/shared/errors/not-found-error";
import {ConflictError} from "@/domain/shared/errors/conflict-error";

export class UserInMemoryRepository extends InMemoryRepository<UserEntity> implements UserRepository {
    async emailExists(email: string): Promise<void> {
        const entity = this.items.find((item) => item.email === email);

        if (entity) {
            throw new ConflictError(`Email address already used`);
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const entity = this.items.find((item) => item.email === email);

        if (!entity) {
            throw new NotFoundError(`Entity not found using email ${email}`);
        }

        return entity;
    }
}