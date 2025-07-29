export declare const cmsService: {
    createPage: (data: {
        title: string;
        slug: string;
        content: string;
    }) => Promise<any>;
    getPageBySlug: (slug: string) => Promise<any>;
    updatePage: (slug: string, data: Partial<{
        title: string;
        content: string;
    }>) => Promise<any>;
    deletePage: (slug: string) => Promise<any>;
    listPages: () => Promise<any>;
};
