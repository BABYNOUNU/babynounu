export class CreateNotificationDto {
    type: string; // 'chat', 'job', 'follow'
    message: string; // Contenu de la notification
    userId: string; // ID de l'utilisateur destinataire
    is_read: boolean; // Indique si la notification a été lue
    senderUserId: string; // ID de l'utilisateur qui a envoyé la notification
  }