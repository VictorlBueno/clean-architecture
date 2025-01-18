import {FieldsError} from "@/domain/shared/validators/validator-fields.interface";

export class ValidationError extends Error {
}

export class EntityValidationError extends Error {
    constructor(public error: FieldsError) {
        super("Entity validation error");
        this.name = "EntityValidationError";
    }
}