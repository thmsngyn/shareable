export enum Spacing {
  s0 = 0,
  s2 = 2,
  s4 = 4,
  s8 = 8,
  s12 = 12,
  s16 = 16,
  s24 = 24,
  s32 = 32,
  s48 = 48,
  s64 = 64,
  s128 = 128,
  s224 = 224,
  s512 = 512,
}

export const getAppMargin = (isMobile: boolean = true) => {
  return isMobile ? Spacing.s24 : Spacing.s224;
};
export const APP_HEADER_HEIGHT = Spacing.s48;
export const APP_FOOTER_HEIGHT = Spacing.s512;
