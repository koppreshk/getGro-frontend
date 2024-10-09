import { KnowledgeBaseLayout } from "../components"

export interface IKnowledgeBase {
    id: number;
    title: string;
    created_date: string;
}

const knowledgeBaseData: IKnowledgeBase[] = [
    {
        id: 1,
        title: 'Title 1',
        created_date: '2024-09-10'
    },
    {
        id: 2,
        title: 'Title 2',
        created_date: '2024-09-10'
    },
    {
        id: 3,
        title: 'Title 3',
        created_date: '2024-09-10'
    }
]

export const KnowledgeBaseContainer = () => {
    return (
        <KnowledgeBaseLayout knowledgeBaseData={knowledgeBaseData}/>
    )
}