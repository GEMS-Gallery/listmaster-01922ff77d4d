import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {
  // Define the ShoppingItem type
  type ShoppingItem = {
    id: Nat;
    name: Text;
    completed: Bool;
  };

  // Initialize a stable variable to store shopping items
  stable var shoppingItems : [ShoppingItem] = [];
  stable var nextId : Nat = 0;

  // Function to add a new item
  public func addItem(name : Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem : ShoppingItem = {
      id = id;
      name = name;
      completed = false;
    };
    shoppingItems := Array.append(shoppingItems, [newItem]);
    id
  };

  // Function to get all items
  public query func getItems() : async [ShoppingItem] {
    shoppingItems
  };

  // Function to update item status
  public func updateItemStatus(id : Nat, completed : Bool) : async Bool {
    let updatedItems = Array.map<ShoppingItem, ShoppingItem>(
      shoppingItems,
      func (item) {
        if (item.id == id) {
          {
            id = item.id;
            name = item.name;
            completed = completed;
          }
        } else {
          item
        }
      }
    );
    shoppingItems := updatedItems;
    true
  };

  // Function to delete an item
  public func deleteItem(id : Nat) : async Bool {
    let filteredItems = Array.filter<ShoppingItem>(
      shoppingItems,
      func (item) { item.id != id }
    );
    shoppingItems := filteredItems;
    true
  };
}
