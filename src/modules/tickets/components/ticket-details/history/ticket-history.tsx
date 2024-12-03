
import { ChatHistory } from "lib/ui-ux";
import { TicketsHistory } from "modules/tickets/apis";
import styled from "styled-components";

// const useColumns = () => {
//     const columnHelper = createColumnHelper<TicketsHistory>();

//     const columns = [
//         columnHelper.accessor("description", {
//             id: 'description',
//             cell: info => info.getValue(),
//             header: () => 'Description',
//             meta: {
//                 disableColReorder: true
//             },
//             minSize: 230
//         }),
//         columnHelper.accessor("createdAt", {
//             id: 'createdAt',
//             cell: info => getFormattedDate(info.getValue(), { dateStyle: 'short', timeStyle: 'short' }),
//             header: () => 'Created At',
//             enableResizing: false,
//             meta: {
//                 disableColReorder: true
//             }
//         }),
//         columnHelper.accessor("userName", {
//             id: 'userName',
//             cell: info => info.getValue() ?? '-',
//             header: () => 'User Name',
//             enableResizing: false,
//             meta: {
//                 disableColReorder: true
//             }
//         })
//     ]

//     return columns;
// }

const StyledChatHistory = styled(ChatHistory)`
  padding: 0;  
`;

export const TicketHistory = (props: { data: TicketsHistory[] }) => {
    const { data } = props;
    // const columns = useColumns();

    return (
        <>
            <StyledChatHistory historyData={data.map((item) => ({ created_at: item.createdAt, history: item.description, user: item.userName }))} useTimeAgoDate />
            {/* <DataGrid columns={columns} data={data} /> */}
        </>
    )
}