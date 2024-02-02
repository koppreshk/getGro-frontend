import styled from "styled-components";
import { Drawer, DrawerProps, IconButton, Typography } from "@mui/material"
import { FlexBox } from "../flexbox/flexbox";
import { Close } from "@mui/icons-material";

interface IDrawerExtendedProps extends DrawerProps {
    header?: string | (() => React.ReactNode);
    /**
     * Default width of this drawer component is 420px, if not given any value, 420px is considered
     */
    width?: '420px' | '500px' | '800px';
    onRenderContent?: () => React.ReactNode;
}

const HeaderWrapper = styled(FlexBox)`
    padding: 20px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

export const DrawerExtended = (props: IDrawerExtendedProps) => {
    const { onRenderContent, header, width = '420px', ...rest } = props;
    return (
        <Drawer {...rest}>
            <FlexBox width={width} height="100%" flexDirection="column">
                {typeof header === 'string'
                    ? <HeaderWrapper width="100%" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">{header}</Typography>
                        <IconButton aria-label="Close" onClick={(ev) => rest?.onClose && rest?.onClose(ev, 'escapeKeyDown')}>
                            <Close />
                        </IconButton>
                    </HeaderWrapper>
                    : header ? header() : null}
                {onRenderContent ? onRenderContent() : null}
            </FlexBox>
        </Drawer>
    )
}