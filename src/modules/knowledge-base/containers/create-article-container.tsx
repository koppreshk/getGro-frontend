import { useCreateKBArticle } from "../apis"
import { CreateArticle } from "../components"

export const CreateArticleContainer = () => {
    const { mutateAsync, isLoading } = useCreateKBArticle();

    const onSubmit = (formData: FormData) => {
        return mutateAsync(formData);
    }

    return (
        <>
            <CreateArticle onSubmit={onSubmit} mutationLoading={isLoading} />
        </>
    )
}