import { useCallback } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { AddCircleOutline } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { BreadCrumbs, FlexBox } from "lib/ui-ux"
import { CreateArticleContainer } from "../containers"
import { KnowledgeBaseList } from "./knowledge-base-list"
import { IKnowledgeBase } from "../apis"
import { Trans } from "react-i18next"

interface IKnowledgeBaseLayoutProps {
    knowledgeBaseData: IKnowledgeBase[];
    isLoading: boolean;
}

export const KnowledgeBaseLayout = (props: IKnowledgeBaseLayoutProps) => {
    return (
        <FlexBox width="100%" flexDirection="column" height="100%">
            <BreadCrumbs />
            <FlexBox flexDirection="column" gap={'20px'} padding="0 20px 20px" height="calc(100% - 46px)">
                <Routes>
                    <Route key='base-route' path="/" element={<KnowledgeBaseContent {...props} />} />
                    <Route key='add-route' path="create-knowledge-base" element={<CreateArticleContainer />} />
                </Routes>
            </FlexBox>
        </FlexBox>
    )
}

const KnowledgeBaseContent = (props: IKnowledgeBaseLayoutProps) => {
    const navigate = useNavigate();
    const navigateToCreateKB = useCallback(() => {
        navigate('create-knowledge-base');
    }, [navigate]);

    return (
        <FlexBox flexDirection="column" gap={'20px'} width="100%" height="100%">
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <Typography variant="h5">
                    <Trans i18nKey={"knowledge_base"} />
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutline />} onClick={navigateToCreateKB}> <Trans i18nKey={"create"} /></Button>
            </FlexBox>
            <KnowledgeBaseList data={props.knowledgeBaseData} isLoading={props.isLoading} />
        </FlexBox>
    )
}