import { FlexBox } from "lib/ui-ux";
import { Routes, Route } from "react-router-dom";
import { CreateArticleContainer } from "../containers";

export default function KnowledgeBasePage() {
    return (
        <FlexBox height="100%" padding="20px" flexDirection="column">
            <Routes>
                <Route key="create-article" path="create-article" element={<CreateArticleContainer />} />
            </Routes>
        </FlexBox>
    )
}