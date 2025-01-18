import {UserEntity} from "@/domain/entities/user.entity";
import {SearchableRepositoryInterface} from "@/domain/shared/repositories/searchable-repository-contracts";

export interface UserRepository extends SearchableRepositoryInterface<UserEntity, any, any> {
    findByEmail(email: string): Promise<UserEntity>;

    emailExists(email: string): Promise<void>;
}