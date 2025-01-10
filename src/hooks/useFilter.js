import { useLocalStorage } from "./useLocalStorage";

export const useFilter = (list) => {
    const [filter, setFilter] = useLocalStorage("filter", {
        value: "",
        filterProperty: ""
    });

    const filteredData = (filter.value && filter.filterProperty)
        ? list.filter((item) => item[filter.filterProperty].toLowerCase().includes(filter.value.toLowerCase())) : list;

    return [filter, filteredData, setFilter];
}