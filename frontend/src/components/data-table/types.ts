export interface DataTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export type FilterOption = string | number;

export type FilterConfig<T> = Record<
  keyof T | string,
  { label: string; options: FilterOption[] }
>;

export type SearchKey<T> = Array<keyof T | string>;