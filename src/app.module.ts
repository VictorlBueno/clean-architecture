import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {EnvConfigModule} from "./infrastructure/modules/env-config.module";
import { UsersModule } from './infrastructure/modules/users.module';

@Module({
    imports: [EnvConfigModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}
