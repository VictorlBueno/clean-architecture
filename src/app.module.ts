import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {EnvConfigModule} from "./infrastructure/modules/env-config.module";
import { UsersModule } from './infrastructure/modules/users.module';
import {DatabaseModule} from "@/infrastructure/modules/database.module";
import { PrismaService } from './infrastructure/shared/database/prisma/prisma/prisma.service';

@Module({
    imports: [EnvConfigModule, UsersModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})

export class AppModule {
}
