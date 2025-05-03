<script>
/**
 * @constant {Object} defaultStyle - Default dialog width styling
 */

const defaultStyle = { width: '400px' };

/**
 * @component
 * @description A reusable dialog component for creating and editing entities.
 * Provides a standardized interface for entity creation and editing operations.
 */
export default {
  name: "create-and-edit",
  props: { 
    /**
     * @type {Object|null}
     * @description The entity object to create or edit
     */
    entity: null, 
    
    /**
     * @type {Boolean}
     * @description Controls the visibility of the dialog
     */
    visible: Boolean(),
    
    /**
     * @type {String}
     * @description The name of the entity being created/edited
     */
    entityName: '', 
    
    /**
     * @type {Boolean}
     * @description Determines if the dialog is in edit mode (true) or create mode (false)
     */
    edit: Boolean(),
    
    /**
     * @type {String}
     * @description Dialog size variant ('default', 'standard', or 'large')
     * @default 'default'
     */
    size: 'default' 
  },
  
  /**
   * @event cancel-action-requested - Emitted when cancel button is clicked
   * @event save-action-requested - Emitted when save button is clicked. The entity data is passed as an argument
   */
  emits: ['cancel-action-requested', 'save-action-requested'],
  
  methods: {
    /**
     * Handles the cancel action and emits the 'cancel-action-requested' event
     */
    onCancel() {
      this.$emit('cancel-action-requested');
    },
    
    /**
     * Handles the save action and emits the 'save-action-requested' event with entity data
     */
    onSave() {
      this.$emit('save-action-requested', this.entity)
    },
    
    /**
     * Generates the header title based on edit mode and entity name
     * @returns {String} The formatted header title (e.g., "New Category" or "Edit Category")
     */
    getHeaderTitle() {
      return `${this.edit ? 'Edit' : 'New'} ${this.entityName}`;
    },
    
    /**
     * Gets the appropriate submit button label based on edit mode
     * @returns {String} The submit button label ("Update" for edit mode, "Create" for create new category mode)
     */
    getSubmitLabel() {
      return this.edit ? 'Update' : 'Create';
    },
    
    /**
     * Determines the dialog style based on the size prop
     * @returns {Object} The dialog style object with appropriate width
     */
    getDialogStyle() {
      let dialogStyle = defaultStyle;
      dialogStyle = this.size === 'standard' ? { width: '600px'} : defaultStyle;
      dialogStyle = this.size === 'large' ? { width: '900px'} : defaultStyle;
      return dialogStyle;
    }
  }
}
</script>

<template>
  <pv-dialog v-bind:visible="visible" :modal="true" :style="getDialogStyle()" class="p-fluid" :header="entityName">
    <template #header>
      <div class="flex justify-content-start">
        <div>{{ getHeaderTitle() }}</div>
      </div>
    </template>
    <slot name="content"></slot>
    <template #footer>
      <div class="flex justify-content-end">
        <pv-button type="button" :label="getSubmitLabel()" class="p-button-text" icon="pi pi-check" @click="onSave"/>
        <pv-button type="button" label="Cancel" severity="secondary" class="p-button-text" icon="pi pi-times" @click="onCancel"/>
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>