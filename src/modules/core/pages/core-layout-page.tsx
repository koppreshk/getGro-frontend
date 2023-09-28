import React from "react"
import { NavigationMenu } from "../components"
import { Toolbar } from "../components/toolbar"
import { DataGrid, FlexBox, columns, defaultData } from "lib/ui-ux"
import { Routes, Route, Navigate } from "react-router-dom"

export const CoreLayoutPage = React.memo(() => {
    return (
        <>
            <Toolbar />
            <FlexBox $width="100%" $height="100%">
                <NavigationMenu />
                <div style={{ width: 'calc(100% - 64px)' }}>
                    <Routes>
                        <Route key="home-route" path="/" element={<Navigate to="/route1" />} />
                        <Route element={<DataGrid columns={columns} data={defaultData} />} key="route1" path="/route1" />
                    </Routes>
                </div>
            </FlexBox>
        </>
    )
})