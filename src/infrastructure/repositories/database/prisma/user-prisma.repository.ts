import {UserRepository} from "@/domain/repositories/user.repository";
import {UserEntity} from "@/domain/entities/user.entity";
import {SearchParams} from "@/domain/shared/repositories/searchable-repository-contracts";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";

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
        return Promise.resolve(undefined);
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

}