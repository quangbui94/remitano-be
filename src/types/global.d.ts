declare global {
    type VideoInput = Pick<VideoAttributes, 'embedId' | 'title' | 'owner' | 'description'>;

    interface VideoAttributes {
        id: number;
        embedId: string;
        title: string;
        owner: string;
        description: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
    }

    type VideoInput = Optional<VideoAttributes, "id">;
    type VideoOuput = Required<VideoAttributes>;
}

export {}