import { AllPermissionKeys } from "lib/enums"
import { useAppSelector } from "./store-utils";

export const useFeature = (featureName: AllPermissionKeys) => {
    const { config } = useAppSelector((state) => state.core);

    return config!.permissions.includes(featureName);
}
