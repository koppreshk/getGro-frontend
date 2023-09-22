import React from "react"
import { NavigationMenu } from "../components"
import { TopNavigationMenu } from "../components/top-navigation-menu"

export const CoreLayoutPage = React.memo(() => {
    return (
        <>
            <TopNavigationMenu />
            <NavigationMenu />
        </>
    )
})