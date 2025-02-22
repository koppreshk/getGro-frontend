import { Edit } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { CustomIconButton, DrawerExtended, FlexBox } from 'lib/ui-ux';
import { ConfigDataGrid } from 'lib/ui-ux/configuration-data-grid';
import { chooseRandomColors, getInitialsByName } from 'lib/utils';
import { useAuth } from 'modules/login';
import { IUsers } from 'modules/settings/apis/users-and-permissions';
import {
  DeactivateAgentContainer,
  EditAgentContainer,
} from 'modules/settings/containers';
import { ActivateAgentContainer } from 'modules/settings/containers/agents/activate-agent-container';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { VerificationStatus } from './verification-status';

const Name = (props: {
  name: string;
  loggedInUserName: string;
  imageUrl?: string | null;
}) => {
  const { name, loggedInUserName, imageUrl } = props;
  const { backgroundColor, textColor } = useMemo(
    () => chooseRandomColors(getInitialsByName(name)),
    [name]
  );
  const { pallete } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <FlexBox gap="10px" flexDirection="row" alignItems="center">
        <Avatar
          sx={{
            color: textColor,
            bgcolor: backgroundColor,
            width: '32px',
            height: '32px',
            fontSize: '13px',
            fontWeight: 500,
          }}
          src={imageUrl ?? undefined}
        >
          {getInitialsByName(name)}
        </Avatar>
        <FlexBox flexDirection="column">
          <Typography variant="body2">{name}</Typography>
          {loggedInUserName === name ? (
            <Typography
              variant="subheading2"
              sx={{ color: pallete.grayNeutral }}
            >
              {t('you')}
            </Typography>
          ) : null}
        </FlexBox>
      </FlexBox>
    </>
  );
};

const EditAgent = (props: { id: number }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  const toggleUserDrawer = () => {
    setShowDrawer((preValue) => !preValue);
  };

  return (
    <>
      <CustomIconButton
        iconComponent={<Edit />}
        tooltipProps={{ title: t('edit') }}
        onClick={toggleUserDrawer}
      />
      <DrawerExtended
        open={showDrawer}
        anchor="right"
        width="500px"
        header={t('view_or_edit_agent')}
        onRenderContent={() => (
          <EditAgentContainer
            toggleUserDrawer={toggleUserDrawer}
            id={props.id}
          />
        )}
        onClose={toggleUserDrawer}
      />
    </>
  );
};

const useColumns = () => {
  const columnHelper = createColumnHelper<IUsers>();
  const { user } = useAuth();
  const { t } = useTranslation();

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      cell: (info) => info.getValue(),
      header: () => t('id'),
    }),
    columnHelper.accessor('name', {
      id: 'name',
      cell: (info) => (
        <Name
          name={info.getValue()}
          imageUrl={info.cell.row.original.image_url}
          loggedInUserName={user!.name}
        />
      ),
      header: () => t('name'),
    }),
    columnHelper.accessor('role', {
      id: 'role',
      cell: (info) => info.getValue(),
      header: () => t('role'),
    }),
    columnHelper.accessor('fetch_verification_status', {
      id: 'fetch_verification_status',
      cell: (info) => <VerificationStatus status={info.getValue()} />,
      header: () => t('status'),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => t('actions'),
      cell: ({ row: { original } }) => {
        const isLoggedInUser = original.name === user?.name; //Checking if the logged in user and current user are same
        const showDeactivateDialog =
          original.fetch_verification_status !== 'Deactivated' &&
          original.role !== 'Account Owner' &&
          user?.name !== original.name;
        return (
          <FlexBox flexDirection="row" gap="5px">
            {showDeactivateDialog && (
              <DeactivateAgentContainer
                id={original.id}
                canDeactivate={original.can_deactivate}
              />
            )}
            {original.fetch_verification_status === 'Deactivated' && (
              <ActivateAgentContainer id={original.id} />
            )}
            {!isLoggedInUser && original.role !== 'Account Owner' && (
              <EditAgent id={original.id} />
            )}
          </FlexBox>
        );
      },
      enableSorting: false,
    }),
  ];

  return columns;
};

interface IUserListListProps {
  usersData?: IUsers[];
  isLoading: boolean;
}

export const UserList = (props: IUserListListProps) => {
  const { usersData, isLoading } = props;
  const columns = useColumns();

  return (
    <div style={{ height: 'calc(100% - 173px)', overflow: 'auto' }}>
      <ConfigDataGrid
        columns={columns}
        data={usersData!}
        isLoading={isLoading}
        hideTableControls
      />
    </div>
  );
};
