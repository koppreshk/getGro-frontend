import { AllModules, AllPermissionKeys } from "lib/enums"
import { useAppSelector } from "./store-utils";

type UseFeatureReturnType<T> = T extends undefined | null ? (featName: AllPermissionKeys) => boolean : boolean;

export const useFeature = <T extends AllPermissionKeys | undefined>(
    featureName?: T
): UseFeatureReturnType<T> => {
    const { config } = useAppSelector((state) => state.core);

    if (featureName) {
        return config!.permissions.includes(featureName) as UseFeatureReturnType<T>;
    }

    return ((featName: AllPermissionKeys) => {
        return config!.permissions.includes(featName);
    }) as UseFeatureReturnType<T>;
};

type UseModuleReturnType<T> = T extends undefined | null ? (featName: AllModules) => boolean : boolean;

export const useModule = <T extends AllModules | undefined>(
    moduleName?: T
): UseModuleReturnType<T> => {
    const { config } = useAppSelector((state) => state.core);

    if (moduleName) {
        return config!.modules.includes(moduleName) as UseModuleReturnType<T>;
    }

    return ((modName: AllModules) => {
        return config!.modules.includes(modName);
    }) as UseModuleReturnType<T>;
};
