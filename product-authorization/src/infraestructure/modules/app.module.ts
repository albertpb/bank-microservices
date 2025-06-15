import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'pino-nestjs';
import { AppController } from '../controllers/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductAuthorizationModule } from './product-authorization.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { HttpModule } from './http.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [__dirname + '/../**/*.orm-entity.{ts,js}'],
          synchronize: config.get('NODE_ENV') !== 'production',
        };
      },
    }),
    AuthModule,
    HttpModule,
    UserModule,
    ProductAuthorizationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
