import {
  GroupOutlined,
  InsertChartOutlined,
  SettingsOutlined,
  TaskOutlined,
  Article,
  Chat,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useModule } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatch } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ExotelCallControls } from './exotel-call-controls';

interface IPrimaryOptionProps {
  item: {
    iconComponent: () => JSX.Element;
    primaryKey: string;
    route: string;
    title: string;
  };
  selectedMenu: string;
  onMenuOptionClick: React.Dispatch<React.SetStateAction<string>>;
}

const MenuWrapper = styled(FlexBox)`
  width: 64px;
  background-color: #ffff;
  height: 100%;
  border-right: ${({ theme }) => theme.semantics.standardBorder};
`;

const PrimaryOptionsWrapper = styled(FlexBox)`
  padding-top: 15px;
`;

const SecondaryOptionWrapper = styled(FlexBox)`
  margin-bottom: 20px;
`;

const usePrimaryOptions = () => {
  // const [searchParams] = useSearchParams();
  // const noOfRecords = searchParams.get('noOfRecords') || '10';
  const isModuleAccessible = useModule<undefined>();
  const { t } = useTranslation();

  return [
    {
      iconComponent: () => <InsertChartOutlined />,
      primaryKey: 'dashboard',
      route: 'dashboard',
      title: t('dashboards'),
      hidden: !isModuleAccessible('dashboards'),
    },
    {
      iconComponent: () => (
        // <Badge color="primary" badgeContent={noOfRecords} max={999}>
        <TaskOutlined width="32px" height="32px" />
        // </Badge>
      ),
      primaryKey: 'tickets',
      route: 'tickets',
      title: t('tickets'),
      hidden: !isModuleAccessible('tickets'),
    },
    {
      iconComponent: () => <GroupOutlined />,
      primaryKey: 'customers',
      route: 'customers',
      title: t('customers'),
      hidden: false,
    },
    {
      iconComponent: () => <Chat />,
      primaryKey: 'chat',
      route: 'chat',
      title: t('chat'),
      hidden: !isModuleAccessible('chat'),
    },
    {
      iconComponent: () => <Article />,
      primaryKey: 'knowledge-base',
      route: 'knowledge-base',
      title: t('knowledge_base'),
      hidden: !isModuleAccessible('knowledge_base'),
    },
    {
      iconComponent: () => <SettingsOutlined />,
      primaryKey: 'configurations',
      route: 'configurations',
      title: t('configurations'),
      hidden: !isModuleAccessible('configurations'),
    },
  ];
};

const IconWrapper = styled(FlexBox)<{ $isOptionsSelected: boolean }>`
  ${({ $isOptionsSelected }) =>
    $isOptionsSelected
      ? css`
          background-color: ${({ theme }) => theme.pallete.purpleLight};
          color: ${({ theme }) => theme.pallete.primaryPurple};
        `
      : css`
          background-color: unset;
          color: ${({ theme }) => theme.pallete.grayNeutral};
          &:hover {
            background-color: ${({ theme }) => theme.others.sideMenuHoverColor};
          }
        `};
  height: 40px;
  width: 40px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
`;

export const SecondaryIconWrapper = styled(FlexBox)`
  background-color: unset;
  color: ${({ theme }) => theme.pallete.grayNeutral};
  height: 40px;
  width: 40px;
  border-radius: 6px;
  cursor: pointer;
`;

const PrimaryOption = React.memo((props: IPrimaryOptionProps) => {
  const { item, selectedMenu, onMenuOptionClick } = props;
  const { iconComponent, primaryKey, route, title } = item;
  const isOptionsSelected = React.useMemo(
    () => selectedMenu === primaryKey,
    [primaryKey, selectedMenu]
  );

  const onClick = React.useCallback(() => {
    onMenuOptionClick(primaryKey);
  }, [onMenuOptionClick, primaryKey]);

  return (
    <Tooltip title={title} arrow placement="right">
      <Link to={route}>
        <IconWrapper
          $isOptionsSelected={isOptionsSelected}
          alignItems="center"
          justifyContent="center"
          onClick={onClick}
        >
          {iconComponent()}
        </IconWrapper>
      </Link>
    </Tooltip>
  );
});

PrimaryOption.displayName = 'PrimaryOption';

const SecondaryOption = React.memo(() => {
  // const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  // const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
  //     setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //     setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);

  return (
    <>
      <ExotelCallControls />
      {/* <SecondaryIconWrapper onClick={handleClick} alignItems="center" justifyContent="center">
                <Tooltip title="Reminders" arrow placement="right">
                    <EventOutlined />
                </Tooltip>
            </SecondaryIconWrapper>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <ReminderContent />
            </Popover> */}
    </>
  );
});

SecondaryOption.displayName = 'SecondaryOption';

export const NavigationMenu = React.memo(() => {
  const match = useMatch(':module');
  const [selectedMenu, setMenu] = React.useState('');
  const primaryOptions = usePrimaryOptions();

  useEffect(() => {
    if (match?.params.module) {
      setMenu(match?.params.module);
    }
  }, [match]);

  return (
    <MenuWrapper flexDirection="column" justifyContent="space-between">
      <PrimaryOptionsWrapper
        gap="10px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {primaryOptions.map((item) => (
          <React.Fragment key={item.primaryKey}>
            {item.hidden ? null : (
              <PrimaryOption
                item={item}
                selectedMenu={selectedMenu}
                onMenuOptionClick={setMenu}
              />
            )}
          </React.Fragment>
        ))}
      </PrimaryOptionsWrapper>
      <SecondaryOptionWrapper
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <SecondaryOption />
      </SecondaryOptionWrapper>
    </MenuWrapper>
  );
});

NavigationMenu.displayName = 'NavigationMenu';
// const ReminderContent = () => {
//     return (
//         <FlexBox height="500px" width="300px">
//             <Typography variant="h5">Reminder content</Typography>
//         </FlexBox>
//     )
// }
