import {UserRepository} from "@/domain/repositories/user.repository";
import {UserEntity} from "@/domain/entities/user.entity";
import {SearchParams} from "@/domain/shared/repositories/searchable-repository-contracts";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";
import {NotFoundError} from "@/domain/shared/errors/not-found-error";
import {UserModelMapper} from "@/infrastructure/repositories/database/prisma/models/user-model.mapper";

export class UserPrismaRepository implements UserRepository.Repository {
    sortableFields: string[];

    constructor(private prismaService: PrismaService) {
    }

    delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    emailExists(email: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    findAll(): Promise<UserEntity[]> {
        return Promise.resolve([]);
    }

    findByEmail(email: string): Promise<UserEntity> {
        return Promise.resolve(undefined);
    }

    findById(id: string): Promise<UserEntity> {
        return this._get(id);
    }

    insert(entity: UserEntity): Promise<void> {
        return Promise.resolve(undefined);
    }

    search(props: SearchParams<UserRepository.Filter>): Promise<UserRepository.SearchResult> {
        return Promise.resolve(undefined);
    }

    update(entity: UserEntity): Promise<void> {
        return Promise.resolve(undefined);
    }

    protected async _get(id: string): Promise<UserEntity> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {id: id},
            });

            return UserModelMapper.toEntity(user);
        } catch (error) {
            throw new NotFoundError(`UserModel not found using ID ${id}`);
        }
    }

}