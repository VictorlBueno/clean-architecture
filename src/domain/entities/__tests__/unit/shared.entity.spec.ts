import {validate as uuidValidate} from "uuid";
import {Entity} from "@/domain/entities/shared.entity";

type StubProps = {
    prop1: string,
    prop2: number,
}

// Stub = conversão de classes dublê
class StubEntity extends Entity<StubProps> {
}

describe("UserEntity unit tests", () => {
    it("Should set props and id", () => {
        const props = {prop1: "value1", prop2: 15};
        const entity = new StubEntity(props);

        expect(entity.props).toStrictEqual(props);
        expect(entity._id).not.toBeNull();
        expect(uuidValidate(entity._id)).toBeTruthy();
    });

    it("Should accept a valid uuid", () => {
        const props = {prop1: "value1", prop2: 15};
        const id = "446b11c0-31fa-4041-92e1-290837519c21";
        const entity = new StubEntity(props, id);

        expect(uuidValidate(entity._id)).toBeTruthy();
        expect(entity._id).toBe(id);
    });

    it("Should convert a entity to a JavaScript Object", () => {
        const props = {prop1: "value1", prop2: 15};
        const id = "446b11c0-31fa-4041-92e1-290837519c21";
        const entity = new StubEntity(props, id);

        expect(entity.toJSON()).toStrictEqual({
            id,
            ...props,
        });
    });
});