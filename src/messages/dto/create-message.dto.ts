export class CreateMessageDto {
  authorId: string;
  receptorId: string;
  content: string;
  createdAt: Date;
}
