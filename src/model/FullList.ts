import ListItem from './ListItem'

interface List {
    list: ListItem[],
    load(): void, // work with the DOM object -- nothing to return
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void, // add item to the list
    removeItem(id: string): void // remove item from the list
}

export default class FullList implements List {
    static instance: FullList = new FullList(); // static field for class - can`t be accessed outside the class
    private constructor(
        private _list: ListItem[] = [], // private means that it can`t be used outside class
        // ListItem[] = [] means that empty array is a default value
    ) { }
    get list(): ListItem[] {
        return this._list
    }
    set list(list: ListItem[]) {
        this._list = list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList")
        if (typeof storedList !== "string") return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }
    save(): void {
        localStorage.setItem('myList', JSON.stringify(this._list)); //Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously
    }
    clearList(): void {
        this._list = []; // clear the list
        this.save();
    }
    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }
    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id); // keep everything except parameter id  in method
        this.save();
    }
}