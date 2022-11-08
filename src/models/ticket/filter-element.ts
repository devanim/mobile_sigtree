import { FilteringOptions } from "./filtering-options-enum"

export type FilterElement = {
  type: FilteringOptions,
  value: number|string;
}