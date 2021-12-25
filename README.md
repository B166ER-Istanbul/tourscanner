# TourScanner Assignment Test

### Project goals


The task consists of a simple gallery component.
You may use PHP if you want (or code it all in Javascript), and use (or not use) any framework you are comfortable with.

The images can be found here:
https://tourscanner.com/interview/images
The endpoint is open, and returns a list of image urls and titles in JSON.

Requirements:

A1) Display the images as 300x272 boxes. You can simply display the provided images in rows. 
A2) The image files provided by the api can vary in size. Ensure they aren't shown off center or stretched out, and that they fill the whole 300x272 box.
A3) There should be uniform horizontal spaces between each image, and uniform vertical spaces between each row.

B1) Underneath every image/box, add the following: 
	- On the left side, a small arrow icon, centered vertically with the title (see below)
	- On the right, the title of the image. Make sure that the title doesn't occupy more than 3 lines, otherwise truncate it and show an ellipsis at the end.
B2) The title of the image should be highlighted if the image is bookmarked (see below). You can do that for example by changing it to a different color.

C1) When the user clicks on an image that they haven't bookmarked yet, Send the id of the image to the following open GET endpoint https://tourscanner.com/interview/save_image/{image_id}
C2) The server will answer with the number of times that that image id has been bookmarked before. display a simple prompt at the center of the page asking for the name of the "folder" they wish to save the image in, and showing the number of times it has been saved before.
C3) After the user has provided a folder name, send the id of the image to the following open POST endpoint https://tourscanner.com/interview/save_image/{image_id}. 
The server answer will report the success or failure of the action. Do not close the prompt until the call is complete. Save the image and folder in local storage, so that images can retain their saved status and their folder on subsequent page loads.
C4) The user should also be able to close the prompt without saving anything.

D1) Add a basic tabs system above the images, in order to display the folders of the bookmarked images. There should be an 'all images' tab enabled from the start. All nonempty folders should also show up as clickable tabs. When selected, the view should switch to showing only the images saved in that folder.
D2) If you scroll the page, once you get past the tabs and they're no longer visible, they should show up fixed at the bottom of the page instead. This alternate navbar should vanish once you scroll back up and can see the original, static tabs again.

Important Notes:

E1) You don't need to waste time making the component pretty, as long as it hits all requirements. We won't be judging the design as long as it's not clearly broken.
E2) You can handle any issue that isn't explicitly mentioned above in the way you find most expedient. 
E3) For testing convenience only, the image ids are always sequential and start from 1. The code should not rely on that.

### Detail
The project is written in ReactJS.

### Installation

```bash
npm start
```

And navigate to generated server link (http://localhost:3000/)
