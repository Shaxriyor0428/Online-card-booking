export enum DeliveryStatus {
  NEW = 'New',
  SHIPPED = 'Shipped',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  CANCELED = 'Canceled',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum NotificationTypes {
  SYSTEM = 'SYSTEM',
  PROMOTION = 'PROMOTION',
  REMINDER = 'REMINDER',
  ALERT = 'ALERT',
  TRANSACTION = 'TRANSACTION',
  MESSAGE = 'MESSAGE',
}

export enum OrderStatusEnum {
  NEW = 'NEW',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum OrderDetailsStatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}
