import { FlexBox, MoreInformation } from "lib/ui-ux"

export const DeleteTagContent = () => {
    return (
        <FlexBox flexDirection="column" gap={'10px'}>
            <MoreInformation information="When you delete a tag, the following actions will happen:" type="error"/>
            <ul>
                <li>Associated ticket's tag will be removed.</li>
            </ul>
        </FlexBox>
    )
}