import {UserPrismaRepository} from "@/infrastructure/repositories/database/prisma/user-prisma.repository";
import {Test, TestingModule} from "@nestjs/testing";
import {setupPrismaTests} from "@/infrastructure/repositories/database/prisma/testing/setup-prisma-tests";
import {DatabaseModule} from "@/infrastructure/modules/database.module";
import {NotFoundError} from "@/domain/shared/errors/not-found-error";
import {UserDataBuilder} from "@/domain/testing/helpers/user-data-builder";
import {UserEntity} from "@/domain/entities/user.entity";
import { PrismaClient } from "@prisma/client";

describe("UserPrismaRepository integration tests", () => {
    const prismaService = new PrismaClient();
    let sut: UserPrismaRepository;
    let module: TestingModule;

    beforeAll(async () => {
        setupPrismaTests();
        module = await Test.createTestingModule({
            imports: [DatabaseModule.forTest(prismaService)],
        }).compile();
    });

    beforeEach(async () => {
        sut = new UserPrismaRepository(prismaService as any);
        await prismaService.user.deleteMany();
    });

    it("should throws error when entity not found", async () => {
        expect(() => sut.findById("FakeId")).rejects.toThrow(
            new NotFoundError("UserModel not found using ID FakeId"),
        );
    });

    it("should finds a entity by id", async () => {
        const entity = new UserEntity(UserDataBuilder({}));
        const newUser = await prismaService.user.create({
            data: entity.toJSON(),
        });
        const output = await sut.findById(newUser.id);
        expect(output.toJSON()).toStrictEqual(entity.toJSON());
    });

    it('should insert a new entity', async () => {
        const entity = new UserEntity(UserDataBuilder({}))
        await sut.insert(entity)
        const result = await prismaService.user.findUnique({
            where: {
                id: entity._id,
            },
        })
        expect(result).toStrictEqual(entity.toJSON())
    })
});