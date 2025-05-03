<script>
/**
 * Import the base create-and-edit component to extend its functionality
 */
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

/**
 * @component
 * @description A specialized dialog component for creating and editing Category entities.
 * This component wraps the generic create-and-edit component and adds category-specific
 * UI elements and validation.
 */
export default {
  name: "category-item-create-and-edit-dialog",
  components: {CreateAndEdit},
  props: {
    /**
     * @type {Category|null}
     * @description The category item being created or edited
     */
    item: null,
    
    /**
     * @type {Boolean}
     * @description Controls the visibility of the dialog
     */
    visible: false
  },
  
  /**
   * @event cancel-requested - Emitted when the cancel action is triggered
   * @event save-requested - Emitted when the save action is triggered with the category item
   */
  emits: ['cancel-requested', 'save-requested'],
  
  /**
   * @returns {Object} Component data
   */
  data() {
    return {
      /**
       * @type {Boolean}
       * @description Tracks whether the form has been submitted for validation purposes
       */
      submitted: false
    }
  },
  methods: {
    /**
     * Handles the cancel request from the create-and-edit component
     * Emits the cancel-requested event to the parent component
     */
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    
    /**
     * Handles the save request from the create-and-edit component
     * Sets submitted flag for validation and emits the save-requested event with the category item
     */
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', this.item);
    }
  }
}
</script>

<template>
  <create-and-edit :entity="item" :visible="visible" entity-name="Category"
                   @cancel-action-requested="onCancelRequested"
                   @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{ 'p-invalid': submitted && !item.name }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>