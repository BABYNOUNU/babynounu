// src/auth/config/jwt.config.ts
export const jwtConstants = {
  secret: process.env.JWT_SECRET, // À changer en production
  signOptions: {
    // expiresIn: process.env.JWT_EXPIRES_IN || '1d', // 1 jour par défaut
    // Autres options possibles :
    issuer: 'babynounu',
    // audience: 'your-app-client',
  },
};

export interface JwtPayload {
  id: string; // ID utilisateur
  email: string;
  profileType: string;
  // Ajoutez d'autres claims au besoin
}
