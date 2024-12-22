import { CircularProgress } from '@mui/material';
import { useFetchTicketMetadata } from 'modules/settings/apis';
// import { useFetchAllStatuses } from 'modules/settings/apis/ticket-status';

import { useFetchPriorities } from '../apis';
import { AdvanceSearch } from '../components';

export const AdvanceSearchContainer = () => {
  const {
    data: prioritiesData,
    isLoading: isPrioritiesLoading,
    error: prioritiesError,
  } = useFetchPriorities();

  // const {
  //   data: statusesData,
  //   isLoading: isStatusesLoading,
  //   error: statusesError,
  // } = useFetchAllStatuses();

  // const {
  //   data: tagsData,
  //   isLoading: isTagsLoading,
  //   error: tagsError,
  // } = useFetchAllTags();

  const {
    data: agentsData,
    isLoading: isAgentsdataLoading,
    error: agentsDataError,
  } = useFetchTicketMetadata();

  const isLoading =
    isPrioritiesLoading ||
    // isStatusesLoading ||
    // isTagsLoading ||
    isAgentsdataLoading;

  const errors = {
    prioritiesError,
    // statusesError,
    // tagsError,
    agentsDataError,
  };

  const combinedData = {
    priorities: prioritiesData,
    // statuses: statusesData,
    // tags: tagsData,
    agents: agentsData,
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (Object.values(errors).some((error) => error)) {
    return <div>Error loading data</div>;
  }

  return (
    <AdvanceSearch
      priorities={combinedData.priorities}
      // statuses={combinedData.statuses}
      // tags={combinedData.tags}
      agents={combinedData.agents}
    />
  );
};
