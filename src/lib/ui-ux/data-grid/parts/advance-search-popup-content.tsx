import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import { Box, Typography, Button, Checkbox } from '@mui/material';
import { t } from 'i18next';
import {
  AutoCompleteFieldWithLabel,
  AutoCompleteRenderOptionProps,
  DateTimePickerFieldWithLabel,
  TextboxFieldWithLabel,
} from 'lib/form-fields';
import { useAppDispatch } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux/flexbox/flexbox';
import { GridLayout } from 'lib/ui-ux/grid-layout';
import { setAdvanceFiltersState } from 'modules/tickets/storage';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { IAdvanceSearchProps, ISearchTickets } from './advance-search';

interface IAdvanceSearchPopupContentProps extends IAdvanceSearchProps {
  handleClose: () => void;
}

export const AdvanceSearchPopupContent = (
  props: IAdvanceSearchPopupContentProps
) => {
  const { combinedData, fetchAllTicketsWithSearchQuery, handleClose } = props;
  const { agents, channels, priorities, statuses, tags } = combinedData;
  const dispatch = useAppDispatch();
  const { reset, handleSubmit } = useFormContext<ISearchTickets>();

  const [searchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('noOfRecords');
  const getPageNumber = searchParams.get('pageNumber');

  const pageNumber = getPageNumber === undefined ? '' : (getPageNumber ?? '1');

  const onSubmit = (formData: ISearchTickets) => {
    const createdDate = formData.createdDate
      ? formData.createdDate.toFormat('yyyy-MM-dd HH:mm:ss')
      : '';
    const formObject: Record<string, string> = {
      createdDate: createdDate,
      priority: formData.priority.map((item) => Number(item.key)).join(','),
      assignee: formData.assignee.map((item) => Number(item.key)).join(','),
      status: formData.status.map((item) => Number(item.key)).join(','),
      tags: formData.tags.map((item) => Number(item.key)).join(','),
      source: formData.source.map((item) => Number(item.key)).join(','),
      email: formData.requesterEmail ? formData.requesterEmail : '',
    };
    if (fetchAllTicketsWithSearchQuery) {
      const finalArgs = Object.keys(formObject).reduce(
        (acc, key) => {
          const typedKey = key as keyof typeof formObject;
          if (
            formObject[typedKey] !== undefined &&
            formObject[typedKey] !== ''
          ) {
            acc[typedKey] = formObject[typedKey];
          }
          return acc;
        },
        {} as Record<string, string>
      );

      // Add itemsPerPage and pageNumber to finalArgs
      if (itemsPerPage) {
        finalArgs.items_per_page = itemsPerPage;
      }
      if (pageNumber) {
        finalArgs.page = pageNumber;
      }
      fetchAllTicketsWithSearchQuery(finalArgs);
      dispatch(setAdvanceFiltersState(true));
      handleClose();
    }
  };

  const onClearFilter = () => {
    reset();
    handleClose();
    if (fetchAllTicketsWithSearchQuery) {
      fetchAllTicketsWithSearchQuery({});
      dispatch(setAdvanceFiltersState(false));
    }
  };

  const renderAgentOption: AutoCompleteRenderOptionProps = (
    optionprops,
    option,
    state
  ) => {
    return (
      <li {...optionprops}>
        <Checkbox
          icon={<CheckBoxOutlineBlank fontSize="small" />}
          checkedIcon={<CheckBox fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={state.selected}
        />
        <FlexBox flexDirection="column">
          <Typography variant="h6">{option.value.split(';')[0]}</Typography>
          <Typography variant="body3">{option.value.split(';')[1]}</Typography>
        </FlexBox>
      </li>
    );
  };

  return (
    <Box p={2} height="100%">
      <Typography>Filters</Typography>
      <GridLayout
        $padding="10px 0"
        $gridGap="14px 12px"
        $gridTemplateColumns={'repeat(2, 1fr)'}
      >
        <AutoCompleteFieldWithLabel
          size="small"
          name="priority"
          placeholder="Priority"
          label={t('priority')}
          options={
            priorities?.map((priority) => ({
              key: priority.id.toString(),
              value: priority.name,
            })) || []
          }
        />
        <AutoCompleteFieldWithLabel
          size="small"
          name="assignee"
          placeholder="Assignee"
          label={t('assignee')}
          getOptionLabel={(option) => option.value.split(';')[0]}
          options={
            agents?.employees.map((agent) => ({
              key: agent.id.toString(),
              value: [
                `${agent.firstName} ${agent.lastName ?? ''}`,
                agent?.email,
              ].join(';'),
            })) || []
          }
          renderOption={renderAgentOption}
        />
        <AutoCompleteFieldWithLabel
          size="small"
          name="status"
          placeholder="Status"
          label={t('status')}
          options={
            statuses?.map((status) => ({
              key: status.id.toString(),
              value: status.name,
            })) || []
          }
        />
        <AutoCompleteFieldWithLabel
          size="small"
          name="tags"
          placeholder="Tags"
          label={t('tags')}
          options={
            tags?.map((tag) => ({
              key: tag.id.toString(),
              value: tag.name,
            })) || []
          }
        />
        <DateTimePickerFieldWithLabel
          label="Crated date"
          name="createdDate"
          size="small"
          views={['year', 'day']}
        />
        <AutoCompleteFieldWithLabel
          size="small"
          name="source"
          placeholder="Source"
          label={t('source')}
          options={
            channels?.map((channel) => ({
              key: channel.channel_id.toString(),
              value: channel.name,
            })) || []
          }
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
        justifyContent="space-between"
        gap={'15px'}
        padding="16px 0 0 0"
        style={{ borderTop: '1px solid #E9EBED' }}
      >
        <Button variant="outlined" onClick={handleClose} color="error">
          {t('close')}
        </Button>
        <FlexBox gap={'15px'}>
          <Button variant="text" onClick={onClearFilter}>
            Clear Filter
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            {t('apply')}
          </Button>
        </FlexBox>
      </FlexBox>
    </Box>
  );
};
