import { FlexBox, TagInput } from "lib/ui-ux"
import { useState } from "react";
import { TypographyName } from "./contact-info";
import styled from "styled-components";
import { ITag } from "modules/settings/apis/tags";

export const StyledTags = styled(TagInput)`
    padding: 8px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
    border: ${({ theme }) => theme.semantics.standardBorder};
    width: 100%;
`;

interface IManageTagsProps {
    associatedTags: ITag;
    onTagsChange: (tags: number[]) => Promise<void>
}

export const ManageTags = (props: IManageTagsProps) => {
    const { associatedTags } = props;
    const [tags, setTags] = useState<string[]>([associatedTags.name]);

    const onTagInputChange = (items: string[]) => {
        setTags(items)
    }

    return (
        <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'} width="100%">
            <TypographyName variant="h6">Tags</TypographyName>
            <StyledTags
                tagInputs={tags}
                gap={"15px"}
                placeholder="Add your tags here..."
                onTagInputChange={onTagInputChange} />
        </FlexBox>
    )
}