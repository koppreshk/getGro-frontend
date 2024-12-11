import { FlexBox, TagInput, TypographyName } from 'lib/ui-ux';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { styled } from 'styled-components';

export const StyledTags = styled(TagInput)`
  padding: 8px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.xs};
  border: ${({ theme }) => theme.semantics.standardBorder};
  width: 100%;
`;

interface IManageTagsProps {
  associatedTags: IGenericResponse[];
  allTags: IGenericResponse[];
  onTagsChange: (tags: number[]) => Promise<void>;
}

export const ManageTags = (props: IManageTagsProps) => {
  const { associatedTags, allTags, onTagsChange } = props;
  const mappedTags = associatedTags.map((item) => item.name);
  const [tagItems, setTagItems] = useState<string[]>(mappedTags);

  useEffect(() => {
    if (mappedTags.length !== tagItems.length) {
      setTagItems(mappedTags);
    }
  }, [mappedTags, tagItems]);

  const onTagInputChange = useCallback(
    (items: string[]) => {
      const tagsIds = allTags
        .filter((it) => items.includes(it.name))
        .map((i) => i.id);
      onTagsChange(tagsIds);
    },
    [allTags, onTagsChange]
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
        suggestedTags={allTags.map((item) => item.name)}
        onTagInputChange={onTagInputChange}
      />
    </FlexBox>
  );
};
