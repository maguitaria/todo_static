export interface Item {
   id: string,
   item: string,
   checked: boolean,

}
export default class ListItem implements Item { // create a model for list item
   constructor(
      private _id: string = '',
      private _item: string = '',
      private _checked: boolean = false,
   ) { }
   get id(): string { // to define a getter method to get the property value
      return this._id
   }
   set id(id: string) { // to define a setter method to set the property value
      this._id = id
   }
   get item(): string {
      return this._item
   }
   set item(item: string) {
      this._item = item
   }
   get checked(): boolean {
      return this._checked
   }
   set checked(checked: boolean) {
      this._checked = checked // get the property from object
   }
}