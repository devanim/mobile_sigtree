import { FilteringOptions } from "./filtering-options-enum"

export type FilterElement = {
  type: FilteringOptions,
  key: number|string;
  value: string;
}