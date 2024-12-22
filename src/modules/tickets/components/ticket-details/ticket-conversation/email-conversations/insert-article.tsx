import { ArticleOutlined } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { CheckboxField } from 'lib/form-fields';
import { CancelButton, CenteredCircularProgress, FlexBox } from 'lib/ui-ux';
import { IKnowledgeBase, useSearchArticle } from 'modules/knowledge-base/apis';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const StyledCard = styled(FlexBox)`
  background: ${({ theme }) => theme.pallete.grayVariant5};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

interface ArticleFormFields {
  articles: {
    [key: string]: boolean;
  };
}

export const InsertArticle = (props: {
  editorType: string;
  editorValue: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setValue } = useFormContext();
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const { mutateAsync, data, isLoading } = useSearchArticle();
  const form = useForm<ArticleFormFields>({
    shouldUnregister: true,
    mode: 'onBlur',
    defaultValues: {
      articles: Object.fromEntries(data?.map((item) => [item.id, false]) || []),
    },
  });

  useEffect(() => {
    mutateAsync({ title: '' });
  }, [mutateAsync]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setEditorValue = useCallback(
    (formData: ArticleFormFields) => {
      const { articles } = formData;
      const selectedIds = Object.keys(articles).filter((item) =>
        articles ? articles![item] : {}
      );
      const links = data?.filter((item) =>
        selectedIds.includes(item.id.toString())
      );
      const linksMarkup = (
        <div>
          {links?.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', margin: '8px 0' }}
            >
              {link.title}
            </a>
          ))}
        </div>
      );

      // Convert the JSX content to an HTML string
      const htmlString = ReactDOMServer.renderToStaticMarkup(linksMarkup);
      setValue(
        `${props.editorType}.editor`,
        props.editorValue ? props.editorValue + htmlString : htmlString
      );
      handleClose();
    },
    [data, props.editorType, props.editorValue, setValue]
  );

  const onSearch: ChangeEventHandler<HTMLInputElement> = (ev) => {
    mutateAsync({ title: ev.target.value });
  };

  return (
    <>
      <IconButton onClick={handleClick} title={t('insert_article')}>
        <ArticleOutlined />
      </IconButton>
      <Dialog
        open={open}
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: '850px',
          },
        }}
        onClose={handleClose}
      >
        <FormProvider {...form}>
          <DialogTitle id="alert-dialog-title">
            {t('insert_article')}
          </DialogTitle>
          <DialogContent>
            <FlexBox flexDirection="column" padding="20px" gap={'20px'}>
              <TextField
                onChange={onSearch}
                id="outlined-basic"
                label="Search Articles"
                placeholder="Search articles by title"
                variant="outlined"
              />
              <FlexBox
                gap={'10px'}
                style={{ minHeight: '250px', maxHeight: '250px' }}
                flexWrap="wrap"
                overflowY="auto"
              >
                {isLoading ? (
                  <CenteredCircularProgress height="unset" />
                ) : data?.length ? (
                  data?.map((item) => (
                    <ArticleContent key={item.id} item={item} />
                  ))
                ) : (
                  <FlexBox
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                  >
                    <Typography>{t('no_articles_found')}</Typography>
                  </FlexBox>
                )}
              </FlexBox>
            </FlexBox>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'flex-end', padding: '16px' }}>
            <CancelButton onClick={handleClose} />
            <Button
              variant="contained"
              endIcon={<ArticleOutlined />}
              onClick={form.handleSubmit(setEditorValue)}
            >
              {t('insert_article')}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

const ArticleContent = (props: { item: IKnowledgeBase }) => {
  const { item } = props;
  return (
    <StyledCard
      padding="12px"
      gap={'8px'}
      alignItems="flex-start"
      height="fit-content"
    >
      <CheckboxField name={`articles.${item.id}`} sx={{ padding: 0 }} />
      <FlexBox flexDirection="column" gap={'8px'}>
        <Link variant="h6" href={item.url} underline="none" target="_blank">
          {item.title}
        </Link>
        <Typography variant="body3">{item.added_by}</Typography>
        <Typography variant="body3">{item.created_at}</Typography>
      </FlexBox>
    </StyledCard>
  );
};
