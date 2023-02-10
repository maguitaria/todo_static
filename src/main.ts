import './css/style.css'
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';
const itemEntryForm = document.getElementById('itemEntryForm') as
    HTMLFormElement;
const initApp = (): void => {
    const fullList = FullList.instance;
    const template = ListTemplate.instance;
    // put a listener event for the intances

    // function when the item is submitted to a form
    itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault(); // to prevent submission of wrong data

        const input = document.getElementById('newItem') as HTMLInputElement;
        const newEntryText: string = input.value.trim(); // input of text
        if (!newEntryText.length) return  // not add empty items to list
     // reset form after input
        var resetForm: HTMLFormElement;
            resetForm = <HTMLFormElement>document.getElementById('itemEntryForm');
        if (resetForm)
            resetForm.reset();
        // calculate the item id
        // grab the last item in the list and add +1 = will be the id of added item
        const itemId: number = fullList.list.length
            ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 // if the number exists, convert string into number and -1 ( length returns one index more) (+1 to avoid array row)
            : 1                                                       // else state as 1 ( if no previous items added)
        
        
            const newItem = new ListItem(itemId.toString(), newEntryText);
        // add item to the list
        fullList.addItem(newItem);
        template.render(fullList);
    });

    // const btn = document.getElementById('addItem') as HTMLButtonElement;
    // btn.addEventListener('click', (): void => {
    //     itemEntryForm.reset();
    // });

    const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement;
    clearItems.addEventListener('click', (): void => {
        fullList.clearList();
        template.clear();
    });
    // functions to load and render the list in the beginning
    fullList.load();
    template.render(fullList);
}
document.addEventListener('DOMContentLoaded', initApp) // ensure that content is loaded before initialization of app