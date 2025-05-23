import { Module } from '@nestjs/common';

import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.SECRETKEY,
            signOptions: {
                expiresIn: process.env.EXPIRESIN,
            },
        }),
        UsersModule
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService,  JwtStrategy],
    exports: [
        PassportModule,
        JwtModule
    ],
})
export class AuthenticationModule { }
