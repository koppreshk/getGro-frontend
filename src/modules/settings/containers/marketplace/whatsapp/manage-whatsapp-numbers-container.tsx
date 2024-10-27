import { useFetchWhatsAppNumbers } from "modules/settings/apis/marketplace/whatsapp";
import { ManageWhatsAppNumbersLayout } from "modules/settings/component/apps/marketplace/whatsapp";

export const ManageWhatsAppNumbersContainer = () => {
    const { data, isLoading } = useFetchWhatsAppNumbers();

    if (data || isLoading) {
        return (
            <ManageWhatsAppNumbersLayout data={data} isLoading={isLoading} />
        )
    }
}