import { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material"
import { CustomIconButton, FlexBox } from "lib/ui-ux"
import styled from "styled-components"
import { EmailConversations, IEmailFormFields } from "./email-conversations";
import { UnfoldMore, UnfoldLess, Print } from '@mui/icons-material';
import { Conversations, ITicketById } from "modules/tickets/apis";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";
import './printable-content.css';
import { EmailThreadOptions } from "./email-thread-options";
import { FormProvider, useForm } from "react-hook-form";
// import { useSocket } from "lib/providers/socket";

const LayoutWrapper = styled(FlexBox)`
`;

export interface IEmailConversations extends Conversations {
    isCollapsed: boolean;
}

const useEmailActionHelpers = () => {
    const [showEditor, setShowEditor] = useState(false);

    const toggleEditorView = useCallback(() => {
        setShowEditor(!showEditor);
    }, [showEditor]);

    return {
        showEditor,
        toggleEditorView
    }
}

export const EmailConversationLayout = (props: { conversationsData: ITicketById, fetchNewThreads: () => void; }) => {
    const { conversationsData, fetchNewThreads } = props;
    const { subject, conversations, thread_id: threadId } = conversationsData;
    const casedConversation = conversations.map(item => ({ ...toCamelCasedKeysFromUnderScores(item), isCollapsed: true })) as IEmailConversations[];
    // const { socket } = useSocket();
    const formContext = useForm<IEmailFormFields>();
    const [emailThreads, setEmailThreads] = useState(casedConversation);
    const { showEditor: showReplyEditor, toggleEditorView: toggleReplyEditorView } = useEmailActionHelpers();
    const { showEditor, toggleEditorView } = useEmailActionHelpers();

    useEffect(() => {
        if (casedConversation.length !== emailThreads.length) {
            setEmailThreads(casedConversation);
        }
        // socket.on('production_email_channel', (_info) => {
        //     //TODO: need to use this info obj which contains id and has to be consumed
        //     fetchNewThreads();
        // })
        // return () => {
        //     socket.off('production_email_channel')
        // }
    }, [casedConversation, casedConversation.length, emailThreads.length, fetchNewThreads]);

    const onPrintHandler = () => {
        window.print();
    }

    const onSingleEmailCollapseHandler = (args: { messageId: string, isCollapsed: boolean }) => {
        const modifiedEmailThreads = emailThreads.slice().map((item) => {
            if (item.messageId === args.messageId) {
                return {
                    ...item,
                    isCollapsed: args.isCollapsed
                }
            }
            return item;
        })!;
        setEmailThreads(modifiedEmailThreads)
    }

    const onExpandAll = () => setEmailThreads(emailThreads.slice().map((item) => ({ ...item, isCollapsed: false })));
    const onCollapseAll = () => setEmailThreads(emailThreads.slice().map((item) => ({ ...item, isCollapsed: true })));

    const isCollapsedAll = emailThreads.every((item) => item.isCollapsed);

    const onReplyClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
        ev.stopPropagation();
        toggleReplyEditorView();
        showEditor && toggleEditorView();
    }, [showEditor, toggleEditorView, toggleReplyEditorView])

    const onForwardClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((ev) => {
        ev.stopPropagation();
        formContext.setValue('forward.editor', emailThreads[emailThreads.length - 1].htmlContent);
        toggleEditorView();
        showReplyEditor && toggleReplyEditorView();
    }, [emailThreads, formContext, showReplyEditor, toggleEditorView, toggleReplyEditorView])

    return (
        <FormProvider {...formContext}>
            <LayoutWrapper id="printable-content" flexDirection="column" gap="10px" width="100%" height="100%">
                <FlexBox justifyContent="space-between" alignItems="center" padding="0px 16px 0px 0px">
                    <Typography variant="h5" title={subject} textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace='nowrap' width={'calc(100% - 90px)'}>{subject}</Typography>
                    <FlexBox gap="10px">
                        {!isCollapsedAll ? <EmailThreadOptions onReplyClick={onReplyClick} onForwardClick={onForwardClick} /> : null}
                        {
                            isCollapsedAll ?
                                <CustomIconButton className="no-print" tooltipProps={{ title: 'Expand all' }} iconComponent={<UnfoldMore />} sx={{ width: '24px', height: '24px' }} onClick={onExpandAll} />
                                :
                                <CustomIconButton className="no-print" tooltipProps={{ title: 'Collapse all' }} iconComponent={<UnfoldLess />} sx={{ width: '24px', height: '24px' }} onClick={onCollapseAll} />
                        }
                        <CustomIconButton tooltipProps={{ title: 'Print all' }} iconComponent={<Print />} sx={{ width: '24px', height: '24px' }} onClick={onPrintHandler} />
                    </FlexBox>
                </FlexBox>
                <EmailConversations
                    subject={subject}
                    isCollapsedAll={isCollapsedAll}
                    emailThreads={emailThreads}
                    showEditor={showEditor}
                    showReplyEditor={showReplyEditor}
                    threadId={threadId}
                    toggleEditorView={toggleEditorView}
                    toggleReplyEditorView={toggleReplyEditorView}
                    onSingleEmailCollapseHandler={onSingleEmailCollapseHandler} />
            </LayoutWrapper>
        </FormProvider>
    )
}