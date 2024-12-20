import { FilterList } from '@mui/icons-material';
import { Box, Button, Popover, Typography } from '@mui/material';
import {
  DateTimePickerFieldWithLabel,
  SelectFieldWithLabel,
  TextboxFieldWithLabel,
} from 'lib/form-fields';
import { CustomIconButton } from 'lib/ui-ux/common';
import { FlexBox } from 'lib/ui-ux/flexbox/flexbox';
import { GridLayout } from 'lib/ui-ux/grid-layout';
import { IQueueMetadata } from 'modules/settings/apis';
import { ITag } from 'modules/settings/apis/tags';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { IPriorities } from 'modules/tickets/apis';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface ISearchTickets {
  requesterEmail: string;
  priority: string;
  assignee: string;
  status: string;
  createdDate: string;
  tags: string[];
  source: string[];
}

interface IAdvanceSearchProps {
  priorities: IPriorities[] | undefined;
  statuses: IGenericResponse[] | undefined;
  tags: ITag[] | undefined;
  agents: IQueueMetadata | undefined;
}

export const AdvanceSearch = (props: IAdvanceSearchProps) => {
  console.log('advancesearchdata', props);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const formMethods = useForm<ISearchTickets>({
    defaultValues: {
      priority: '',
      requesterEmail: '',
      tags: [],
    },
  });

  return (
    <FormProvider {...formMethods}>
      <CustomIconButton
        iconComponent={<FilterList fontSize="small" />}
        tooltipProps={{ title: 'Show Filter' }}
        onClick={handleClick}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: '50%',
          },
        }}
      >
        <Box p={2} height="100%">
          <Typography>Filters</Typography>
          <GridLayout
            $padding="10px 0"
            $gridGap="14px 12px"
            $gridTemplateColumns={'repeat(2, 1fr)'}
          >
            <SelectFieldWithLabel
              sx={{ width: '100%' }}
              size="small"
              name="priority"
              label={t('priority')}
              menuOptions={[
                { key: 'low', value: 'Low' },
                { key: 'Medium', value: 'High' },
              ]}
              fullWidth
            />
            <SelectFieldWithLabel
              sx={{ width: '100%' }}
              size="small"
              name="assignee"
              label={t('assignee')}
              menuOptions={[
                { key: 'low', value: 'Low' },
                { key: 'Medium', value: 'High' },
              ]}
              fullWidth
            />
            <SelectFieldWithLabel
              sx={{ width: '100%' }}
              size="small"
              name="status"
              label={t('status')}
              menuOptions={[
                { key: 'low', value: 'Low' },
                { key: 'Medium', value: 'High' },
              ]}
              fullWidth
            />
            <SelectFieldWithLabel
              sx={{ width: '100%' }}
              size="small"
              name="tags"
              label={t('tags')}
              menuOptions={[
                { key: 'low', value: 'Low' },
                { key: 'Medium', value: 'High' },
              ]}
              fullWidth
            />
            <DateTimePickerFieldWithLabel
              label="Crated date"
              name="createdDate"
              size="small"
              views={['year', 'day']}
            />
            <SelectFieldWithLabel
              sx={{ width: '100%' }}
              size="small"
              name="source"
              label={t('source')}
              menuOptions={[
                { key: 'low', value: 'Low' },
                { key: 'Medium', value: 'High' },
              ]}
              fullWidth
            />
            <TextboxFieldWithLabel
              name="requesterEmail"
              type="email"
              label={t('requester_email')}
              size="small"
              sx={{ width: '100%' }}
            />
          </GridLayout>
          <FlexBox
            justifyContent="flex-end"
            gap={'15px'}
            padding="16px 0 0 0"
            style={{ borderTop: '1px solid #E9EBED' }}
          >
            <Button variant="outlined" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              onClick={formMethods.handleSubmit(() => {})}
            >
              {t('apply')}
            </Button>
          </FlexBox>
        </Box>
      </Popover>
    </FormProvider>
  );
};
