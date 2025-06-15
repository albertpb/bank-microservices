import { ProductAuthorizationEntity } from 'core/domain/entities/product-authorization';

export interface ProductAuthorizationPort {
  create(productAuthorization: ProductAuthorizationEntity): Promise<void>;
  findById(id: string): Promise<ProductAuthorizationEntity | null>;
  authorize(id: string): Promise<void>;
  reject(id: string): Promise<void>;
}

export const PRODUCT_AUTHORIZATION_PORT = Symbol('PRODUCT_AUTHORIZATION_PORT');
