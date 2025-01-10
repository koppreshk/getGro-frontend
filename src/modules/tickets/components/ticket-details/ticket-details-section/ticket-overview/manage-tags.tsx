import { FlexBox } from 'lib/ui-ux';
import { ITagInput, TagInput } from 'lib/ui-ux/tag-input/tag-input';
import { ITag } from 'modules/settings/apis/tags';
import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { styled } from 'styled-components';

import { TypographyName } from './contact-info';

export const StyledTags = styled(TagInput)`
  padding: 8px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
  border: ${({ theme }) => theme.semantics.standardBorder};
  width: 100%;
`;

interface IManageTagsProps {
  associatedTags: ITag[];
  allTags: ITag[];
  onTagsChange: (tags: (number | string)[]) => Promise<void>;
}

export const ManageTags = (props: IManageTagsProps) => {
  const { associatedTags, allTags, onTagsChange } = props;
  const mappedTags = associatedTags.map((item) => ({
    name: item.name,
    id: item.id,
  }));
  const [tagItems, setTagItems] = useState(mappedTags);

  useEffect(() => {
    if (mappedTags.length !== tagItems.length) {
      setTagItems(mappedTags);
    }
  }, [mappedTags, tagItems]);

  const onTagInputChange = useCallback(
    (items: ITagInput[]) => {
      onTagsChange(items.map((item) => item.id));
    },
    [onTagsChange]
  );

  const suggestedTags: ITagInput[] = allTags.filter(
    (tag) =>
      !associatedTags.some((associatedTag) => associatedTag.id === tag.id)
  );

  return (
    <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'} width="100%">
      <TypographyName variant="h6">
        <Trans i18nKey={'tags'} />
      </TypographyName>
      <StyledTags
        tagInputs={tagItems}
        gap={'15px'}
        allowToAddTagsViaText={false}
        allowSuggestions
        suggestedTags={suggestedTags}
        onTagInputChange={onTagInputChange}
      />
    </FlexBox>
  );
};
