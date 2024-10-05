import {Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import { Request } from 'express';
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "./public.decorator";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private reflector: Reflector) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean>  {    //important part of Guard
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(    //check if the token is valid and decode the payload
                token,
                { secret: process.env.JWT_SECRETKEY }
            )
            request['patient'] = payload; // == req.user, so that we can access it in our route handler
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ')?? [];
        console.log('type: ', type);
        console.log('token: ', token);
        return type === 'Bearer' ? token : undefined;
    }
}