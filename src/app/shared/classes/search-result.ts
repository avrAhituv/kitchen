export class SearchResult {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    cacheId: string;   
    formattedUrl: string;
    htmlFormattedUrl: string;
    pagemap?: {cse_thumbnail?: Array<{width: string, height: string, src: string }>, cse_image?: Array<{src: string}>};
    /**
     *
     */
    constructor(item ? : any) {
        if (!item) return;

        this.title = item.title;
        this.htmlTitle = item.title;
        this.link = item.link;
        this.displayLink = item.displayLink;
        this.htmlSnippet = item.htmlSnippet;
        this.snippet = item.snippet;
        this.pagemap = item.pagemap;

    }
}
