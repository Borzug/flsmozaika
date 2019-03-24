// WordPress post/page type;
export interface IPage {
    title: IWPEntitySimpleContent;
    content: IWPEntityContent;
    author?: number;
    comment_status?: string;
    date?: string;
    date_gmt?: string;
    excerpt?: IWPEntityContent;
    featured_media?: 0;
    guid?: IWPEntitySimpleContent;
    id?: number;
    link?: string;
    menu_order?: number;
    meta?: string[];
    modified?: string;
    modified_gmt?: string;
    parent?: number; // id of parent page;
    ping_status?: string;
    slug?: string;
    status?: string;
    template?: string;
    type?: string;
    _links?: { [key: string]: IWPLink[] };
}

export interface IWPEntityContent {
    protected?: boolean;
    rendered: string;
}

export interface IWPEntitySimpleContent {
    rendered: string;
}

interface IWPLink {
    href: string;
    embeddable?: boolean;
}

export enum Locale {
    RU = "RU",
    EN = "EN"
}

export enum FormFields {
    Username = "username",
    Nickname = "nickname",
    Password = "password",
    Confirm = "confirm_password",
    Name = "name",
    Email = "email",
    Employment = "employment",
    Description = "description"
}
