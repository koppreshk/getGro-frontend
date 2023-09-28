import React from "react"
import { NavigationMenu } from "../components"
import { TopNavigationMenu } from "../components/top-navigation-menu"
import { DataGrid, FlexBox, columns, defaultData } from "lib/ui-ux"
import { Routes, Route } from "react-router-dom"

export const CoreLayoutPage = React.memo(() => {
    return (
        <>
            <TopNavigationMenu />
            <FlexBox $width="100%" $height="100%">
                <NavigationMenu />
                <Routes>
                    <Route element={<DataGrid columns={columns} data={defaultData} />} key="route1" path="/route1" />
                </Routes>
            </FlexBox>
        </>
    )
})