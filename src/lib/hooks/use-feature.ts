import { AllPermissionKeys } from "lib/enums"
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
