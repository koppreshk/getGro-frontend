import { useMemo, useState } from 'react'
import {
    PaginationState,
    Row,
    SortingState, Table, TableOptions, createColumnHelper,
    getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable
} from '@tanstack/react-table'
import { Checkbox, Skeleton } from '@mui/material'
import styled from 'styled-components'
import { TableHeader } from './parts/table-header'
import { TableBody } from './parts/table-body'
import { TableControls } from './parts/table-controls'
import { FlexBox } from '../flexbox/flexbox'

export interface IDataGridProps<T> extends Pick<TableOptions<T>, 'data' | 'columns'> {
    onRenderHeader?: (table: Table<T>) => React.ReactNode;
    onRowClick?: (row: Row<T>) => void;
    isLoading?: boolean;
}

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const TableWrapper = styled(FlexBox)`
    overflow: auto;
    width: 100%;
    height: calc(100% - 120px);
`;

const DataGridWrapper = styled(FlexBox)`
    width: 100%;
    height: 100%;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table, td, th {
        text-align: left;
        padding: 8px;
    }
    tr {
        border-bottom: 1px solid #e9ebed;
    }
    tbody > tr:hover {
        border-bottom-color: #cee2f2;
        background-color: #1f73b714;
    }
`;


export const defaultData: Person[] = [{ "firstName": "Bonny", "lastName": "Jaggers", "age": 60, "visits": 49, "status": "vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse", "progress": 31 },
{ "firstName": "Laura", "lastName": "Lamprecht", "age": 9, "visits": 4, "status": "facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque", "progress": 29 },
{ "firstName": "Lani", "lastName": "Elsip", "age": 76, "visits": 43, "status": "erat volutpat in congue etiam justo etiam pretium iaculis justo in", "progress": 11 },
{ "firstName": "Collen", "lastName": "Dewan", "age": 72, "visits": 47, "status": "blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci", "progress": 56 },
{ "firstName": "Robbert", "lastName": "Rossbrook", "age": 14, "visits": 72, "status": "pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa", "progress": 24 },
{ "firstName": "Evangelin", "lastName": "Roger", "age": 28, "visits": 85, "status": "nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan", "progress": 22 },
{ "firstName": "Vanessa", "lastName": "Monson", "age": 45, "visits": 97, "status": "iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque", "progress": 8 },
{ "firstName": "Ferrell", "lastName": "Martt", "age": 28, "visits": 23, "status": "augue aliquam erat volutpat in congue etiam justo etiam pretium", "progress": 97 },
{ "firstName": "Marie-jeanne", "lastName": "Sextone", "age": 24, "visits": 84, "status": "sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus", "progress": 17 },
{ "firstName": "Jose", "lastName": "Myford", "age": 10, "visits": 47, "status": "ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit", "progress": 42 },
{ "firstName": "Zia", "lastName": "Hayball", "age": 47, "visits": 41, "status": "duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu", "progress": 73 },
{ "firstName": "Gasparo", "lastName": "Dover", "age": 4, "visits": 4, "status": "rutrum nulla nunc purus phasellus in felis donec semper sapien a libero", "progress": 53 },
{ "firstName": "Heloise", "lastName": "Sitlinton", "age": 62, "visits": 85, "status": "aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis", "progress": 20 },
{ "firstName": "Madel", "lastName": "Wickey", "age": 6, "visits": 27, "status": "massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada", "progress": 60 },
{ "firstName": "Royce", "lastName": "Rossin", "age": 33, "visits": 90, "status": "sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc", "progress": 15 },
{ "firstName": "Rania", "lastName": "Cheltnam", "age": 24, "visits": 82, "status": "in felis eu sapien cursus vestibulum proin eu mi nulla ac", "progress": 56 },
{ "firstName": "Craggy", "lastName": "Stoner", "age": 36, "visits": 71, "status": "ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus", "progress": 28 },
{ "firstName": "Emily", "lastName": "Colquite", "age": 81, "visits": 82, "status": "nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia", "progress": 78 },
{ "firstName": "Rockwell", "lastName": "Clever", "age": 64, "visits": 58, "status": "habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem", "progress": 8 },
{ "firstName": "Datha", "lastName": "Derl", "age": 6, "visits": 86, "status": "vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue", "progress": 100 },
{ "firstName": "Deane", "lastName": "Ledingham", "age": 74, "visits": 77, "status": "porttitor pede justo eu massa donec dapibus duis at velit eu est congue", "progress": 42 },
{ "firstName": "Diane-marie", "lastName": "Wethered", "age": 72, "visits": 71, "status": "imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce", "progress": 44 },
{ "firstName": "Kassi", "lastName": "Ivett", "age": 4, "visits": 1, "status": "turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget", "progress": 82 },
{ "firstName": "Leonhard", "lastName": "De Caroli", "age": 21, "visits": 19, "status": "ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec", "progress": 7 },
{ "firstName": "Dorian", "lastName": "Soame", "age": 44, "visits": 5, "status": "rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus", "progress": 90 },
{ "firstName": "Maritsa", "lastName": "Labb", "age": 12, "visits": 88, "status": "convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices", "progress": 64 },
{ "firstName": "Lynsey", "lastName": "Bagnall", "age": 98, "visits": 44, "status": "turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor", "progress": 66 },
{ "firstName": "Gothart", "lastName": "Padberry", "age": 38, "visits": 9, "status": "euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin", "progress": 48 },
{ "firstName": "Midge", "lastName": "Jaynes", "age": 52, "visits": 16, "status": "odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique", "progress": 81 },
{ "firstName": "Demott", "lastName": "Lethabridge", "age": 21, "visits": 39, "status": "turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum", "progress": 50 },
{ "firstName": "Reena", "lastName": "Oswick", "age": 53, "visits": 60, "status": "quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in", "progress": 40 },
{ "firstName": "Davy", "lastName": "Halvosen", "age": 3, "visits": 97, "status": "convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis", "progress": 48 },
{ "firstName": "Marielle", "lastName": "Wickes", "age": 22, "visits": 92, "status": "duis faucibus accumsan odio curabitur convallis duis consequat dui nec", "progress": 22 },
{ "firstName": "Lizette", "lastName": "Prescot", "age": 56, "visits": 35, "status": "posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat", "progress": 2 },
{ "firstName": "Anthony", "lastName": "Thalmann", "age": 64, "visits": 1, "status": "tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna", "progress": 23 },
{ "firstName": "Abbey", "lastName": "Coslett", "age": 99, "visits": 15, "status": "etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst", "progress": 80 },
{ "firstName": "Hettie", "lastName": "Rebert", "age": 46, "visits": 68, "status": "porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris", "progress": 65 },
{ "firstName": "Welch", "lastName": "Hawket", "age": 42, "visits": 51, "status": "platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer", "progress": 99 },
{ "firstName": "Mortimer", "lastName": "Kirsche", "age": 43, "visits": 17, "status": "amet turpis elementum ligula vehicula consequat morbi a ipsum integer", "progress": 84 },
{ "firstName": "Ajay", "lastName": "Cheesworth", "age": 37, "visits": 48, "status": "maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat", "progress": 58 },
{ "firstName": "Fran", "lastName": "Oswal", "age": 97, "visits": 97, "status": "mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta", "progress": 97 },
{ "firstName": "Slade", "lastName": "Anwyl", "age": 46, "visits": 12, "status": "non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales", "progress": 9 },
{ "firstName": "Jinny", "lastName": "Popworth", "age": 65, "visits": 52, "status": "sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus", "progress": 36 },
{ "firstName": "Electra", "lastName": "Lapsley", "age": 91, "visits": 53, "status": "morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in", "progress": 57 },
{ "firstName": "Dasi", "lastName": "Woodus", "age": 72, "visits": 12, "status": "curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo", "progress": 84 },
{ "firstName": "Dru", "lastName": "Toten", "age": 31, "visits": 36, "status": "ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo", "progress": 92 },
{ "firstName": "Kizzie", "lastName": "Hughes", "age": 73, "visits": 99, "status": "aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse", "progress": 36 },
{ "firstName": "Omar", "lastName": "Godbold", "age": 76, "visits": 3, "status": "ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae", "progress": 41 },
{ "firstName": "Carleton", "lastName": "Deetch", "age": 86, "visits": 81, "status": "et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut", "progress": 33 },
{ "firstName": "Peter", "lastName": "Louche", "age": 26, "visits": 67, "status": "tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis", "progress": 34 },
{ "firstName": "Tera", "lastName": "Dungey", "age": 52, "visits": 47, "status": "orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet", "progress": 87 },
{ "firstName": "Brade", "lastName": "Klimschak", "age": 27, "visits": 76, "status": "integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed", "progress": 54 },
{ "firstName": "Lynne", "lastName": "O'Hengerty", "age": 4, "visits": 13, "status": "posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc", "progress": 41 },
{ "firstName": "Valli", "lastName": "Guilder", "age": 13, "visits": 100, "status": "risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus", "progress": 25 },
{ "firstName": "Uta", "lastName": "MacTeggart", "age": 74, "visits": 1, "status": "curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem", "progress": 44 },
{ "firstName": "Hogan", "lastName": "Oldis", "age": 2, "visits": 64, "status": "eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in", "progress": 51 },
{ "firstName": "Corinna", "lastName": "Romain", "age": 74, "visits": 92, "status": "sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt", "progress": 10 },
{ "firstName": "Cosmo", "lastName": "Hyde", "age": 94, "visits": 84, "status": "magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia", "progress": 95 },
{ "firstName": "Brooke", "lastName": "Shotboulte", "age": 11, "visits": 95, "status": "praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante", "progress": 5 },
{ "firstName": "Olympe", "lastName": "Ladel", "age": 82, "visits": 92, "status": "amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo", "progress": 89 },
{ "firstName": "Greg", "lastName": "Waycott", "age": 14, "visits": 27, "status": "mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem", "progress": 39 },
{ "firstName": "Junia", "lastName": "Loachhead", "age": 56, "visits": 55, "status": "sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum", "progress": 31 },
{ "firstName": "Gertrudis", "lastName": "Fallowes", "age": 27, "visits": 11, "status": "nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut", "progress": 98 },
{ "firstName": "Sena", "lastName": "Wildish", "age": 60, "visits": 30, "status": "mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at", "progress": 32 },
{ "firstName": "Beryle", "lastName": "de Mendoza", "age": 82, "visits": 100, "status": "quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis", "progress": 40 },
{ "firstName": "Hinze", "lastName": "Borton", "age": 7, "visits": 11, "status": "diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus", "progress": 87 },
{ "firstName": "Ahmad", "lastName": "Munehay", "age": 43, "visits": 81, "status": "at dolor quis odio consequat varius integer ac leo pellentesque ultrices", "progress": 93 },
{ "firstName": "Elnar", "lastName": "Blabber", "age": 16, "visits": 6, "status": "amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu", "progress": 99 },
{ "firstName": "Dorene", "lastName": "Chipps", "age": 95, "visits": 84, "status": "tristique in tempus sit amet sem fusce consequat nulla nisl", "progress": 43 },
{ "firstName": "Nicolais", "lastName": "Britcher", "age": 83, "visits": 69, "status": "elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante", "progress": 4 },
{ "firstName": "Sher", "lastName": "Rodenburg", "age": 2, "visits": 47, "status": "natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor", "progress": 2 },
{ "firstName": "Langston", "lastName": "Cameli", "age": 72, "visits": 43, "status": "nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus", "progress": 92 },
{ "firstName": "Glynn", "lastName": "Harlett", "age": 65, "visits": 22, "status": "vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae", "progress": 56 },
{ "firstName": "Rodrick", "lastName": "Bucke", "age": 76, "visits": 14, "status": "elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit", "progress": 13 },
{ "firstName": "Giffy", "lastName": "Gobert", "age": 7, "visits": 62, "status": "nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede", "progress": 60 },
{ "firstName": "Isiahi", "lastName": "Sarchwell", "age": 48, "visits": 35, "status": "vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere", "progress": 46 },
{ "firstName": "Saw", "lastName": "Figgess", "age": 22, "visits": 60, "status": "magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum", "progress": 48 },
{ "firstName": "Leopold", "lastName": "Easlea", "age": 24, "visits": 2, "status": "varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero", "progress": 3 },
{ "firstName": "Fayre", "lastName": "Camis", "age": 77, "visits": 21, "status": "felis fusce posuere felis sed lacus morbi sem mauris laoreet ut", "progress": 66 },
{ "firstName": "Amerigo", "lastName": "Westphalen", "age": 8, "visits": 75, "status": "sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris", "progress": 52 },
{ "firstName": "Augustine", "lastName": "Darke", "age": 73, "visits": 98, "status": "accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec", "progress": 85 },
{ "firstName": "Carita", "lastName": "Ringer", "age": 22, "visits": 67, "status": "lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh", "progress": 47 },
{ "firstName": "Zed", "lastName": "Scotchbrook", "age": 77, "visits": 36, "status": "ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet", "progress": 23 },
{ "firstName": "Simon", "lastName": "Zoren", "age": 20, "visits": 14, "status": "eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus", "progress": 27 },
{ "firstName": "Evanne", "lastName": "Palmby", "age": 80, "visits": 4, "status": "amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas", "progress": 97 },
{ "firstName": "Carol", "lastName": "Bloodworthe", "age": 62, "visits": 74, "status": "amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in", "progress": 50 },
{ "firstName": "Lyman", "lastName": "Lofthouse", "age": 23, "visits": 4, "status": "turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris", "progress": 92 },
{ "firstName": "Guthrie", "lastName": "Kloser", "age": 17, "visits": 69, "status": "quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu", "progress": 99 },
{ "firstName": "Andra", "lastName": "Binch", "age": 67, "visits": 9, "status": "in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut", "progress": 84 },
{ "firstName": "Christina", "lastName": "Breakey", "age": 94, "visits": 82, "status": "amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in", "progress": 73 },
{ "firstName": "Norris", "lastName": "Size", "age": 5, "visits": 17, "status": "at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit", "progress": 28 },
{ "firstName": "Clywd", "lastName": "Chaulk", "age": 48, "visits": 33, "status": "nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi", "progress": 38 },
{ "firstName": "Angelica", "lastName": "Blight", "age": 76, "visits": 21, "status": "luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus", "progress": 43 },
{ "firstName": "Caresse", "lastName": "Lippitt", "age": 84, "visits": 12, "status": "in magna bibendum imperdiet nullam orci pede venenatis non sodales sed", "progress": 89 },
{ "firstName": "Zuzana", "lastName": "Fishburn", "age": 32, "visits": 74, "status": "sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum", "progress": 6 },
{ "firstName": "Harlie", "lastName": "Lattka", "age": 27, "visits": 58, "status": "ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu", "progress": 9 },
{ "firstName": "Lorry", "lastName": "Treherne", "age": 87, "visits": 58, "status": "sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet", "progress": 14 },
{ "firstName": "Beryl", "lastName": "Davys", "age": 86, "visits": 73, "status": "nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem", "progress": 15 },
{ "firstName": "Chauncey", "lastName": "Bocken", "age": 84, "visits": 1, "status": "quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor", "progress": 92 },
{ "firstName": "Morna", "lastName": "Jaques", "age": 91, "visits": 29, "status": "id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae", "progress": 92 }]

