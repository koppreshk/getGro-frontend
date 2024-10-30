import React from "react";

export interface ITicketConversation {
    customerName: string;
    agentName: string;
    chatConversation: {
        custumerQuery?: string;
        agentQuery?: string;
        agtMsgDeliveryStatus?: string;
        date: string;
    }[]
}

const hardcodedData = {
    customerName: 'Emlen Oakeby',
    agentName: 'Heddie Kobus',
    chatConversation: [
        { "custumerQuery": "Dilate L Verteb Art, Bifurc, w 2 Drug-elut, Perc", "agentQuery": undefined, date: "2024-03-25T02:00:00Z" },
        { "custumerQuery": undefined, "agentQuery": "Clos endoscopic lung bx", "agtMsgDeliveryStatus": "sent", date: "2024-03-25T05:00:00Z" },
        { "custumerQuery": "Removal of Synthetic Substitute from Larynx, Endo", "agentQuery": undefined, date: "2024-03-25T07:00:00Z" },
        { "custumerQuery": undefined, "agentQuery": "Imp/rep mchan cochl pros", "agtMsgDeliveryStatus": "delivered", date: "2024-03-25T12:00:00Z" },
        { "custumerQuery": "Removal of Infusion Device from R Low Extrem, Perc Approach", "agentQuery": undefined, date: "2024-03-25T13:00:00Z" },
        { "custumerQuery": undefined, "agentQuery": "GI tract instillat NEC", "agtMsgDeliveryStatus": "delivered", date: "2024-03-25T13:00:00Z" },
        { "custumerQuery": "Supplement Colic Vein with Nonaut Sub, Open Approach", "agentQuery": "Oth chest cage ostectomy", "agtMsgDeliveryStatus": "sent", date: "2024-03-25T13:50:00Z" },
        { "custumerQuery": undefined, "agentQuery": "Renal operation NEC", "agtMsgDeliveryStatus": "read", date: "2024-03-25T16:00:00Z" },
        { "custumerQuery": "Insertion of Int Fix into R Tibia, Perc Endo Approach", "agentQuery": undefined, date: "2024-03-25T16:45:00Z" },
        { "custumerQuery": undefined, "agentQuery": "Auxiliary liver transpl", "agtMsgDeliveryStatus": "read", date: "2024-03-25T17:45:00Z" }]
}

export const useTicketConversation = () => {
    const [isLoading, setLoading] = React.useState<boolean | undefined>(false);
    const [data, setData] = React.useState<ITicketConversation>({} as ITicketConversation);

    const getData = async () => {
        return new Promise<ITicketConversation>((res) => {
            setTimeout(() => {
                res(hardcodedData)
            }, 1000)
        })
    }

    React.useEffect(() => {
        setLoading(true);
        getData()
            .then((res) => {
                setData(res);
                setLoading(false);
            });
    }, []);

    return { isLoading, data };
}