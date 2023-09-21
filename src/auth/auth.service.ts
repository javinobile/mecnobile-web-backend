import { BadRequestException, ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(email, pass);
        let passwordValid = false
        if (user) {
            passwordValid = await compare(pass, user.password)
        } 
        if (!passwordValid) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const payload = { sub: user.id, email: user.email, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: 's3cretK3y', expiresIn: '1h' }),
            user: {name: user.name, email: user.email}
        };
    }


    async signUp(createUserDto: CreateUserDto) {

        // check if email is already in use
        const response = await this.userService.findOne(createUserDto.email, createUserDto.password)
        if (response) {
            throw new ConflictException('User already Exists')
        }

        // create registration model
        let authUserRegistrationModel = {
            email: createUserDto.email,
            password: await hash(createUserDto.password, await genSalt())
        }

        // register user
        let user = await this.userService.createUser(authUserRegistrationModel)
        if (user) {
            return { message: "Created OK!" }
        }

    }
}
