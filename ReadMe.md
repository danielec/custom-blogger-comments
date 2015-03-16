#This is the Readme for the project.

# Introduction #

This project want to add the ability to extend the Blogger Comments with the RTF.
In order to do this, one or more scripts must be added to the blog layout.
The main script parse the page, identify the comments and translate the BBCode tags into the corresponding html tags.

# Details #

The script do a parse search using the DOM JS functions and find out elements that contains the comments' contents.
For each of these elements the parser search and replace the BBCode with a corresponding HTML span with the style that the BBCode tag indicate.

The translations are implemented with objects contained in a array.

The objects are defined:

{
> parser: function
}

where parser is a string in format of Regular Expression.

Add your content here.  Format your content with:
  * Text in **bold** or _italic_
  * Headings, paragraphs, and lists
  * Automatic links to other wiki pages