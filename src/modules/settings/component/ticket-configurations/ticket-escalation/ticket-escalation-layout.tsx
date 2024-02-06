import { Add } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { FlexBox } from "lib/ui-ux";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid"


export interface IUserData {
    firstName: string
    lastName: string
    age: number
    gender: string
    visits: number
    progress: number
}

export const usersData: IUserData[] = [{ "firstName": "Otha", "lastName": "Strickett", "age": 44, "gender": "Female", "visits": 80, "progress": 44 },
{ "firstName": "Robinia", "lastName": "Crutchfield", "age": 50, "gender": "Female", "visits": 49, "progress": 94 },
{ "firstName": "Gilli", "lastName": "Tison", "age": 38, "gender": "Female", "visits": 47, "progress": 43 },
{ "firstName": "Evy", "lastName": "Gontier", "age": 35, "gender": "Female", "visits": 76, "progress": 32 },
{ "firstName": "William", "lastName": "Fitzroy", "age": 48, "gender": "Male", "visits": 8, "progress": 92 },
{ "firstName": "Blinni", "lastName": "Aleksankin", "age": 33, "gender": "Female", "visits": 12, "progress": 55 },
{ "firstName": "Elysia", "lastName": "Goodliff", "age": 29, "gender": "Female", "visits": 9, "progress": 56 },
{ "firstName": "Gale", "lastName": "Erat", "age": 44, "gender": "Female", "visits": 8, "progress": 31 },
{ "firstName": "Any", "lastName": "Turton", "age": 38, "gender": "Male", "visits": 16, "progress": 86 },
{ "firstName": "Dorree", "lastName": "Ormonde", "age": 49, "gender": "Female", "visits": 13, "progress": 26 },
{ "firstName": "Kain", "lastName": "Langlands", "age": 32, "gender": "Male", "visits": 66, "progress": 86 },
{ "firstName": "Caty", "lastName": "Tremblett", "age": 21, "gender": "Female", "visits": 87, "progress": 60 },
{ "firstName": "Mauricio", "lastName": "Fransseni", "age": 20, "gender": "Male", "visits": 33, "progress": 66 },
{ "firstName": "Dieter", "lastName": "Marrill", "age": 49, "gender": "Male", "visits": 22, "progress": 47 },
{ "firstName": "Bogey", "lastName": "Gehrels", "age": 47, "gender": "Male", "visits": 26, "progress": 58 },
{ "firstName": "Thorin", "lastName": "Belderson", "age": 36, "gender": "Male", "visits": 79, "progress": 30 },
{ "firstName": "Penny", "lastName": "Gliddon", "age": 47, "gender": "Female", "visits": 1, "progress": 62 },
{ "firstName": "Craggie", "lastName": "Bryett", "age": 38, "gender": "Male", "visits": 12, "progress": 13 },
{ "firstName": "Leonie", "lastName": "Gillingham", "age": 40, "gender": "Female", "visits": 60, "progress": 67 },
{ "firstName": "Sonny", "lastName": "Tackley", "age": 27, "gender": "Male", "visits": 10, "progress": 36 },
{ "firstName": "Ruperta", "lastName": "Binnell", "age": 24, "gender": "Female", "visits": 14, "progress": 85 },
{ "firstName": "Gerick", "lastName": "Aupol", "age": 35, "gender": "Male", "visits": 87, "progress": 65 },
{ "firstName": "Sid", "lastName": "Thunders", "age": 46, "gender": "Male", "visits": 96, "progress": 56 },
{ "firstName": "Kareem", "lastName": "Bilsland", "age": 46, "gender": "Male", "visits": 6, "progress": 90 },
{ "firstName": "Pincus", "lastName": "Milier", "age": 44, "gender": "Male", "visits": 36, "progress": 59 },
{ "firstName": "Malinde", "lastName": "Scrymgeour", "age": 30, "gender": "Female", "visits": 19, "progress": 42 },
{ "firstName": "Humberto", "lastName": "Shepard", "age": 20, "gender": "Male", "visits": 7, "progress": 78 },
{ "firstName": "Marcy", "lastName": "Durman", "age": 32, "gender": "Female", "visits": 38, "progress": 35 },
{ "firstName": "Annamarie", "lastName": "Spykins", "age": 25, "gender": "Female", "visits": 16, "progress": 70 },
{ "firstName": "Arch", "lastName": "Swainston", "age": 43, "gender": "Male", "visits": 85, "progress": 13 },
{ "firstName": "Tudor", "lastName": "Cicccitti", "age": 45, "gender": "Male", "visits": 52, "progress": 33 },
{ "firstName": "Wilhelmina", "lastName": "Bernardoux", "age": 23, "gender": "Female", "visits": 47, "progress": 49 },
{ "firstName": "Hamlin", "lastName": "Pendrid", "age": 47, "gender": "Male", "visits": 22, "progress": 52 },
{ "firstName": "Pier", "lastName": "Paaso", "age": 50, "gender": "Female", "visits": 6, "progress": 77 },
{ "firstName": "Rudyard", "lastName": "Lineker", "age": 26, "gender": "Male", "visits": 4, "progress": 28 },
{ "firstName": "Krista", "lastName": "Pavolini", "age": 22, "gender": "Female", "visits": 28, "progress": 88 },
{ "firstName": "Melisent", "lastName": "Cleghorn", "age": 45, "gender": "Female", "visits": 5, "progress": 67 },
{ "firstName": "Yul", "lastName": "Harfleet", "age": 44, "gender": "Male", "visits": 39, "progress": 97 },
{ "firstName": "Chrissie", "lastName": "Powlett", "age": 47, "gender": "Male", "visits": 83, "progress": 26 },
{ "firstName": "Herschel", "lastName": "Redding", "age": 35, "gender": "Male", "visits": 40, "progress": 93 },
{ "firstName": "Godiva", "lastName": "McGowan", "age": 41, "gender": "Female", "visits": 62, "progress": 85 },
{ "firstName": "Merissa", "lastName": "Yandell", "age": 34, "gender": "Female", "visits": 45, "progress": 41 },
{ "firstName": "Barret", "lastName": "Musker", "age": 39, "gender": "Male", "visits": 3, "progress": 18 },
{ "firstName": "Hewitt", "lastName": "Thalmann", "age": 28, "gender": "Male", "visits": 95, "progress": 77 },
{ "firstName": "Whitby", "lastName": "Wendover", "age": 41, "gender": "Male", "visits": 27, "progress": 85 },
{ "firstName": "Aileen", "lastName": "De Brett", "age": 28, "gender": "Female", "visits": 89, "progress": 19 },
{ "firstName": "Laurie", "lastName": "Tunsley", "age": 23, "gender": "Male", "visits": 11, "progress": 75 },
{ "firstName": "Chalmers", "lastName": "Eady", "age": 28, "gender": "Male", "visits": 70, "progress": 28 },
{ "firstName": "Stillmann", "lastName": "Exposito", "age": 50, "gender": "Male", "visits": 78, "progress": 13 },
{ "firstName": "Faulkner", "lastName": "Reddlesden", "age": 37, "gender": "Male", "visits": 54, "progress": 90 },
{ "firstName": "Skelly", "lastName": "Witherby", "age": 20, "gender": "Male", "visits": 83, "progress": 45 },
{ "firstName": "Uri", "lastName": "Goch", "age": 35, "gender": "Male", "visits": 49, "progress": 63 },
{ "firstName": "Tessy", "lastName": "Ellsom", "age": 46, "gender": "Female", "visits": 84, "progress": 36 },
{ "firstName": "Ulrikaumeko", "lastName": "Boult", "age": 35, "gender": "Female", "visits": 71, "progress": 72 },
{ "firstName": "Mackenzie", "lastName": "Chinery", "age": 37, "gender": "Male", "visits": 70, "progress": 38 },
{ "firstName": "Constanta", "lastName": "Scuffham", "age": 33, "gender": "Female", "visits": 54, "progress": 35 },
{ "firstName": "Carmine", "lastName": "Leipoldt", "age": 35, "gender": "Male", "visits": 31, "progress": 70 },
{ "firstName": "Jaquelyn", "lastName": "Espley", "age": 22, "gender": "Female", "visits": 89, "progress": 82 },
{ "firstName": "Storm", "lastName": "Pietron", "age": 44, "gender": "Female", "visits": 70, "progress": 82 },
{ "firstName": "Kareem", "lastName": "Spurriar", "age": 32, "gender": "Male", "visits": 4, "progress": 69 },
{ "firstName": "Nestor", "lastName": "Stroder", "age": 36, "gender": "Male", "visits": 5, "progress": 23 },
{ "firstName": "Lidia", "lastName": "Wellsman", "age": 29, "gender": "Female", "visits": 67, "progress": 62 },
{ "firstName": "Jacinthe", "lastName": "Glazebrook", "age": 32, "gender": "Female", "visits": 78, "progress": 16 },
{ "firstName": "Redford", "lastName": "Yoslowitz", "age": 24, "gender": "Male", "visits": 82, "progress": 92 },
{ "firstName": "Griz", "lastName": "Mawhinney", "age": 42, "gender": "Male", "visits": 46, "progress": 59 },
{ "firstName": "Charil", "lastName": "Drewe", "age": 28, "gender": "Female", "visits": 48, "progress": 51 },
{ "firstName": "Thorstein", "lastName": "Creavin", "age": 49, "gender": "Male", "visits": 39, "progress": 11 },
{ "firstName": "Pearce", "lastName": "Gammade", "age": 49, "gender": "Male", "visits": 38, "progress": 55 },
{ "firstName": "Alwyn", "lastName": "Greenard", "age": 24, "gender": "Male", "visits": 14, "progress": 28 },
{ "firstName": "Manuel", "lastName": "Attwell", "age": 31, "gender": "Male", "visits": 22, "progress": 24 },
{ "firstName": "Timothy", "lastName": "Olenchenko", "age": 33, "gender": "Male", "visits": 48, "progress": 82 },
{ "firstName": "Mariska", "lastName": "Stidever", "age": 48, "gender": "Female", "visits": 44, "progress": 58 },
{ "firstName": "Daveen", "lastName": "Bourhill", "age": 47, "gender": "Female", "visits": 49, "progress": 95 },
{ "firstName": "Fonz", "lastName": "Struther", "age": 25, "gender": "Male", "visits": 68, "progress": 52 },
{ "firstName": "Chauncey", "lastName": "Dilliston", "age": 41, "gender": "Male", "visits": 12, "progress": 96 },
{ "firstName": "Ronny", "lastName": "Darell", "age": 27, "gender": "Male", "visits": 96, "progress": 66 },
{ "firstName": "Clive", "lastName": "Beere", "age": 44, "gender": "Male", "visits": 50, "progress": 96 },
{ "firstName": "Irvin", "lastName": "Droghan", "age": 38, "gender": "Male", "visits": 63, "progress": 14 },
{ "firstName": "Elicia", "lastName": "Cromwell", "age": 27, "gender": "Female", "visits": 15, "progress": 90 },
{ "firstName": "Glennie", "lastName": "Profit", "age": 49, "gender": "Female", "visits": 91, "progress": 46 },
{ "firstName": "Giulia", "lastName": "Audley", "age": 44, "gender": "Female", "visits": 46, "progress": 35 },
{ "firstName": "Gabby", "lastName": "Legrave", "age": 49, "gender": "Male", "visits": 96, "progress": 72 },
{ "firstName": "Janna", "lastName": "Utting", "age": 45, "gender": "Female", "visits": 28, "progress": 67 },
{ "firstName": "Ave", "lastName": "Muddicliffe", "age": 38, "gender": "Male", "visits": 33, "progress": 53 },
{ "firstName": "Nap", "lastName": "Bullion", "age": 35, "gender": "Male", "visits": 3, "progress": 100 },
{ "firstName": "Alleyn", "lastName": "Sibbs", "age": 30, "gender": "Male", "visits": 75, "progress": 42 },
{ "firstName": "Sharl", "lastName": "Christene", "age": 40, "gender": "Female", "visits": 42, "progress": 19 },
{ "firstName": "Rossy", "lastName": "Rodmell", "age": 49, "gender": "Male", "visits": 96, "progress": 86 },
{ "firstName": "Max", "lastName": "Bowfin", "age": 34, "gender": "Female", "visits": 33, "progress": 53 },
{ "firstName": "Marwin", "lastName": "O'Finan", "age": 26, "gender": "Male", "visits": 28, "progress": 18 },
{ "firstName": "Simonette", "lastName": "Gollin", "age": 42, "gender": "Female", "visits": 94, "progress": 19 },
{ "firstName": "Anthony", "lastName": "Harmon", "age": 49, "gender": "Male", "visits": 1, "progress": 14 },
{ "firstName": "Dee", "lastName": "Siegertsz", "age": 20, "gender": "Female", "visits": 82, "progress": 52 },
{ "firstName": "Constanta", "lastName": "Monkman", "age": 41, "gender": "Female", "visits": 53, "progress": 99 },
{ "firstName": "Thatch", "lastName": "Baggallay", "age": 38, "gender": "Male", "visits": 35, "progress": 48 },
{ "firstName": "Emelita", "lastName": "Beckwith", "age": 46, "gender": "Female", "visits": 1, "progress": 35 },
{ "firstName": "Almira", "lastName": "Ryburn", "age": 34, "gender": "Female", "visits": 100, "progress": 72 },
{ "firstName": "Torrence", "lastName": "Cornu", "age": 43, "gender": "Male", "visits": 41, "progress": 66 },
{ "firstName": "Roch", "lastName": "O' Liddy", "age": 44, "gender": "Female", "visits": 75, "progress": 45 },
{ "firstName": "Lucius", "lastName": "Rallinshaw", "age": 27, "gender": "Male", "visits": 96, "progress": 57 }];

