import {Entity} from "@/domain/shared/entities/entity";
import {SearchableRepositoryInterface} from "@/domain/shared/repositories/searchable-repository-contracts";
import {InMemoryRepository} from "@/domain/shared/repositories/in-memory.repository";

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
    page?: number;
    perPage?: number;
    sort?: string | null;
    sortDir?: SortDirection | null;
    filter?: Filter | null;
}

export class SearchParams {
    constructor(props: SearchProps) {
        this._page = props.page;
        this._perPage = props.perPage;
        this._sort = props.sort;
        this._sortDir = props.sortDir;
        this._filter = props.filter || null;
    }

    protected _filter: string | null;

    get filter() {
        return this._filter;
    }

    private set filter(value: string | null) {
    }

    protected _page: number;

    get page() {
        return this._page;
    }

    private set page(value: number) {
    }

    protected _perPage: number = 15;

    get perPage() {
        return this._perPage;
    }

    private set perPage(value: number) {
    }

    protected _sort: string | null;

    get sort() {
        return this._sort as any;
    }

    private set sort(value: SortDirection | null) {
    }

    protected _sortDir: SortDirection | null;

    get sortDir() {
        return this._sortDir;
    }

    private set sortDir(value: SortDirection | null) {
    }
}

export abstract class InMemorySearchableRepository<E extends Entity>
    extends InMemoryRepository<E>
    implements SearchableRepositoryInterface<E, any, any> {

    search(props: any): Promise<any> {
        return Promise.resolve(undefined);
    }
}