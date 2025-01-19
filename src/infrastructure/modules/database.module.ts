import {Module} from "@nestjs/common";
import {EnvConfigModule} from "@/infrastructure/modules/env-config.module";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma/prisma.service";

@Module({
    imports: [EnvConfigModule.forRoot()],
    providers: [ConfigService],
    exports: [PrismaService],
})

export class DatabaseModule {
}
