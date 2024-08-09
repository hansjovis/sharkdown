# Sharkdown syntax
Sharkdown is Markdown with a twist.

The syntax is designed to be as expandable and simple as powerful, while able to gracefully fallback to standard Markdown when using a standard Markdown parser.

## Using Blocks
Blocks are Sharkdown's way to add HTML-elements and structures not commonly found in Markdown.

Blocks come in two flavours: Elements and Components.

### Elements
Use the element syntax to wrap content in plain HTML blocks.

#### Opening an Element
You can open an element block by writing a HTML comment with the element's name between curly brackets.

<!-- {Figure.caption-top} -->
Example: Opening a `nav` element:
```md
<!-- {nav} -->
```
<!-- {/Figure} -->

#### Closing an Element
You can close an element again by using the same syntax as for opening a block, but with a slash in front of the element name.

<!-- {Figure.caption-top} -->
**Example**: closing a `nav` element:
```md
<!-- {/nav} -->
```
<!-- {/Figure} -->

#### Defining the contents of an Element
The contents of an element can be plain markdown, or other Blocks.

<!-- {Figure.caption-top} -->
**Example**: A complete `nav` element:
```md
<!-- {nav} -->
## You are here:
- [Home](/)
- [Documentation](/docs/)
- [Using blocks](/docs/using-blocks.md)
<!-- {/nav} -->
```
<!-- {/Figure} -->

#### Adding an id
The element's definition syntax leans heavily on the syntax for CSS selectors. 

You can add an id to an element by adding a `#` plus the id to the end of the element's name in the opening tag.

<!-- {Figure.caption-top} -->
**Example**: adding a `breadcrumbs` id:
```md
<!-- {nav#breadcrumbs} -->
```
<!-- {/Figure} -->

#### Adding classes
Adding a class works in a similar way. Instead of adding a `#`, you can add a `.` before the class name.

<!-- {Figure.caption-top} -->
**Example**: adding a `max-width` class:
```md
<!-- {nav.max-width} -->
```
<!-- {/Figure} -->

You can add mulptiple classes by chaining them together:

<!-- {Figure.caption-top} -->
**Example**: adding an extra `something` class:
```md
<!-- {nav.max-width.something} -->
```
<!-- {/Figure} -->

> [!WARNING]
> If you want to combine an id with classes, you have to put the id first.
> ```md
> <!-- {nav#breadcrumbs.max-width} -->
> ```

#### Adding attributes
You can add attributes to an element with the `[attribute-name='value']` syntax.

<!-- {Figure.caption-top} -->
**Example**: adding an accessible name:
```md
<!-- {nav[aria-labelledby='you-are-here']} -->
```
<!-- {/Figure} -->

> [!WARNING]
> Just like with id's and classes, if you want to combine an attribute with and id and/or classes, you will have to add them to the end.
> ```md
> <!-- {nav#breadcrumbs.max-width[aria-labelledby='you-are-here']} -->
> ```