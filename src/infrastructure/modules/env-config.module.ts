import {DynamicModule, Module} from "@nestjs/common";
import {EnvConfigService} from "@/infrastructure/config/env/env-config.service";
import {ConfigModule, ConfigModuleOptions} from "@nestjs/config";
import {join} from "node:path";
import { DatabaseModule } from './database.module';

@Module({
    imports: [ConfigModule, DatabaseModule],
    providers: [EnvConfigService],
    exports: [EnvConfigService]
})

export class EnvConfigModule extends ConfigModule {
    static async forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
        return await super.forRoot({
            ...options,
            envFilePath: [
                join(__dirname, `../../../.env.${process.env.NODE_ENV}`),
            ],
        });
    }
}
