# PETA Video Background

Project created for PETA Donation Pages on Engaging Networks. It adds a video background to the donation form, and a mobile video on the top of the page.

## How to use

Add the project's JS file to your Engaging Networks Donation Page.

```html
<script defer src="{MY_EN_URL}/peta-video-background.js"></script>
```

That's enough to add the video background to your donation page. Just by adding the JS file, the default video (defined on the `src/peta-video-background.ts` file) will be added to the page. You can either **change the default video** or **define a list of videos** to be used on the page by adding a Code Block to your Engaging Networks form specifying the `PETAVideoBackground` object.

## The `PETAVideoBackground` object

The `PETAVideoBackground` object is used to define the videos that will be used as the background. It can be used to define a default video, a list of videos, or both.
You can set an unlimited number of videos, and the user can refer to them by their key using the `?video` URL parameter.

Every object key is a video key, and the value is an object with the following properties:

```javascript
{
  "desktop-video": // The URL of the video that will be used as the background on desktop
  "mobile-video": // The URL of the video that will be used as the background on mobile
  "desktop-poster": // The URL of the poster that will be used as the background on desktop
  "mobile-poster": // The URL of the poster that will be used as the background on mobile
};
```

The `desktop-video` should be either an MP4 or WebM file, with the aspect ratio of 9:16. The `mobile-video` should be either an MP4 or WebM file, with the aspect ratio of 16:9. The `desktop-poster` and `mobile-poster` should be a JPG/PNG file, with the aspect ratio of 9:16 and 16:9, respectively.

## Change the default video

To change the default video, you need to add a Code Block to your Engaging Networks form, creating the `PETAVideoBackground` object. That object will be used to define the video that will be used as the background.

Example:

```javascript
<script>
      window.PETAVideoBackground = window.PETAVideoBackground || {};
      window.PETAVideoBackground.default = {
        "desktop-video": "{MY_MP4_URL}",
        "mobile-video": "{MY_MP4_URL}",
        "desktop-poster": "{MY_JPG_POSTER_URL}",
        "mobile-poster": "{MY_JPG_POSTER_URL}",
      };
</script>
```

If you don't want to use a mobile video, you can remove the `mobile-video` and `mobile-poster` properties from the object.

## Define a list of videos

To define a list of videos, you need to add a Code Block to your Engaging Networks form, creating the `PETAVideoBackground` object. That object will be used to set a list of videos that can be used as the background.

Example:

```javascript
<script>
    window.PETAVideoBackground = window.PETAVideoBackground || {};
    window.PETAVideoBackground.test = {
    "desktop-video": "{MY_MP4_URL}",
    "mobile-video": "{MY_MP4_URL}",
    "desktop-poster": "{MY_JPG_POSTER_URL}",
    "mobile-poster": "{MY_JPG_POSTER_URL}",
    };
    window.PETAVideoBackground.test2 = {
        "desktop-video": "{MY_MP4_URL}",
        "mobile-video": "{MY_MP4_URL}",
        "desktop-poster": "{MY_JPG_POSTER_URL}",
        "mobile-poster": "{MY_JPG_POSTER_URL}",
    };
    window.PETAVideoBackground.test3 = {
        "desktop-video": "{MY_MP4_URL}",
        "mobile-video": "{MY_MP4_URL}",
        "desktop-poster": "{MY_JPG_POSTER_URL}",
        "mobile-poster": "{MY_JPG_POSTER_URL}",
    };
</script>
```

In this example, we defined three videos: `test`, `test2`, and `test3`. You can define as many videos as you want, and the user can refer to them by their key using the `?video` URL parameter, like this: `?video=test2`.

**If you use a `?video` URL parameter with a key that doesn't exist, the default video will be used.**

You can also add the `PETAVideoBackground` to your Page Template, so you don't need to add it to every form. The first line of the script should be `window.PETAVideoBackground = window.PETAVideoBackground || {};` to avoid overwriting the object if it already exists, allowing you to add more videos to the object in different forms.

## Disable the video background

If you want to disable the video background, you can add a `?video=false` URL parameter to the page. This will disable the video background and show the default background image.

## Development

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

3. Add your changes to the `src` folder
4. Build the project

```bash
npm run build
```

5. Commit and push your changes
6. Publish the generated `dist/peta-video-background.js` file to your Engaging Networks account.

## Preview

You can preview the video background by running the `npm run preview` command. This will start a local server and open the `index.html` file on your default browser.
Change the `index.html` file to add your `PETAVideoBackground` test object, and see how the video background will look on your donation page.

## Debug

You can debug the video background by adding a `?debug=true` URL parameter to the page. This will enable the debug mode, which will show all developer messages on the console.
