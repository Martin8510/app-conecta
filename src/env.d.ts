interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  // Agrega aquí otras variables que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
