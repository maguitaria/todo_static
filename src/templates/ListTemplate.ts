/* This is a template for a list whic will be displayed on web page */

import FullList from "../model/FullList";
interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(FullList: FullList): void,
}
export default class ListTemplate implements DOMList {
    ul: HTMLUListElement
    static instance: ListTemplate =  new ListTemplate();
    
    private constructor() {
        this.ul = document.getElementById('listItems') as HTMLUListElement;
    }
    clear(): void {
        this.ul.innerHTML = ''; // clears the list on the DOM, no need to store -- it only displays clear list
    }
    render(fullList: FullList): void {
        this.clear();
        
        fullList.list.forEach(item => { 
            // follow the logic of index.html structure, create ul element with li elements inside
            
            const li = document.createElement('li') as HTMLLIElement;
            li.className = 'item';
            const check = document.createElement('input') as HTMLInputElement;
            check.type = 'checkbox';
            check.id = item.id; // use getter
            check.tabIndex = 0;
            check.checked = item.checked; // use getter
            li.append(check) // append checkbox to the li element in HTMl
            
            check.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save(); // save the input + everything in local storage
            })

            // create a label which holds the description for each item
            const label = document.createElement('label') as HTMLLabelElement;
            label.htmlFor = item.id; // retrieves the object to which the given label object is assigned
            label.textContent = item.item;
            li.append(label);
            // create a button for deletion
            
            const button = document.createElement('button') as HTMLButtonElement;
            button.className = 'button';
            button.textContent = 'X';
            li.append(button);

            button.addEventListener('click', () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            })
            this.ul.append(li); // append the created li class to the ul parent class

        })
    }
}