import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { jwtConstants } from './config/jwt.config';

interface AuthenticatedSocket extends Socket {
  user: any;
}

@Injectable()
export class WsJwtGuard implements CanActivate {
  // private readonly logger = new Logger(WsJwtGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('switch to ws', context.getType())
    if (context.getType() !== 'ws') {
      return true; // ou false selon votre cas
    }

    const client = context.switchToWs().getClient<AuthenticatedSocket>();
    // this.logger.debug(`New connection from: ${client.id}`);

    const token = this.extractTokenFromSocket(client);
    // this.logger.debug(`Extracted token: ${token ? 'exists' : 'null'}`);

    if (!token) {
      // this.logger.warn('No token provided');
      throw new UnauthorizedException('Authentication token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      
      // this.logger.debug(`Token payload: ${JSON.stringify(payload)}`);

      if (!payload.id) {
        // this.logger.warn('Invalid token payload - missing id');
        throw new UnauthorizedException('Invalid token payload');
      }

      client.user = payload;
      // this.logger.log(`User ${payload.id} authenticated successfully`);
      return true;
    } catch (error) {
      // this.logger.error(`Authentication failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromSocket(client: AuthenticatedSocket): string | null {
    try {
      // 1. Check auth object
      if (client.handshake?.auth?.token) {
        return client.handshake.auth.token;
      }

      // 2. Check query params
      const queryToken = client.handshake?.query?.token;
      if (queryToken && typeof queryToken === 'string') {
        return queryToken;
      }

      // 3. Check headers (Bearer token)
      const authHeader = client.handshake?.auth?.authorization;
      if (authHeader) {
        const [type, token] = authHeader.split(' ');
        if (type === 'Bearer' && token) {
          
          return token;
        }
      }

      return null;
    } catch (error) {
      // this.logger.error('Error extracting token:', error);
      return null;
    }
  }
}