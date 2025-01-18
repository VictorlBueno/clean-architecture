import {RepositoryInterface} from "@/domain/shared/repositories/repository-contracts";
import {UserEntity} from "@/domain/entities/user.entity";

export interface UserRepository extends RepositoryInterface<UserEntity> {
    findByEmail(email: string): Promise<UserEntity>;

    emailExists(email: string): Promise<void>;
}