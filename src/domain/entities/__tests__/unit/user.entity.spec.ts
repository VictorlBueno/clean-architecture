import {faker} from "@faker-js/faker/locale/en_US";
import {UserEntity, UserProps} from "@/domain/entities/user.entity";

describe("UserEntity unit tests", () => {
    let props: UserProps;
    let sut: UserEntity;

    beforeEach(() => {
        props = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        sut = new UserEntity(props);
    });

    it("Constructor method", async () => {
        expect(sut.props.name).toEqual(props.name);
        expect(sut.props.email).toEqual(props.email);
        expect(sut.props.password).toEqual(props.password);
        expect(sut.props.createdAt).toBeInstanceOf(Date);
    });
});