
    export type RemoteKeys = 'mfe_1/button';
    type PackageType<T> = T extends 'mfe_1/button' ? typeof import('mfe_1/button') :any;