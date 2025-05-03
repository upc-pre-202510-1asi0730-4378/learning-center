<script>
/**
 * Import the Category entity model for creating and manipulating category objects
 */
import {Category} from "../model/category.entity.js";

/**
 * Import the CategoryService for handling API operations related to categories
 */
import {CategoryService} from "../services/category.service.js";

/**
 * Import the DataManager component for displaying and managing category data
 */
import DataManager from "../../shared/components/data-manager.component.vue";

/**
 * Import the CategoryItemCreateAndEditDialog component for creating and editing categories
 */
import CategoryItemCreateAndEditDialog from "../components/category-item-create-and-edit.component.vue";

/**
 * @component
 * @description Page component for managing categories in the publishing context.
 * Provides a user interface for viewing, creating, editing, and deleting categories.
 * Handles all CRUD operations through the CategoryService.
 */
export default {
  name: "category-management",
  components: {CategoryItemCreateAndEditDialog, DataManager},
  
  /**
   * @returns {Object} Component data
   */
  data() {
    return {
      /**
       * @type {Object}
       * @property {string} singular - Singular name for display purposes
       * @property {string} plural - Plural name for display purposes
       * @description Title configuration for the data manager
       */
      title: {singular: "Category", plural: "Categories"},
      
      /**
       * @type {Array<Category>}
       * @description Collection of all categories loaded from the server
       */
      categories: [],
      
      /**
       * @type {Category}
       * @description Currently selected category for editing or creating
       */
      category: new Category({}),
      
      /**
       * @type {Array<Category>}
       * @description Collection of categories selected for bulk operations
       */
      selectedCategories: [],
      
      /**
       * @type {CategoryService|null}
       * @description Service for handling API requests related to categories
       */
      categoryService: null,
      
      /**
       * @type {Boolean}
       * @description Controls the visibility of the create/edit dialog
       */
      createAndEditDialogIsVisible: false,
      
      /**
       * @type {Boolean}
       * @description Indicates whether the form is in edit mode (true) or create mode (false)
       */
      isEdit: false,
      
      /**
       * @type {Boolean}
       * @description Tracks whether the form has been submitted for validation purposes
       */
      submitted: false,
    }
  },
  methods: {
    /**
     * Displays a success toast notification
     * @param {string} message - The message to display in the notification
     */
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },
    
    /**
     * Finds the index of a category item in the category array by its ID
     * @param {string} id - The ID of the category to find
     * @returns {number} The index of the category in the array, or -1 if not found
     */
    findIndexById(id) {
      return this.categories.findIndex(category => category.id === id);
    },
    
    /**
     * Handles the request to create a new category
     * Prepares the form for creating a new category and shows the dialog
     */
    onNewItem() {
      this.category = new Category({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },
    
    /**
     * Handles the request to edit an existing category
     * Prepares the form with the selected category data and shows the dialog
     * @param {Category} item - The category to edit
     */
    onEditItem(item) {
      this.category = new Category(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    
    /**
     * Handles the request to delete a category
     * Sets the current category and initiates the delete operation
     * @param {Category} item - The category to delete
     */
    onDeleteItem(item) {
      this.category = {...item};
      this.deleteCategory();
    },
    
    /**
     * Handles the request to delete multiple selected categories
     * @param {Array<Category>} selectedItems - The array of categories to delete
     */
    onDeleteSelectedItems(selectedItems) {
      this.selectedCategories = selectedItems;
      this.deleteSelectedCategories();
    },
    
    /**
     * Handles the cancel action from the create/edit dialog
     * Closes the dialog and resets form state
     */
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    
    /**
     * Handles the save action from the create/edit dialog
     * Validates the form and calls the appropriate create or update method
     * @param {Category} item - The category data from the form
     */
    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.category.name.trim()) {
        if (item.id) {
          this.updateCategory();
        } else {
          this.createCategory();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    
    /**
     * Creates a new category via the API
     * Adds the created category to the local array on success
     */
    createCategory() {
      this.categoryService.create(this.category).then(response => {
        let category = new Category(response.data);
        this.categories.push(category);
        this.notifySuccessfulAction("Category Created");
      }).catch(error => console.error(error));
    },
    
    /**
     * Updates an existing category via the API
     * Updates the local category in the array on success
     */
    updateCategory() {
      this.categoryService.update(this.category.id, this.category).then(response => {
        console.log('updateCategory');
        let index = this.findIndexById(this.category.id);
        this.categories[index] = new Category(response.data);
        console.log(this.categories);
        this.notifySuccessfulAction("Category Updated");
      }).catch(error => console.error(error));
    },
    
    /**
     * Deletes the current category via the API
     * Removes the category from the local array on success
     */
    deleteCategory() {
      this.categoryService.delete(this.category.id).then(() => {
        let index = this.findIndexById(this.category.id);
        this.categories.splice(index, 1);
        this.notifySuccessfulAction("Category Deleted");
      }).catch(error => console.error(error));
    },
    
    /**
     * Deletes multiple selected categories via the API
     * Removes the categories from the local array on success
     */
    deleteSelectedCategories() {
      this.selectedCategories.forEach((category) => {
        this.categoryService.delete(category.id).then(() => {
          this.categories = this.categories.filter((t) => t.id !== this.category.id);
        });
      });
      this.notifySuccessfulAction("Categories Deleted");
    }
  },
  
  /**
   * Lifecycle hook called after the component instance is created
   * Initializes the category service and loads all categories from the server
   */
  created() {
    this.categoryService = new CategoryService();
    this.categoryService.getAll().then(response => {
      this.categories = response.data.map(category => new Category(category));
      console.log(this.categories);
    }).catch(error => console.error(error));
  }
}
</script>

<template>
  <div class="w-full">
    <data-manager :title=title
                  :items="categories"
                  @new-item-requested="onNewItem"
                  @edit-item-requested="onEditItem($event)"
                  @delete-item-requested="onDeleteItem($event)"
                  @delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id" header="Id" style="min-width: 12rem"/>
        <pv-column :sortable="true" field="name" header="Name" style="min-width: 24rem"/>
      </template>
    </data-manager>
    <category-item-create-and-edit-dialog
        :edit="isEdit"
        :item="category"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)"/>
  </div>
</template>

<style scoped>
</style>