import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {SignupDto} from "@/infrastructure/dtos/signup.dto";
import {UpdateUserDto} from "@/infrastructure/dtos/update-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() signupDto: SignupDto) {
        return this.usersService.create(signupDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }
}