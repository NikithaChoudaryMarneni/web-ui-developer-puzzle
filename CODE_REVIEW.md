# Code Review and other improvements

- Enhanced mobile responsiveness to ensure optimal display on various devices.
- Refactored logic placement by removing the OnInit lifecycle hook and integrating logic directly into the book-search.component.ts file.
- Utilized the async pipe to prevent memory leaks caused by unsubscribed subscriptions.
- Improved accessibility by adding descriptive alt text to image tags.
- Simplified date formatting by utilizing the date pipe feature for book published dates in the book-search component.

# Accessibility Issues:

## With lighthouse extension:

- Page prevented back/forward cache restoration
- Reduce unused javascript
- Enable text compression

## Manual Observations

- Maintain color code consistently through the application
- To prevent overlap and ensure proper layout responsiveness in an Angular   application when changing screen sizes, you can utilize Bootstrap's grid system and responsive utility classes
- The image size could be specified to accommodate larger book cover images or longer alt text, ensuring that they fit within the designated height and width without affecting the UI layout.
