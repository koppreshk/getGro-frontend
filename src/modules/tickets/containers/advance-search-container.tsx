import { CircularProgress } from '@mui/material';
import { AdvanceSearch } from 'lib/ui-ux/data-grid/parts/advance-search';
import { useFetchTicketMetadata } from 'modules/settings/apis';
import { useFetchAllChannels } from 'modules/settings/apis/tags';
import { useFetchAllStatuses } from 'modules/settings/apis/ticket-status';

import { useFetchPriorities, useFetchAllTags } from '../apis';

export const AdvanceSearchContainer = () => {
  const {
    data: prioritiesData,
    isLoading: isPrioritiesLoading,
    error: prioritiesError,
  } = useFetchPriorities();

  const {
    data: statusesData,
    isLoading: isStatusesLoading,
    error: statusesError,
  } = useFetchAllStatuses();

  const {
    data: tagsData,
    isLoading: isTagsLoading,
    error: tagsError,
  } = useFetchAllTags();

  const {
    data: agentsData,
    isLoading: isAgentsdataLoading,
    error: agentsDataError,
  } = useFetchTicketMetadata();

  const {
    data: channelsData,
    isLoading: channelLoading,
    error: channelsError,
  } = useFetchAllChannels();

  const isLoading =
    isPrioritiesLoading ||
    isStatusesLoading ||
    isTagsLoading ||
    isAgentsdataLoading ||
    channelLoading;

  const errors = {
    prioritiesError,
    statusesError,
    tagsError,
    agentsDataError,
    channelsError,
  };

  const combinedData = {
    priorities: prioritiesData,
    statuses: statusesData,
    tags: tagsData,
    agents: agentsData,
    channels: channelsData,
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (Object.values(errors).some((error) => error)) {
    return <div>Error loading data</div>;
  }

  return <AdvanceSearch combinedData={combinedData} />;
};
