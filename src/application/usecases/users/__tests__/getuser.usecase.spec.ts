import {GetUserUseCase} from "@/application/usecases/users/getUserUseCase";
import {
    UserInMemoryRepository,
} from "@/infrastructure/repositories/database/in-memory/repositories/user-in-memory.repository";
import {NotFoundError} from "@/domain/shared/errors/not-found-error";
import {UserDataBuilder} from "@/domain/testing/helpers/user-data-builder";
import {UserEntity} from "@/domain/entities/user.entity";

describe("GetUserUseCase unit tests", () => {
    let sut: GetUserUseCase.UseCase;
    let repository: UserInMemoryRepository;

    beforeEach(() => {
        repository = new UserInMemoryRepository();
        sut = new GetUserUseCase.UseCase(repository);
    });

    it("Should throws error when entity not found", async () => {
        await expect(() => sut.execute({id: "fakeId"})).rejects.toThrow(
            new NotFoundError("Entity not found"),
        );
    });

    it("Should be able to get user profile", async () => {
        const spyFindById = jest.spyOn(repository, "findById");
        const items = [new UserEntity(UserDataBuilder({}))];
        repository.items = items;
        const result = await sut.execute({id: items[0]._id});

        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(result).toMatchObject({
            id: items[0]._id,
            name: items[0].name,
            email: items[0].email,
            password: items[0].password,
            createdAt: items[0].createdAt,
        });
    });
});
