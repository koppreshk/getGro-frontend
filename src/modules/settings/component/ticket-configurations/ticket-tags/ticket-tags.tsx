import React, { useCallback } from "react"
import { FlexBox, TagInput } from "lib/ui-ux"
import { ITag } from "modules/settings/apis/tags";

interface ITicketTagsProps {
    data: ITag[];
}

export const TicketTags = (props: ITicketTagsProps) => {
    const { data } = props;
    const [tagInputs, setTagInputs] = React.useState(data.map((item) => item.tag));

    React.useEffect(() => {
        if (data.length) {
            setTagInputs(data.map((item) => item.tag))
        }
    }, [data])

    const onTagInputChange = useCallback((items: string[]) => {
        setTagInputs(items)
    }, []);

    return (
        <FlexBox width="70%">
            <TagInput tagInputs={tagInputs} onTagInputChange={onTagInputChange} placeholder="Add your tags here..." />
        </FlexBox>
    )
}
