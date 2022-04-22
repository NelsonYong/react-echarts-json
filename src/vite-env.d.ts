/// <reference types="vite/client" />
declare module "slash2";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.webp";
declare module "*.tiff";
declare module "omit.js";
declare module "numeral";
declare module "mockjs";
declare module "pdfh5";

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: "development" | "production";
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
