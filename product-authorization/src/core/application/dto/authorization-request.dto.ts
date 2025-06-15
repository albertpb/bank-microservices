import { IsNumber, IsString } from 'class-validator';

export class AuthorizationRequestDto {
  @IsString()
  productId: string;

  @IsString()
  toId: string;

  @IsNumber()
  amount: number;
}
