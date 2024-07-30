import React from "react";
import { useMutation } from "react-query";
import { useServiceClient } from "lib";
import { AutoAssignmentQueryKey, AutoAssignmentEndPoint } from "./api-enums";
import { AutoMationType } from ".";

export const useSetAssignmentStatus = (automationType: AutoMationType) => {
    const { postData } = useServiceClient();

    const setAssignmentStatus = React.useCallback((args: { id: number }) =>
        postData(`${AutoAssignmentEndPoint.TOGGLE_ASSIGNMENT}?id=${args.id}&automation_type=${automationType}`).then((res) => res.json()), [automationType, postData]);

    return useMutation({
        mutationKey: [AutoAssignmentQueryKey.TOGGLE_ASSIGNMENT, automationType],
        mutationFn: setAssignmentStatus,
    });
}