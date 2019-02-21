export class ExcerptHighlight {
    public highlightQuery(text: string, query: string): string {
        return text.replace(new RegExp(query, "gi"), `<span class="search-query">${query.toUpperCase()}</span>`);
    }

    public pageExcerptToShow(html: string, query: string) {
        return this.highlightQuery(this.planePageExcerpt(html, query), query);
    }

    private stripFromTags(html: string) {
        return html.replace(/<(?:.|\n)*?>/gm, "");
    }

    private planePageExcerpt(html: string, query: string) {
        const text = this.stripFromTags(html);
        return text.slice(text.toLowerCase().indexOf(query.toLowerCase()), text.toLowerCase().indexOf(query.toLowerCase()) + 200);
    }
}
