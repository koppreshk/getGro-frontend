import React from "react";

export interface ITicketConversation {
    customerName: string;
    agentName: string;
    chatConversation: {
        custumerQuery?: string;
        agentQuery?: string;
    }[]
}

const hardcodedData = {
    customerName: 'Emlen Oakeby',
    agentName: 'Heddie Kobus',
    chatConversation: [
        { "custumerQuery": "Dilate L Verteb Art, Bifurc, w 2 Drug-elut, Perc", "agentQuery": undefined },
        { "custumerQuery": undefined, "agentQuery": "Clos endoscopic lung bx" },
        { "custumerQuery": "Removal of Synthetic Substitute from Larynx, Endo", "agentQuery": undefined },
        { "custumerQuery": undefined, "agentQuery": "Imp/rep mchan cochl pros" },
        { "custumerQuery": "Removal of Infusion Device from R Low Extrem, Perc Approach", "agentQuery": undefined },
        { "custumerQuery": undefined, "agentQuery": "GI tract instillat NEC" },
        { "custumerQuery": "Supplement Colic Vein with Nonaut Sub, Open Approach", "agentQuery": "Oth chest cage ostectomy" },
        { "custumerQuery": undefined, "agentQuery": "Renal operation NEC" },
        { "custumerQuery": "Insertion of Int Fix into R Tibia, Perc Endo Approach", "agentQuery": undefined },
        { "custumerQuery": undefined, "agentQuery": "Auxiliary liver transpl" }]
}

export const useTicketConversation = () => {
    const [isLoading, setLoading] = React.useState<boolean | undefined>(false);
    const [data, setData] = React.useState<ITicketConversation>({} as ITicketConversation);

    const getData = async () => {
        return new Promise<ITicketConversation>((res) => {
            setTimeout(() => {
                res(hardcodedData)
            }, 3000)
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