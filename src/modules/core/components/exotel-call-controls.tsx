/// <reference types="vite-plugin-svgr/client" />

import ExotelSmallIcon from '../../../assets/svg/exotel-icon-small.svg?react';
import { Tooltip } from "@mui/material";
import { TelephonicDialer } from "modules/tickets/components/ticket-details/ticket-conversation/telephonic-conversations";
import React, { useCallback } from "react";
import { SecondaryIconWrapper } from './navigation-menu';
import { useFetchExotelConfiguration } from 'modules/settings/apis/marketplace/exotel';

export const ExotelCallControls = () => {
    const { data } = useFetchExotelConfiguration();

    const [openCallPopUp, setOpenCallPopUp] = React.useState(false);

    const toggleCallBtn = useCallback(() => {
        setOpenCallPopUp((prevValue) => !prevValue)
    }, []);

    if (data && Object.keys(data).length) {
        return (
            <>
                <Tooltip title="Exotel" arrow placement="right">
                    <SecondaryIconWrapper alignItems="center" justifyContent="center" onClick={toggleCallBtn}>
                        <ExotelSmallIcon width={'20px'} height={'20px'} />
                    </SecondaryIconWrapper>
                </Tooltip>
                <TelephonicDialer openCallPopUp={openCallPopUp} toggleCallBtn={toggleCallBtn} />
            </>
        )
    }
}