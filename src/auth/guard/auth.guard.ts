import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    SetMetadata,
    BadRequestException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import { Request } from 'express';
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../decorator/public.decorator";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private reflector: Reflector) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {    //important part of Guard
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const { access_token }= this.extractTokenFromHeader(request);
        const refreshToken = this.extractRefreshToken(request)

        if (!access_token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(    //check if the token is valid and decode the payload
                access_token,
                {secret: process.env.JWT_SECRETKEY},
            )
            request['doctor'] = payload; // == req.user, so that we can access it in our route handler
            return true;
        } catch (error) {
            throw new BadRequestException('Access token verification failed');
        }
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }
        try {
            const decodedRefreshToken = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRETKEY,
            });
            const newPayload =
                { sub: decodedRefreshToken.sub,
                    account: decodedRefreshToken.account,
                    name: decodedRefreshToken.name,
                    departmentId: decodedRefreshToken.departmentId
                };
            request['doctor'] = newPayload; // Use refresh token payload
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private extractTokenFromHeader(request: Request): {access_token?: string} {
        const [type, access_token] = request.headers.authorization?.split(' ') ?? [];
        return {
           access_token: type === 'Bearer' ? access_token : undefined,
        }
    }

    private extractRefreshToken(request: Request): string | undefined {
        return request.cookies?.refreshToken || request.headers['Refresh-token'];  //refresh token is stored in cookies
    }
}