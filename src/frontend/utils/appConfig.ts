interface AppConfig {
    publicUrl: string;
    commitHash: string;
    nodeEnv: 'development' | 'production';
}

const appConfig: AppConfig = {
    publicUrl: __PUBLIC_URL__,
    commitHash: __COMMIT_HASH__,
    nodeEnv: __NODE_ENV__,
};

export default appConfig;
