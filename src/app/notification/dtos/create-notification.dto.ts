export class CreateNotificationDto {
    type: string; // 'chat', 'job', 'follow'
    message: string; // Contenu de la notification
    userId: number; // ID de l'utilisateur destinataire
  }