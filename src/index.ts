import {debounceTime, distinctUntilChanged, filter, fromEvent, map, merge, tap} from "rxjs";

const elements = {
    searchInput: document.getElementById("searchInput") as HTMLElement,
    selectType: document.getElementById("selectType") as HTMLElement,
    checkbox: document.getElementById("checkbox") as HTMLElement,
}

const values = {
    searchInput: (elements.searchInput as HTMLInputElement).value,
    selectType: (elements.selectType as HTMLSelectElement).value,
    checkbox: (elements.checkbox as HTMLInputElement).checked,
}

const objectsToChange = {
    searchInput: false,
    selectType: false,
    checkbox: false,
}

const reset = () => {
  objectsToChange.searchInput = false;
  objectsToChange.selectType = false;
  objectsToChange.checkbox = false;
}

let searchInput$: any = fromEvent(elements.searchInput, "change");
searchInput$ = searchInput$.pipe(
    map((event: any) => event.target.value), // it extracts the value from the event.
    debounceTime(500), // it waits for 500ms after the last event before emitting the value.
    distinctUntilChanged(), // it prevents subsequent identical emissions from an observable.
    tap(value => console.log("Search input: ", value)), // side effect to log the value.
    tap(() => objectsToChange.searchInput = true), // side effect to set the object to change.
    map((value: string) => ({...values, searchInput: value}))
);

let selectType$: any = fromEvent(elements.selectType, "change");
selectType$ = selectType$.pipe(
    map((event: any) => event.target.value),
    filter((value: string) => value !== ""),
    distinctUntilChanged(),
    tap(value => console.log("Select: ", value)),
    tap(() => objectsToChange.selectType = true),
    map((value: string) => ({...values, selectType: value}))
);

let checkbox$: any = fromEvent(elements.checkbox, "click");
checkbox$ = checkbox$.pipe(
    map((event: any) => event.target.checked),
    distinctUntilChanged(),
    tap(value => console.log("Checkbox: ", value)),
    tap(() => objectsToChange.checkbox = true),
    map((value: boolean) => ({...values, checkbox: value}))
);

const search$ = merge(searchInput$, selectType$, checkbox$);

search$.subscribe(async (value: any) => {
    // Do an HTTP call to search for the value.
    console.log("Searching for...", value);
    objectsToChange.searchInput && ((document.getElementById('searchInput_result') as HTMLElement).innerText = value.searchInput);
    objectsToChange.selectType && ((document.getElementById('selectType_result') as HTMLElement).innerText = value.selectType);
    objectsToChange.checkbox && ((document.getElementById('checkbox_result') as HTMLElement).innerText = value.checkbox.toString());
    // Reset objects to change
    reset();
});