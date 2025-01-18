import {v4 as uuidv4} from "uuid";

export abstract class Entity<Props = any> {
    public readonly _id: string;
    public readonly props: Props;

    constructor(props: Props, id?: string) {
        this.props = props;
        this._id = id || uuidv4();
    }

    getId() {
        return this._id;
    }

    // Diz que o retorno será igual a id + props
    toJSON(): Required<{ id: string } & Props> {
        return {
            id: this._id,
            ...this.props,
        } as Required<{ id: string } & Props>;
    }
}