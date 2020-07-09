Vue.component("todo-item", {
  props: ["todo"],
  template: "<li>{{todo.text}}</li>",
});

var app = new Vue({
  el: "#app",
  data: {
    items: [], //Array for the items in the list
    message: "", // v-model String of the input
    doneCounter: 0, // Counter for keeping track of completed tasks
  },
  methods: {
    // Method to add the string from input to items array
    add: function () {
      this.items.push({
        obj: {
          taskIsDone: false,
        },
        stored: this.message,
      });
      this.message = "";
    },
    // Method to clear all the items in the items array
    clear: function () {
      this.items = [];
    },
    // Method for button to remove specific item
    removeItem(index) {
      this.$delete(this.items, index);
    },
    // Method to toggle taskIsDone boolean from items objects
    isDoneToggle: function (index) {
      if (this.items[index].obj.taskIsDone == true) {
        this.items[index].obj.taskIsDone = false;
        this.doneCounter--;
      } else {
        this.items[index].obj.taskIsDone = true;
        this.doneCounter++;
      }
    },
    // Method to clear the completed tasks
    clearCompleted: function () {
        let newArray = [];
        for (item of this.items) {
            if (item.obj.taskIsDone != true) {
            newArray.push(item);
            }
        }
        this.items = newArray;
        this.doneCounter = 0;
        },
  },
  computed: {
    // Computed object to activate "Clear all tasks" button, only when list is not empty
    activeObj: function () {
      if (this.items.length == 0) {
        return {
          isDisabled: true,
        };
      }
    },
    // Computed object to activate "Clear Completed Tasks", only when completed tasks exist
    activeObjTask: function () {
      if (this.doneCounter == 0) {
        return {
          isDisabled: true
        }
      }else{
        return {
          isDisabled: false
        }
      }
    },
    buttonState: function(){
      if (this.doneCounter == 0) {
        return true
      }else{
        return false
      }
    }
  },
});
