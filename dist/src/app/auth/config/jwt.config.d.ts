export declare const jwtConstants: {
    secret: string;
    signOptions: {
        issuer: string;
    };
};
export interface JwtPayload {
    id: string;
    email: string;
    profileType: string;
}
