import React from "react";

export interface ITicketConversation {
    customerName: string;
    custumerQuery?: string;
    agentName: string;
    agentQuery?: string;
}

const hardcodedData = [{ "customerName": "Emlen Oakeby", "custumerQuery": "Dilate L Verteb Art, Bifurc, w 2 Drug-elut, Perc", "agentName": "Eleonore Kulas", "agentQuery": undefined },
{ "customerName": "Sadella Farrow", "custumerQuery": undefined, "agentName": "Heddie Kobus", "agentQuery": "Clos endoscopic lung bx" },
{ "customerName": "Rosita Shapero", "custumerQuery": "Removal of Synthetic Substitute from Larynx, Endo", "agentName": "Cornelius Eveque", "agentQuery": undefined },
{ "customerName": "Enrico Francais", "custumerQuery": undefined, "agentName": "Wainwright Nussgen", "agentQuery": "Imp/rep mchan cochl pros" },
{ "customerName": "Odella Profit", "custumerQuery": "Removal of Infusion Device from R Low Extrem, Perc Approach", "agentName": "Weber Loughman", "agentQuery": undefined },
{ "customerName": "Sheeree Caudelier", "custumerQuery": undefined, "agentName": "Arch Kullmann", "agentQuery": "GI tract instillat NEC" },
{ "customerName": "Krishnah Boase", "custumerQuery": "Supplement Colic Vein with Nonaut Sub, Open Approach", "agentName": "Albie Walburn", "agentQuery": "Oth chest cage ostectomy" },
{ "customerName": "Doug Hearons", "custumerQuery": undefined, "agentName": "Nehemiah Du Fray", "agentQuery": "Renal operation NEC" },
{ "customerName": "Gun Binder", "custumerQuery": "Insertion of Int Fix into R Tibia, Perc Endo Approach", "agentName": "Franz Humberston", "agentQuery": undefined },
{ "customerName": "Ferd Halliwell", "custumerQuery": undefined, "agentName": "Danell Fosten", "agentQuery": "Auxiliary liver transpl" }]

export const useTicketConversation = () => {
    const [isLoading, setLoading] = React.useState<boolean | undefined>(false);
    const [data, setData] = React.useState<ITicketConversation[]>([]);

    const getData = async () => {
        return new Promise<ITicketConversation[]>((res) => {
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