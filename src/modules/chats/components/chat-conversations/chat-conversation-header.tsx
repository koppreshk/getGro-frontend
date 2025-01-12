import { DeleteOutlined, OpenInNew } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { useAppSelector } from 'lib/hooks';
import { FlexBox, MoreActions } from 'lib/ui-ux';
import { ChatConversationById, ChatType } from 'modules/chats/apis';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { DeleteConversation } from './delete-conversation';
import { CustomSourceAvatar } from '../chat-list/custom-source-avatar';

interface ChatConversationHeaderProps
  extends Pick<ChatConversationById, 'profile_name' | 'profile_number'> {}

const getParsedChatType = (chatType: string) => {
  switch (chatType) {
    case ChatType.InstagramComment:
      return (
        <span>
          Commented on <b>instagram</b> post
        </span>
      );
    case ChatType.InstagramMessage:
      return (
        <span>
          Messaged on <b>instagram</b>
        </span>
      );
    case ChatType.FacebookPageMessage:
      return (
        <span>
          Messaged on <b>facebook</b>
        </span>
      );
    case ChatType.FacebookPageComment:
      return (
        <span>
          Commented on <b>facebook</b> post
        </span>
      );
    default:
      return chatType.split('_').join(' ');
  }
};

interface MenuRendererProps {
  selectedMenu?: string;
  showDrawer: DrawerDisplayTypes;
  toggleDrawerDisplay: (key: string) => void;
}

const MenuRenderer = (props: MenuRendererProps) => {
  const { selectedMenu, showDrawer, toggleDrawerDisplay } = props;

  switch (selectedMenu) {
    case 'deleteConversation':
      return (
        <DeleteConversation
          showDialog={showDrawer.deleteConversation}
          onCloseDrawer={() => toggleDrawerDisplay('deleteConversation')}
        />
      );
    default:
      return <></>;
  }
};

enum MoreActionsEnum {
  deleteConversation = 'deleteConversation',
}

type DrawerDisplayTypes = {
  [key in MoreActionsEnum]: boolean;
};

export const ChatSubHeading = (props: {
  profileNumber: string;
  isPostVisible: boolean;
}) => {
  const chatDetails = useAppSelector((state) => state.chat.chatDetails);
  const { pallete } = useTheme();
  const { isPostVisible = false } = props;
  const { t } = useTranslation();

  return (
    <FlexBox flexDirection="column">
      <Typography variant="h6">{chatDetails?.customer_name}</Typography>
      {chatDetails?.chat_source === 'whatsapp' ? (
        <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>
          {props.profileNumber}
        </Typography>
      ) : (
        <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>
          {' '}
          {chatDetails?.chat_type
            ? getParsedChatType(chatDetails.chat_type)
            : null}
        </Typography>
      )}
      {chatDetails?.post_url && isPostVisible && (
        <Link
          href={chatDetails.post_url}
          underline="none"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginTop: '5px',
          }}
        >
          <OpenInNew />
          {t('view_post')}
        </Link>
      )}
    </FlexBox>
  );
};

export const ChatConversationHeader = (props: ChatConversationHeaderProps) => {
  const { profile_number } = props;
  const chatDetails = useAppSelector((state) => state.chat.chatDetails);
  const { t } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState<string | undefined>();
  const [showDrawer, setDrawerDisplay] = useState<DrawerDisplayTypes>({
    deleteConversation: false,
  });

  const toggleDrawerDisplay = (key: string) => {
    setDrawerDisplay((prev) => ({
      ...prev,
      [key]: !prev[key as keyof DrawerDisplayTypes],
    }));
  };

  const onMenuItemSelect = (key: string) => {
    setSelectedMenu(key);
    toggleDrawerDisplay(key);
  };

  return (
    <FlexBox
      gap={'10px'}
      padding="15px 10px"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <FlexBox width="80%" gap={'10px'} alignItems="center">
        <CustomSourceAvatar
          customer_name={chatDetails?.customer_name ?? ''}
          chat_source={chatDetails?.chat_source ?? ''}
          chat_type={chatDetails!.chat_type}
        />
        <ChatSubHeading profileNumber={profile_number} isPostVisible={false} />
      </FlexBox>
      <MoreActions
        onMenuItemSelect={onMenuItemSelect}
        menuItems={[
          {
            key: MoreActionsEnum.deleteConversation,
            label: t('delete_conversation'),
            icon: <DeleteOutlined />,
          },
        ]}
      />
      <MenuRenderer
        selectedMenu={selectedMenu}
        showDrawer={showDrawer}
        toggleDrawerDisplay={toggleDrawerDisplay}
      />
    </FlexBox>
  );
};
