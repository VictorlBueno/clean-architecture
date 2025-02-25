import {UserDataBuilder} from "@/domain/testing/helpers/user-data-builder";
import {UserEntity} from "@/domain/entities/user.entity";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";
import {NotFoundError} from "@/domain/shared/errors/not-found-error";
import {UpdateUserUseCase} from "@/application/usecases/users/updateuser.usecase";
import {
    UserInMemoryRepository,
} from "@/infrastructure/repositories/database/in-memory/repositories/user-in-memory.repository";

describe("UpdateUserUseCase unit tests", () => {
    let sut: UpdateUserUseCase.UseCase;
    let repository: UserInMemoryRepository;

    beforeEach(() => {
        repository = new UserInMemoryRepository();
        sut = new UpdateUserUseCase.UseCase(repository);
    });

    it("Should throws error when entity not found", async () => {
        await expect(() =>
            sut.execute({id: "fakeId", name: "test name"}),
        ).rejects.toThrow(new NotFoundError("Entity not found"));
    });

    it("Should throws error when name not provided", async () => {
        await expect(() => sut.execute({id: "fakeId", name: ""})).rejects.toThrow(
            new BadRequestError("Name not provided"),
        );
    });

    it("Should update a user", async () => {
        const spyUpdate = jest.spyOn(repository, "update");
        const items = [new UserEntity(UserDataBuilder({}))];
        repository.items = items;
        const result = await sut.execute({id: items[0]._id, name: "new name"});
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(result).toMatchObject({
            id: items[0]._id,
            name: "new name",
            email: items[0].email,
            password: items[0].password,
            createdAt: items[0].createdAt,
        });
    });
});