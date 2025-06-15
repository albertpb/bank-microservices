import { Module } from '@nestjs/common';
import { ProductAuthorizationController } from '../controllers/product-authorization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAuthorizationOrmEntity } from 'infraestructure/persistence/entities/product-authorization.orm-entity';
import { PRODUCT_AUTHORIZATION_PORT } from 'core/application/ports/in/product-authorizaton.port';
import { ProductAuthorizationRepository } from 'infraestructure/persistence/product-authorization.repository';
import { KafkaModule } from './kafka.module';
import { AuthorizeProductAuthorizationUseCase } from 'core/application/use-cases/authorize-product-authorization.use-case';
import { CreateProductAuthorizationUseCase } from 'core/application/use-cases/create-product-authorization.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAuthorizationOrmEntity]), KafkaModule],
  controllers: [ProductAuthorizationController],
  providers: [
    CreateProductAuthorizationUseCase,
    AuthorizeProductAuthorizationUseCase,
    {
      provide: PRODUCT_AUTHORIZATION_PORT,
      useClass: ProductAuthorizationRepository,
    },
  ],
  exports: [],
})
export class ProductAuthorizationModule {}
