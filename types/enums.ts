// types/enums.ts
// Enums matching Prisma schema - these define the allowed values for specific fields

/**
 * Status of a seminar registration
 * - SUBMITTED: Initial state when user registers
 * - CONFIRMED: Admin has confirmed the registration
 * - CANCELLED: Registration was cancelled
 */
export enum RegistrationStatus {
  SUBMITTED = 'SUBMITTED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

/**
 * Japanese prefectures for address selection
 */
export enum JpPrefecture {
  HOKKAIDO = 'HOKKAIDO',
  AOMORI = 'AOMORI',
  IWATE = 'IWATE',
  MIYAGI = 'MIYAGI',
  AKITA = 'AKITA',
  YAMAGATA = 'YAMAGATA',
  FUKUSHIMA = 'FUKUSHIMA',
  IBARAKI = 'IBARAKI',
  TOCHIGI = 'TOCHIGI',
  GUNMA = 'GUNMA',
  SAITAMA = 'SAITAMA',
  CHIBA = 'CHIBA',
  TOKYO = 'TOKYO',
  KANAGAWA = 'KANAGAWA',
  NIIGATA = 'NIIGATA',
  TOYAMA = 'TOYAMA',
  ISHIKAWA = 'ISHIKAWA',
  FUKUI = 'FUKUI',
  YAMANASHI = 'YAMANASHI',
  NAGANO = 'NAGANO',
  GIFU = 'GIFU',
  SHIZUOKA = 'SHIZUOKA',
  AICHI = 'AICHI',
  MIE = 'MIE',
  SHIGA = 'SHIGA',
  KYOTO = 'KYOTO',
  OSAKA = 'OSAKA',
  HYOGO = 'HYOGO',
  NARA = 'NARA',
  WAKAYAMA = 'WAKAYAMA',
  TOTTORI = 'TOTTORI',
  SHIMANE = 'SHIMANE',
  OKAYAMA = 'OKAYAMA',
  HIROSHIMA = 'HIROSHIMA',
  YAMAGUCHI = 'YAMAGUCHI',
  TOKUSHIMA = 'TOKUSHIMA',
  KAGAWA = 'KAGAWA',
  EHIME = 'EHIME',
  KOCHI = 'KOCHI',
  FUKUOKA = 'FUKUOKA',
  SAGA = 'SAGA',
  NAGASAKI = 'NAGASAKI',
  KUMAMOTO = 'KUMAMOTO',
  OITA = 'OITA',
  MIYAZAKI = 'MIYAZAKI',
  KAGOSHIMA = 'KAGOSHIMA',
  OKINAWA = 'OKINAWA',
}

/**
 * Types of notifications that can be sent
 */
export enum NotificationType {
  NEWSLETTER = 'newsletter',
  SEMINAR = 'seminar',
  ANNOUNCEMENT = 'announcement',
}
