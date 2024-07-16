import { AddExotelConfigurationForm } from "modules/settings/component/apps/marketplace/exotel-configuration"


export const AddExotelConfigurationContainer = (props: { togglePopup: () => void; }) => {
    return (
        <AddExotelConfigurationForm togglePopup={props.togglePopup} />
    )
}