// whatsapp_gupshup_app, 
// whatsapp_gupshup_api_key, 
// whatsapp_gupshup_number

import { AddWhatsAppGupshupConfigForm } from "modules/settings/component/apps/marketplace/gupshup"


export const AddWhatsAppGupShupConfigContainer = (props: { togglePopup: () => void; }) => {
    return (
        <AddWhatsAppGupshupConfigForm togglePopup={props.togglePopup}/>
    )
}