import { Delete, Send } from '@mui/icons-material';
import { Avatar, CircularProgress, IconButton } from '@mui/material';
import {
  FileUploadField,
  RichTextEditorField,
  validateAtLeastOneChar,
} from 'lib/form-fields';
import { FlexBox, RoundedSendButton } from 'lib/ui-ux';
import { chooseRandomColors, getInitialsByName } from 'lib/utils';
import React, { useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { IEmailFormFields } from './email-conversations';
import { EmailHeaderOptions } from './email-header-options';
import { InsertArticle } from './insert-article';
import { InsertTemplate } from './insert-template';
import { UploadedAttachmentsPreview } from './uploaded-attachments-preview';

interface IEmailEditorProps {
  from: string;
  editorType: 'reply' | 'forward';
  showEmailHeaderOptions?: boolean;
  isMutationLoading?: boolean;
  onCancelClick: () => void;
  onSendClick?: () => void;
}

const StyledForwardCardContainer = styled(FlexBox)`
  border: 1px solid #ccc;
  border-radius: 16px;
  &:hover,
  &:focus-within {
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
  .editor-error-message {
    margin-left: 20px;
  }
`;

export const EmailEditor = (props: IEmailEditorProps) => {
  const {
    from,
    showEmailHeaderOptions = false,
    editorType,
    isMutationLoading,
  } = props;
  const { backgroundColor, textColor } = useMemo(
    () => chooseRandomColors(getInitialsByName(from)),
    [from]
  );
  const { watch } = useFormContext<IEmailFormFields>();
  const attachmets = watch(`${editorType}.attachments`);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  return (
    <FlexBox gap="10px">
      <Avatar sx={{ color: textColor, bgcolor: backgroundColor }}>
        {getInitialsByName(from)}
      </Avatar>
      <StyledForwardCardContainer
        ref={containerRef}
        flexDirection="column"
        gap="10px"
        width="calc(100% - 60px)"
      >
        <div>
          {showEmailHeaderOptions ? (
            <EmailHeaderOptions editorType={editorType} />
          ) : null}
          <RichTextEditorField
            name={`${editorType}.editor`}
            rules={{
              required: 'This field is required',
              validate: validateAtLeastOneChar,
            }}
          />
          <FlexBox gap="8px" padding="0px 16px" flexWrap="wrap">
            {attachmets?.selectedFiles.map((item) => (
              <UploadedAttachmentsPreview item={item} attachmets={attachmets} />
            ))}
          </FlexBox>
        </div>
        <EmailFooterOptions
          onCancelClick={props.onCancelClick}
          onSendClick={props.onSendClick}
          editorType={editorType}
          isMutationLoading={isMutationLoading}
          editorValue={watch(`${editorType}.editor`)}
        />
      </StyledForwardCardContainer>
    </FlexBox>
  );
};

const EmailFooterOptions = (
  props: Pick<
    IEmailEditorProps,
    'onSendClick' | 'onCancelClick' | 'editorType' | 'isMutationLoading'
  > & { editorValue: string }
) => {
  const {
    editorType,
    isMutationLoading,
    editorValue,
    onCancelClick,
    onSendClick,
  } = props;
  const { t } = useTranslation();
  return (
    <FlexBox justifyContent="space-between" padding="0px 16px 10px">
      <FlexBox gap="5px">
        <RoundedSendButton
          disabled={isMutationLoading}
          variant="contained"
          endIcon={
            isMutationLoading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              <Send />
            )
          }
          title={t('send')}
          onClick={onSendClick}
        >
          {t('send')}
        </RoundedSendButton>
        <FileUploadField
          name={`${editorType}.attachments`}
          multiple
          readMode="readAsDataURL"
        />
        <InsertTemplate editorType={editorType} />
        <InsertArticle editorType={editorType} editorValue={editorValue} />
      </FlexBox>
      <IconButton onClick={onCancelClick} title={t('delete')}>
        <Delete />
      </IconButton>
    </FlexBox>
  );
};
