import {DynamicModule, Global, Module} from "@nestjs/common";
import {EnvConfigModule} from "@/infrastructure/modules/env-config.module";
import {ConfigService} from "@nestjs/config";
import {PrismaClient} from "@prisma/client";
import {PrismaService} from "@/infrastructure/shared/database/prisma/prisma.service";

@Global()
@Module({
    imports: [EnvConfigModule.forRoot()],
    providers: [ConfigService],
    exports: [PrismaService],
})

export class DatabaseModule {
    static forTest(prismaClient: PrismaClient): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: PrismaService,
                    useFactory: () => prismaClient as PrismaService,
                },
            ],
        };
    }
}
