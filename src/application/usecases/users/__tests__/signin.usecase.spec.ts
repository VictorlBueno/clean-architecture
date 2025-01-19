import {UserDataBuilder} from "@/domain/testing/helpers/user-data-builder";
import {UserEntity} from "@/domain/entities/user.entity";
import {InvalidCredentialsError} from "@/application/shared/errors/invalid-credentials-error";
import {NotFoundError} from "@/domain/shared/errors/not-found-error";
import {BadRequestError} from "@/application/shared/errors/bad-request-error";
import {SigninUseCase} from "@/application/usecases/users/signin.usecase";
import {BcryptjsHashProvider} from "@/infrastructure/providers/hash-provider/bcryptjs-hash.provider";
import {
    UserInMemoryRepository,
} from "@/infrastructure/repositories/database/in-memory/repositories/user-in-memory.repository";
import {HashProvider} from "@/application/shared/providers/hash-provider";

describe("SigninUseCase unit tests", () => {
    let sut: SigninUseCase.UseCase;
    let repository: UserInMemoryRepository;
    let hashProvider: HashProvider;

    beforeEach(() => {
        repository = new UserInMemoryRepository();
        hashProvider = new BcryptjsHashProvider();
        sut = new SigninUseCase.UseCase(repository, hashProvider);
    });

    it("Should authenticate a user", async () => {
        const spyFindByEmail = jest.spyOn(repository, "findByEmail");
        const hashPassword = await hashProvider.generateHash("1234");
        const entity = new UserEntity(
            UserDataBuilder({email: "a@a.com", password: hashPassword}),
        );

        repository.items = [entity];
        const result = await sut.execute({
            email: entity.email,
            password: "1234",
        });

        expect(spyFindByEmail).toHaveBeenCalledTimes(1);
        expect(result).toStrictEqual(entity.toJSON());
    });

    it("Should throws error when email not provided", async () => {
        await expect(() =>
            sut.execute({email: null, password: "1234"}),
        ).rejects.toBeInstanceOf(BadRequestError);
    });

    it("Should throws error when password not provided", async () => {
        await expect(() =>
            sut.execute({email: "a@a.com", password: null}),
        ).rejects.toBeInstanceOf(BadRequestError);
    });

    it("Should not be able authenticate with wrong email", async () => {
        await expect(() =>
            sut.execute({email: "a@a.com", password: "1234"}),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("Should not be able authenticate with wrong password", async () => {
        const hashPassword = await hashProvider.generateHash("1234");
        const entity = new UserEntity(
            UserDataBuilder({email: "a@a.com", password: hashPassword}),
        );

        repository.items = [entity];

        await expect(() =>
            sut.execute({email: "a@a.com", password: "fake"}),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});