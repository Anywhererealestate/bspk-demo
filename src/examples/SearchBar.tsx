import { MenuItem } from '@bspk/ui/Menu';
import { SearchBar } from '@bspk/ui/SearchBar';
import { useId, useState } from 'react';
import { updateComponentState } from 'src/components/ComponentStateProvider';
import { action } from 'utils/actions';


export function SearchBarExample(state: any) {
    const [filteredSuggestions, setFilteredSuggestions] = useState<MenuItem[] | undefined>();

    const setSuggestions = (searchValue: string) => {
        setFilteredSuggestions(
            searchValue && searchValue?.length
                ? searchBarSuggestions.filter((s) => {
                      //
                      return s.label.toLowerCase().includes(searchValue.toLowerCase());
                  })
                : undefined,
        );
        updateComponentState({ searchValue });
    };

    return (
        <SearchBar
            aria-label={state.ariaLabel}
            id={useId()}
            items={filteredSuggestions}
            name={state.name}
            noResultsMessage={state.noResultsMessage}
            onSelect={(item) => action(`Selected suggestion: ${item?.label}`)}
            placeholder={state.placeholder}
            searchValue={state.searchValue}
            setSearchValue={(str) => {
                setSuggestions(str);
            }}
        />
    );
}

// example search suggestions for the search bar existing of sample data
const searchBarSuggestions: MenuItem[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
    { label: 'Elderberry', value: 'elderberry' },
    { label: 'Fig', value: 'fig' },
    { label: 'Grape', value: 'grape' },
    { label: 'Honeydew', value: 'honeydew' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Lemon', value: 'lemon' },
    { label: 'Mango', value: 'mango' },
    { label: 'Nectarine', value: 'nectarine' },
    { label: 'Orange', value: 'orange' },
    { label: 'Papaya', value: 'papaya' },
    { label: 'Quince', value: 'quince' },
    { label: 'Raspberry', value: 'raspberry' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Tangerine', value: 'tangerine' },
    { label: 'Ugli fruit', value: 'ugli fruit' },
    { label: 'Vanilla', value: 'vanilla' },
    { label: 'Watermelon', value: 'watermelon' },
    { label: 'Yellow passion fruit', value: 'yellow passion fruit' },
    { label: 'Zucchini', value: 'zucchini' },
];

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
