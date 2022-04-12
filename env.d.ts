/// <reference types="vite/client" />
declare module "@asigloo/vue-dynamic-forms";

interface ImportMetaEnv {
  readonly VITE_BACKEND_URI: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
