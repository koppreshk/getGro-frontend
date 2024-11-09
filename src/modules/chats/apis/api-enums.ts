export enum ChatEndPoint {
    FETCH_ALL_CONVERSATIONS = 'chat/conversations',
    FETCH_CONVERSATION_BY_ID = 'chat/conversation',
    FETCH_MEDIA_CONTENT = 'chat/fetch_media',
    SEND_REPLY = 'chat/reply',
    PRESIGNED_URL = 'presigned_url',
}

export enum ChatQueryKeys {
    FETCH_ALL_CONVERSATIONS = 'FETCH_ALL_CONVERSATIONS',
    FETCH_CONVERSATION_BY_ID = 'FETCH_CONVERSATION_BY_ID',
    FETCH_MEDIA_CONTENT = 'FETCH_MEDIA_CONTENT',
    SEND_REPLY = 'SEND_REPLY',
    PRESIGNED_URL = 'PRESIGNED_URL',
    PRESIGNED_URL_S3 = 'PRESIGNED_URL_S3',
}