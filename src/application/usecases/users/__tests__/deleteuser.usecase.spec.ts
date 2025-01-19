import {
    UserInMemoryRepository,
} from "@/infrastructure/repositories/database/in-memory/repositories/user-in-memory.repository";
import {DeleteuserUseCase} from "@/application/usecases/users/deleteuser.usecase";
import {NotFoundError} from "@/domain/shared/errors/not-found-error";
import {UserDataBuilder} from "@/domain/testing/helpers/user-data-builder";
import {UserEntity} from "@/domain/entities/user.entity";

describe("DeleteUserUseCase unit tests", () => {
    let sut: DeleteuserUseCase.UseCase;
    let repository: UserInMemoryRepository;

    beforeEach(() => {
        repository = new UserInMemoryRepository();
        sut = new DeleteuserUseCase.UseCase(repository);
    });

    it("Should throws error when entity not found", async () => {
        await expect(() => sut.execute({id: "fakeId"})).rejects.toThrow(
            new NotFoundError("Entity not found"),
        );
    });

    it("Should delete a user", async () => {
        const spyDelete = jest.spyOn(repository, "delete");
        const items = [new UserEntity(UserDataBuilder({}))];
        repository.items = items;
        expect(repository.items).toHaveLength(1);
        await sut.execute({id: items[0]._id});
        expect(spyDelete).toHaveBeenCalledTimes(1);
        expect(repository.items).toHaveLength(0);
    });
});