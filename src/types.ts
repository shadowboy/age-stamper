interface UserEvent {
    id: string, entity: string, start: string, scene: number, image: string, status: string, timeFormat: string, count?: number
}

/**
 * Scenes config
 */
interface CategoryType {
    id: number;
    label: string;
    image: string;
    value: string;
    format: string;
    explain: string;
    pretip: string;
    modifyTip: string;
    atTip: string;
    status: string[];
    entityTip: string;
}

export {
    UserEvent,
    CategoryType
}