const columnHelper = createColumnHelper<Person>()

export const columns = [
    columnHelper.display({
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                {...{
                    checked: table.getIsAllPageRowsSelected(),
                    indeterminate: table.getIsSomePageRowsSelected(),
                    onChange: table.getToggleAllPageRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
        maxSize: 58,
        enableResizing: false
    }),
    columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: info => info.getValue(),
        minSize: 240
    }),
    columnHelper.accessor('lastName', {
        id: 'lastName',
        cell: info => info.getValue(),
        header: 'Last Name',
        minSize: 240
    }),
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
        id: 'fullName',
        cell: info => info.getValue(),
        header: 'Full Name',
        minSize: 240
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue()
    }),
    columnHelper.accessor('visits', {
        header: () => 'Visits'
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        minSize: 400
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        minSize: 240
    }),
];

export function DataGrid<T extends object>(props: IDataGridProps<T>) {
    const { data, columns, isLoading, onRenderHeader, onRowClick } = props
    const memoizedData = useMemo(() => isLoading ? Array(10).fill({}) : data, [data, isLoading]);
    const memoizedColumns = useMemo(() =>
        isLoading
            ? columns.map((column) => ({
                ...column,
                cell: () => <Skeleton variant="rectangular" />,
            }))
            : columns,
        [isLoading, columns]
    );
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

    const table = useReactTable({
        data: memoizedData,
        columns: memoizedColumns,
        state: {
            sorting,
            pagination
        },
        columnResizeMode: 'onChange',
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <DataGridWrapper $flexDirection='column' $gap="10px">
            {onRenderHeader !== undefined ? null : <TableControls table={table} />}
            <TableWrapper>
                <StyledTable style={{ minWidth: table.getCenterTotalSize() }}>
                    {
                        onRenderHeader !== undefined ? onRenderHeader(table) :
                            (
                                <thead>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (<TableHeader header={header} key={header.id} />))}
                                        </tr>
                                    ))}
                                </thead>
                            )
                    }
                    <tbody>
                        {table.getRowModel().rows.map(row => (<TableBody key={row.id} row={row} onRowClick={onRowClick} />))}
                    </tbody>
                </StyledTable>
            </TableWrapper>
        </DataGridWrapper>
    )
}