const useColumns = () => {
    const columnHelper = createColumnHelper<IUserData>();

    const columns = [
        columnHelper.accessor("firstName", {
            id: 'firstName',
            // cell: info => info.getValue(),
            header: () => <span>First Name</span>,
        }),
        columnHelper.accessor("lastName", {
            id: 'lastName',
            cell: info => info.getValue(),
            header: () => <span>Last Name</span>,
        }),
        columnHelper.accessor("age", {
            id: 'age',
            cell: info => info.getValue(),
            header: () => <span>Age</span>,
        }),
        columnHelper.accessor("gender", {
            id: 'gender',
            cell: info => info.getValue(),
            header: () => <span>Gender</span>,
        }),
        columnHelper.accessor("visits", {
            id: 'visits',
            cell: info => info.getValue(),
            header: () => <span>Visits</span>,
        }),
        columnHelper.accessor("progress", {
            id: 'progress',
            cell: info => info.getValue(),
            header: () => <span>Progress</span>,
        })
    ]

    return columns;
}

export const TicketEscalationLayout = () => {
    const columns = useColumns();

    return (
        <FlexBox width="100%" flexDirection="column">
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <Typography variant="h5">Ticket Escalation</Typography>
                <Button variant="contained" startIcon={<Add />} >Add Escalation</Button>
            </FlexBox>
            <ConfigDataGrid columns={columns} data={usersData} />
        </FlexBox>
    )
}