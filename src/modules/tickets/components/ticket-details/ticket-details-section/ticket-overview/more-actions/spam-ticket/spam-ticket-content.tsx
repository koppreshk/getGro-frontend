import { FlexBox, MoreInformation } from 'lib/ui-ux';

export const SpamTicketContent = () => {
  return (
    <FlexBox flexDirection="column" gap={'10px'}>
      <MoreInformation
        information="When you mark a ticket as spam, the following actions will happen:"
        type="warning"
      />
      <ul>
        <li style={{ marginBottom: '5px' }}>
          The requester of the ticket will be blocked and will not be able to
          create a new ticket or access their existing tickets.
        </li>
        <li style={{ marginBottom: '5px' }}>
          All current and future tickets from the contact will be marked as
          spam.
        </li>
        <li>
          To recover the ticket, you'll need to restore it from the Spam Tickets
          view and unblock the user.
        </li>
      </ul>
    </FlexBox>
  );
};
