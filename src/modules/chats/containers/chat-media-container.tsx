import { Message, useFetchMediaContent } from "../apis";

export const ChatMediaContainer = (props: Pick<Message, 'media_id'>) => {
    const { data } = useFetchMediaContent(props.media_id!);

    console.log('media', data);

    return (
        <>

        </>
    )
}