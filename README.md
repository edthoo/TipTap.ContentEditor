## Content Editor

**Overview**

The editor is primarily built with TipTap react which itself integrates ProseMirror. On top of the main editor, MUI and ShadCN UI components were used and styled with a combination of inline css, css files and tailwind. The complexity of this tech stack is mainly due to the legacy codebase and need to implement updated libraries to improve developer experience and meet the new requirements of the editor.

The editor visibly consists of 2 main parts, the Menu Bar and the Editor itself.

Functions available within the editor includes :
- Font type 
- Font size
- Font style
- Hyper links
- Images
- Youtube embedding
- Text alignment
- Lists

**Menu Bar**

Font Type
- Currently only 3 fonts, Ariel, Inter & Monospace
- Default font is Ariel, Click dropdown to select

Font Size
- Limited font size available for now, hence not able to input custom sizes
- Sizes can be selected in the dropdown menu or using the plus/minus button

Font Style
- Available font style are Bold, Italic, Underline , Strike Through
- Each has it's own toggle button and styles can be merged

Hyper Links
- Usage requires to highlight text and then enter the link in the dropdown menu
- To remove hyper link, click or highlight the text which will update the hyper link button icon to the unlink icon

Images
- Use urls or upload images
- Images cannot be resized
- Uploaded images will be stored as a base64 string

Youtube Embedding
- To embed youtube video, click on the video icon button
- Use ONLY the Youtube video's actual url, do not use the embedded url provided in Youtube's own embed script.

Text Alignment
- The available options are Left, Center, Right & Justify

List
- Only list available are bullet or numbered.
- Lists are only rendered with Left Text Alignment
