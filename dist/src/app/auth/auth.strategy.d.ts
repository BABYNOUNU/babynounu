import { Strategy } from 'passport-jwt';
import { JwtPayload } from './config/jwt.config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        id: string;
        email: string;
        profileType: string;
    }>;
}
export {};
