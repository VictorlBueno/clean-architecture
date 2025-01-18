import {UserEntity, UserProps} from "@/domain/entities/user.entity";
import {UserDataBuilder} from "@/domain/testing/helpers/user-data-builder";
import {EntityValidationError} from "@/domain/shared/errors/validation-errors";

describe("UserEntity integration tests", () => {
    describe("Constructor method", () => {
        it("Should throw an error when creating a user with invalid name", () => {
            let props: UserProps = {
                ...UserDataBuilder({}),
                name: null,
            };
            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                name: "",
            };
            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...UserDataBuilder({}),
                name: "a".repeat(256),
            };
            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
        });
    });
});