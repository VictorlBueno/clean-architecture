import {Entity} from "@/domain/entities/shared.entity";

export type UserProps = {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
}

export class UserEntity extends Entity<UserProps> {
    constructor(public readonly props: UserProps, id?: string) {
        super(props, id);
        this.props.createdAt = this.props.createdAt ?? new Date();
    }

    updateName(value: string): void {
        this.name = value;
    }

    updatePassword(value: string): void {
        this.name = value;
    }

    getName() {
        return this.props.name;
    }

    setName(value: string): void {
        this.props.name = value;
    }

    getEmail() {
        return this.props.email;
    }

    setEmail(value: string): void {
        this.props.email = value;
    }

    getPassword() {
        return this.props.password;
    }

    setPassword(value: string): void {
        this.props.password = value;
    }

    getCreatedAt() {
        return this.props.createdAt ?? new Date();
    }
}
