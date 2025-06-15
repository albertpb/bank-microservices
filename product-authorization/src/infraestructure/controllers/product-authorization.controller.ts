import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthorizationRequestDto } from 'core/application/dto/authorization-request.dto';
import { AuthorizeProductAuthorizationUseCase } from 'core/application/use-cases/authorize-product-authorization.use-case';
import { CreateProductAuthorizationUseCase } from 'core/application/use-cases/create-product-authorization.service';
import { UserProfile } from 'core/domain/models/user-profile';
import { GetUser } from 'infraestructure/decorators/get-user.decorator';
import { AuthGuard } from 'infraestructure/guards/auth.guard';

@Controller('authorizations')
export class ProductAuthorizationController {
  constructor(
    private readonly createProductAuthorizationUseCase: CreateProductAuthorizationUseCase,
    private readonly authorizeProductAuthorizationUseCase: AuthorizeProductAuthorizationUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post('product')
  async createAuthorization(@GetUser() user: UserProfile, @Body() body: AuthorizationRequestDto) {
    try {
      const authorization = await this.createProductAuthorizationUseCase.execute(
        user.id,
        body.toId,
        body.productId,
        body.amount,
      );
      return {
        id: authorization.id,
        fromId: authorization.fromId,
        toId: authorization.toId,
        productId: authorization.productId,
        createdAt: authorization.createdAt,
        amount: authorization.amount,
        state: authorization.state,
      };
    } catch (error) {
      throw new Error(`Failed to create authorization: ${error}`);
    }
  }

  @UseGuards(AuthGuard)
  @Post('product/authorize/:productId')
  async authorizeProduct(@GetUser() user: UserProfile, @Param('productId') productId: string) {
    try {
      await this.authorizeProductAuthorizationUseCase.execute(productId);
      return { message: 'Product authorization successful' };
    } catch (error) {
      throw new Error(`Failed to authorize product: ${error}`);
    }
  }
}
