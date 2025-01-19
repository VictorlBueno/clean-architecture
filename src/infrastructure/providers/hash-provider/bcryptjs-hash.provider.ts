import {HashProvider} from "@/application/shared/providers/hash-provider";
import {compare, hash} from "bcryptjs";

export class BcryptjsHashProvider implements HashProvider {
    async compareHash(payload: string, hash: string): Promise<boolean> {
        return compare(payload, hash);
    }

    async generateHash(payload: string): Promise<string> {
        return hash(payload, 6);
    }
}