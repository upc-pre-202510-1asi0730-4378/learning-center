/**
 * @class Category
 * @description Represents a category entity within the publishing system
 * Used for categorizing content or organizing items
 */
export class Category {
    /**
     * Creates a new Category instance
     * @param {Object} params - The category initialization parameters
     * @param {string} [params.id=''] - Unique identifier for the category
     * @param {string} [params.name=''] - Display name of the category
     */
    constructor({id = '', name = ''}) {
        /**
         * @type {string}
         * @description Unique identifier for the category
         */
        this.id = id;
        
        /**
         * @type {string}
         * @description Display name of the category
         */
        this.name = name;
    }
}