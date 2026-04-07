# Wix SDK iFrame Deprecated Docs - Human Readable

Structure: each source is separate; each section/function has its own block with Syntax and Example extracted from source markdown.

## Index
- [01] Untitled - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/using-the-sdk
- [02] Wix - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix
- [03] Wix.Activities - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-activities
- [04] Wix.Analytics - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-analytics
- [05] Wix.Billing - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-billing
- [06] Wix.Contacts - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-contacts
- [07] Wix.Dashboard - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-dashboard
- [08] Wix.Data.Public - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-data-public
- [09] Wix.Features - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-features
- [10] Wix.Preview - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-preview
- [11] Wix.Settings - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings
- [12] Wix.PubSub - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-pubsub
- [13] Wix.Styles - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-styles
- [14] Wix.Utils - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-utils
- [15] Wix.Worker - https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-worker
- [16] About WixHive - https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/introduction
- [17] About WixHive - https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/introduction
- [18] Activities - https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities
- [19] Using the HTTP API - https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api
- [20] In-App Purchases - https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/in-app-purchases
- [21] Contacts - https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/contacts
- [22] Activities - https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/activities

---

## DOC-01: Untitled

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/using-the-sdk

### Sections and Functions
#### Function 01: Using the SDK

- Summary: Our JavaScript SDK exposes methods that enable the app to communicate with the Wix platform – the Editor, Dashboard, live site, and preview.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Our JavaScript SDK exposes methods that enable the app to communicate with the Wix platform – the Editor, Dashboard, live site, and preview.

Include the following script tag in your HTML document:

Once included, your window object will contain a new global Object named Wix.
```

#### Function 02: SDK Version

- Summary: We release new versions of our JavaScript SDK regularly. Update your app to use the latest version by replacing the version number in the script tag.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
We release new versions of our JavaScript SDK regularly. Update your app to use the latest version by replacing the version number in the script tag.

Note the following:

*   **We document the latest SDK version for each method.** If a method is updated, we update its SDK version accordingly. For example: if a method is available since SDK 1.45.0 and updated in SDK 1.95, our documentation lists SDK 1.95 as the version. Update your app to the latest version so that you can use all parameters in the method.
*   **When calling a method from the Editor, check the Editor version.** Starting from SDK 1.45.0, methods are not supported in the old Editor. When using more recent methods in the Editor, provide a fallback option for users in the old Editor. Keep reading to learn more.
```

#### Function 03: Editor Version

- Summary: In 2015, we launched a new and improved version of the Wix Editor. We are gradually moving users over to the new Editor, so some users are still using the old Editor.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
In 2015, we launched a new and improved version of the Wix Editor. We are gradually moving users over to the new Editor, so some users are still using the old Editor.

All methods that are available since SDK version 1.45.0 are not supported in the old Editor. To use these methods, you’ll need to detect the user’s Editor version and add a fallback option for the old Editor.

Here’s how:

1.  Call the Wix.Features.isSupported function and specify the feature you want to use. If the user is in the new Editor, you receive true via callback and you then need to call the relevant function.
2.  Make sure to include a fallback behavior for your app in case the user is in the old Editor (like an alternate function) – otherwise, an error will occur.
```

#### Function 04: Structure

- Summary: The Wix global object can be used in all components’ endpoints – Widget, Page, Fixed Position, Dashboard, Worker, and App Settings – as well as its controls – Modal and Popup. However, some of its functions make sense only in certain endpoints.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
The Wix global object can be used in all components’ endpoints – Widget, Page, Fixed Position, Dashboard, Worker, and App Settings – as well as its controls – Modal and Popup. However, some of its functions make sense only in certain endpoints.

The most obvious distinction is the App Settings endpoint.

The App Settings endpoint is different since it is the only endpoint that resides in the Editor while the others reside in the user’s website or the My sites dashboard. For that reason we created a namespace Wix.Settings that holds all the functions that are valid in the App Settings endpoint.

Another special namespace is the Wix.Utils. It provides utility functions that can be called by all endpoints (except worker).

> **Note:**  
> Although Wix.Utils is valid for all endpoints (except worker), if the called function doesn’t have a meaningful value to return, it returns null. For example, when Wix.Utils.getOrigCompId() is used in the App Settings endpoint, the function returns the component ID that called it – but for other endpoints, it returns null.
{note}
```

#### Function 05: Async Methods

- Summary: If you see a method in our SDK has a callback function, this means that the method is asynchronous. The “return” value is passed as an argument in the callback function.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
If you see a method in our SDK has a callback function, this means that the method is asynchronous. The “return” value is passed as an argument in the callback function.
```

---

## DOC-02: Wix

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix

### Sections and Functions
#### Function 01: addEventListener

- Summary: Allows the site component to listen to events that happen in the editor or website.

- Syntax:
```javascript
addEventListener(eventName, callback)
```

- Example:
```javascript
$(document).ready(function()  {
    Wix.addEventListener(Wix.Events.EDIT_MODE_CHANGE, function(event)  {
        console.log("Edit mode changed to " + event.editMode);
    })
});
```

- Details:
```markdown
Allows the site component to listen to events that happen in the editor or website.

> **SDK Version**: SDK 1.11.0 - 1.96.0+    
**Editor Version**: New Editor, Old Editor     
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page

> **Important:**  
Check the specific SDK version for each event. Events that are available in SDK versions higher than 1.45.0 are not supported in the old Editor. Learn more.

Make sure to register event listeners when the document loads, since previous listeners might be invalidated when we load your app.

**Parameters:**

|Name	|Type	|Description|
|---|---|---|
|eventName (required)	|Wix.Events	|Unique event identifier, listed in the table below|
|callback (required)	|Function 	|A callback function that is called by the SDK once an event occurs|

The events that you can currently listen to are:

|Event	|Event Data	|Description|
|---|---|---|
|COMPONENT_DELETED	|{}	|Issued when the user deletes a site component. Note: This event is only sent to the component that was deleted, so use the Wix.PubSub.publish method to alert other site components in your app about this event. For worker components, use Wix.Worker.PubSub.publish. Availability: Since 1.13.0|
|DEVICE_TYPE_CHANGED	|{  deviceType: 'desktop' or 'mobile'}|	Issued when the user switches between the desktop editor and mobile editor. Availability: Since 1.45.0|
|EDIT_MODE_CHANGE 	|{editMode: 'editor'    or 'preview'}	|Issued when a user toggles between preview and edit mode in the editor. Availability: Since 1.11.0|
|INSTANCE_CHANGED| {instance: instanceValue} |Issued when a component in your app called Wix.revalidateSession in the live site.Availability: Since 1.96.0|
|KEY_DOWN | {charCode:0keyCode:39} | Issued when the user presses one of these keys on the keyboard:left/right arrows, esc, enter, space bar. Availability: Since 1.76.0|
|KEY_UP | {charCode:0keyCode:39} |Issued when the user presses one of these keys on the keyboard:left/right arrows, esc, enter, space bar. Availability: Since 1.76.0|
|MEMBER_DETAILS_UPDATED | For example: `"attributes": {  "name": "John Doe",  "firstName": "John",  "lastName": "Doe",  "imageUrl": "https://myImage.jpg",  "nickname": "Johnny "}}` | Issued when a member changes their personal details. Availability: Since 1.89.0|
|PAGE_NAVIGATION |	{"toPage": "Page1", "fromPage": "Page2"}|	Issued on any page navigation in the website. Availability: Since 1.25.0|
|PAGE_NAVIGATION_IN |	{"toPage": "Page1", "fromPage": "Page2"}|	Issued on any page in navigation in the website. This event is a utility event on top of the PAGE_NAVIGATION event. Availability: Since 1.25.0|
|PAGE_NAVIGATION_OUT	|{"toPage": "Page1", "fromPage": "Page2"}	|Issued on any page out navigation in the website. This event is a utility event on top of the PAGE_NAVIGATION event. Availability: Since 1.25.0|
|PUBLIC_DATA_CHANGED |{      key1: value1               } |Issued when app data is changed using Wix.Data.Public methods. Note that all registered components will get this event. Availability: Since 1.74.0| 
|SCROLL|	{"scrollTop": 4,  "scrollLeft": 0,  "documentHeight":  724, "documentWidth":  1227,  "x": 124,  "y": 131,  "height": 682,  "width": 978,  "left": 124.5,  "bottom": 809,  "right": 1102.5,  "top": 127}|	Issued when scroll happens inside the site. The event data contains multiple details that helps the app determine its behavior considering its position in the site, the browser window dimensions, and the scrolling state: **ScrollTop** - site's scroll position on the y axis, **scrollLeft** - site's scroll position on the x axis, **documentHeight** - site's document height, **documentWidth** - site's document width, **x** - app offset within the site's page on the x axis, **y** - app offset within the site's page on the y axis, **height** - app height, **width** - app width, **left** - app top-left offset from the left, **bottom** - app top-left offset from the bottom, **right** - app top-left offset from the right, **top** - app top-left offset from the top. Availability: Since 1.25.0|
|SETTINGS_UPDATED|	Custom json	|Issued by the App Settings endpoint when new settings are applied by the user. Availability: Since 1.17.0|
|SITE_METADATA_CHANGED|{  title: 'example title', description: 'example description' }| Issued when the page metadata (title, description) changes. Availability: Since 1.75.0|
|SITE_PUBLISHED	|{}|	Issued when the user publishes the website. Availability: Since 1.13.0|
|SITE_SAVED	|{}|Issued when the user saves the website. Availability: Since 1.62.0|
|STATE_CHANGED	|{newState: 'state'}|	Issued when the website state changed. Learn more about the component's state and deep linking. Availability: Since 1.29.0|
|STYLE_PARAMS_CHANGE|	{colors: Object, numbers: Object, booleans: Object, fonts: Object}	|Issued when the user changed a color, font, number, or boolean value in your app’s settings panel. Availability: Since 1.22.0|
|THEME_CHANGE| {fonts: Object, siteTextPresets: Object, siteColors: Array (30 colors of palette), style: Object} |Issued when the user changed the site’s color palette. Availability: Since 1.22.0|
|WINDOW_PLACEMENT_CHANGED	|"BOTTOM_RIGHT"	|Issued when the user changed the position of a fixed-position widget. Availability: Since 1.18.0|

**Example:**
```

#### Function 02: closeWindow

- Summary: Closes the modal or popup endpoint.

- Syntax:
```javascript
closeWindow(\[message\])
```

- Example:
```javascript
var message = {"reason": "button-clicked"};
Wix.closeWindow(message);
```

- Details:
```markdown
Closes the modal or popup endpoint.

> **SDK Version**: SDK 1.16.0+   
**Display**: Live Site, Preview  
**Components**: Modal, Popup
   
   

**Parameters**:

|Name 	|Type	|Description|
|---|---|---|
|message	|Object	|A custom message to pass to the calling endpoint’s onClose callback function|

**Example:**
```

#### Function 03: currentMember

- Summary: Retrieves the current Site Member, if one exists.

- Syntax:
```javascript
currentMember(callback)
```

- Example:
```javascript
Wix.currentMember(function(memberDetails)  {
    // save memberDetails
})
```

- Details:
```markdown
Retrieves the current Site Member, if one exists.

> **SDK Version**: SDK 1.6.0+  
**Display**: Live Site     
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|Callback function to receive member details|

**Value passed to callback**:  
An object containing the Site Member’s details:  

|Name	|Type	|Description|
|---|---|---|
|name	|String	|Member's name|
|email	|String |Member's email|
|id	|String |Member's ID|
|owner|Boolean	|True if the member is either the site owner or one of the site's contributors|

**Example:**
```

#### Function 04: getAdsOnPage

- Summary: Retrieves the width and height of Wix ads in the live site.

- Syntax:
```javascript
getAdsOnPage(callback)
```

- Example:
```javascript
Wix.getAdsOnPage(onSuccess);

//example response
{
    top:  {
        height:  26,
        width:  155
    },
    bottom:  {
        height:  40,
        width:  684
    }
}
```

- Details:
```markdown
Retrieves the width and height of Wix ads in the live site.

> **SDK Version**: SDK 1.77.0+   
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page

You can use this data to position your site component correctly, so that there’s enough space between your app and the ad.

**Parameters**:

|Name	|Type 	|Description|
|---|---|---|
|callback (required)|Function|Callback function to receive the width and height of Wix ads on the page|

**Value passed to callback**:   
An object with the width and height of each Wix ad on the page, in pixels. (If there are no ads, object is empty.)  

**Example:**
```

#### Function 05: getBoundingRectAndOffsets

- Summary: Retrieves information about the bounding box (a rectangle) of the current component: *   x, y coordinates of the bounding rectangle, and its offsets relative to the top-left of the viewport *   size of the bounding rectangle

- Syntax:
```javascript
getBoundingRectAndOffsets(callback)
```

- Example:
```javascript
//This example expands a fixed-position widget component
//positioned at the bottom-right of the viewport
//to 100% of the screen size
Wix.getBoundingRectAndOffsets(function(data){
    var height = data.offsets.y + data.rect.height;
    var width = data.offsets.x + data.rect.width;
    Wix.resizeWindow(width, height);
});
```

- Details:
```markdown
Retrieves information about the bounding box (a rectangle) of the current component:
*   x, y coordinates of the bounding rectangle, and its offsets relative to the top-left of the viewport
*   size of the bounding rectangle

> **SDK Version**: SDK 1.26.0+   
**Editor Version**: New Editor, Old Editor  
**Display**: Live Site, Preview   
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup
    

**Parameters**:

Name	|Type	|Description |
|---|---|---|
|callback (required)	|Function	|A callback function that returns the size and coordinates of the bounding rectangle and its offsets (in pixels)|

**Value passed to callback**:  
An object that contains two objects – offsets and rect:

|Name	|Type	|Description| 
|---|---|---|
|**offsets**	|Object	|Coordinates of the top-left point of the bounding rectangle, relative to the top-left of the viewport|
|offsets.**x**	|Number	|Left (x) coordinate value of the bounding rectangle|
|offsets.**y**	|Number	|Top (y) coordinate value of the bounding rectangle|
|**rect**	|Object	|Size of the component and its x,y coordinates, relative to the top-left of the viewport|
|rect.**width**|	Number	|Width of the bounding rectangle|
|rect.**height**|	Number	|Height of the bounding rectangle|
|rect.**top**|	Number|	Top (y) coordinate value of the bounding rectangle|
|rect.**bottom**|	Number|	Bottom (y) coordinate value of the bounding rectangle|
|rect.**left**|	Number|	Left (x) coordinate value of the bounding rectangle|
|rect.**right**|	Number|	Right (x) coordinate value of the bounding rectangle|

**Example:**
```

#### Function 06: getComponentInfo

- Summary: Retrieves information about the current component. For example, you’ll be able to know if a widget is shown on all pages.

- Syntax:
```javascript
getComponentInfo(callback)


Wix.getComponentInfo( function(compInfo) {
    //do something with the compInfo
});
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Retrieves information about the current component. For example, you’ll be able to know if a widget is shown on all pages.

> **SDK Version**: SDK 1.64.0+      
**Editor Version**: New Editor  
**Display**: Live Site, Preview     
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page 

**Parameters:**

|Name|	Type|	Description|
|---|---|---|
|callback (required)|	Function|	A callback function to get information about the component|

**Value passed to callback**:  
An object containing the component info:

|Name|	Type| Description|
|---|---|---|
|compId|	String|	The unique ID of this component in the Wix site|
|pageId|	String|	ID of the page that contains the component. Returns null if the component is a widget that’s set to show on all pages.|
|showOnAllPages	|Boolean| True if the user set the widget to show on all pages. False if the component is a page, or if the widget is not set to show on all pages.|
|tpaWidgetId|	String|	ID of the widget component, as specified in the Dev Center. Returns null if the component is a page, or if you’re using this method in the live site.|
|appPageId 	|String	|ID of the page component, as specified in the Dev Center. Returns null if the component is a widget, or if you’re using this method in the live site.|
```

#### Section 07: Example:

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

#### Function 08: getCurrentPageAnchors

- Summary: Retrieves the anchors on the current page.

- Syntax:
```javascript
getCurrentPageAnchors(callback)
```

- Example:
```javascript
Wix.getCurrentPageAnchors(function(anchors) {
    // do something with anchors
});
```

- Details:
```markdown
Retrieves the anchors on the current page. 

> **SDK Version**: SDK 1.62.0+      
**Editor Version**: New Editor     
**Display**: Live Site, Preview    
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup
    

> **Note:**  
In the settings endpoint, use [Wix.Settings.getCurrentPageAnchors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings#getcurrentpageanchors) instead.

**Parameters:**

|Name	|Type 	|Description|
|---|---|---|
|callback (required)	|Function| Callback function to receive an array of anchors (unordered)|

**Value passed to callback**:  
An array of unordered objects. If there are no anchors on the current page, method retrieves just one default anchor – the top of the page.
Each object represents an anchor on the current page, and contains the following properties:

|Name	|Type	|Description|
|---|---|---|
|id	|String	|The anchor ID|
|title	|String	|The anchor title|
```

#### Function 09: getCurrentPageId

- Summary: Retrieves the ID of the current page.

- Syntax:
```javascript
getCurrentPageId(callback)
```

- Example:
```javascript
Wix.getCurrentPageId(function(pageId) {
    //store the pageId
});
```

- Details:
```markdown
Retrieves the ID of the current page.

>**SDK Version**: SDK 1.31.0+      
**Editor Version**: New Editor, Old Editor  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup
    

> **Warning:**  
Navigating to a page using its pageId? **Don’t** use this method to get the pageId – use [Wix.getCurrentPageNavigationInfo](fallback::#getcurrentpagenavigationinfo) instead.

**Parameters**:

|Name|	Type|	Description|
|---|---|---|
|callback (required)|Function	|Callback function to receive the pageId|

**Value passed to callback**: 
A string representing the pageId.
```

#### Function 10: getCurrentPageNavigationInfo

- Summary: Retrieves navigation info for the current page in the site.

- Syntax:
```javascript
getCurrentPageNavigationInfo(callback)
```

- Example:
```javascript
Wix.getCurrentPageNavigationInfo(function(data) {
    console.log(data);
});
```

- Details:
```markdown
Retrieves navigation info for the current page in the site.

> **SDK Version**: SDK 1.91.0+  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup
 
This method supports both regular and dynamic pages.

**Parameters**:

|Name|	Type|	Description|
|---|---|---|
|callback (required)| Function| Callback function to receive an object with details about this page.Use this object when navigating to the page - see [Wix.navigateTo](fallback::#navigateto).|

**Value passed to callback**: 
An object with the data needed to navigate to this page. Save the object in your database and navigate to the page using [Wix.navigateTo](fallback::#navigateto).

> **Warning:**  
Save this object in your database as is – **don’t** change it in any way.
```

#### Function 11: getSiteInfo

- Summary: Retrieves information about the site where your app is installed.

- Syntax:
```javascript
getSiteInfo(callback)
```

- Example:
```javascript
Wix.getSiteInfo( function(siteInfo) {
    //do something with the siteInfo
});
```

- Details:
```markdown
Retrieves information about the site where your app is installed.

> **SDK Version**: SDK 1.3.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal,Popup

**Parameters**:

|Name	|Type |	Description|
|---|---|---|
|callback (required)	|Function	|Callback function to receive the site info |

**Value passed to callback**:  
Object containing the site info:

|Name	|Type	|Description |
|---|---|---|
|baseUrl |String |Base url of the current site, for example: `http://user.wix.com/site-name`, `http://www.domain.com` |
|pageTitle |String |The page title that is used for SEO. This title includes both the site and page title (e.g., “My Store / Animal Shirt”). |
|pageTitleOnly| String| The name of the page - without the site title (e.g., “Animal Shirt”).|
|referrer |String |The referrer header of the HTTP request |
|siteDescription |String |The description of the site that is used for SEO |
|siteKeywords |String |The keywords which are related to the site and are used for SEO |
|siteTitle |String |The title of the site that is used for SEO |
|url |String |The URL (taken from the location.href property). The URL includes the internal site state, for example: `http://user.wixsite.com/site-name/pageTitle`, `http://www.domain.com/pageTitleReturns` the site URL only when using `getSiteInfo`  in the live site and preview mode. When using it in Editor mode, returns the Editor URL.  |
```

#### Function 12: getSiteMap

- Summary: Retrieves all items in the site structure, including:

- Syntax:
```javascript
getSiteMap(callback)
```

- Example:
```javascript
Wix.getSiteMap(function(siteMap) {
    //do something with the site pages
});
```

- Details:
```markdown
Retrieves all items in the site structure, including:

*   **Items in the site’s menu** – pages (including subpages), links, and menu headers.
*   **Hidden pages** – pages that are in the site, but not in the site menu. For example, a “Thank You” page that’s shown only after a site visitor makes a purchase.

> **SDK Version**: SDK 1.81.0+  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

> **Note:**  
Use this method instead of getSitePages, which is now deprecated.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|Callback function to receive the site structure|

**Value passed to callback**:   
An array of objects, where each object represents an item in the site structure.

> **Warning**:
To use this object later (for example, if you want to [navigate to a link](fallback::#navigateto) on the user’s site), save this object in your database as is – **don’t** change it in any way.

Each object contains data about the item. The data sent depends on the item – check out our examples below.

|Name	|Type	|Description|
|---|---|---|
|type|String|Type of link the item represents - for example ‘PageLink’ or ‘AnchorLink’.The data returned depends on the item - for example, an ‘AnchorLink’ object will include the anchorName and anchorDataId properties. Check out our examples below.|
|pageId|String|The page ID. Note: If the user added a page anchor to the site’s menu, then this method returns an object for the anchor - so there might be multiple objects with the same page ID.|
|title|String|The item title|
|hidden|Boolean|Returns true if this page is hidden|
|isHomePage|Boolean|Returns true if this page is the site's home page|
|url|String|URL of this item|
|subPages|Array [objects]|(Page objects only) If the page has subpages, returns an ordered set of subpages. Each subpage object contains more information about the subpage (id, title, hide, isHomePage, url).|

Here’s an example of an array passed to the callback function:
```

#### Function 13: getStateUrl

- Summary: This method retrieves the full URL of one of your internal pages on the live site, including the app’s state. For example:   _mysite.com/my-store-app/product1_.

- Syntax:
```javascript
getStateUrl(sectionId, state, callback)
```

- Example:
```javascript
Wix.getStateUrl('myStoreApp', 'product1', function(data) {
    /* Do something with the data.url*/
});
```

- Details:
```markdown
This method retrieves the full URL of one of your internal pages on the live site, including the app’s state. For example:  
_mysite.com/my-store-app/product1_.  

> **SDK Version**: SDK 1.69.0+  
**Editor Version**: New Editor  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup
    
Use this method if you have a Page component and you need the URL of an internal page.   

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|sectionId (required)|String|ID of the Page component, as specified in the Dev Center|
|state (required)|String|State of the app’s internal page - for example, ‘product1’|
|callback (required)|Function|Callback function to receive the full URL of the page, including the app state|
```

#### Function 14: isApplicationInstalled

- Summary: Allows you to check if another one of your apps is installed.

- Syntax:
```javascript
isApplicationInstalled(appDefinitionId, callback)
```

- Example:
```javascript
Wix.isApplicationInstalled(
    '1380b703-ce81-ff05-f115-39571d94dfcd',
    function(isInstalled){console.log(isInstalled)}
);
```

- Details:
```markdown
Allows you to check if another one of your apps is installed.

 > **SDK Version**: SDK 1.86.0+  
**Editor Version**: New Editor  
**Display**: Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|appDefinitionId (required)|String	|App ID, as specified in the Developers Center|
|callback (required)|	Function	|Callback function that receives a boolean indicating if the app is installed in the site: ```function(isInstalled) {}```|
```

#### Function 15: isAppSectionInstalled

- Summary: Allows you to check if the user added one of your app’s hidden or custom pages (like a thank you or checkout page).

- Syntax:
```javascript
isAppSectionInstalled(sectionId, \[options\], callback)
```

- Example:
```javascript
Wix.isAppSectionInstalled(
    'page_component_id',
    function(isInstalled) {console.log (isInstalled)}
);
```

- Details:
```markdown
Allows you to check if the user added one of your app’s hidden or custom pages (like a thank you or checkout page).

> **SDK Version**: SDK 1.89.0+  
**Editor Version**: New Editor  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**sectionId** (required)|String|ID of the Page component, as specified in the Developers Center|
|**options**|Object	|Options for this method|
|options.**appDefinitionId**|String|If the Page component is in a different one of your apps, enter that app’s ID (specified in the Developers Center)|
|**callback** (required)|Function	|Callback function that receives a boolean indicating if the Page component is installed in the site: ```function(isInstalled) {}```|
```

#### Function 16: isVisualFocusEnabled

- Summary: Checks if the user enabled visual focus for the live site. If your account manager told you to manually inject visual focus into your app, use this method before displaying visual focus.

- Syntax:
```javascript
isVisualFocusEnabled(callback)
```

- Example:
```javascript
Wix.isVisualFocusEnabled(
    function(isEnabled){console.log(isEnabled)}
);
```

- Details:
```markdown
Checks if the user enabled visual focus for the live site. If your account manager told you to manually inject visual focus into your app, use this method before displaying visual focus.

> **SDK Version**: SDK 1.87.0+  
**Display**: Live Site  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup   

> **Important:**  
In most cases, we take care of visual focus and all you need to do is make sure you’re using SDK 1.84.0 or later. During the [app review](fallback::https://dev.wix.com/docs/build-apps/launch-your-app/app-submission/submit-your-first-app-version), we’ll let you know if you need to manually inject visual focus properties.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|callback (required)| Function|Function that receives a boolean indicating if visual focus is enabled: ```function(isEnabled) {}```|
```

#### Function 17: logOutCurrentMember

- Summary: Logs out a site member from the Wix site, and then refreshes the iframe. This method is relevant for apps that require site visitors to log in as members of the site.

- Syntax:
```javascript
logOutCurrentMember(\[onError\])
```

- Example:
```javascript
Wix.logOutCurrentMember()
```

- Details:
```markdown
Logs out a site member from the Wix site, and then refreshes the iframe. This method is relevant for apps that require site visitors to log in as members of the site.

> **SDK Version**: SDK 1.67.0+  
**Display**: Live Site  
**Component**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|onError	|Function	|Callback function with error details. An error is thrown if there is no site member logged in.|
```

#### Function 18: navigateTo

- Summary: Navigates to a page or link object. This object is passed to the callback function in one of these methods:  *   getSiteMap ([Wix.getSiteMap](fallback::#getsitemap)**,** [Wix.Settings.getSiteMap](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings#getsitemap), or [Wix.Worker.getSiteMap](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-worker#getsitemap) *   [Wix.getCurrentPageNavigationInfo](fallback::#getcurrentpagenavigationinfo) *   [Wix.Settings.openLinkPanel](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings#openlinkpanel)

- Syntax:
```javascript
navigateTo(linkData, \[onFailure\])
```

- Example:
```javascript
Wix.navigateTo(
    {
        "type":  "PageLink",
        "pageId":  "#c1dmp"
    },  
    function() {...}
);
```

- Details:
```markdown
Navigates to a page or link object. This object is passed to the callback function in one of these methods: 
*   getSiteMap ([Wix.getSiteMap](fallback::#getsitemap)**,** [Wix.Settings.getSiteMap](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings#getsitemap), or [Wix.Worker.getSiteMap](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-worker#getsitemap)
*   [Wix.getCurrentPageNavigationInfo](fallback::#getcurrentpagenavigationinfo)
*   [Wix.Settings.openLinkPanel](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings#openlinkpanel)

> **SDK Version**: SDK 1.81.0+  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|linkData (required)	|Object|Object with link data, received in the callback function of these methods: [Wix.Settings.openLinkPanel](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings#openlinkpanel), [Wix.getCurrentPageNavigationInfo](fallback::#getcurrentpagenavigationinfo), [getSiteMap (Wix.getSiteMap](fallback::#getsitemap), [Wix.Settings.getSiteMap](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings#getsitemap), or [Wix.Worker.getSiteMap](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-worker#getsitemap)|
|onFailure	|Function|Callback function to receive details about a navigation error|

> **Note:**  
In preview, this method can’t open the link in the current window (\_self). In SDK versions 1.94.0 and later, we send the following error code and you can display a message for users (e.g., “This link will work on your Published site.”)
```

#### Function 19: navigateToAnchor

- Summary: Navigates to an anchor on the current page.

- Syntax:
```javascript
navigateToAnchor(anchorId, \[onFailure\])
```

- Example:
```javascript
//Navigates to anchor with id = anchor1
Wix.navigateToAnchor('anchor1', function(error) {console.log(error.error)});
```

- Details:
```markdown
Navigates to an anchor on the current page.

>**SDK Version**: SDK 1.62.0+  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|anchorId (required)|	String	|ID of the anchor to navigate to|
| onFailure |	Function|	Callback function to receive an object that specifies the error. An error is invoked when the anchor doesn’t exist on the current page.|
```

#### Function 20: navigateToComponent

- Summary: Directs site visitors to another component of your app.

- Syntax:
```javascript
navigateToComponent(compId, \[options\], \[onFailure\])
```

- Example:
```javascript
//Scrolls to a component with id = comp1, on a page with id = page1
Wix.navigateToComponent('comp1', {pageId: 'page1'}, function(error) {console.log(error.error)} );
```

- Details:
```markdown
Directs site visitors to another component of your app.

> **SDK Version**: SDK 1.47.0+  
**Display**: Live Site, Preview  
**Component**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup   

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**compId** (required)|	String|	The component to send site visitors to|
|**options**|	Object|	Options for this function|
|options.**pageId**|	String| 	You can specify the pageId to navigate to. When pageId is not provided, the function navigates to a component with the given id on the current page. |
|**onFailure**	|Function|	Callback function to receive an object that specifies the error. An error is invoked when: The current page does not contain the given component (and pageId was not provided), The provided pageId is not valid, The pageId is given but the page does not contain a component with the provided component ID. Note: The function will first navigate to a page with the provided pageId as an effect of this API call.|
```

#### Function 21: navigateToPage

- Summary: Navigates to a specific page or anchor in the site.

- Syntax:
```javascript
navigateToPage (pageId,\[options\],\[onFailure\])
```

- Example:
```javascript
//Finds the second page in the site and navigates to it
Wix.getSiteMap(function(siteMap) {
    var  page_id = siteMap[1].pageId.substr(1);
    Wix.navigateToPage(page_id);
});
```

- Details:
```markdown
Navigates to a specific page or anchor in the site.

> **SDK Version**: SDK 1.68.0+  
**Editor Version**: New Editor  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

> **Note:**  
In the Editor, you can use this method to navigates to pages only – not anchors.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**pageId** (required)|String| The page ID of the target page. Retrieve this id using the [Wix.getSiteMap](fallback::#getsitemap) method. |
|**options**	|Object|Options for this method|
|options.**anchorId**|String|The ID of the anchor on the page. Retrieve this id using the Wix.getCurrentPageAnchors method.If the anchorId is specified, the method first navigates to the page (according to the pageId parameter), and then scrolls to this anchor. Note that you can only navigate to an anchor in the live site/preview - not in the Editor.|
|**onFailure**|Function|Callback function to receive an object that specifies the error. An error is thrown when: The anchorId doesn’t exist on the specified page, or the pageId doesn’t exist.|
```

#### Function 22: onReady

- Summary: Runs the specified function once the DOM loads. The DOM here refers to the Wix Editor or a page in the live site.

- Syntax:
```javascript
onReady(callback)
```

- Example:
```javascript
Wix.onReady( () => { console.log('Wix site is fully rendered now') });
```

- Details:
```markdown
Runs the specified function once the DOM loads. The DOM here refers to the Wix Editor or a page in the live site.

> **SDK Version**: SDK 1.102.0+  
**Editor Version**: New Editor  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page

> **Note:**  
By waiting to run your code until the DOM is ready, you can help improve user experience and loading times.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|	Function| Function to run when the DOM is loaded|
```

#### Function 23: openModal

- Summary: Opens a lightbox-style modal window over the Wix site.

- Syntax:
```javascript
openModal(url, width, height, \[onClose\], \[theme\])
```

- Example:
```javascript
var onClose = function(message) { console.log("modal closed", message); };
Wix.openModal("https://static.wixstatic.com/media/3cd1de924697419088c1e033bb3384ef.jpg", 400, 400, onClose);
```

- Details:
```markdown
Opens a lightbox-style modal window over the Wix site.

> **SDK Version**: SDK 1.16.0+  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

Here’s how the modal works:

*   The modal is a runtime widget, so it’s not part of the site structure.
*   The modal is a singleton – every new modal closes the previous one.
*   Users can close the modal by clicking the lightbox or pressing the close button. You can close the modal by calling [Wix.closeWindow](fallback::#closewindow) from within the modal iframe.

**Parameters**:  

|Name	|Type	|Description|
|---|---|---|
|url (required)	|String 	|URL of the modal iframe|
|width (required)	|Number	|Width of the modal, in pixels (for example, 400) |
|height (required)|	Number	|Height of the modal, in pixels (for example, 400)|
|onClose	|Function	|OnClose callback function|
|theme	|Wix.Theme	|The style of the modal: **Wix.Theme.DEFAULT** - has the regular modal look & feel - border, shadow, close button. **Wix.Theme.BARE** - a simple modal with no border, close button, shadow, etc. |
```

#### Function 24: openPopup

- Summary: Opens a popup window in the live site or the preview mode of the Wix editor.

- Syntax:
```javascript
openPopup(url, width, height, position, \[onClose\], \[theme\])
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Opens a popup window in the live site or the preview mode of the Wix editor.

> **SDK Version**: SDK 1.17.0+  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page

Here’s how the popup works:

*   It’s a runtime widget, so it’s not part of the site structure.
*   Users can close the popup by clicking the close button. You can close the popup by calling [Wix.closeWindow](fallback::#closewindow) from within the popup iframe.
*   You can open a few instances of the popup at the same time (it’s not a singleton).

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**url** (required)	|String	|URL of the popup iframe|
|**width** (required)	|Number/ String |	Width of the popup. In pixels: Enter a number (for example, 400), In percent: Enter a string (for example,‘70%’)|
|**height** (required)	|Number/ String|	Height of the popup. In pixels: Enter a number (for example, 400). In percent: Enter a string (for example,‘70%’)|
|**position** (required)|	Object	|The position of the popup in the viewport|
|position.**origin** (required)|Wix.WindowOrigin|	Where to open the popup from: Wix.WindowOrigin.FIXED - Positions the popup relative to the browser viewport. The popup stays fixed to this position, even if the user scrolls. Wix.WindowOrigin.RELATIVE - Positions the popup relative to the component that opened it (i.e, your site component). The popup stays fixed to the component, even if the user scrolls. Wix.WindowOrigin.ABSOLUTE - Positions the popup at specific coordinates (x,y). These coordinates are relative to the top-left corner of the component that opened it, and not the viewport. (The coordinates of the component’s top-left corner are 0,0.)|
|position.**placement**| 	Wix.WindowPlacement	|Where to position the popup, relative to the origin you set above. The possible values are: Wix.WindowPlacement.TOP_LEFT, Wix.WindowPlacement.TOP_CENTER, Wix.WindowPlacement.TOP_RIGHT, Wix.WindowPlacement.CENTER_LEFT, Wix.WindowPlacement.CENTER, Wix.WindowPlacement.CENTER_RIGHT, Wix.WindowPlacement.BOTTOM_LEFT, Wix.WindowPlacement.BOTTOM_CENTER, Wix.WindowPlacement.BOTTOM_RIGHT. The default value is Wix.WindowPlacement.CENTER.|
|**onClose** |	Function|	OnClose callback function|
|**Theme**	|Wix.Theme|	The style of the popup window. **Wix.Theme.DEFAULT** - has the regular popup look & feel, with a border, shadow, close button. **Wix.Theme.BARE** - a simple popup with no border, close button, shadow, etc.|

>**Note**:  
When we render the popup, we’ll calculate if the popup will fit in the requested position with the specified size. If not, we’ll set the position to the center of the viewport:
{origin: Wix.WindowOrigin.FIXED, placement: Wix.WindowPlacement.CENTER}
This can happen when you set the origin to RELATIVE or ABSOLUTE, because the popup might be bigger than the margin between the site component and the viewport.

**Examples**:  
Open a popup window positioned in the center of the screen (size is in pixels):

Open a popup window positioned relative to the center of the component (size is in %):

Open a popup window positioned to the bottom right of a specific point (x,y).  
Calculate the x and y coordinates relative to the top-left corner of the site component that’s opening the popup – the coordinates of this corner are 0,0.
```

#### Function 25: pushState

- Summary: Enables AJAX style page apps to inform the Wix platform about a change in the app’s internal state. The new state will be reflected in the site/page URL. Once you call the pushState method, the browser’s top window URL will change the ‘app-state’ path part to the new state you provide with the pushState method (similar to the [browser history API](fallback::http://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history) ). Read more about [deep linking](portalId::63e3acd8-2a9c-421d-8f92-d02930eeb59eresourceId::bda46384-54af-49e8-b860-6688d0568307*fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/deep-linking-for-iframe-page-extensions) for a full explanation.

- Syntax:
```javascript
pushState(state)
```

- Example:
```javascript
Wix.pushState("app-state");
```

- Details:
```markdown
Enables AJAX style page apps to inform the Wix platform about a change in the app’s internal state. The new state will be reflected in the site/page URL. Once you call the pushState method, the browser’s top window URL will change the ‘app-state’ path part to the new state you provide with the pushState method (similar to the [browser history API](fallback::http://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history) ). Read more about [deep linking](portalId::63e3acd8-2a9c-421d-8f92-d02930eeb59eresourceId::bda46384-54af-49e8-b860-6688d0568307*fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/deep-linking-for-iframe-page-extensions) for a full explanation.

> **SDK Version**: SDK 1.08.0+  
**Display**: Live Site  
**Components**: Page    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|state (required)	|String	|The new app's state to push into the editor history stack|
```

#### Function 26: removeEventListener

- Summary: Allows to remove previously assigned event listeners that were specified using Wix.addEventListener.

- Syntax:
```javascript
removeEventListener (eventName, callBackOrId)
```

- Example:
```javascript
var callback = function(){};
var id = Wix.addEventListener(Wix.Events.EDIT_MODE_CHANGE, function(data)  {
    //do something
});

Wix.addEventListener(Wix.Events.PAGE_NAVIGATION, callback);

// remove listener as a callback function
Wix.removeEventListener(Wix.Events.PAGE_NAVIGATION, callback);

// remove listener as an id
Wix.removeEventListener(Wix.Events.EDIT_MODE_CHANGE, id);
```

- Details:
```markdown
Allows to remove previously assigned event listeners that were specified using Wix.addEventListener.

> **SDK Version**: SDK 1.25.0+  
**Editor Version**: New Editor, Old Editor  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)|	Wix.Events|	Unique event identifier|
|CallBackOrId (required)	|Function|	A callback function that was used with addEventListener, or an ID returned by addEventListener|
```

#### Function 27: replaceSectionState

- Summary: This method is like the [pushState](fallback::#pushstate) method, except that this method replaces the URL in the browser’s history.

- Syntax:
```javascript
replaceSectionState(state)
```

- Example:
```javascript
Wix.replaceSectionState("app-state");
```

- Details:
```markdown
This method is like the [pushState](fallback::#pushstate) method, except that this method replaces the URL in the browser’s history.

> **SDK Version**: SDK 1.106.0+  
**Display**: Live Site  
**Components**: Page

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**state** (required)	|String	|New state to push to the URL|
|**options**	|Object	|Options for this method|
|options.**queryParams**|	String	|Parameters to push to the URL|
```

#### Function 28: requestLogin

- Summary: Prompts the site visitor to log in or register to the site. After a successful login, the site (and app iframe) will reload. The signed-instance parameter is added, with details about the site visitor.

- Syntax:
```javascript
requestLogin(\[dialogOptions\],callback,\[onFailure\])
```

- Example:
```javascript
Wix.requestLogin({mode:'login'}, function (data) {
    //do something with the data
});
```

- Details:
```markdown
Prompts the site visitor to log in or register to the site. After a successful login, the site (and app iframe) will reload. The signed-instance parameter is added, with details about the site visitor.

> **SDK Version**: SDK 1.69.0+  
**Display**: Live Site  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

This method is relevant for apps that require site visitors to log in as members of the site.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**dialogOptions**|Object|Options for opening the login dialog box|
|dialogOptions.**mode**|'login' or 'signup'|Defines which dialog box should open by default: login or signup|
|dialogOptions.**language**|String|Language to use for the dialog box, as an [ISO 639-1](fallback::http://en.wikipedia.org/wiki/ISO_639-1) language code. For example, ‘en’ or ‘es’.|
|**callback** (required)|Function|Callback function to receive the member's details|
|**onFailure**|Function|Callback function to use when the site visitor doesn’t log in successfully|
```

#### Function 29: resizeComponent

- Summary: Resizes a component without affecting adjacent components. It is the equivalent of using the editor’s size toolbar.

- Syntax:
```javascript
resizeComponent(options, onSuccess, \[onFailure\])
```

- Example:
```javascript
Wix.resizeComponent({
    width: 400,
    height: 600
});
```

- Details:
```markdown
Resizes a component without affecting adjacent components. It is the equivalent of using the editor’s size toolbar.

> **SDK Version**: SDK 1.50.0+  
**Editor Version**: New Editor  
**Components**: Widget, Page

> **Note:**  
For fixed-position widgets, use [resizeWindow](fallback::#resizewindow) instead.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options** (required)	|Object|	Specify width and/or height (you must specify at least one)|
|options.**width**|	Number|	Size in pixels, for example: 450.If you don’t provide a value, the width remains the same.|
|options.**height**|	Number|	Size in pixels, for example: 450. If you don’t provide a value, the height remains the same.|
|**onSuccess** (required)|	Function|	Returns the new component size|
|**onFailure**|	Function|	Error message invoked when no value is provided for width and height (you must give a value for at least one)|
```

#### Function 30: resizeWindow

- Summary: Sets the width and/or height of a fixed-position widget. For widgets and pages, use [resizeComponent](fallback::#resizecomponent) instead.

- Syntax:
```javascript
resizeWindow (width, height, onComplete)
```

- Example:
```javascript
// The following call will resize the widget's window
Wix.resizeWindow(300,300);
```

- Details:
```markdown
Sets the width and/or height of a fixed-position widget. For widgets and pages, use [resizeComponent](fallback::#resizecomponent) instead.

> **SDK Version**: SDK 1.19.0+  
**Editor Version**: New Editor, Old Editor  
**Display**: Live Site, Preview  
**Components**: Pinned (aka Fixed-Position) Widget    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|width (required)|	Number 	|The new window's width|
|height (required)|	Number	|The new window's height|
|onComplete (required)	|Function|	On resize complete callback function|
```

#### Function 31: revalidateSession

- Summary: Verifies that the session is secure. If the session is secure, this method returns a newly-signed app instance.

- Syntax:
```javascript
revalidateSession(onSuccess, \[onFailure\])
```

- Example:
```javascript
Wix.revalidateSession(
    function(instanceData) {
        //handle success use-case
    }, 
    function(error) {
        //Handle error use-case
    }
);
```

- Details:
```markdown
Verifies that the session is secure. If the session is secure, this method returns a newly-signed app instance.

> **SDK Version**: SDK 1.96.0+  
**Editor Version**: New Editor  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page

Use this method before displaying sensitive information or performing an action that requires a secure session.

> **Important:**  
Using this method in the live site? We don’t refresh the iframe with the new instance, so make sure to also listen for the [INSTANCE\_CHANGED event](fallback::#addeventlistener). This notifies any other components of your app in the site that the instance was updated, as well as components of your app that the user copied multiple times.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|onSuccess (required)|Function|Receives a newly-signed and encoded app instance|
|onFailure|Function|Callback function in case the session isn't secure|
```

#### Function 32: scrollBy

- Summary: Performs a scroll by the specified number of pixels in the app’s hosting site window exactly as the [standard method](fallback::http://www.w3schools.com/jsref/met_win_scrollby.asp) does.

- Syntax:
```javascript
scrollBy(x, y)
```

- Example:
```javascript
Wix.scrollBy(0,0);
```

- Details:
```markdown
Performs a scroll by the specified number of pixels in the app’s hosting site window exactly as the [standard method](fallback::http://www.w3schools.com/jsref/met_win_scrollby.asp) does.

> **SDK Version**: SDK 1.19.0+  
**Display**: Live Site, Preview  
**Component**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|x (required)|	Number	How many pixels to scroll by, along the x-axis (horizontal)|
|y (required)|	Number|	How many pixels to scroll by, along the y-axis (vertical)|

> **Note:**  
In SDK versions 1.45.0 and earlier, this method was also available in the Editor. Since SDK v1.46.0, it is available only in the live site and preview.
```

#### Function 33: scrollTo

- Summary: Performs a scroll to a fixed position in the app’s hosting site window exactly as the [standard method](fallback::http://www.w3schools.com/jsref/met_win_scrollto.asp) does.

- Syntax:
```javascript
scrollTo(x, y,\[options\])
```

- Example:
```javascript
Wix.scrollTo(0, 0, {scrollAnimation: true});
```

- Details:
```markdown
Performs a scroll to a fixed position in the app’s hosting site window exactly as the [standard method](fallback::http://www.w3schools.com/jsref/met_win_scrollto.asp) does.

> **SDK Version**: SDK 1.89.0+  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**x** (required)|	Number	|The coordinate to scroll to, along the x-axis |
|**y** (required)|	Number|	The coordinate to scroll to, along the y-axis|
|**options**	|Object|Options for this method|
|options.**scrollAnimation**|Boolean|Indicates whether to scroll with an animation. true - scrolls with an animation, false - scrolls directly to the target, with no animation|
```

#### Function 34: setHeight

- Summary: In editing mode, this method causes re-measurement and re-adjustment of adjacent components. It is the equivalent of using the resize handle in the editor, “pushing” other components downward or upward as necessary.

- Syntax:
```javascript
setHeight(height, \[options\])
```

- Example:
```javascript
Wix.setHeight(1000, {overflow:true})
```

- Details:
```markdown
In editing mode, this method causes re-measurement and re-adjustment of adjacent components. It is the equivalent of using the resize handle in the editor, “pushing” other components downward or upward as necessary.

> **SDK Version**: SDK 1.50.0+  
**Editor Version**: New Editor  
**Display**: Live Site, Preview  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

You can do one of the following:

*   Display your app over other components in the page
*   Push other components further down the page (default behavior)

**Parameters:**

|Name	|Type	|Description|
|---|---|---|
|**height** (required)	|Number	|An integer that represents the desired height in pixels. **Important**: The max height is 10,000px. When exceeded, the app frame is cut in the live site. |
|**options**|	Object|	Options for this method|
|options.**overflow**|	Boolean |Tells the platform how to display the component. true to display and resize this component over other components on the page, false to push other components further down the page (the default behavior).  |
```

#### Function 35: setPageMetadata

- Summary: Sets metadata for the page. Search engines display this metadata – the page’s title and/or description – in search results.

- Syntax:
```javascript
setPageMetadata(\[options\])
```

- Example:
```javascript
Wix.setPageMetadata({
    title: 'Page Name',
    description: 'new description'
});
```

- Details:
```markdown
Sets metadata for the page. Search engines display this metadata – the page’s title and/or description – in search results.

> **SDK Version**: SDK 1.67.0+  
**Display**: Live Site  
**Components**: Page  

 

> **Important:**  
Make sure the title and description you add here match your app’s [SEO endpoint](portalId::63e3acd8-2a9c-421d-8f92-d02930eeb59eresourceId::1fbf6b10-e0a4-4fa7-8ab2-3561523ad980*fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/optimize-for-seo-iframe).

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options**|Object|Page metadata|
|options.**title**|String|The name of this page (for example, the product name). We’ll insert this name into the page title.|
|options.**description**|String|The page description|

# Deprecated
```

#### Function 36: getSitePages

- Summary: Retrieves all pages in this site. A page can be:

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Retrieves all pages in this site. A page can be:

*   An item in the site’s menu – a page, subpage, external link, link to a page anchor, or menu header.
*   A hidden page/subpage – these pages are part of the site, but they’re not part of the site menu. For example, a “Thank You” page that’s shown only after a site visitor makes a purchase.

> **SDK Version**: Deprecated  

> **Warning:**  
Now that this method is deprecated, use [getSiteMap](fallback::#getsitemap) instead.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|options	|Object|	Options for this method|
|callback (required)|	Function	|A callback function to receive the site structure|
 
Returns:
An array of objects, where each object represents a page in the site. 

The objects are ordered according to the site’s structure shown in the Pages menu of the Wix Editor. If a page has subpages, they are returned as an array of objects nested _inside_ the page object.

Each page/subpage object contains the following properties:

|Name	|Type	|Description|
|---|---|---|
|id	|String	|The page/subpage ID. If the user added a page anchor to the site’s menu, then this method returns an object for the anchor - so there might be multiple objects with the same page ID|
|title	|String	|The title of the page/subpage|
|hide	|Boolean	|Returns true if this page/subpage is hidden|
|isHomePage	|Boolean	|Returns true if this page/subpage is the site's home page|
|subPages	|Array [objects]	|(Page objects only) If the page has subPages, returns an ordered set of subpages. Each subpage object contains more information about the subpage (id, title, hide, isHomePage, url).|
```

#### Function 37: reportHeightChange

- Summary: Requests the hosting Wix platform to change the iframe’s height inside the website or the editor.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Requests the hosting Wix platform to change the iframe’s height inside the website or the editor.

> **SDK Version**: Deprecated

> **Warning:**  
Now that this method is deprecated, use [setHeight](fallback::#setheight) instead.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|height (required)	|Number	|An integer that represents the desired height in pixels|
```

---

## DOC-03: Wix.Activities

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-activities

### Sections and Functions
#### Function 01: getActivityById

- Summary: Gets a specific Activity that occurred on the current site.

- Syntax:
```javascript
getActivityById(id, onSuccess, onFailure)
```

- Example:
```javascript
Wix.Activities.getActivityById(id, onSuccess, onFailure)
```

- Details:
```markdown
Gets a specific Activity that occurred on the current site.

> **SDK Version**: SDK 1.28.0+  
**Components**: Dashboard    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|id (required)	|String	|The ID of the activity to look up|
|onSuccess (required)	|Function	|Callback function to receive an object with data about the activity|
|onFailure (required)	|Function	|Callback triggered if the data could not be returned successfully|
```

#### Function 02: postActivity

- Summary: This method posts an activity to the current site. When the Activity is successfully created, the id of the activity will be returned. If schema validation fails, or other errors occur, an error is returned.

- Syntax:
```javascript
postActivity(activity, onSuccess, \[onFailure\])
```

- Example:
```javascript
var activity = {
    type: Wix.Activities.Type.FORM_CONTACT_FORM,
    info: { 
        subject: "My Subject",
        content: { message: "My Message"}
    },
    details: {
        additionalInfoUrl:'http://www.wix.com/my-account/app/{app-def-id}/{instance-id}/{app-related-deep-link}', 
        summary: ""
    },
    contactUpdate:{
        name: {first:"Kanye"},
        emails: [ {tag: "main", email: "email@email.com"} ]
    }
};

var onSuccess = function(d){console.log("Activity ID: " + d.activityId + ", Contact ID: " + d.contactId)};
var onFailure = function(d){console.log("Failure message:" + d)};

Wix.Activities.postActivity(activity, onSuccess, onFailure);
```

- Details:
```markdown
This method posts an activity to the current site. When the Activity is successfully created, the id of the activity will be returned. If schema validation fails, or other errors occur, an error is returned.

> **SDK Version**: SDK 1.25.0 – 1.77.0+  
**Display**: Live Site  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**activity (required)|Object|An activity descriptor (must follow specific type/schema pattern)|
|activity.**type** (required)|Wix.Activities.Type|The activity type as detailed in the table below|
|activity.**info** (required)|Object|Detailed information about this activity, according to the activity type schema|
|activity.**details** (required)|Object|More information about the activity|
|activity.details.**additionalInfoUrl** (required)|String|The URL to open when the user clicks on the activity notification in the site’s dashboard. Apps with a dashboard component: link to this specific activity within your app’s Dashboard component:```HTTP://www.wix.com/my-account/app/<appID>/<appInstanceID>/<appState>.``` For example, if a site visitor makes a purchase, direct users to a page where they can see details about this purchase. Apps without a dashboard component: Enter “null” or direct the user to a page with information about this activity. For example, if a site visitor liked a photo, direct the user to this photo on the live site.|
|activity.**contactUpdate** (required)|Object|Information about the site visitor who performed this activity. If you have any information about the site visitor, use contactUpdate to link the activity to a site Contact. Make sure to include at least the email or phone number in your request - we need it to create/update the contact. If not, use 'null'. However, note that we won't display the activity in the site's dashboard until we can link the activity to a contact. |
|activity.contactUpdate.**name** | Object | Contact's name|
|activity.contactUpdate.name.**prefix**|String	|Name prefix (limited to 100 characters)|
|activity.contactUpdate.name.**first**|	String	|First name (limited to 100 characters)|
|activity.contactUpdate.name.**middle**|String	|Middle name (limited to 100 characters)|
|activity.contactUpdate.name.**last**|	String|	Last name (limited to 100 characters)|
|activity.contactUpdate.name.**suffix**|String	|Name suffix (limited to 100 characters|
|activity.contactUpdate.**picture** |String|URL to the contact's photo|
|activity.contactUpdate.**company** |Object|Contact's company details|
|activity.contactUpdate.company.**role** |String|Contact's role at the company (limited to 100 characters)|
|activity.contactUpdate.company.**name** |String|Contact's company name (limited to 100 characters)|
|activity.contactUpdate.**emails** |Array[object]|Contact's emails|
|activity.contactUpdate.emails.**id**|Number|ID of this email within the array|
|activity.contactUpdate.emails.**tag** (required)|String|Tag for this email - home, work, etc. (limited to 100 characters)|
|activity.contactUpdate.emails.**email** (required)| String|Contact's email address (limited to 250 characters)|
|activity.contactUpdate.emails.**emailStatus** |"optOut", "transactional", or "recurring"|The subscription status for this email. optOut: Contact unsubscribed from all emails. transactional: Contact subscribed to non-promotional emails. recurring: Contact subscribed to all emails. |
|activity.contactUpdate.emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status. valid: When emails are delivered successfully. spam: When emails are marked as spam by the recipient. complaint: When the recipient of the email has made a complaint to the email provider. rejected: When the email is rejected by email provider. deferral: When your email provider refuses to send emails. bounce: When the mailbox is full, email address doesn't exist, etc. |
|activity.contactUpdate.**phones** |Array[object]|Contact's phone|
|activity.contactUpdate.phones.**Id**|Number|ID of this phone number within the array |
|activity.contactUpdate.phones.**tag** (required)|String|Tag for this phone number - home, work, etc (limited to 100 characters) |
|activity.contactUpdate.phones.**phone** (required)|String|Contact's phone number (limited to 30 characters)  |
|activity.contactUpdate.phones.**normalizedPhone**|String|Contact's normalized phone number |
|activity.contactUpdate.**addresses** |Array[object]|Contact's address|
|activity.contactUpdate.addresses.**id**|Number|ID of this address within the array|
|activity.contactUpdate.addresses.**tag** (required)|String|Tag for this address - home, work, etc (limited to 100 characters)|
|activity.contactUpdate.addresses.**address**|String|Contact's street address (limited to 250 characters)|
|activity.contactUpdate.addresses.**neighborhood**|String|Contact's neighborhood (limited to 100 characters)|
|activity.contactUpdate.addresses.**city**|String|Contact's city (limited to 100 characters)|
|activity.contactUpdate.addresses.**region**|String|Contact's region, such as a U.S. state or Canadian province  (limited to 100 characters)|
|activity.contactUpdate.addresses.**country**|String|Contact's country (limited to 100 characters)|
|activity.contactUpdate.addresses.**postalCode**|String|Contact's postal code (limited to 20 characters)|
|activity.contactUpdate.**urls** |Array[object]|URLs associated with the contact, like Facebook or LinkedIn|
|activity.contactUpdate.urls.**id**|Number|ID of this URL within the array|
|activity.contactUpdate.urls.**tag** (required)|String|Tag for this URL - personal, work, etc (limited to 100 characters)|
|activity.contactUpdate.urls.**url** (required)|String|The URL|
|activity.contactUpdate.**dates** |Array[object]|Important dates for this contact, like birthday|
|activity.contactUpdate.dates.**id**|Number|ID of this date within the array|
|activity.contactUpdate.dates.**tag** (required)|String|Tag for this date - birthday, anniversary, etc (limited to 100 characters)|
|activity.contactUpdate.dates.**date** (required)|String|The date, as an [ISO 8601](http://www.w3.org/TR/NOTE-datetime) timestamp|
|onSuccess (required)|Function	|Success callback function|
|onFailure  |Function	|Failure callback function|

The activity types that you can currently post:  

|Type	|Activity	|Description|
|---|---|---|
|FORM_CONTACT_FORM	|form/contact-form	| When your app submits a contact form|
|FORM_SUBSCRIPTION_FORM	|form/subscription-form	|When your app submits a subscription form|
|FORM_FORM|	form/form	|When your app submits another type of form|
|SCHEDULER_APPOINTMENT	|scheduler/appointment|	When an appointment is made|
|SCHEDULER_CONFIRMATION	|scheduler/confirmation	|When an appointment is confirmed. Availability: Since 1.45.0|
|SCHEDULER_CANCEL	|scheduler/cancel	|When an appointment is cancelled. Availability: Since 1.45.0|
|SOCIAL_COMMENT	|social/comment	|When a site visitor posts a comment on the site. Availability: Since 1.61.0|
|SOCIAL_SHARE_URL|	social/share-url	|When a site visitor shares an item (like a blog post or photo) on social media. Availability: Since 1.61.0|
|SOCIAL_TRACK|	social/track|	When a site visitor takes one of these social media actions on the user’s channel: like, follow, subscribe, pin. Availability: Since 1.61.0|
|HOTELS_PURCHASE	|hotels/purchase	|When a hotel service is purchased|
|HOTELS_PURCHASE_FAILED	|hotels/purchase-failed|When a purchase (of the hotel service) could not be completed|
|HOTELS_RESERVATION	|hotels/reservation	|When a reservation is made|
|HOTELS_CONFIRMATION	|hotels/confirmation	|When a reservation is confirmed|
|HOTELS_CANCEL	|hotel/cancel	|When a reservation is cancelled|
|TRACK_PLAY	|music/track-play	|When a request to start playing a song is made|
|TRACK_SKIP	|music/track-skip	|When a track was skipped|
|TRACK_PLAYED	|music/track-played	|When a song finished playing|
|TRACK_LYRICS	|music/track-lyrics	|When the track lyrics are requested|
|TRACK_SHARE	|music/track-share	|When a track is shared using your app|
|ALBUM_SHARE	|music/album-share	|When an album is shared using your app|
|ALBUM_FAN	|music/album-fan	|When a visitor becomes a fan of an album|
|ALBUM_PLAYED	|music/album-played	|When an album finished playing|
|ECOMMERCE_CART_ADD	|ecommerce/cart-add	|When an item is added to a cart. Availability: Since 1.45.0|
|ECOMMERCE_CART_REMOVE	|ecommerce/cart-remove	|When an item is removed from a cart. Availability: Since 1.45.0|
|ECOMMERCE_CART_CHECKOUT	|ecommerce/cart-checkout	|When a checkout process has begun with this cart. Availability: Since 1.45.0|
|ECOMMERCE_CART_ABANDON	|ecommerce/cart-abandon	|When a cart is abandoned. Availability: Since 1.45.0|
|ECOMMERCE_PURCHASE	|ecommerce/purchase	|When the checkout process has completed |
|MESSAGE_IM|messaging/im|When a chat/sms message is sent between a Wix user and a site visitor/contact|
|EVENTS_RSVP|events/rsvp|When a guest RSVPs to an event. Availability: Since 1.77.0|
|RESTAURANTS_ORDER|restaurants/order|When an order is placed in a restaurant. Availability: Since 1.77.0.|
```

---

## DOC-04: Wix.Analytics

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-analytics

### Sections and Functions
#### Function 01: trackEvent

- Summary: Reports an event in the live site to the user’s analytics tool, like Facebook Pixel or Google Analytics.

- Syntax:
```javascript
trackEvent(eventName, params)
```
```javascript
origin, **contents**\[{id, sku, **name**, price, currency, category, brand, variant, list, position}\]
```
```javascript
{origin, id, sku, **name**, price, currency, category, brand, variant, list, position}
```
```javascript
{origin, id, sku, **name**, price, currency, category, brand, variant, list, position, quantity}
```
```javascript
{origin, id, **name**, price, currency, category, brand, variant, position, quantity}
```
```javascript
origin, **contents**\[{id, sku, **name**, price, currency, category, brand, variant, quantity}\]
```
```javascript
{origin, option}
```
```javascript
{origin, step, action, option}
```
```javascript
{origin, **id**, affiliation, revenue, tax, shipping, coupon, **contents**}
```
```javascript
{event, \*}
```

- Example:
```javascript
Wix.Analytics.trackEvent('ViewContent', {
    sku: 'P12345',
    name: 'Really Fast Running Shoes',
    category: 'Apparel/Shoes',
    price: 150,
    currency: 'USD',
    brand: 'New Balance',
    variant: 'Blue',
    list: 'Search Results',
    position: 1
});
```
```javascript
Wix.Analytics.trackEvent('AddProductImpression', {
    origin: My Shoe Store',
    contents: [{
        sku: 'P12345',
        name: 'Really Fast Running Shoes',
        category: 'Apparel/Shoes',
        price: 100,
        currency: 'USD',
        brand: 'Nike',
        variant: 'Black',
        list: 'Search Results',
        position: 1
    }]
});
```
```javascript
Wix.Analytics.trackEvent('ClickProduct', {
    origin: 'My Shoe Store',
    id: 'P12345',
    name: 'Really Fast Running Shoes',
    category: 'Apparel/Shoes',
    price: 120,
    currency: 'USD',
    brand: 'Adidas',
    variant: 'Black',
    position: 1
});
```
```javascript
Wix.Analytics.trackEvent('ViewContent', {
    origin: 'My Shoe Store',
    sku: 'P12345',
    name: 'Really Fast Running Shoes',
    category: 'Apparel/Shoes',
    price: 150,
    currency: 'USD',
    brand: 'New Balance',
    variant: 'Blue',
    list: 'Search Results',
    position: 1
});
```
```javascript
Wix.Analytics.trackEvent('AddToCart', {
    origin: 'My Shoe Store',
    id: 'P12345',
    name: 'Really Fast Running Shoes',
    category: 'Apparel/Shoes',
    price: 120.5,
    currency: 'USD',
    brand: 'Saucony',
    variant: 'Silver',
    position: 2,
    quantity: 1
});
```
```javascript
Wix.Analytics.trackEvent('RemoveFromCart', {
    origin: 'My Shoe Store',
    id: 'P12346',
    name: 'Really Fast Running Shoes',
    price: 125.95,
    currency: 'USD',
    category: 'Apparel/Shoes',
    brand: 'Adidas',
    variant: 'Black',
    position: 1,
    quantity: 1
});
```
```javascript
Wix.Analytics.trackEvent('InitiateCheckout', {
    origin: 'My Shoe Store',
    contents: [ {
        sku: 'P12345',
        name: 'Really Fast Running Shoes',
        category: 'Apparel/Shoes',
        price: 100,
        currency: 'USD',
        brand: 'Nike',
        variant: 'Black',
        quantity: 2
    },
    {
        sku: 'P67890',
        name: 'Running Shirt',
        category: 'Apparel/Shirts',
        price: 50,
        currency: 'USD',
        brand: 'Nike',
        variant: 'Blue',
        quantity: 3
    }]
});
```
```javascript
Wix.Analytics.trackEvent('StartPayment', {
    origin: 'My Shoe Store',
    option: 'Fast Checkout'
});
```
```javascript
Wix.Analytics.trackEvent('AddPaymentInfo', {
    origin: 'My Shoe Store',
    option: 'Visa'
});
```
```javascript
Wix.Analytics.trackEvent('CheckoutStep', {
    origin: 'My Shoe Store',   
    step: '3',
    action: 'Select Shipping',
    option: 'Fast Checkout'
});
```
```javascript
Wix.Analytics.trackEvent('Purchase', {
    origin: 'My Shoe Store',
    id: 'T12345',
    affiliation: 'My Store',
    revenue: '22.16',
    tax: '2.85',
    shipping: '5.34',
    coupon: 'SUMMER2013',
    contents: [ {
        id: 'ABC123',
        quantity: 2,
        price: 1.99,
        currency: 'USD',
    },  
    {
        id: 'XYZ789',
        quantity: 1,
        price: 9.99,
        currency: 'USD',
    } ]
});
```
```javascript
Wix.Analytics.trackEvent('Lead');
```
```javascript
Wix.Analytics.trackEvent('CustomEvent', {
    event: 'FrequentShopper',
    num_purchases: 8,
    average_order: 245.24,
    favorite_category: 'Sporting Goods'
});
```

- Details:
```markdown
Reports an event in the live site to the user’s analytics tool, like Facebook Pixel or Google Analytics.

> **SDK Version**: SDK 1.93.0+  
**Display**: Live Site  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Worker  

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)|String|Name of the event, as specified in the list below.You can also define a custom event.|
|params (required)|Object|Object with key/value pairs required to report this event|

**Events**

You can report the following events with trackEvent:

*   **AddProductImpression** – When a visitor views a product
*   **ClickProduct** – When a visitor clicks on a product
*   **ViewContent** – When a key page is viewed (such as a product page)
*   **AddToCart** – When a visitor adds a product to the shopping cart
*   **RemoveFromCart** – When a visitor removes a product from shopping cart
*   **InitiateCheckout** – When a visitor starts the checkout process
*   **AddPaymentInfo** – When the visitor saves payment information
*   **Purchase** – When the checkout process is complete
*   **Lead** – When a visitor subscribes to a newsletter or submits a contact form
*   **CustomEvent** – When a visitor performs an event not listed above

> **Important:**  
In these events we refer to “products”, but a product can be any important item the user is tracking, like a service, event, music track or album, etc.

### AddProductImpression

Report this event when a visitor views a product or item.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin|	String	|Origin of the event (e.g. Music Player, Contact Form)|
|contents (required)|Array[Objects]|Key/value pairs with more details about the product|
|contents.**id**|String|Product ID|
|contents.**sku**|String|SKU number for the product|
|contents.**name** (required)|String|Name of the product|
|contents.**price**|Number|Price of the product|
|contents.**currency**|String|Currency code (e.g., EUR, USD, CAD)|
|contents.**category**|String|Category the product is listed under (e.g., ‘Accessories/Watches’)|
|contents.**brand**|String|Brand name of the product (e.g., ‘Nike’)|
|contents.**variant**|String|Variant of the product (like a specific color or size)|
|contents.**list**|String|List or collection the item is in (e.g., ‘Product Gallery’ or ‘Search Results’)|
|contents.**position**|Number|Position of this item within a list or collection (e.g., 1)|

### ClickProduct

Report this event when a visitor clicks on a product or item.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin	|String	|Origin of the event (e.g. Music Player, Contact Form)|
|id|String|Product ID|
|sku|String|SKU number for this product|
|name (required)|String|Name of the product|
|price|Number|Price of the product|
|currency|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (e.g., EUR, USD, CAD)|
|category|String|Category this product is listed under (e.g., ‘Accessories/Watches’)|
|brand|String|Brand name of the product (e.g., ‘Nike’)|
|variant|String|Variant of this product (like a specific color or size)|
|list|String|List or collection the item is in (e.g., ‘Product Gallery’ or ‘Search Results’)|
|position|Number|Position of this item within a list or collection (e.g., 1)|

### ViewContent

Report this event when a visitor views a key page, like the product page.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin|String	|Origin of the event (e.g. Music Player, Contact Form)|
|id|String|Product ID|
|sku|String|SKU number for this product|
|name (required)|String|Name of the product|
|price|Number|Price of the product|
|currency|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (e.g., EUR, USD, CAD)|
|category|String|Category this product is listed under (e.g., ‘Accessories/Watches’)|
|brand|String|Brand name of the product  (e.g., ‘Nike’)|
|variant|String|Variant of this product (like a specific color or size)|
|list|String|List or collection the item is in (e.g., ‘Product Gallery’ or ‘Search Results’)|
|position|Number|Position of this item within a list or collection (e.g., 1)|

### AddToCart

Report this event when a visitor clicks a button to add a product to the shopping cart (e.g., when the **Add to Cart** button is clicked).

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin	|String	|Origin of the event (e.g. Music Player, Contact Form)|
|id|String|Product ID|
|sku|String|SKU number for this product|
|name (required)|String|Name of the product|
|price|Number|Price of the product|
|currency|String|Currency code (e.g., EUR, USD, CAD)|
|category|String|Category this product is listed under (e.g., ‘Accessories/Watches’)|
|brand|String|Brand name of the product  (e.g., ‘Nike’)|
|variant|String|Variant of this product (like a specific color or size)|
|position|Number|Position of this item within a list or collection (e.g., 1)|
|quantity|Number|Product quantity|

### RemoveFromCart

Report this event when a visitor clicks a button to remove a product from the shopping cart.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin|String|Origin of the event (e.g. Music Player, Contact Form)|
|id|String|Product ID|
|name (required)|String|Name of the product|
|price|Number|Price of the product|
|currency|String|Currency code (e.g., EUR, USD, CAD)|
|category|String|Category this product is listed under (e.g., ‘Accessories/Watches’)|
|brand|String|Brand name of the product  (e.g., ‘Nike’)|
|variant|String|Variant of this product (like a specific color or size)|
|position|Number|Position of this item within a list or collection (e.g., 1)|
|quantity|Number|Product quantity|

### InitiateCheckout

Report this event when a visitor clicks a button to begin the checkout process.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin	|String|Origin of the event (e.g. Music Player, Contact Form)|
|contents (required)|Array[Objects]|Key/value pairs with more details about the product|
|contents.**id**|String|Product ID|
|contents.**sku**|String|SKU number for the product|
|contents.**name** (required)|String|Name of the product|
|contents.**price**|Number|Price of the product|
|contents.**currency**|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (e.g., EUR, USD, CAD)|
|contents.**category**|String|Category the product is listed under (e.g., ‘Accessories/Watches’)|
|contents.**brand**|String|Brand name of the product (e.g., ‘Nike’)|
|contents.**variant**|String|Variant of the product (like a specific color or size)|
|contents.**quantity**|Number|Quantity of this specific product a visitor is purchasing|

### StartPayment 

Report this event when a visitor reaches a payment form, before making a purchase. 

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin	|String	|Origin of the event (e.g. Music Player, Contact Form)|
|option	|String	|Payment type (e.g., 'Fast Checkout')|

### AddPaymentInfo

Report this event when a visitor clicks a button to save payment info for a purchase.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin	|String	|Origin of the event (e.g. Music Player, Contact Form)|
|option|String|Payment type (e.g., ‘Visa’ or ‘PayPal’)|

### CheckoutStep 

Report this event for any custom checkout interaction that a visitor completes between initiating a checkout and completing a purchase. 

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|origin	|String	|Origin of the event (e.g. ‘Music Player’, or ‘Contact Form’)|
|step|	String|	Checkout flow step number. Make sure to report consistent step values (e.g. ‘3’ when step follows StartPayment and addPaymentInfo events)|
|action	|String	|The action the visitor is taking in this step (e.g. ‘Select Shipping’)|
|option	|String	|Payment type (e.g., ‘Express Shipping’)|

### Purchase

Report this event when a purchase is completed successfully.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|origin	|String	|Origin of the event (e.g. Music Player, Contact Form)|
|id (required)|String|Transaction ID or order number|
|affiliation|String|Name of the store|
|revenue|String|Total amount for this purchase, including taxes, shipping, etc. (e.g., ‘5.99’)|
|tax|String|Total amount charged in taxes (e.g., ‘5.99’)|
|shipping|String|Total amount charged for shipping (e.g., ‘5.99’)|
|coupon|String|Coupon code applied to this purchase|
|contents (required)|Array[Objects]|Array of all product objects related to this purchase|
|contents.**id**|String|Product ID|
|contents.**name** (required)|String|Name of the product|
|contents.**price**|Number|Price of the product|
|contents.**currency**|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (e.g., EUR, USD, CAD)|
|contents.**category**|String|Category the product is listed under (e.g., ‘Accessories/Watches’)|
|contents.**brand**|String|Brand name of the product (e.g., ‘Nike’)|
|contents.**variant**|String|Variant of the product (like a specific color or size)|
|contents.**quantity**|Number|Quantity of this specific product a visitor is purchasing|

### Lead

Report this event when a visitor subscribes to a newsletter or submits a contact form.

### CustomEvent

Report a custom event that doesn’t fit any of the standard events listed above.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|event (required)|String|Name of the event|
|param|Custom|Name of the parameter|

# Deprecated
```

#### Function 02: reportCampaignEvent

- Summary: Now that this method is deprecated, use trackEvent instead.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
Wix.Analytics.reportCampaignEvent(Wix.Analytics.PixelEventType.PURCHASE.eventName, {value: 50, currency: 'USD'});
```
```javascript
Wix.Analytics.registerCampaignPixel(Wix.Analytics.PixelType.FACEBOOK, '1234567890');
```

- Details:
```markdown
> **SDK Version**: Deprecated    

> **Important:**  
Now that this method is deprecated, use trackEvent instead.

Reports an event that happened in your app on the live site. The event is sent to all registered pixels on the site – even pixels used in other apps.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|PixelEventType (required)|Wix.Analytics.PixelEventType.[EVENT].eventName|The event you are reporting. You can see the event descriptions in Facebook’s [Pixel API](fallback::http://developers.facebook.com/docs/facebook-pixel/api-reference#events). To make sure that the event matches Facebook’s API, enter the event name in this format: Wix.Analytics.PixelEventType.[EVENT].eventName, where [EVENT] is one of the following: VIEW_CONTENT, SEARCH, ADD_TO_CART, ADD_TO_WISHLIST, INITIATE_CHECKOUT, ADD_PAYMENT_INFO, PURCHASE, LEAD, COMPLETE_REGISTRATION, CUSTOM_EVENT. For example, Wix.Analytics.PixelEventType.PURCHASE.eventName returns the correct event name - ‘Purchase’.|
|data|Object|Enter the event parameters. To get a list of required and optional parameters for an event, use this method: Wix.Analytics.PixelEventType.[EVENT]. For more information, see Facebook’s [Pixel API](fallback::http://developers.facebook.com/docs/facebook-pixel/api-reference#events).|

### registerCampaignPixel

> **SDK Version**: Deprecated     

Registers and initializes the Facebook pixel on the live site. The pixel registration is saved for this session only, so call this method every time your app loads in the live site.

**Parameters**: 

|Name	|Type	|Description|
|---|---|---|
|pixelType (required)|PixelType|Enter Wix.Analytics.PixelType.FACEBOOK here|
|pixelId (required)|String|A unique pixel identifier that was predefined by Facebook and is associated with a Facebook Ad account|
```

---

## DOC-05: Wix.Billing

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-billing

### Sections and Functions
#### Function 01: getProducts

- Summary: Have a dashboard app? Use Wix.Dashboard.getProducts instead.

- Syntax:
```javascript
getProducts([options], onSuccess, [onFailure]).
```

- Example:
```javascript
Wix.Billing.getProducts(OnSuccess, OnError);

//Here is an example of the response
"packages": [ {
    "id": "Premium1",
    "name": "Comments Premium Package",
    "price": "4.95",
    "is_active": true,
    "freeMonth": true,
    "currencyCode": "USD",
    "currencySymbol": "US$"
    "monthly": {
        "price": "4.95",
        “Link”: "https://premium.wix.com/wix/api/tpaStartPurchase?appInstanceId=aaa-bbb&appDefinitionId=a1a2a-b3b4b&paymentCycle=MONTHLY&vendorProductId=package1"
    },
    "yearly": {
        "price": "3.97",
        “Link”: "https://premium.wix.com/wix/api/tpaStartPurchase?appInstanceId=aaa-bbb&appDefinitionId=a1a2a-b3b4b&paymentCycle=YEARLY&vendorProductId=package2"
    },
    "oneTime":  {
        "price": "5.99",
        “Link”: "https://premium.wix.com/wix/api/tpaStartPurchase?appInstanceId=aaa-bbb&appDefinitionId=a1a2a-b3b4b&paymentCycle=ONE_TIME&vendorProductId=package3"
    },
    "bestSellingFeature": "",
    "discountPercent": 20
}]
```

- Details:
```markdown
> **Note:**  
Have a dashboard app? Use Wix.Dashboard.getProducts instead.

Returns a json with pricing information for all of your app’s packages – premium plans and in-app purchase packages. 

> **SDK Version**: SDK 1.76.0+  
**Display**: New Editor  
**Components**: Settings Panel, Settings Modal
    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options**|	Object|Options for this method|
|options.**currency**|String|Currency for your app’s in-app purchase package. Use this parameter to limit your package to a specific currency. If left blank, we’ll display the currency according to the user’s region (locale).|
|**onSuccess** (required)|Function|A callback function to receive the pricing information|
|**onFailure**|Function|A callback function for when an error occurs|
```

---

## DOC-06: Wix.Contacts

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-contacts

### Document Intro
```markdown
> **Important:**  
> Wix.Contacts methods are only available from the Dashboard endpoint.
```

### Sections and Functions
#### Function 01: getContactById

- Summary: Gets a specific Contact that has interacted with the current site by its ID.

- Syntax:
```javascript
getContactById(id, onSuccess, onFailure)
```
```javascript
getContacts(options, onSuccess, onFailure)
```

- Example:
```javascript
Wix.Contacts.getContactById(id, function(data), function(errorType));
```

- Details:
```markdown
Gets a specific Contact that has interacted with the current site by its ID.

> **SDK Version**: SDK 1.32.0+  
**Display**: Dashboard

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|id (required)|	String|	The ID of the contact to look up |
|onSuccess (required)	|Function	|Callback function to receive an object with data about the contact|
|onFailure (required)	|Function	|Callback function that's triA function called when an error occurs that receives a Wix.Error|

### getContacts

Gets a list of all contacts that have interacted with a given site.

> **SDK Version**: SDK 1.31.0+  
**Display**: Dashboard
 

**Parameters**:

| Name | Type | Description |
|---|---|---|
| **options** (required) | Object | Options for this function |
| options.**label** | String or Array\[string1, string2,...\] | Filter the list of contacts to return by specifying one or more labels that were defined by the user.<br><br> For example: customers or \[customers, colleagues\] |
| options.**pageSize** | Integer (1-500) | Number of contacts to display per page.<br><br> Default is 25. |
| **onSuccess** (required) | Function | Callback function to receive the WixDataCursor object |
| **onFailure** (required) | Function | An on failure callback |
```

#### Function 02: **Value passed to onSuccess callback:**

- Summary: A WixDataCursor object, with the results presented in descending order by date. The following methods are supported by the WixDataCursor:

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
var options = {label: "label", pageSize: 50};
Wix.Contacts.getContacts(options, onSuccess, onFailure)
```

- Details:
```markdown
A WixDataCursor object, with the results presented in descending order by date. The following methods are supported by the WixDataCursor:

*   getData() → {Contacts\[\]} – A list of all the Contacts in the current website.
*   getPageSize() → {Number} – The number of the cursor page size.
*   getTotal() → {Number} – The total number of object in the cursor.
*   hasNext() → {boolean} – If WixDataCursor has more data.
*   hasPrevious() → {boolean} – If WixDataCursor has previous data.
*   next(onSuccess, onFailure) → {boolean} – The next WixDataCursor object.
*   previous(onSuccess, onFailure) → {boolean} – The previous WixDataCursor object.

**Example:**
```

#### Function 03: reconcileContact

- Summary: Use this method to share contact information with the WixHive.

- Syntax:
```javascript
reconcileContact(contactInfo, onSuccess, \[onFailure\])
```

- Example:
```javascript
var contactInfo = {
    name: {first: "firstName", middle: "middleName", last: "lastName"},
    emails: [{tag: "main", email: "email@gmail.com"}]
};

Wix.Contacts.reconcileContact(contactInfo, 
    function(ContactData) {
        console.log(ContactData)
    }, 
    function(errorType) {
        console.log(errorType)
    }
);
```

- Details:
```markdown
Use this method to share contact information with the WixHive.

> **SDK Version**: SDK 1.46.0+  
**Display**: Dashboard
 

**Parameters**:

| Name | Type | Description |
|---|---|---|
| **contactInfo** (required) | Object | Contact information collected by your app. Make sure to include at least the email or phone number in your request - we need it to create/update the contact. |
| contactInfo.**Name** | Object | Contact's Name |
| contactInfo.Name.**prefix** | String | Name prefix (limited to 100 characters) |
| contactInfo.Name.**first** | String | First name (limited to 100 characters) |
| contactInfo.Name.**middle** | String | Middle name (limited to 100 characters) |
| contactInfo.Name.**last** | String | Last name (limited to 100 characters) |
| contactInfo.Name.**suffix** | String | Name suffix (limited to 100 characters) |
| contactInfo.**picture** | String | URL to the Contact's photo |
| contactInfo.**company** | Object | Contact's company details |
| contactInfo.company.**role** | String | Contact's position or role (limited to 100 characters) |
| contactInfo.company.**name** | String | Company name (limited to 100 characters) |
| contactInfo.**emails** | Array\[object\] | Contact's email addresses |
| contactInfo.emails.**id** | Number | ID of this email within the array |
| contactInfo.emails.**tag** (required) | String] | Tag for this email - home, work, etc (limited to 100 characters) |
| contactInfo.emails.**email** (required) | String | Email address (limited to 250 characters) |
| contactInfo.emails.**emailStatus** | "optOut", "transactional" or "recurring" | The subscription status of the current email |
| contactInfo.emails.**deliveryStatus** | "VALID", "SPAM", "COMPLAINT", "REJECTED",  "DEFERRAL" or "BOUNCE" | Email delivery status:<br> <ul><li> VALID: When emails are delivered successfully.</li><li> SPAM: When emails are marked as spam by the recipient.</li><li>COMPLAINT: When the recipient of the email has made a complaint to the email provider.</li><li>REJECTED: When the email is rejected by email provider.</li><li>DEFERRAL: When your email provider refuses to send emails.</li><li>BOUNCE: When the mailbox is full, email address doesn't exist, etc.</li></ul> |
| contactInfo.**phones** | Array\[object\] | Contact's phone number |
| contactInfo.phones.**id** | Number | ID of this phone number within the array |
| contactInfo.phones.**tag** (required) | String | Tag for this phone number - home, work, etc (limited to 100 characters) |
| contactInfo.phones.**phone** (required) | String | Phone number (limited to 30 characters) |
| contactInfo.phones.**normalizedPhone** (required) | String | Normalized phone number |
| contactInfo.**addresses** | Array\[object\] | Contact's address |
| contactInfo.addresses.**id** | Number | ID of this address within the array |
| contactInfo.addresses.**tag** (required) | String | Tag for this address - home, work, etc (limited to 100 characters) |
| contactInfo.addresses.**address** | String | Street address (limited to 250 characters) |
| contactInfo.addresses.**neighborhood** | String | Neighborhood (limited to 100 characters) |
| contactInfo.addresses.**city** | String | City (limited to 100 characters) |
| contactInfo.addresses.**region** | String | Region, such as a U.S. state or Canadian province (limited to 100 characters) |
| contactInfo.addresses.**country** | String | Country (limited to 100 characters) |
| contactInfo.addresses.**postalCode** | String | Postal code (limited to 20 characters) |
| contactInfo.**urls** | Array\[object\] | URLs associated with the contact, like Facebook or LinkedIn |
| contactInfo.urls.**id** | Number | ID of this URL within the array |
| contactInfo.urls.**tag** (required) | String | Tag for this URL - personal, Facebook, LinkedIn, etc (limited to 100 characters) |
| contactInfo.urls.**url** (required) | String | The URL |
| contactInfo.**dates** | Array\[object\] | Important dates for this Contact, like birthday |
| contactInfo.dates.**id** | Number | ID of this date within the array |
| contactInfo.dates.**tag** (required) | String | Tag for this date - birthday, anniversary, etc (limited to 100 characters) |
| contactInfo.dates.**date** (required) | dateTime | The date, as an [ISO 8601](http://www.w3.org/TR/NOTE-datetime) timestamp |
| contactInfo.**onSuccess** (required) | Function | An on success callback that returns an object with this information:<br> <pre>{<br>    Contact: the reconciled Contact,<br>    isNew: boolean<br>    details: {<br>        rejectedData: \[ DTO1, DTO2,... ]<br>        existingData: \[ DTO1, DTO2, ... ]<br>    }<br>}</pre> |
| contactInfo.**onFailure** | Function | An on failure callback |

**Value passed to callback**: 

An object containing the contact information and the rejected data:

| Name | Type | Description |
|---|---|---|
| **Contact** | Object | Contains all the information we have for this contact, including the data your app sent.  |
| **isNew** | Boolean | Indicates if the contact was just created |
| **details** | Object | Contains more information about this contact, including any data that was rejected |
| details.**rejectedData** | Array | Lists information sent by your app that was rejected (if any). |
| details.**existingData** | Array | Lists the data we already had for this contact, before your app sent additional information. |

**Example:**
```

---

## DOC-07: Wix.Dashboard

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-dashboard

### Sections and Functions
#### Function 01: closeWindow

- Summary: Closes the modal endpoint.

- Syntax:
```javascript
closeWindow(\[message\])
```

- Example:
```javascript
var  message = {"reason": "button-clicked"};
Wix.Dashboard.closeWindow(message);
```

- Details:
```markdown
Closes the modal endpoint.

> **SDK Version**: SDK 1.27.0+  
**Display**: Dashboard, Modal

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|message|	Object	|A custom message to pass to the calling endpoint’s onClose callback function|
```

#### Function 02: getEditorUrl

- Summary: Retrieves a URL for the app in the Editor. If your app is installed on more than one page, the first page that contains your app will be opened. If the user didn’t install the Site component yet, this will return a URL to the Wix Editor that will open the App Market with your app in pending.

- Syntax:
```javascript
getEditorUrl(callback)
```

- Example:
```javascript
Wix.Dashboard.getEditorUrl(function(url) {
    //Editor url as a callback parameter
});
```

- Details:
```markdown
Retrieves a URL for the app in the Editor. If your app is installed on more than one page, the first page that contains your app will be opened. If the user didn’t install the Site component yet, this will return a URL to the Wix Editor that will open the App Market with your app in pending.

> **SDK Version**: SDK 1.33.0+  
**Display**: Dashboard

> **Note:**  
This is only relevant for apps that have both a site component and a dashboard component.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)	|Function 	|Callback function to receive the URL that directs users to the app in the Wix Editor|

**Value passed to callback**: 
The URL that directs users to the app in the Wix Editor. 
Note that:
- If your app is installed on more than one page, the URL directs to the first page that contains your app.
- If the user didn’t install the Site component yet, the URL directs to the App Market in the Wix Editor, with your app in pending.
```

#### Function 03: getProducts

- Summary: Returns a json with pricing information for all of your app’s packages – premium plans and in-app purchase packages.

- Syntax:
```javascript
getProducts(onSuccess, \[onError\])
```

- Example:
```javascript
Wix.Dashboard.getProducts(OnSuccess, OnError);

//Here is an example of the response
"packages": [
    {
        "id": "Premium1",
        "name": "Comments Premium Package",
        "price": "4.95",
        "is_active": true,
        "freeMonth": true,
        "currencyCode": "USD",
        "currencySymbol": "US$"
        "monthly": {
            "price": "4.95",
            “Link”: "https://premium.wix.com/wix/api/tpaStartPurchase?appInstanceId=aaa-bbb&appDefinitionId=a1a2a-b3b4b&paymentCycle=MONTHLY&vendorProductId=package1"
        },
        "yearly": {
            "price": "3.97",
             “Link”: "https://premium.wix.com/wix/api/tpaStartPurchase?appInstanceId=aaa-bbb&appDefinitionId=a1a2a-b3b4b&paymentCycle=YEARLY&vendorProductId=package2"
        },
        "oneTime": {
            "price": "5.99",
             “Link”: "https://premium.wix.com/wix/api/tpaStartPurchase?appInstanceId=aaa-bbb&appDefinitionId=a1a2a-b3b4b&paymentCycle=ONE_TIME&vendorProductId=package3"
        },
        "bestSellingFeature": "",
        "discountPercent": 20
    }
]
```

- Details:
```markdown
Returns a json with pricing information for all of your app’s packages – premium plans and in-app purchase packages.

> **SDK Version**: SDK 1.72.0+  
**Display**: Dashboard

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|onSuccess (required)|Function|A callback function to receive the pricing information|
|onError|Function|A callback function for when an error occurs|
```

#### Function 04: getSiteViewUrl

- Summary: Retrieves the live site’s base URL.

- Syntax:
```javascript
getSiteViewUrl(onSuccess)
```

- Example:
```javascript
var onSuccess = function(data) {
    // do something with base url
};

Wix.Dashboard.getSiteViewUrl(onSuccess);
```

- Details:
```markdown
Retrieves the live site’s base URL.

> **SDK Version**: SDK 1.74.0+  
**Display**: Dashboard    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|onSuccess (required)|Function|A callback function to receive the base url object|

**Value passed to callback:**

An object with the base URL of the live site. 
For example: `{base : “http://www.wix.com”}`
```

#### Function 05: openBillingPage

- Summary: Allows the app to open the Wix billing page.

- Syntax:
```javascript
openBillingPage( )
```

- Example:
```javascript
Wix.Dashboard.openBillingPage();
```

- Details:
```markdown
Allows the app to open the Wix billing page.

> **SDK Version**: SDK 1.27.0+  
**Display**: Dashboard
```

#### Function 06: openMediaDialog

- Summary: This method opens the [Wix Media Manager](fallback::https://support.wix.com/en/article/about-the-media-manager), which allows users to choose an existing item from the Wix media galleries or upload a new file.

- Syntax:
```javascript
openMediaDialog(mediaType, multiSelect, onSuccess, \[onCancel\])
```

- Example:
```javascript
Wix.Dashboard.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, 
    function(data) {
        let imageurl = Wix.Utils.Media.getImageUrl(data.relativeUri);
    }
);
```

- Details:
```markdown
This method opens the [Wix Media Manager](fallback::https://support.wix.com/en/article/about-the-media-manager), which allows users to choose an existing item from the Wix media galleries or upload a new file.

> **SDK Version**: SDK 1.27.0+  
**Display**: Dashboard    

Once the user selects a media item, a callback function returns a metadata descriptor with details about it.

To access the media item, use one of the Wix.Utils.Media.get\* methods to construct the item’s full URL. You’ll need the item’s relativeUri, which is returned in the callback function.

> **Warning:**  
Use the Wix.Utils.Media.get\* methods _each time_ you access the media item, to prevent broken links.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|mediaType (required)|Wix.Settings.MediaType.IMAGE,Wix.Settings.MediaType.BACKGROUND,Wix.Settings.MediaType.AUDIO,Wix.Settings.MediaType.SECURE_MUSIC, Wix.Settings.MediaType.DOCUMENT,Wix.Settings.MediaType.SWF|Type of media item the user is selecting: IMAGE (photo/image), BACKGROUND (background image), AUDIO (mp3 file up to 50MB), SECURE_MUSIC (high quality audio up to 360MB), DOCUMENT, SWF|
|multiSelect (required)|	Boolean	|true if the user selected more than one item. false if the user selected only one item.|
|onSuccess (required)|	Function	|Callback function to pass metadata about this media item|
|onCancel	|Function|Callback function called when the user cancels|
    
**Value passed to onSuccess callback**:

An object or an array of objects (for multiple media items).

Each object contains metadata about a specific media item.
```

#### Function 07: openModal

- Summary: Opens a lightbox-style [modal window](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/design-your-site-extensions#popupsmodals) over your app in the Wix Dashboard. You can only open this modal from the Wix Dashboard.

- Syntax:
```javascript
openModal(url, width, height, \[onClose\], \[theme\])
```

- Example:
```javascript
var onClose = function(message) { console.log("modal closed", message); }

Wix.Dashboard.openModal("https://static.parastorage.com/services/js-sdk/1.90.0/HTML/modal.HTML", 400, 400, onClose);
```

- Details:
```markdown
Opens a lightbox-style [modal window](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/design-your-site-extensions#popupsmodals) over your app in the Wix Dashboard. You can only open this modal from the Wix Dashboard.

> **SDK Version**: SDK 1.27.0+  
**Display**: Dashboard

Here’s how the modal works:

*   The modal is a singleton – every new modal closes the previous one.
*   Users can close the modal by clicking the lightbox or pressing the close button. You can close the modal by calling Wix.closeWindow from within the modal iframe.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|url (required)	|String	|URL of the modal iframe|
|width (required)|	Number	|Width of the modal, in pixels (for example, 400)|
|height (required) 	|Number|Height of the modal, in pixels (for example, 400)|
|onClose|	Function |	OnClose callback function|
|theme	|Wix.Theme	|The style of the modal: Wix.Theme.DEFAULT - has the regular modal look & feel - border, shadow, close button. Wix.Theme.BARE - a simple modal with no border, close button, shadow, etc. |
```

#### Function 08: pushState

- Summary: Enables AJAX style Page apps to inform the Wix platform about a change in the app internal state. The new state will be reflected in the site/page URL. Once you call the pushState method, the browser’s top window URL will change the ‘app-state’ path part to the new state you provide with the pushState method (similar to the [browser history API](fallback::http://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)). Read more about [deep linking](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/deep-linking-for-internal-dashboard-extensions-iframe) for a full explanation.

- Syntax:
```javascript
pushState(state)
```

- Example:
```javascript
Wix.Dashboard.pushState("app-state");
```

- Details:
```markdown
Enables AJAX style Page apps to inform the Wix platform about a change in the app internal state. The new state will be reflected in the site/page URL. Once you call the pushState method, the browser’s top window URL will change the ‘app-state’ path part to the new state you provide with the pushState method (similar to the [browser history API](fallback::http://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)). Read more about [deep linking](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/deep-linking-for-internal-dashboard-extensions-iframe) for a full explanation.

> **SDK Version**: SDK 1.35.0+
**Display**: Dashboard

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|state (required)|String|The new app's state to push into the dashboard history stack|
```

#### Function 09: revalidateSession

- Summary: Verifies that the session is secure. If the session is secure, this method returns a newly-signed app instance.

- Syntax:
```javascript
revalidateSession(onSuccess, \[onFailure\])
```

- Example:
```javascript
Wix.Dashboard.revalidateSession(
    function(instanceData){
        //handle success use-case
    },  
    function(error){
        //Handle error use-case
    }
);
```

- Details:
```markdown
Verifies that the session is secure. If the session is secure, this method returns a newly-signed app instance.

> **SDK Version**: SDK 1.52.0+  
**Display**: Dashboard

Use this method before displaying sensitive information or performing an action that requires a secure session.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|onSuccess (required)|	Function|Receives a newly-signed and encoded app instance|
|onFailure |	Function|Callback function in case the session isn't secure|

# Deprecated
```

#### Function 10: openModal

- Summary: Opens a lightbox-style [modal window](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/design-your-site-extensions#popupsmodals) over your app in the Wix Dashboard. You can only open this modal from the Wix Dashboard.

- Syntax:
```javascript
openModal(url, width, height, \[onClose\], \[theme\])
```

- Example:
```javascript
var onClose = function(message) { console.log("modal closed", message); }

Wix.Dashboard.openModal("https://static.parastorage.com/services/js-sdk/1.90.0/HTML/modal.HTML", 400, 400, onClose);
```

- Details:
```markdown
Opens a lightbox-style [modal window](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/design-your-site-extensions#popupsmodals) over your app in the Wix Dashboard. You can only open this modal from the Wix Dashboard.

> **SDK Version**: Deprecated  
**Display**: Dashboard

Here’s how the modal works:

*   The modal is a singleton – every new modal closes the previous one.
*   Users can close the modal by clicking the lightbox or pressing the close button. You can close the modal by calling Wix.closeWindow from within the modal iframe.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|url (required)	|String	|URL of the modal iframe|
|width (required)|	Number	|Width of the modal, in pixels (for example, 400)|
|height (required) 	|Number|Height of the modal, in pixels (for example, 400)|
|onClose|	Function |	OnClose callback function|
|theme	|Wix.Theme	|The style of the modal: Wix.Theme.DEFAULT - has the regular modal look & feel - border, shadow, close button. Wix.Theme.BARE - a simple modal with no border, close button, shadow, etc. |
```

#### Function 11: setHeight (height)

- Summary: Requests the hosting Wix platform to change the iframe’s height inside the side dashboard

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
Wix.Dashboard.setHeight(height);
```

- Details:
```markdown
> **SDK Version**: Deprecated    

Requests the hosting Wix platform to change the iframe’s height inside the side dashboard

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|height (required)	| Number	 |The window's new height|
```

---

## DOC-08: Wix.Data.Public

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-data-public

### Document Intro
```markdown
Using Wix.Data.Public methods, you can store **public** data in the site’s HTML document. This means that you may not need an external database for your app. 

How do you know if our solution is sufficient? 
Use these methods if:
*   Your app doesn’t need to store any sensitive information. Since the HTML document is public, make sure to only store information that’s displayed on the site.
*   Your app doesn’t need to store a lot of data (see the storage limitations below)

Wix.Data.Public methods are available in the Wix Editor and Viewer only – not in the Dashboard.

### Storing data

Each data entry is stored as a pair – a key and its value. Keys must be strings, and values can be strings, json objects, numbers, integers, and booleans.

Let’s use Wix Hit Counter as an example. This app is a small widget that counts the number of site visitors.

So what kind of data would you store for this app?

*   Strings – the layout/design used for the counter
*   json objects – animation settings or another group of related settings (you can store them as an object instead of storing each string separately)
*   Integers & numbers – starting number for the hit counter
*   Booleans – whether to count all visits to the site, or only new visitors

### Setting the data’s scope

When you store data, you also define its scope as “app” or “component” – this determines where your data is available. By default, data is only available for the component that called the method, as well as that component’s settings. To make the data available globally for all app components, set the scope to app.

### Storage limits

You can store a certain amount of data in each scope:

*   **Component scope** (per compId): 400 characters in total, for all data in this scope – including spaces
*   **App scope** (per app instance ID): 1,000 characters in total, for all data in this scope – including spaces
```

### Sections and Functions
#### Function 01: set

- Summary: Stores a key with a value. If the key already exists, the previous value is overwritten with the new value. If the key doesn’t exist yet, it’s created now.

- Syntax:
```javascript
set(key, value, \[options\], onSuccess, \[onFailure\])
```

- Example:
```javascript
// Default setting for the startCounter field
Wix.Data.Public.set("startCounter", 1234, { scope: 'COMPONENT' },
    function(d){ console.log(d) }, function(f) { console.log(f) }
);

// Once the user changes it to zero, set a new value for this key
Wix.Data.Public.set("startCounter", 0, { scope: 'COMPONENT' },
    function(d) { console.log(d) }, function(f) { console.log(f) }
);
```

- Details:
```markdown
Stores a key with a value. If the key already exists, the previous value is overwritten with the new value. If the key doesn’t exist yet, it’s created now.

> **SDK Version**: SDK 1.61.0+  
**Display**: New Editor  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Modal, Popup, Worker (app scope only) 

For example: In the Wix Hit Counter app, the counter starts at 1234 by default. When a user adds the app, you would store “startCounter” as the key, and “1234” as the key’s value. If a user changes it to 0, you would use the set method again to replace the value with “0”.

**Parameters:**

|Name	|Type	|Description|
|---|---|---|
|**key**(required)|	String	|Key to set. Each key must be unique within the given scope (see options, below).|
|**value** (required)|	Object/ String/ Boolean/ Integer/ Number|	Key’s value.|
|**options**|	Object|	Options for this method|
|options.**scope**|	“APP” or “COMPONENT”|	Where the data is available: APP: All of the app’s components, COMPONENT (default): Only within this component and its settings|
|**onSuccess** (required)|	Function(result)	|Returns a json object with the key and value you set {    key1: value1}|
|**onFailure**	|Function(error)|	Errors thrown when: Your app exceeded the provided storage (1,000 characters for app scope, 400 for component scope), Invalid json|
```

#### Function 02: remove

- Summary: Deletes the key. Future attempts to access this key will raise an exception until something is stored again for this key using the [set](fallback::#set) method.

- Syntax:
```javascript
remove(key, \[options\], onSuccess, \[onFailure\])
```

- Example:
```javascript
Wix.Data.Public.remove('text', {scope:'COMPONENT'}, function(d) {console.log(d)}, function(f){console.log(f)});
```

- Details:
```markdown
Deletes the key. Future attempts to access this key will raise an exception until something is stored again for this key using the [set](fallback::#set) method.

> **SDK Version**: SDK 1.61.0+  
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Modal, Popup, Worker (app scope only)
    
For example: Let’s say that Wix Hit Counter shows text after the number (“2,000 visitors”). Users can choose whether or not to show text (a boolean), and define the text to display. If the user chooses to just show the number, without any text after it, you can use remove to delete the “text” key.

**Parameters:**

|Name	|Type	|Description|
|---|---|---|
|**key** (required) |String	|Key to remove|
|**options**	|Object|	Options for this method|
|options.**scope**|	“APP” or “COMPONENT”|The data's scope: APP: All of the app’s components, COMPONENT (default): Only within this component and its settings|
|**onSuccess** (required)|	Function(data)|	Returns a json object of the removed data: {    key1: value1}|
|**onFailure**	|Function(error)|	Error is thrown when the key doesn’t exist|
```

#### Function 03: get

- Summary: Returns the value for a given key.

- Syntax:
```javascript
get(key, \[options\], onSuccess, \[onFailure\])
```

- Example:
```javascript
Wix.Data.Public.get("startCounter", { scope: 'COMPONENT' }, function(d){console.log(d)}, function(f){console.log(f)});
```

- Details:
```markdown
Returns the value for a given key.

> **SDK Version**: SDK 1.61.0+  
**Editor Version**: New Editor  
**Components**: Live Site, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Modal, Popup, Worker (app scope only)

For example, call this method when the iframe loads to display the app with the settings the user chose.

**Parameters:**

|Name	|Type	|Description|
|---|---|---|
|**key** (required)|String	|Key to get|
|**options**|Object	|Options for this method|
|options.**scope**|	“APP” or “COMPONENT”|Where the data is available: APP: All of the app’s components, COMPONENT (default): Only within this component and its settings|
|**onSuccess** (required)	|Function(data)	|Returns a json object {   key1:value1}|
|**onFailure**	|Function(error)|Error is thrown when the key doesn’t exist|

# Deprecated

**Wix.Data.Public.getMulti** – deprecated in SDK version 1.62.0
```

---

## DOC-09: Wix.Features

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-features

### Sections and Functions
#### Function 01: isSupported

- Summary: Checks if a feature is available for use. The feature name must be one of Wix.Features.Types listed below.

- Syntax:
```javascript
isSupported(feature, callback)
```

- Example:
```javascript
Wix.Features.isSupported(Wix.Features.Types.RESIZE_COMPONENT, function(data) {console.log(data)})
```

- Details:
```markdown
Checks if a feature is available for use. The feature name must be one of Wix.Features.Types listed below.

> **SDK Version**: SDK 1.45.0+      
**Editor Version**: New Editor      
**Display**: Preview      
**Components**: Wix Dashboard, Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|feature (required) |Wix.Features.Types|Specify one of the following features:  PREVIEW\_TO\_SETTINGS (see openSettingsDialog), ADD\_COMPONENT (see addComponent), RESIZE\_COMPONENT (see resizeComponent)|
|callback (required)|Function|Returns true via callback if the feature is available for use.|
```

---

## DOC-10: Wix.Preview

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-preview

### Sections and Functions
#### Function 01: openSettingsDialog

- Summary: Ends Preview mode and sends Wix users directly from their site’s preview to the App Settings panel in the Editor.

- Syntax:
```javascript
openSettingsDialog(\[options\], \[onFailure\])
```

- Example:
```javascript
Wix.Preview.openSettingsDialog();
```

- Details:
```markdown
Ends Preview mode and sends Wix users directly from their site’s preview to the App Settings panel in the Editor.

> **SDK Version**: SDK 1.45.0+     
**Display**: Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page

When called with no options, uses the Widget or Page that called the method.

**Parameters:**

|Name	|Type	|Description|
|---|---|---|
|**options** |Object|Specify the component to open the settings panel for. |
|options.**compId**|String|The component to open the settings panel for. |
|**onFailure**|Function|Callback is invoked when the he user cancels opening the settings panel or the specified component information is incorrect.|
```

---

## DOC-11: Wix.Settings

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-settings

### Sections and Functions
#### Function 01: addComponent

- Summary: Allows users to install add-ons in your app, directly from the App Settings panel. Users are then directed to the page where the component was added.

- Syntax:
```javascript
addComponent(options, onSuccess, \[onFailure\])
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Allows users to install add-ons in your app, directly from the App Settings panel. Users are then directed to the page where the component was added.
 
> **SDK Version**: SDK 1.92.0+      
**Editor Version**: New Editor        
**Components**: Settings Panel, Settings Modal    

Use this method for add-ons that aren’t added automatically when users install your app, or to allow users to add a page component again. Note that for page components, you need to first allow users to [add your page component more than once](portalId::63e3acd8-2a9c-421d-8f92-d02930eeb59eresourceId::8fb4d190-f21b-4080-9a65-d10f70572402#support-multiple-pages*fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/guide-to-page-extensions#support-multiple-pages).

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options** (required)|Object|Options for this method|
|options.**copyStyle**|Boolean|To copy the style from another component in your app, set true. You can copy the style as follows: To copy the style of the calling component, leave styleId empty. To copy the style of another component in your app, enter its styleId below.|
|options.**styleId**|String|ID of the style to copy. Make sure copyStyle is set to true. If the styleId is invalid, no style will be copied.|
|options.**componentType** (required)|"WIDGET" or "PAGE"|Type of component to add|
|options.**widget**|Object|Details about the widget and where to add it|
|options.widget.**widgetId** (required)|String|ID of the widget, as specified in the Dev Center|
|options.widget.**allPages**|Boolean|True if the user is adding the widget to all pages. Default is False. If the value is True and you also specify the wixPageId (below), then allPages takes precedence and the component is added to all pages.|
|options.widget.**wixPageId**|String|ID of the page where the user is adding the widget. If a value is given and the value of allPages (above) is True, then allPages takes precedence and the component is added to all pages. The user is directed to this page once the widget is added.|
|options.**page**|Object|Details about the page component. Make sure that you allow users to [add your page component more than once](portalId::63e3acd8-2a9c-421d-8f92-d02930eeb59eresourceId::8fb4d190-f21b-4080-9a65-d10f70572402#support-multiple-pages*fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/site-extensions/deprecated/iframe/guide-to-page-extensions#support-multiple-pages).|
|options.page.**title**|String|The title of the page. If undefined, uses the component name defined in the Developers Center. Title is limited to 40 characters, and cannot include ‘<’ or ’>’ characters.|
|options.page.**pageId** (required)|String|ID of the page component, as specified in the Developers Center|
|options.page.**isHidden**|Boolean|true if this is a hidden page. Default is false.|
|onSuccess (required)|Function|Receives the widget's compId|
|onFailure|Function|Receives the error if the operation failed. WIDGET](#1470038924639-675076e3-d3bd), [PAGE](fallback::#1470038924685-98eba135-382f)|

**WIDGET EXAMPLE**

**PAGE EXAMPLE**
```

#### Function 02: closeWindow

- Summary: Closes the settings/modal endpoint.

- Syntax:
```javascript
closeWindow(\[options\])
```

- Example:
```javascript
var custom = {"reason": "button-clicked"};
Wix.Settings.closeWindow({target: 'ALL', custom});
```

- Details:
```markdown
Closes the settings/modal endpoint.

> **SDK Version**: SDK 1.83.0+      
**Editor Version**: New Editor      
**Components**: Settings Panel, Settings Modal  

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options**  |Object  |Options for this method. **Note**: The options object is only passed to the opener's onClose callback function if you're closing the modal (target: 'MODAL') - refer to [Wix.Settings.openModal](fallback::#openmodal). |
|options.**target**|‘SETTINGS’, ‘MODAL’, ‘ALL’|Specifies the endpoint to close: ‘SETTINGS’ - closes the settings endpoint. ‘MODAL’ (**default**) - closes the settings modal and passes the options object to the opener's onClose callback function (refer to [Wix.Settings.openModal](fallback::#openmodal)). ‘ALL’ - closes both the settings and the settings modal. |
|options.**custom**|Object/ String/ Boolean/ Number|A custom parameter|
```

#### Function 03: getCurrentPageAnchors

- Summary: Retrieves the anchors on the current page.

- Syntax:
```javascript
getCurrentPageAnchors(callback)
```

- Example:
```javascript
Wix.Settings.getCurrentPageAnchors(function(anchors) {
    // do something with anchors
});
```

- Details:
```markdown
Retrieves the anchors on the current page.

> **SDK Version**: SDK 1.62.0+      
**Editor Version**: New Editor    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function  |Callback function to receive an array of anchors (unordered)  |

**Value passed to callback**:

An array of unordered objects. 

Each object represents an anchor on the current page, and contains the following properties:

|Name	|Type	|Description|
|---|---|---|
|id|String|The anchor ID|
|title|String|The anchor title. |
> **Note:**  If there are no anchors on the current page, returns just one default anchor – the top of the page.
```

#### Function 04: getCurrentPageId

- Summary: Returns the page ID of the current page.

- Syntax:
```javascript
getCurrentPageId(callback)
```

- Example:
```javascript
Wix.Settings.getCurrentPageId(function(pageId) {
    //store the site pageId
});
```

- Details:
```markdown
Returns the page ID of the current page.

> **SDK Version**: SDK 1.86.0+      
**Editor Version**: New Editor       
**Components**: Settings Panel, Settings Modal

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|Callback function to receive the pageId|
```

#### Function 05: getDashboardAppUrl

- Summary: Retrieves the URL of your app’s Dashboard component within the user’s site (the URL is fully qualified). Use this URL to direct the user from the App Settings to your app’s Dashboard component.

- Syntax:
```javascript
getDashboardAppUrl(callback)
```

- Example:
```javascript
Wix.Settings.getDashboardAppUrl(function(url) {
    // do something with the URL
});
```

- Details:
```markdown
Retrieves the URL of your app’s Dashboard component within the user’s site (the URL is fully qualified). Use this URL to direct the user from the App Settings to your app’s Dashboard component.

> **SDK Version**: SDK 1.32.0+      
**Editor Version**: New Editor, Old Editor      
**Components**: Multicomponent Apps
    
To open your Dashboard as a modal in the Wix Editor, use [Wix.Settings.openModal](fallback::#openmodal).

> **Important:**  
To open your Dashboard component, add an href attribute with the Dashboard URL. **Don’t** use window.open – if you use window.open in a callback of an asynchronistic call, the browser blocks the window from opening.

**Parameters**:  

|Name	|Type	|Description|  
|---|---|---|    
|callback (required)|Function|A callback function to receive the URL of the app in the dashboard|
```

#### Function 06: getSiteInfo

- Summary: Retrieves information about the host site in which the app is shown.

- Syntax:
```javascript
getSiteInfo(callback)
```

- Example:
```javascript
Wix.Settings.getSiteInfo(function(siteInfo) {
    // do something with the siteInfo
});
```

- Details:
```markdown
Retrieves information about the host site in which the app is shown.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor  

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|Callback function to receive the site info |

**Value passed to callback**:

json Object containing the site info:

|Name	|Type	|Description|
|---|---|---|
|baseUrl |String |Base url of the current site, for example: **http**://user.wix.com/site-name, http://www.domain.com|
|pageTitle |String |The page title that is used for SEO. This title includes both the site and page title (e.g., “My Store - Animal Shirt”).  |
|pageTitleOnly|String|The name of the page - without the site title (e.g., “Animal Shirt”).|
|referrer |String |The referrer header of the HTTP request |
|siteDescription|String |The description of the site that is used for SEO |
|siteKeywords|String |The keywords which are related to the site and are used for SEO |
|siteTitle |String |The title of the site that is used for SEO |
|url |String |The URL (taken from the location.href property). The URL includes the internal site state, for example: **http**://user.wixsite.com/site-name/pageTitle http://www.domain.com/pageTitle . Returns the site URL only when using getSiteInfo in the live site and preview mode. When using it in Editor mode, returns the Editor URL. |
```

#### Function 07: getSiteMap

- Summary: Returns all items in the site structure, including:

- Syntax:
```javascript
getSiteMap(callback)
```

- Example:
```javascript
Wix.Settings.getSiteMap(function(siteMap) {
    // do something with the site pages
});
```

- Details:
```markdown
Returns all items in the site structure, including:

*   **Items in the site’s menu** – pages (including subpages), links, and menu headers.
*   **Hidden pages** – pages that are in the site, but not in the site menu. For example, a “Thank You” page that’s shown only after a site visitor makes a purchase.

 > **SDK Version**: SDK 1.81.0+      
**Editor Version**: New Editor      
**Components**: Settings Panel
  
> **Note:**  
Use this method instead of getSitePages, which is now deprecated.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|Callback function to receive the site structure|

**Value passed to callback**:

An array of objects, where each object represents an item in the site structure.

> **Warning:**  
To use this object later (for example, if you want to navigate to a link on the user’s site), save this object in your database as is – **don’t** change it in any way.

Each object contains data about the item. The data sent depends on the item – check out our examples below.

|Name	|Type	|Description|
|---|---|---|
|type|String|Type of link the item represents - for example ‘PageLink’ or ‘AnchorLink’. The data returned depends on the item - for example, an ‘AnchorLink’ object will include the anchorName and anchorDataId properties. Check out our examples below.|
|pageId|String|The page ID. **Note**: If the user added a page anchor to the site’s menu, then this method returns an object for the anchor - so there might be multiple objects with the same page ID.|
|title|String|The item title|
|hidden|Boolean|Returns true if this page is hidden|
|isHomePage  |Boolean|Returns true if this page is the site's home page|
|url|String|URL of this item|
|subPages|Array \[objects\]|(Page objects only) If the page has subpages, returns an ordered set of subpages. Each subpage object contains more information about the subpage (id, title, hide, isHomePage, url).|

Here’s an example of an array passed to the callback:
```

#### Function 08: getStateUrl

- Summary: This method returns the full URL of one of your internal pages on the live site, including the app’s state.   For example: _mysite.com/my-store-app/product1_.   As you can see, the URL includes the app state.

- Syntax:
```javascript
getStateUrl(sectionId, state, callback)
```

- Example:
```javascript
Wix.Settings.getStateUrl('myStoreApp', 'product1', function(a) {
    console.log(a)}
);
```

- Details:
```markdown
This method returns the full URL of one of your internal pages on the live site, including the app’s state.  
For example: _mysite.com/my-store-app/product1_.  
As you can see, the URL includes the app state.

> **SDK Version**: SDK 1.69.0+      
**Editor Version**: New Editor    

Use this method if you have a page component and you need the URL of an internal page. 

> **Note:**  
This method won’t work if the user didn’t save the site since installing your app (you’ll get an error in the response).

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|sectionId (required)|String|ID of the Page component, [as specified in the Developers Center](fallback::http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/21171537/Dev_Center_componentId.png)|
|state (required)|String|State of the app’s internal page - for example, _‘product1_’|
|callback (required)|Function|Callback function to receive the full URL of the page, including the app state|
```

#### Function 09: getWindowPlacement

- Summary: Gets the position of a fixed position widget in an editing session.

- Syntax:
```javascript
getWindowPlacement(compId, callback)
```

- Example:
```javascript
var compId = Wix.Utils.getOrigCompId();
Wix.Settings.getWindowPlacement(compId, function(data) {
    // do something with widget placement
});
```

- Details:
```markdown
Gets the position of a fixed position widget in an editing session. 

> **SDK Version**: SDK 1.19.0+      
**Editor Version**: New Editor, Old Editor      
**Components**: Settings Panel (for Fixed-Position Widgets only), Settings Modal (for Fixed-Position Widgets only)

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|compId (required)|String|Component ID of the fixed-position widget|
|callback (required)|Function|A callback function that gets the component placement|

> **Note:**  
Use this for fixed-position widgets only – otherwise, an error will be thrown.
```

#### Function 10: isApplicationInstalled

- Summary: Allows you to check if another one of your apps is installed.

- Syntax:
```javascript
isApplicationInstalled(appDefinitionId, callback)
```

- Example:
```javascript
Wix.Settings.isApplicationInstalled(
    '1380b703-ce81-ff05-f115-39571d94dfcd',
    function(isInstalled){console.log(isInstalled)}
);
```

- Details:
```markdown
Allows you to check if another one of your apps is installed.

> **SDK Version**: SDK 1.83.0+      
**Editor Version**: New Editor        
**Components**: Settings Panel, Settings Modal

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|appDefinitionId (required)|String|App ID, [as specified in the Devevelopers Center](fallback::http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/18095909/appId-dev-center.png)|
|callback (required)|Function|Callback function that receives a boolean indicating if the app is installed in the site: function(isInstalled) {}|

**Value passed to callback**:

A boolean indicating if the app is installed or not:

*   true if the app is installed
*   false if the app isn’t installed
```

#### Function 11: isComponentInstalled

- Summary: This method is for multicomponent apps. Use it to check if one of your app’s components is installed in the user’s site.

- Syntax:
```javascript
isComponentInstalled(componentId, callback)
```

- Example:
```javascript
Wix.Settings.isComponentInstalled("compId",  function(data){console.log(data)})
```

- Details:
```markdown
This method is for multicomponent apps. Use it to check if one of your app’s components is installed in the user’s site.

> **SDK Version**: SDK 1.74.0+      
**Editor Version**: New Editor       
**Components**: Settings Panel

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|componentId (required)|String|ID of the component, [as specified in the Developers Center](fallback::http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/21171537/Dev_Center_componentId.png)  |
|callback (required)|Function|Function that receives a boolean indicating if the component is installed in the site|

**Value passed to callback**:

A boolean indicating if the component is installed or not:

*   true if the component is installed
*   false if the component isn’t installed
```

#### Function 12: isFullWidth

- Summary: Indicates if the user extended the component to full width.

- Syntax:
```javascript
isFullWidth(callback)
```

- Example:
```javascript
Wix.Settings.isFullWidth(function() {...});
```

- Details:
```markdown
Indicates if the user extended the component to full width.

> **SDK Version**: SDK 1.65.0+      
**Editor Version**: New Editor    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|Function that receives a boolean indicating if the app is set to full-width  |

**Value passed to callback**:

A boolean indicating if the component is set to full-width:

*   true if the component is set to full-width
    
*   false if the component isn’t set to full-width
```

#### Function 13: openBillingPage

- Summary: Opens the Wix billing page from the settings panel in a modal window.

- Syntax:
```javascript
openBillingPage( )
```

- Example:
```javascript
Wix.Settings.openBillingPage();
```

- Details:
```markdown
Opens the Wix billing page from the settings panel in a modal window.

> **SDK Version**: SDK 1.16.0+       
**Editor Version**: New Editor, Old Editor
```

#### Function 14: openLinkPanel

- Summary: This method opens the Editor’s [link settings panel](fallback::https://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/12082453/editor-link-settings.png), where users can add a link to content in your app (an image, text, etc.).

- Syntax:
```javascript
openLinkPanel(\[options\], onSuccess, \[onCancel\])
```

- Example:
```javascript
Wix.Settings.openLinkPanel({
    link: {
        "type": "PageLink",
        "pageId": "#c1dmp"
    }},
    function(linkData) {console.log(linkData), function(error){console.log(error)}; }
);
```

- Details:
```markdown
This method opens the Editor’s [link settings panel](fallback::https://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/12082453/editor-link-settings.png), where users can add a link to content in your app (an image, text, etc.).

> **SDK Version**: SDK 1.81.0+      
**Editor Version**: New Editor  
**Components**: Settings Panel

How to use this method:  

1.  **Call this method when a user is adding a link in your app.** Users will be able to link to an anchor on their site, an external link, and more.
2.  **Save the return object**. This method returns a link data object – save the object on your database, without changing it in any way.
3.  **Use the return object to navigate to the link target.** In the live site/preview, use the Wix.navigateTo method to navigate to the link target.
4.  **Use the return object the next time you call openLinkPanel**. This will open the panel with the current link settings displayed.

> **Note:**  
Want to learn more? To see how the link panel works inside the Wix Editor, check out [this video](fallback::http://youtu.be/KeJco7ymRUM?t=2m39s).

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options**|Object|Options for this method|
|options.**link**|Object|If the user is editing an existing link, add the link data object we returned the last time you called this method. This opens the panel with the current link settings displayed.|
|**onSuccess** (required)|Function|Function called when the user clicks **Done** in the link settings panel, and returns an object containing the selected link data callback signature: function(linkData) {}|
|**onCancel**|Function|Function called when the user clicks Cancel in the link settings panel.|

**Value passed to callback**:

A link object with information about this link.

> **Warning:**  
Save this object in your database as is – **don’t** change it in any way.

Here’s when to use the link object:

*   To navigate to the link target in the live site/preview (use the Wix.navigateTo method)
*   The next time you open the link panel with the user’s settings.

Here’s an example of a link object for a page:
```

#### Function 15: openMediaDialog

- Summary: This method opens the [Wix Media Manager](fallback::https://support.wix.com/en/article/about-the-media-manager), which allows users to choose an existing item from the Wix media galleries or upload a new file.

- Syntax:
```javascript
openMediaDialog(mediaType, multiSelect, onSuccess, \[onCancel\])
```

- Example:
```javascript
Wix.Settings.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, function(data) {
    let imageurl = Wix.Utils.Media.getImageUrl(data.relativeUri);
});
```

- Details:
```markdown
This method opens the [Wix Media Manager](fallback::https://support.wix.com/en/article/about-the-media-manager), which allows users to choose an existing item from the Wix media galleries or upload a new file.

> **SDK Version**: SDK 1.17.0+      
**Editor Version**: New Editor, Old Editor    

Once the user selects a media item, a callback function retrieves a metadata descriptor with details about it.

To access the media item, use one of the Wix.Utils.Media.get\* methods to construct the item’s full URL. You’ll need the item’s relativeUri, which is returned in the callback function.

> **Warning:**  
Use the Wix.Utils.Media.get\* methods _each time_ you access the media item, to prevent broken links.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|mediaType (required)|Wix.Settings.MediaType.IMAGE, Wix.Settings.MediaType.BACKGROUND, Wix.Settings.MediaType.AUDIO, Wix.Settings.MediaType.SECURE\_MUSIC, Wix.Settings.MediaType.DOCUMENT, Wix.Settings.MediaType.SWF | Type of media item the user is selecting: *   IMAGE (photo/image) *   BACKGROUND (background image) *   AUDIO (mp3 file up to 50MB) *   SECURE\_MUSIC (high quality audio up to 360MB) *   DOCUMENT *   SWF|
|multiSelect (required)|Boolean|true if the user selected more than one item. false if the user selected only one item.  |
|onSuccess (required)|Function|Callback function to pass metadata about this media item  |
|onCancel|Function|Callback function called when the user cancels  |

**Value passed to onSuccess callback**:

An object or an array of objects (for multiple media items).

Each object contains metadata about a specific media item.
```

#### Function 16: openModal

- Summary: Opens a lightbox-style modal window over the Wix editor. You can only open this modal from the settings endpoint.

- Syntax:
```javascript
openModal(url, width, height, \[title\], \[onClose\])
```

- Example:
```javascript
var onClose = function(message) { console.log("modal closed", message); }

//Open a modal when width and height are in pixels
Wix.Settings.openModal(
    "https://static.wixstatic.com/media/3cd1de924697419088c1e033bb3384ef.jpg", 
    400, 
    400, 
    "My modal's title", 
    onClose
);

//Open a modal when width and height in percentages
Wix.Settings.openModal(
    "https://static.wixstatic.com/media/3cd1de924697419088c1e033bb3384ef.jpg",
    '70%',
    '90%',
    "My modal's title",
    onClose
);
```

- Details:
```markdown
Opens a lightbox-style modal window over the Wix editor. You can only open this modal from the settings endpoint.

> **SDK Version**: SDK 1.41.0+      
**Editor Version**: New Editor, Old Editor    

Here’s how the modal works:

*   The modal is a runtime widget, so it’s not part of the site structure.
*   The modal is a singleton – every new modal closes the previous one.
*   Users can close the modal by clicking the lightbox or pressing the close button. You can close the modal by calling [Wix.Settings.closeWindow](fallback::#closewindow) from within the modal iframe.

### Breaking change for the openModal method

We’ve deprecated the bareUI parameter, which means that the modal now has a header, border, shadow, etc. If your app is using the bareUI parameter:

1.  Remove bareUI from Wix.Settings.openModal.
2.  Now that the [modal style](fallback::https://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/21171536/settings_modal_example.png) changed, we recommend adding a title and changing your design if needed.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|url (required)|String|URL of the modal iframe|
|width (required)|Number/ String|Width of the modal. In pixels: Enter a number (for example, 400), In percent: Enter a string (for example, ‘70%’)|
|height (required)|Number/ String|Height of the modal. In pixels: Enter a number (for example, 400), In percent: Enter a string (for example, ‘70%’)|
|title|String|The title of the modal|
|onClose|Function|OnClose callback function|
```

#### Function 17: openReviewInfo

- Summary: Opens your app’s **Reviews** tab as a modal within the Wix Editor.

- Syntax:
```javascript
openReviewInfo( )
```

- Example:
```javascript
Wix.Settings.openReviewInfo();
```

- Details:
```markdown
Opens your app’s **Reviews** tab as a modal within the Wix Editor.

> SDK Version: SDK 1.65.0+      
Editor Version: New Editor    

**Example:**
```

#### Function 18: openSiteMembersSettingsDialog

- Summary: Opens the settings for the Wix’s site members component, directly from your app. This method first closes all other open dialogs or panels in the editor.

- Syntax:
```javascript
openSiteMembersSettingsDialog()
```

- Example:
```javascript
Wix.Settings.openSiteMembersSettingsDialog()
```

- Details:
```markdown
Opens the settings for the Wix’s site members component, directly from your app. This method first closes all other open dialogs or panels in the editor.

> **SDK Version**: SDK 1.74.0+      
**Editor Version**: New Editor      
**Components**: Settings Panel    

This method is relevant for apps that require site visitors to log in as members of the site.

**Example:**
```

#### Function 19: refreshApp

- Summary: Reloads the app. Use this method when the user makes a change that affects the entire app – and it requires server-side rendering. For example, when the user connects an account.

- Syntax:
```javascript
refreshApp(\[queryParams\])
```

- Example:
```javascript
//The App's components (all of them) will be refreshed without custom query parameters
Wix.Settings.refreshApp();

//The App's components (all of them) will be refreshed with custom query parameters as specified in the object argument - [BASE-URL]?[WIX-QUERY-PARAMETERS]&m1=value1&m2=value2

Wix.Settings.refreshApp({param1: "value1", param2: "value2"})
```

- Details:
```markdown
Reloads the app. Use this method when the user makes a change that affects the entire app – and it requires server-side rendering. For example, when the user connects an account.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor    

_Don’t_ use this method when:

*   The change only affects one of your app’s components. In this case, use [refreshAppByCompIds](fallback::#refreshappbycompids) instead.
*   The user made a small change in your app – like customized text. In this case, use the [triggerSettingsUpdatedEvent](fallback::#triggersettingsupdatedevent) instead.

This method accepts a single optional argument, an object. Each of the object’s properties will translate into a query parameter in the iframe URL.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|queryParams|Object|A map of custom query parameters that should be added to the iframe URL |
```

#### Function 20: refreshAppByCompIds

- Summary: Reloads the component. Use this method when the user makes a change that requires server-side rendering, and this change only affects specific components.

- Syntax:
```javascript
refreshAppByCompIds(compIds, \[queryParams\])
```

- Example:
```javascript
//For example, if the user adds 3 components of the same app with ids: "id1", "id2" and "id3", and then he changes something in the settings iframe that affects only 2 components display, to refresh these 2 components:

//The App's components with ids "id1" and "id3" will be refreshed without custom query parameters
Wix.Settings.refreshAppByCompIds(["id1", "id3"]);

//The App's components with ids "id1" and "id3" will be refreshed with custom query parameters as specified in the object argument - [BASE-URL]?[WIX-QUERY-PARAMETERS]&m1=value1&m2=value2

Wix.Settings.refreshAppByCompIds(["id1", "id3"], {param1: "value1", param2: "value2"});
```

- Details:
```markdown
Reloads the component. Use this method when the user makes a change that requires server-side rendering, and this change only affects specific components.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor

_Don’t_ use this method when:

*   The change affects all of your app’s components. In this case, use [refreshApp](fallback::#refreshapp) instead.
*   The user made a small change in your app. In this case, use the [triggerSettingsUpdatedEvent](fallback::#triggersettingsupdatedevent) instead.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|compIds (required)|Array|An array of the app component ids that should be refreshed |
|queryParams |Object|A map of custom query parameters that should be added to the iframe URL|

**Example**`
```

#### Function 21: resizeComponent

- Summary: Sets the width and/or height of a component, displaying it over other components in the page.

- Syntax:
```javascript
resizeComponent(options, onSuccess, \[onFailure\])
```

- Example:
```javascript
Wix.Settings.resizeComponent({
    width: 400,
    height: 600
});
```

- Details:
```markdown
Sets the width and/or height of a component, displaying it over other components in the page.

> **SDK Version**: SDK 1.45.0+      
**Editor Version**: New Editor      
**Components**: Settings Panel (for Widgets/Pages only)

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options** (required)|Object|Specify width and/or height (you must specify at least one)|
|options.**width**|Number|Size in pixels, for example: 450. If you don’t provide a value, the width remains the same.|
|options.**height**|Number|Size in pixels, for example: 450. If you don’t provide a value, the height remains the same.|
|**onSuccess** (required)|Function|Callback function to receive the new component size|
|**onFailure**|Function|Callback function to receive the error details. An error occurs when no value is provided for width and height (you must give a value for at least one).|
```

#### Function 22: revalidateSession

- Summary: Verifies that the session is secure. If the session is secure, this method retrieves a newly-signed app instance.

- Syntax:
```javascript
revalidateSession(onSuccess, \[onFailure\])
```

- Example:
```javascript
Wix.Settings.revalidateSession(
    function(instanceData) {
        //handle success use-case
    }, 
    function(error){
        //Handle error use-case
    }
);
```

- Details:
```markdown
Verifies that the session is secure. If the session is secure, this method retrieves a newly-signed app instance.

> **SDK Version**: SDK 1.47.0+  
**Editor Version**: New Editor    

Use this method before displaying sensitive information or performing an action that requires a secure session.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|onSuccess (required)|Function|Receives a newly-signed and encoded app instance|
|onFailure |Function|Callback function in case the session isn't secure|
```

#### Function 23: setFullWidth

- Summary: Sets the widget/page component to the full-width of the browser.

- Syntax:
```javascript
setFullWidth(fullWidth, \[options\], onSuccess, \[onFailure\])
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Sets the widget/page component to the full-width of the browser.

> **SDK Version**: SDK 1.81.0+      
**Editor Version**: New Editor         
**Components**: Settings Panel (for Widgets/Pages only)    

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**fullWidth** (required)|Boolean|Set the width:. Enter true to set the component to full width, enter false to reset the component to the width you defined in the Developers Center.|
|**options**|Boolean|Options for this method|
|options.**margins**|Object|When the component is set to full width, you can define margins on the left and right sides of the component. For example: {left: "200px", right: "200px"}. Enter the value in **px** (default) - number of pixels to leave as a margin, or **%** - percentage of the viewport to leave as a margin. If you don’t specify a unit, we use px. You can specify different units for the left and right sides: {left: "5%", right: "200px"}|
|**onSuccess** (required)|Function|Callback function that’s fired when the component is set to full-width successfully|
|**onFailure**|Function|Callback function that’s fired when the component can’t be set to full-width (for example, a fixed-position widget)|
```

#### Function 24: setWindowPlacement

- Summary: Sets the placement for fixed position widgets in an editing session.

- Syntax:
```javascript
setWindowPlacement(compId, placement, \[verticalMargin\], \[horizontalMargin\])
```
```javascript
triggerSettingsUpdatedEvent(message, \[compId\])
```

- Example:
```javascript
var compId = Wix.Utils.getOrigCompId();
Wix.Settings.setWindowPlacement(compId, Wix.WindowPlacement.TOP_CENTER, 2, 0);
```
```javascript
Wix.Settings.triggerSettingsUpdatedEvent(message, compId);
```

- Details:
```markdown
Sets the placement for fixed position widgets in an editing session.

> **SDK Version**: SDK 1.19.0+ <br />
> **Editor Version**: New Editor, Old Editor <br />
> **Component**: Settings Panel (for Fixed-Position Widgets only)
    
A position placement is a predefined set of locations where a popup will be placed. The position placement is defined under Wix.WindowPlacement and can have the following values:

1.  Wix.WindowPlacement.TOP\_LEFT
2.  Wix.WindowPlacement.TOP\_CENTER
3.  Wix.WindowPlacement.TOP\_RIGHT
4.  Wix.WindowPlacement.CENTER\_RIGHT
5.  Wix.WindowPlacement.CENTER\_LEFT
6.  Wix.WindowPlacement.BOTTOM\_LEFT
7.  Wix.WindowPlacement.BOTTOM\_CENTER
8.  Wix.WindowPlacement.BOTTOM\_RIGHT

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|compId (required)|String|Component id to change window placement to |
|placement (required)|Wix.WindowPlacement |New placement for the widget window |
|verticalMargin|Number|Vertical offset from the window placement, between -2 to 2 |
|horizontalMargin|Number|Horizontal offset from the window placement, between -2 to 2|

### triggerSettingsUpdatedEvent

Triggers a Wix.Events.SETTINGS\_UPDATED event in a component iframe. It should be used in an editing session when a developer wants to reflect editing changes but avoid refresh/reload of the component’s iframe.

> **SDK Version**: SDK 1.17.0+      
**Editor Version**: New Editor, Old Editor

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|message (required)|Object |A custom json which will be passed to the component as the event data|
|compId|String|A component ID the developer wants to trigger the event for. The most obvious compId is Utils.getOrigCompId(). If no compId is given all components that registered to Wix.Events.SETTINGS\_UPDATED will receive the event.|

# Deprecated
```

#### Function 25: getSitePages

- Summary: Now that this method is deprecated, use the [getSiteMap](fallback::#getsitemap) method instead.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
Wix.Settings.getSitePages(function(sitePages) {
    // do something with the site pages
});
```

- Details:
```markdown
> **SDK Version**: Deprecated   

> **Note:**  
Now that this method is deprecated, use the [getSiteMap](fallback::#getsitemap) method instead.

A page can be:

*   An item in the site’s menu – a page, subpage, external link, link to a page anchor, or menu header.
*   A hidden page/subpage – these pages are part of the site, but they’re not part of the site menu. For example, a “Thank You” page that’s shown only after a site visitor makes a purchase.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|options|Object|Options for this method|
|callback (required)|Function|A callback function to receive the site structure|

**Value passed to callback:**

An array of objects, where each object represents a page in the site.

The objects are ordered according to the site’s structure shown in the Pages menu of the Wix Editor. If a page has subpages, they are returned as an array of objects nested _inside_ the page object.

Each page/subpage object contains the following properties:

|Name	|Type	|Description|
|---|---|---|
|id|String|The page/subpage ID. If the user added a page anchor to the site’s menu, then this method returns an object for the anchor - so there might be multiple objects with the same page ID.| 
|title|String|The title of the page/subpage|
|hide|Boolean|Returns true if this page/subpage is hidden|
|isHomePage|Boolean|Returns true if this page/subpage is the site's home page|
|subPages|Array \[objects\]|(Page objects only) If the page has subPages, returns an ordered set of subpages. Each subpage object contains more information about the subpage (id, title, hide, isHomePage, url).|
```

#### Function 26: getStyleParams

- Summary: Retrieves the style parameters from the hosting Wix platform. The parameters includes colors numbers, booleans.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
Wix.Settings.getStyleParams(function(styleParams) {
    // do something with the style params
});
```

- Details:
```markdown
> **SDK Version**: Deprecated      

Retrieves the style parameters from the hosting Wix platform. The parameters includes colors numbers, booleans.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|A callback function to receive the style parameters |
```

---

## DOC-12: Wix.PubSub

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-pubsub

### Sections and Functions
#### Function 01: publish

- Summary: Broadcasts an event to other Site components of a multicomponent app. If the app’s Site components span multiple pages, they will be notified when they are rendered.

- Syntax:
```javascript
publish(eventName, data, isPersistent)
```

- Example:
```javascript
// The following call publishes an app event.  
// Apps components that are subscribed to this event will receive it when they are rendered.
Wix.PubSub.publish("my_event_name", {value: "this is my message"}, true);
```

- Details:
```markdown
Broadcasts an event to other Site components of a multicomponent app. If the app’s Site components span multiple pages, they will be notified when they are rendered.

> **SDK Version**: SDK 1.25.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup    

> **Note:**  
For the Worker component, use the Worker.PubSub.publish method instead.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)|String|The name of the event to publish|
|data (required)|Object|The object to send to subscribers for this event type|
|isPersistent (required)|Boolean|Indicates whether this event is persisted for event subscribers who have not yet subscribed|
```

#### Function 02: subscribe

- Summary: Subscribes to events from other site components of a multicomponent app. If the components span multiple pages, they will be notified once they are rendered. It is also possible to receive all notifications prior to rendering by specifying a flag when subscribing to events. If the flag is set, the component will be notified immediately of any prior events of the type it is registered to receive.

- Syntax:
```javascript
subscribe(eventName, callBack, \[receivePastEvents\])
```

- Example:
```javascript
//subscribe and then unsubscribe to "my_event_name" event
Wix.PubSub.subscribe("my_event_name", function(event) {
    // process the event which has the following format:
    // {
    //     name: eventName,
    //     data: eventData,
    //     origin: compId
    // }
});

// subscribe to "my_event_name" event, events which also happened before this component was rendered will send
Wix.PubSub.subscribe("my_event_name", function(event) { }, true);
```

- Details:
```markdown
Subscribes to events from other site components of a multicomponent app. If the components span multiple pages, they will be notified once they are rendered. It is also possible to receive all notifications prior to rendering by specifying a flag when subscribing to events. If the flag is set, the component will be notified immediately of any prior events of the type it is registered to receive.

> **SDK Version**: SDK 1.25.0+     
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

> **Note:**  
For the Worker component, use the Worker.PubSub.subscribe method instead.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)|String |The name of the event to subscribe to|
|callBack (required)|Function|Function that will respond to events sent from other components of the broadcasting app. It will be given the event object itself and the source of the event|
|receivePastEvents|Boolean|A flag to indicate that all past instances of the registered event should be sent to registered listener. This will happen immediately upon registration.|
```

#### Function 03: unsubscribe

- Summary: Unsubscribes from receiving further events. The id from the initial subscribe call is used to unsubscribe from further notifications.

- Syntax:
```javascript
unsubscribe(eventName, function)
```

- Example:
```javascript
//subscribe and then unsubscribe to "my_event_name" event
var id = Wix.PubSub.subscribe("my_event_name", function(event) { });
Wix.PubSub.unsubscribe("my_event_name", id);
```

- Details:
```markdown
Unsubscribes from receiving further events. The id from the initial subscribe call is used to unsubscribe from further notifications.

> **SDK Version**: SDK 1.25.0+     
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Modal, Popup

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)|String |The name of the event to unsubscribe from|
|function (required)|Function |The function that will respond to events sent from other extensions of the broadcasting app. It will be given the event object itself and the source of the event.|
```

---

## DOC-13: Wix.Styles

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-styles

### Sections and Functions
#### Function 01: getStyleId

- Summary: Retrieves the component’s styleId. The styleId represents a set of style parameters we’ve stored for a specific component – colors, fonts, numbers, and booleans.

- Syntax:
```javascript
Wix.Styles.getStyleId(callback)
```

- Example:
```javascript
Wix.Styles.getStyleId(function(styleId){
    //do something with the styleId
});
```

- Details:
```markdown
Retrieves the component’s styleId. The styleId represents a set of style parameters we’ve stored for a specific component – colors, fonts, numbers, and booleans.

> **SDK Version**: SDK 1.65.0+      
**Editor Version**: New Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page    

Once you know the component’s styleId, you can retrieve these style parameters using [getStyleParamsByStyleId](#getstyleparamsbystyleid).

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function| A callback function that receives the styleId|
```

#### Function 02: getStyleParams

- Summary: Retrieves the style parameters of the current component: booleans, numbers, colors, and fonts.

- Syntax:
```javascript
Wix.Styles.getStyleParams(\[callback\])
```

- Example:
```javascript
Wix.Styles.getStyleParams( function(styleParams) {
    //do something with the style params
});
```

- Details:
```markdown
Retrieves the style parameters of the current component: booleans, numbers, colors, and fonts.

> **SDK Version**: SDK 1.26.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page    

> **Note:**  
If calling this method in the settings endpoint, it returns the style parameters of the component that opened the settings endpoint.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback|Function| Callback function to retrieve the style values|

**Returns**:
```

#### Function 03: getStyleParamsByStyleId

- Summary: Retrieves the style parameters for a given styleId. The styleId represents a set of style parameters we’ve stored for a specific component – colors, fonts, numbers, and booleans.

- Syntax:
```javascript
Wix.Styles.getStyleParamsByStyleId(styleId, onSuccess, \[onFailure\])
```

- Example:
```javascript
Wix.Styles.getStyleParamsByStyleId(
    'djk32',
    function(styleParams) { //do something with the styleParams },
    function(){ //throw error }
);
```

- Details:
```markdown
Retrieves the style parameters for a given styleId. The styleId represents a set of style parameters we’ve stored for a specific component – colors, fonts, numbers, and booleans.

> **SDK Version**: SDK 1.65.0+      
**Editor Version**: New Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page    

You can get the component’s styleId using [getStyleId](#getstyleid).

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|styleId (required)|String|The component’s styleId|
|onSuccess (required)|Function|Callback function to retrieve the component’s style parameters|
|onFailure|Function |Callback function to handle the case that the styleId wasn't found|
```

---

## DOC-14: Wix.Utils

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-utils

### Sections and Functions
#### Function 01: getCacheKiller

- Summary: Returns a String which is the cacheKiller query parameter.

- Syntax:
```javascript
getCacheKiller() → String
```

- Example:
```javascript
var cacheKiller = Wix.Utils.getCacheKiller();
```

- Details:
```markdown
Returns a String which is the cacheKiller query parameter.  

> **SDK Version:** SDK 1.12.0+  
> **Editor Version:** New Editor, Old Editor  
> **Display:** Live Site, Preview  
> **Components:** Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Dashboard, Modal, Popup
```

#### Function 02: getCompId

- Summary: Returns a String which represents the component’s iframe component ID.

- Syntax:
```javascript
getCompId() → String
```

- Example:
```javascript
var compId = Wix.Utils.getCompId();
```

- Details:
```markdown
Returns a String which represents the component’s iframe component ID.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Dashboard, Modal, Popup     

> **Note:**  
Trying to use this method in the settings endpoint? To get the compId of the component that opened the settings endpoint, use [getOrigCompId](#getorigcompid).
```

#### Function 03: getCurrentConsentPolicy

- Summary: Returns an object containing the user's current policy.

- Syntax:
```javascript
getCurrentConsentPolicy() → Object
```

- Example:
```javascript
var policyDetails = Wix.Utils.getCurrentConsentPolicy();
if (defaultPolicy.policy.dataToThirdParty) {
  // For example, if true you may be allowed to share data with Facebook. (You must check with your legal team first.)
}
```

- Details:
```markdown
Returns an object containing the user's current policy.

> **SDK Version**: SDK 1.425.0      
**Display**: Live Site  
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup 

> **Important:**   
Use this method in the live site only. Although it works in the Editor/Preview, and will not return the real policy of the user.

**Object Data**:
```

#### Function 04: getDeviceType

- Summary: Returns a String which represents the current device type: Desktop or Mobile

- Syntax:
```javascript
getDeviceType() → String
```

- Example:
```javascript
var deviceType = Wix.Utils.getDeviceType();
```

- Details:
```markdown
Returns a String which represents the current device type: Desktop or Mobile

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup
```

#### Function 05: getInstanceId

- Summary: Returns a String which represents the app instance ID.

- Syntax:
```javascript
getInstanceId() → String
```

- Example:
```javascript
var instanceId = Wix.Utils.getInstanceId();
```

- Details:
```markdown
Returns a String which represents the app instance ID.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor       
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup
```

#### Function 06: getInstanceValue

- Summary: Returns the current value of the requested key. If the key does not exist, null is returned.

- Syntax:
```javascript
getInstanceValue(String) → {\*}
```

- Example:
```javascript
// demoMode will get a value of true or false
var demoMode = Wix.Utils.getInstanceValue('demoMode');
```

- Details:
```markdown
Returns the current value of the requested key. If the key does not exist, null is returned.

> **SDK Version**: SDK 1.12.0+       
**Editor Version**: New Editor, Old Editor  
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup
```

#### Function 07: getLocale

- Summary: Returns a String which represents the current locale of the website or editor (en (English), es (Spanish), fr (French), it (Italian), etc.).

- Syntax:
```javascript
getLocale() → String
```

- Example:
```javascript
var locale = Wix.Utils.getLocale();
```

- Details:
```markdown
Returns a String which represents the current locale of the website or editor (en (English), es (Spanish), fr (French), it (Italian), etc.).

> **SDK Version**: SDK 1.14.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup  
A locale is an abbreviated language tag that defines the user’s language, country and any special variant preference of the user interface (e.g. Number format, Date format, etc.).
```

#### Function 08: getOrigCompId

- Summary: Returns a String which represents the iframe’s component id which opened the App Settings panel.

- Syntax:
```javascript
getOrigCompId() → String
```

- Example:
```javascript
var origCompId = Wix.Utils.getOrigCompId();
```

- Details:
```markdown
Returns a String which represents the iframe’s component id which opened the App Settings panel.

> **SDK Version**: SDK 1.14.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup
```

#### Function 09: getPermissions

- Summary: Returns a String which represents the user’s permissions (decoded property of the instance query parameter).

- Syntax:
```javascript
getPermissions() → String
```

- Example:
```javascript
var permissions = Wix.Utils.getPermissions();
```

- Details:
```markdown
Returns a String which represents the user’s permissions (decoded property of the instance query parameter).

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup
```

#### Function 10: getSectionUrl

- Summary: This method returns the URL of your page component in the live site, for example: _mysite.com/my-store-app_. You’ll use this URL to build the URLs for the app’s internal pages, for example: _mysite.com/my-store-app/product1_.

- Syntax:
```javascript
getSectionUrl(\[sectionIdentifier\], \[callback\])
```

- Example:
```javascript
//eComm app directs a site visitor to a thank-you page after a purchase:
var url = Wix.Utils.getSectionUrl();
Wix.Utils.getSectionUrl({sectionId: 'myStoreApp'}, function(data) {
    // Use the returned value to build a URL that directs site visitors to an
    // internal thank-you page after a purchase
})
```

- Details:
```markdown
This method returns the URL of your page component in the live site, for example: _mysite.com/my-store-app_. You’ll use this URL to build the URLs for the app’s internal pages, for example: _mysite.com/my-store-app/product1_.

> **SDK Version**: SDK 1.37.0+          
**Display**: Live Site       
**Components**: Page

Use this method if you have a page component and you’re using server-side rendering to create deep links for internal pages.

> **Important:**  
Use this method in the **live site only**. Although it works in the Editor/Preview, it returns the URL of the iframe itself – not the page URL in the site.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**sectionIdentifier**  |Object  |To get the URL of a specific page component, specify its ID (as well as a callback function). If you _don’t_ specify the ID, this method returns the URL of the current page component.  |
|sectionIdentifier.**sectionId**  |String  |ID of the page component, [as specified in the Developers Center](http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/21171537/Dev_Center_componentId.png)  |
|**callback**  |Function  |(Required if you specified the sectionId) A callback function that returns the URL of the page component (the section-url query parameter).  |
```

#### Function 11: getSignDate

- Summary: Returns a string which represents the signDate of the app instance.

- Syntax:
```javascript
getSignDate() → String
```

- Example:
```javascript
var date = Wix.Utils.getSignDate();
```

- Details:
```markdown
Returns a string which represents the signDate of the app instance.

> **SDK Version**: SDK 1.13.0+  
**Editor Version**: New Editor, Old Editor  
**Display**: Live Site, Preview  
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup
```

#### Function 12: getSiteOwnerId

- Summary: Returns a string that represents the site owner’s ID.

- Syntax:
```javascript
getSiteOwnerId() → String
```

- Example:
```javascript
var siteOwnerId = Wix.Utils.getSiteOwnerId();
```

- Details:
```markdown
Returns a string that represents the site owner’s ID.

> **SDK Version**: SDK 1.52.0+      
**Editor Version**: New Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup 

**Returns**:

The site owner’s ID.
```

#### Function 13: getTarget

- Summary: Returns a string which is the target query parameter (for the section-url). If it does not exist, returns null.

- Syntax:
```javascript
getTarget() → String
```

- Example:
```javascript
var target = Wix.Utils.getTarget();
```

- Details:
```markdown
Returns a string which is the target query parameter (for the section-url). If it does not exist, returns null.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Dashboard, Modal, Popup
```

#### Function 14: getUid

- Summary: Returns a string which represents the user identifier.

- Syntax:
```javascript
getUid() → String
```

- Example:
```javascript
var uid = Wix.Utils.getUid();
```

- Details:
```markdown
Returns a string which represents the user identifier.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup
```

#### Function 15: getViewMode

- Summary: Returns a string which represents the current view mode.

- Syntax:
```javascript
getViewMode() → String
```

- Example:
```javascript
var viewMode = Wix.Utils.getViewMode();
```

- Details:
```markdown
Returns a string which represents the current view mode.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Modal, Popup
```

#### Function 16: getWidth

- Summary: Returns a number which represents the iframe’s width.

- Syntax:
```javascript
getWidth() → Number
```

- Example:
```javascript
var width = Wix.Utils.getWidth();
```

- Details:
```markdown
Returns a number which represents the iframe’s width.

> **SDK Version**: SDK 1.12.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Modal, Popup
```

#### Function 17: navigateToSection

- Summary: Navigates to your page component – either to the page component itself or to one of your app’s internal pages.

- Syntax:
```javascript
navigateToSection(options, onFailure)
```

- Example:
```javascript
Wix.Utils.navigateToSection(
    {
        sectionId: "product_gallery", 
        noTransition: false, 
        queryParams: {
            param1: "value", 
            param2: "value"
        }
    },  
    function(error){
        //Handle error use-case
    }
);
```

- Details:
```markdown
Navigates to your page component – either to the page component itself or to one of your app’s internal pages.

> **SDK Version**: SDK 1.95.0+      
**Editor Version**: New Editor      
**Display**: Live Site, Preview      
**Components**: Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Modal, Popup 

To navigate to a widget or fixed-position widget, use [Wix.navigateToComponent](https://dev.wix.com/docs/client/api-reference/deprecated/i-frame-sdk-deprecated/wix#navigatetocomponent) instead.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options** (required)|Object|ID of the page component to navigate to, as well as optional parameters for this method|
|options.**sectionId** (required)|String|ID of the page component, [as specified in the Developers Center](http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/21171537/Dev_Center_componentId.png)  |
|options.**appDefinitionId**|String|If navigating to a page component in a different app, enter that app’s ID ([specified in the Developers Center](http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/18095909/appId-dev-center.png))|
|options.**queryParams**|Object|Query parameters to add to the page URL when navigating to it, in key value pairs. For example: {param1:value1, param2:value2,...}. These query params are included in the iframe URL (e.g., ?param1=value1&param2=value2).|
|options.**state**|String|The new app's state to push into the editor history stack|
|options.**shouldRefreshIframe**|Boolean|Indicates if the app iframe should be refreshed when navigating to the page. Default value is true. When queryParams are defined, shouldRefreshIframealways defaults to true.|
|options.**noTransition**|Boolean|Indicates if there should be a transition when navigating to the page. Default value is false.|
|**onFailure** (required)|Function |This will be called if the hosting site does not include the section app, or if the caller's application does not include a section|

> **Note:**  
This method is **not** available from the Dashboard endpoint.
```

#### Function 18: getOnConsentPolicyChanged

- Summary: Retrieves the user's new policy.

- Syntax:
```javascript
getOnConsentPolicyChanged(callback)
```

- Example:
```javascript
Wix.Utils.getOnConsentPolicyChanged((data)=> {
      console.log(data);
});
// will log something with the following structure:
{
  "defaultPolicy": false,
  "policy": {
    "functional": false,
    "analytics": false,
    "advertising": false,
    "dataToThirdParty": false,
    "essential": true
  },
  "createdDate": "2020-04-03T21:00:00.000Z"
}
```

- Details:
```markdown
Retrieves the user's new policy. 

> **SDK Version**: SDK 1.425.0          
**Display**: Live Site      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup 

> **Important:**  
Use this method in the live site only. Although it may work in the Editor/Preview, it will not give you real data.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback|function|Callback function to receive the new policy|
```

#### Function 19: toWixDate

- Summary: Converts a JavaScript Date object into the correct format, ISO 8601, used by Wix APIs when dealing with dates.

- Syntax:
```javascript
toWixDate() → String
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Converts a JavaScript Date object into the correct format, ISO 8601, used by Wix APIs when dealing with dates.

> **SDK Version**: SDK 1.28.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup
```

#### Function 20: Media.getAudioUrl

- Summary: Constructs the absolute URL for an audio file in the Wix Media Manager.

- Syntax:
```javascript
Media.getAudioUrl(relativeUri) → String
```

- Example:
```javascript
var audioUrl = Wix.Utils.Media.getAudioUrl('relative_url.mp3');
```

- Details:
```markdown
Constructs the absolute URL for an audio file in the Wix Media Manager.

> **SDK Version**: SDK 1.17.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup 

> **Warning:**  
Use this method _each time_ you access the media item, to prevent broken links.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|relativeUri (required)|String|URI of the audio item (relative to Wix media gallery)|

**Returns**:

A full URL pointing to the audio file hosted on Wix static servers.
```

#### Function 21: Media.getDocumentUrl

- Summary: Constructs a URL for a media item of type document.

- Syntax:
```javascript
Media.getDocumentUrl(relativeUri) → String
```

- Example:
```javascript
var documentUrl = Wix.Utils.Media.getDocumentUrl('relative_url.pdf');
```

- Details:
```markdown
Constructs a URL for a media item of type document.

> **SDK Version**: SDK 1.17.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup 

> **Warning:**  
Use this method _each time_ you access the media item, to prevent broken links.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|relativeUri (required)|String|Document item uri (relative to Wix media gallery)|

**Returns**:

A full URL pointing to the Wix static servers of a document media file with the default dimensions.
```

#### Function 22: Media.getImageUrl

- Summary: Constructs a URL for a media item of type image.

- Syntax:
```javascript
Media.getImageUrl(Image) → String
```

- Example:
```javascript
var imageUrl = Wix.Utils.Media.getImageUrl('relative_url.jpg');
```

- Details:
```markdown
Constructs a URL for a media item of type image.

> **SDK Version**: SDK 1.17.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup    

On the live site, we recommend using [Media.getResizedImageUrl](#mediagetresizedimageurl) instead (for better performance).

> **Warning:**  
Use this method _each time_ you access the media item, to prevent broken links.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|Image (required)|String|Item uri (relative to Wix media gallery).|

**Returns**:

A full URL pointing to the Wix static servers of an image with the default dimensions – width and height.
```

#### Function 23: Media.getResizedImageUrl

- Summary: Constructs a URL for a media item of type image. You can change the image dimensions as well as its sharpening properties. [Learn more](http://en.wikipedia.org/wiki/Unsharp_masking) about sharpening.

- Syntax:
```javascript
Media.getResizedImageUrl(relativeUrl, width, height, \[sharpParams\]) → String
```

- Example:
```javascript
var resizedImageUrl = Wix.Utils.Media.getResizedImageUrl('relative_url.jpg', 500, 500);
```

- Details:
```markdown
Constructs a URL for a media item of type image. You can change the image dimensions as well as its sharpening properties. [Learn more](http://en.wikipedia.org/wiki/Unsharp_masking) about sharpening.

> **SDK Version**: SDK 1.17.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup 

> **Warning:**  
Use this method _each time_ you access the media item, to prevent broken links.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**relativeUrl** (required)|String|Static image url provided by the media dialog |
|**width** (required)|Number|Desired image width|
|**height** (required)|Number|Desired image height|
|**sharpParams** |Object|Image sharpening properties|
|sharpParams.**quality** (required)|Number|JPEG quality, leave as is (75) unless image size is important for your app|
|sharpParams.**filter** (required)|Number|Resize filter|
|sharpParams.**usm\_r** (required)|Number|Unsharp mask radius |
|sharpParams.**usm\_a** (required)|Number|Unsharp mask amount (percentage)|
|sharpParams.**usm\_t** (required)|Number|Unsharp mask threshold|

**Returns**:

A full URL pointing to the Wix static servers of an image with the custom dimension parameters.
```

#### Function 24: Media.getSwfUrl

- Summary: Constructs a URL for a media item of type swf.

- Syntax:
```javascript
Media.getSwfUrl(relativeUri) → String
```

- Example:
```javascript
var swfUrl = Wix.Utils.Media.getSwfUrl('relative_url.swf');
```

- Details:
```markdown
Constructs a URL for a media item of type swf.

> **SDK Version**: SDK 1.17.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Settings Panel, Settings Modal, Dashboard, Modal, Popup 

> **Warning:**  
Use this method _each time_ you access the media item, to prevent broken links.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|relativeUri (required)|String|Swf item uri (relative to Wix media gallery) |

**Returns**:

A full URL pointing to the Wix static servers of a swf media file with the default dimensions.

# Deprecated
```

#### Function 25: getIpAndPort

- Summary: Returns a String which represents the app IP and port.

- Syntax:
```javascript
getIpAndPort() → String
```

- Example:
```javascript
var ipAndPort = Wix.Utils.getIpAndPort();
```

- Details:
```markdown
Returns a String which represents the app IP and port.

> **SDK Version**: Deprecated  
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Wix Dashboard, Widget, Pinned (aka Fixed-Position) Widget, Page, Dashboard, Modal, Popup
```

---

## DOC-15: Wix.Worker

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/iframe-sdk-deprecated/wix-worker

### Sections and Functions
#### Function 01: addEventListener

- Summary: Allows the worker component to listen to events that happen in the editor or website.

- Syntax:
```javascript
addEventListener(eventName, handler)
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Allows the worker component to listen to events that happen in the editor or website.

> **SDK Version**: SDK 1.11.0 - 1.96.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker

Make sure to register event listeners when the document loads, since previous listeners might be invalidated when we load your app.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)|Wix.Events|Unique event identifier, listed in the table below|
|callback (required)|Function |A callback function that is called by the SDK once an event occurs. |

The events that you can currently listen to are:

|Event|Event Data|Description|
|---|---|---|
|COMPONENT\_DELETED|{}|Issued when the user deletes a site component. **Note**: This event is only sent to the component that was deleted, so use the Wix.PubSub.publish method to alert other site components in your app about this event. For worker components, use [Wix.Worker.PubSub.publish](fallback::#pubsubpublish). Availability: Since 1.13.0|
|DEVICE\_TYPE\_CHANGED| {   deviceType: 'desktop' or 'mobile'  }|Issued when the user switches between the desktop editor and mobile editor.  Availability: Since 1.45.0|
|EDIT\_MODE\_CHANGE |{editMode: 'editor'  or 'preview'}|Issued when a user toggles between preview and edit mode in the editor. Availability: Since 1.11.0|
|INSTANCE\_CHANGED|{instance: instanceValue}|Issued when a component in your app called Wix.revalidateSession in the live site. Availability: Since 1.96.0|
|KEY\_DOWN|{charCode:0, keyCode:39}|Issued when the user presses one of these keys on the keyboard: left/right arrows, esc, enter, space bar. Availability: Since 1.76.0  |
|KEY\_UP|{charCode:0, keyCode:39}|Issued when the user presses one of these keys on the keyboard: left/right arrows, esc, enter, space bar. Availability: Since 1.76.0|
|MEMBER\_DETAILS\_UPDATED|For example: `"attributes": {"name": "John Doe", "firstName": "John", "lastName": "Doe", "imageUrl": "https://myImage.jpg", "nickname": "Johnny "}}`|Issued when a member changes their personal details. Availability: Since 1.89.0|
|PAGE\_NAVIGATION|{"toPage": "Page1",  "fromPage": "Page2"}|Issued on any page navigation in the website. Availability: Since 1.25.0|
|PAGE\_NAVIGATION\_IN|{"toPage": "Page1",  "fromPage": "Page2"}|Issued on any page in navigation in the website. This event is a utility event on top of the PAGE\_NAVIGATION event. Availability: Since 1.25.0|
|PAGE\_NAVIGATION\_OUT|{"toPage": "Page1", "fromPage": "Page2"}|Issued on any page out navigation in the website. This event is a utility event on top of the PAGE\_NAVIGATION event. Availability: Since 1.25.0|
|PUBLIC\_DATA\_CHANGED|{   key1: value1   }|Issued when app data is changed using Wix.Data.Public methods. Note that all registered components will get this event. Availability: Since 1.74.0|
|SCROLL|{"scrollTop": 4,  "scrollLeft": 0,  "documentHeight":  724,  "documentWidth":  1227,  "x": 124,  "y": 131,  "height": 682,  "width": 978,  "left": 124.5,  "bottom": 809,  "right": 1102.5,  "top": 127}|Issued when scroll happens inside the site. The event data contains multiple details that helps the app determine its behavior considering its position in the site, the browser window dimensions, and the scrolling state:  *   ScrollTop - site's scroll position on the y axis, *   scrollLeft - site's scroll position on the x axis, *   documentHeight - site's document height, *   documentWidth - site's document width, *   x - app offset within the site's page on the x axis, *   y - app offset within the site's page on the y axis, *   height - app height, *   width - app width, *   left - app top-left offset from the left, *   bottom - app top-left offset from the bottom, *   right - app top-left offset from the right, *   top - app top-left offset from the top. Availability: Since 1.25.0|
|SETTINGS\_UPDATED|Custom json|Issued by the App Settings endpoint when new settings are applied by the user. Availability: Since 1.17.0|
|SITE\_METADATA\_CHANGED|{   title: 'example title',   description: 'example description'  }|Issued when the page metadata (title, description) changes. Availability: Since 1.75.0|
|SITE\_PUBLISHED|{}|Issued when the user publishes the website. Availability: Since 1.13.0|
|SITE\_SAVED|{}  |Issued when the user saves the website. Availability: Since 1.62.0|
|STATE\_CHANGED|{newState: 'state'}|Issued when the website state changed. Read more about the component's state and deep linking [here](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/self-hosting/supported-extensions/deprecated/iframe/deep-linking-for-iframe-page-extensions). Availability: Since 1.29.0|
|STYLE\_PARAMS\_CHANGE|{colors: Object, numbers: Object, booleans: Object, fonts: Object}|Issued when the user changed a color, font, number, or boolean value in your app’s settings panel. Availability: Since 1.22.0|
|THEME\_CHANGE|{fonts: Object, siteTextPresets: Object, siteColors: Array (30 colors of palette), style: Object}|Issued when the user changed the site’s color palette. Availability: Since 1.22.0  |
|WINDOW\_PLACEMENT\_CHANGED|"BOTTOM\_RIGHT"|Issued when the user changed the position of a fixed-position widget. Availability: Since 1.18.0|
```

#### Function 02: currentMember

- Summary: Retrieves the current Site Member, if one exists.

- Syntax:
```javascript
currentMember(callback)
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Retrieves the current Site Member, if one exists.

> **SDK Version**: SDK 1.6.0+         
**Display**: Live Site      
**Components**: Worker  

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function  |Callback function to receive member details  |

**Value passed to callback:**

An object containing the user’s details:

|Name	|Type	|Description|
|---|---|---|
|name|String|Member's name|
|email|String|Member's email|
|id|String|Member's ID|
|owner|Boolean|True if the member is either the site owner or one of the site's contributors|
```

#### Function 03: getSiteInfo

- Summary: Retrieves information about the host site.

- Syntax:
```javascript
getSiteInfo(callback)
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Retrieves information about the host site.

> **SDK Version**: SDK 1.3.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|Callback function to receive the site info |
```

#### Function 04: **Value passed to callback:**

- Summary: An object containing the site info:

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
An object containing the site info:

|Name	|Type	|Description|
|---|---|---|
|baseUrl |String |Base url of the current site, for example: **http**://user.wix.com/site-name, http://www.domain.com|
|pageTitle |String |The page title that is used for SEO. This title includes both the site and page title (e.g., “My Store - Animal Shirt”).  |
|pageTitleOnly|String|The name of the page - without the site title (e.g., “Animal Shirt”).|
|referrer |String |The referrer header of the HTTP request |
|siteDescription|String |The description of the site that is used for SEO |
|siteKeywords|String |The keywords which are related to the site and are used for SEO |
|siteTitle |String |The title of the site that is used for SEO |
|url |String |The URL (taken from the location.href property). The URL includes the internal site state, for example: **http**://user.wixsite.com/site-name/pageTitle http://www.domain.com/pageTitle. Returns the site URL only when using getSiteInfo in the live site and preview mode. When using it in Editor mode, returns the Editor URL. |
```

#### Function 05: getSiteMap

- Summary: Retrieves all items in the site structure, including:

- Syntax:
```javascript
getSiteMap(callback)
```

- Example:
```javascript
Wix.Worker.getSiteMap(function(siteMap) {
    // do something with the site pages
});
```

- Details:
```markdown
Retrieves all items in the site structure, including:

*   **Items in the site’s menu** – pages (including subpages), links, and menu headers.
*   **Hidden pages** – pages that are in the site, but not in the site menu. For example, a “Thank You” page that’s shown only after a site visitor makes a purchase.

> **SDK Version**: SDK 1.81.0+         
**Display**: Live Site, Preview      
**Components**: Worker 

> **Note:**  
Use this method instead of getSitePages, which is now deprecated.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback (required)|Function|Callback function to receive the site structure|

**Value passed to callback**:

An array of objects, where each object represents an item in the site structure.

> **Warning:**  
To use this object later (for example, if you want to navigate to a link on the user’s site), save this object in your database as is – **don’t** change it in any way.

Each object contains data about the item. The data sent depends on the item – check out our examples below.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|type|String|Type of link the item represents - for example ‘PageLink’ or ‘AnchorLink’. The data returned depends on the item - for example, an ‘AnchorLink’ object will include the anchorName and anchorDataId properties. Check out our examples below.|
|pageId|String|The page ID. **Note**: If the user added a page anchor to the site’s menu, then this method returns an object for the anchor - so there might be multiple objects with the same page ID.|
|title|String|The item title|
|hidden|Boolean|Returns true if this page is hidden|
|isHomePage  |Boolean|Returns true if this page is the site's home page|
|url|String|URL of this item|
|subPages|Array \[objects\]|(Page objects only) If the page has subpages, returns an ordered set of subpages. Each subpage object contains more information about the subpage (id, title, hide, isHomePage, url).|

Here’s an example of an array passed to the callback:
```

#### Function 06: isApplicationInstalled

- Summary: Allows you to check if another one of your apps is installed.

- Syntax:
```javascript
isApplicationInstalled(appDefinitionId, callback)
```

- Example:
```javascript
Wix.Worker.isApplicationInstalled(
    '1380b703-ce81-ff05-f115-39571d94dfcd',
    function(isInstalled){console.log(isInstalled)}
);
```

- Details:
```markdown
Allows you to check if another one of your apps is installed.

> **SDK Version**: SDK 1.87.0+      
**Editor Version**: New Editor      
**Display**: Preview      
**Components**: Worker

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|appDefinitionId (required)|String|App ID, [as specified in the Developers Center](fallback::http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/18095909/appId-dev-center.png)|
|callback (required)|Function|Callback function that receives a boolean indicating if the app is installed in the site: function(isInstalled) {}|
```

#### Function 07: isAppSectionInstalled

- Summary: Allows you to check if the user added one of your app’s hidden or custom pages (like a thank you or checkout page).

- Syntax:
```javascript
isAppSectionInstalled(sectionId,\[options\],callback)
```

- Example:
```javascript
Wix.Worker.isAppSectionInstalled('page_component_id', function(isInstalled) {
    console.log  (isInstalled)
};);
```

- Details:
```markdown
Allows you to check if the user added one of your app’s hidden or custom pages (like a thank you or checkout page).

> **SDK Version**: SDK 1.89.0+      
**Editor Version**: New Editor      
**Display**: Live Site, Preview      
**Components**: Worker

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**sectionId** (required)|String|ID of the Page component, [as specified in the Developers Center](fallback::http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/21171537/Dev_Center_componentId.png)|
|**options**|Object|Options for this method|
|options.**appDefinitionId**|String|If the Page component is in a different one of your apps, enter that app’s ID ([specified in the Developers Center](fallback::http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/18095909/appId-dev-center.png))|
|**callback** (required)|Function|Callback function that receives a boolean indicating if the Page component is installed in the site: function(isInstalled) {}|
```

#### Function 08: removeEventListener

- Summary: Allows to remove previously assigned event listeners that were specified using Wix.addEventListener.

- Syntax:
```javascript
removeEventListener (eventName, callBackOrId)
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Allows to remove previously assigned event listeners that were specified using Wix.addEventListener.

> **SDK Version**: SDK 1.25.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)|Wix.Events|Unique event identifier|
|CallBackOrId (required)|Function|A callback function that was used with addEventListener, or an id returned by addEventListener|
```

#### Function 09: Utils.getCurrentConsentPolicy

- Summary: Returns an object containing the user's current policy.

- Syntax:
```javascript
Wix.Worker.Utils.getCurrentConsentPolicy() → Object
```

- Example:
```javascript
var policyDetails = Wix.Worker.Utils.getCurrentConsentPolicy();
if (defaultPolicy.policy.dataToThirdParty) {
  // For example, if true you may be allowed to share data with Facebook. (You must check with your legal team first.)
}
```

- Details:
```markdown
Returns an object containing the user's current policy.

> **SDK Version**: SDK 1.537.0      
**Display**: Live Site  
**Components**: Worker 

> **Important:**  
Use this method in the live site only. Although it works in the Editor/Preview, it will not return the real policy of the user.

**Object Data**:
```

#### Function 10: Utils.getDeviceType

- Summary: Returns a String which represents the current device type: Desktop or Mobile.

- Syntax:
```javascript
Utils.getDeviceType( ) → String
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Returns a String which represents the current device type: Desktop or Mobile.

> **SDK Version**: SDK 1.30.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker
```

#### Function 11: Utils.getInstanceId

- Summary: Returns a String which represents the app instance ID.

- Syntax:
```javascript
Utils.getInstanceId( ) → String
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Returns a String which represents the app instance ID.

> **SDK Version**: SDK 1.30.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker
```

#### Function 12: Utils.getIpAndPort

- Summary: Returns a String which represents the app IP and port.

- Syntax:
```javascript
Utils.getIpAndPort( ) → String
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Returns a String which represents the app IP and port.

> **SDK Version**: SDK 1.30.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker
```

#### Function 13: Utils.getViewMode

- Summary: Returns a String which represents the current view mode.

- Syntax:
```javascript
Utils.getViewMode( ) → String
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Returns a String which represents the current view mode.

> SDK Version: SDK 1.30.0+      
Editor Version: New Editor, Old Editor      
Display: Live Site, Preview      
Components: Worker
```

#### Function 14: Utils.navigateToSection

- Summary: Navigates to your page component – either to the page component itself or to one of your app’s internal pages.

- Syntax:
```javascript
Utils.navigateToSection(options, onFailure)
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Navigates to your page component – either to the page component itself or to one of your app’s internal pages.

> **SDK Version**: SDK 1.95.0+      
**Editor Version**: New Editor      
**Display**: Live Site, Preview      
**Components**: Worker

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|**options** (required)|Object|ID of the page component to navigate to, as well as optional parameters for this method|
|options.**sectionId**  (required)|String|ID of the page component, [as specified in the Developers Center](fallback::http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/21171537/Dev_Center_componentId.png)  |
|options.**appDefinitionId** |String|If navigating to a page component in a different app, enter that app’s ID ([specified in the Developers Center](fallback::http://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/06/18095909/appId-dev-center.png))|
|options.**queryParams**|Object|Query parameters to add to the page URL when navigating to it, in key value pairs. For example: {param1:value1, param2:value2,...}. These query params are included in the iframe URL (e.g., ?param1=value1&param2=value2).|
|options.**state**|String|The new app's state to push into the editor history stack|
|options.**shouldRefreshIframe**|Boolean|Indicates if the app iframe should be refreshed when navigating to the page. Default value is true. When queryParams are defined, shouldRefreshIframealways defaults to true.|
|options.**noTransition**|Boolean|Indicates if there should be a transition when navigating to the page. Default value is false.|
|**onFailure** (required)|Function |This will be called if the hosting site does not include the section app, or if the caller's application does not include a section|
```

#### Function 15: Utils.onConsentPolicyChanged

- Summary: Retrieves the user's new policy.

- Syntax:
```javascript
Wix.Worker.Utils.onConsentPolicyChanged(callback)
```

- Example:
```javascript
Wix.Worker.Utils.onConsentPolicyChanged((data)=> {
      console.log(data);
});
// will log something with the following structure:
{
  "defaultPolicy": false,
  "policy": {
    "functional": false,
    "analytics": false,
    "advertising": false,
    "dataToThirdParty": false,
    "essential": true
  },
  "createdDate": "2020-04-03T21:00:00.000Z"
}
```

- Details:
```markdown
Retrieves the user's new policy. 

> **SDK Version**: SDK 1.537.0          
**Display**: Live Site      
**Components**: Worker 

> **Important:**  
Use this method in the live site only. Although it may work in the Editor/Preview, it will not give you real data.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|callback|function|Callback function to receive the new policy|
```

#### Function 16: PubSub.publish

- Summary: Broadcasts an event to other Site components of a multicomponent app. If the components span multiple pages, they will be notified when they are rendered.

- Syntax:
```javascript
PubSub.publish(eventName, data, isPersistent)
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Broadcasts an event to other Site components of a multicomponent app. If the components span multiple pages, they will be notified when they are rendered.

> **SDK Version**: SDK 1.30.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)String|The name of the event to publish|
|data (required)|Object|The object to send to subscribers for this event type|
|isPersistent (required)|Boolean |Indicates whether this event is persisted for event subscribers who have not yet subscribed|
```

#### Function 17: PubSub.subscribe

- Summary: Subscribes to events from other components of a multicomponent app. If the components span multiple pages, they will be notified once they are rendered. It is also possible to receive all notifications prior to rendering by specifying a flag when subscribing to events. If the flag is set, the component will be notified immediately of any prior events of the type it is registered to receive.

- Syntax:
```javascript
PubSub.unbscribe(eventName, callBack, receivePastEvents)
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Subscribes to events from other components of a multicomponent app. If the components span multiple pages, they will be notified once they are rendered. It is also possible to receive all notifications prior to rendering by specifying a flag when subscribing to events. If the flag is set, the component will be notified immediately of any prior events of the type it is registered to receive.

> **SDK Version**: SDK 1.30.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required)|String |The name of the event to subscribe to|
|callBack (required)|Function|Function that will respond to events sent from other components of the broadcasting app. it will be given the event object itself and the source of the event|
|receivePastEvents|Boolean|A flag to indicate that all past instances of the registered event should be sent to registered listener. This will happen immediately upon registration|
```

#### Function 18: PubSub.unsubscribe

- Summary: Unsubscribes from receiving further events. The id from the initial subscribe call is used to unsubscribe from further notifications.

- Syntax:
```javascript
PubSub.unsubscribe(eventName, function)
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Unsubscribes from receiving further events. The id from the initial subscribe call is used to unsubscribe from further notifications.

> **SDK Version**: SDK 1.30.0+      
**Editor Version**: New Editor, Old Editor      
**Display**: Live Site, Preview      
**Components**: Worker

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|eventName (required) |String |The name of the event to unsubscribe from|
|function (required) |Function |The function that will respond to events sent from other extensions of the broadcasting app. it will be given the event object itself and the source of the event|

# Deprecated
```

#### Function 19: getSitePages

- Summary: Now that this method is deprecated, use the [getSiteMap](fallback::#getsitemap) method instead.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
> **SDK Version**: Deprecated    

> **Note:**  
Now that this method is deprecated, use the [getSiteMap](fallback::#getsitemap) method instead.

Retrieves all pages in this site. A page can be:

*   An item in the site’s menu – a page, subpage, external link, link to a page anchor, or menu header.
*   A hidden page/subpage – these pages are part of the site, but they’re not part of the site menu. For example, a “Thank You” page that’s shown only after a site visitor makes a purchase.

**Parameters**:

|Name	|Type	|Description|
|---|---|---|
|options|Object|Options for this method|
|callback (required)|Function|A callback function to receive the site structure|

**Value passed to callback**:

An array of objects, where each object represents a page in the site.

The objects are ordered according to the site’s structure shown in the Pages menu of the Wix Editor. If a page has subpages, they are passed as an array of objects nested _inside_ the page object.

Each page/subpage object contains the following properties:

|Name	|Type	|Description|
|---|---|---|
|id|String|The page/subpage ID. If the user added a page anchor to the site’s menu, then this method returns an object for the anchor - so there might be multiple objects with the same page ID | 
|title|String|The title of the page/subpage|
|hide|Boolean|Returns true if this page/subpage is hidden|
|isHomePage|Boolean|Returns true if this page/subpage is the site's home page|
|subPages|Array \[objects\]|(Page objects only) If the page has subPages, returns an ordered set of subpages. Each subpage object contains more information about the subpage (id, title, hide, isHomePage, url).|
```

---

## DOC-16: About WixHive

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/introduction

### Document Intro
```markdown
The WixHive platform allows you to communicate with other apps installed on the website and to work as part of a full solution.

WixHive has two core objects, Contact and Activity, which are described below. All apps installed on the user’s site share Activities and Contacts, and WixHive enables these apps to communicate with each other to share object data.

### Contact

A contact is a person relevant to the user’s business, either a site visitor who has performed a meaningful interaction within the site or a person who has been added directly by the user.

### Activity

An activity is a visitor’s interaction with the site, such as filling out a contact form, making a purchase, or sharing a page from the site on social media. Activities are tracked by a visitor’s email, phone, or cookies. If a site visitor is a contact, you will be able to link between the contact and its activities.
```

### Sections and Functions
#### Function 01: How it Works

- Summary: The WixHive collects information from the user’s website or business, including contacts and activities. This information is saved in the scope of a website, and every component installed in that website should report all data it collects. Using the information collected by the website, allows you to enhance your app capabilities.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
The WixHive collects information from the user’s website or business, including contacts and activities. This information is saved in the scope of a website, and every component installed in that website should report all data it collects. Using the information collected by the website, allows you to enhance your app capabilities.

The WixHive allows you to post and get activities and contacts information, accessible from the HTTP API and the JavaScript SDK.
```

#### Function 02: Implementation

- Summary: Once we approve your mockups and you’re in the development stage, you can start implementing the WixHive.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Once we approve your mockups and you’re in the development stage, you can start implementing the WixHive.

Here’s how:

1.  **Understand how to use the WixHive.** Read more about our Contacts and Activities. We’ll explain how and when to use the SDK and HTTP API for WixHive requests.
2.  **Let us know what you’re using the WixHive for**. Request permissions to use the WixHive:
    1.  In your app’s page in the Dev Center, go to the **WixHive API** tab.  
        **Note**: You’ll only see this tab once your mockups were approved. You won’t see this tab in test apps or if you’re in the proposal/mockup review stages.
    2.  Under **Select WixHive Permissions**, check the WixHive operations that are relevant for you app.  
    3.  Explain how these operations are relevant for your app.  
        **Note**: Before you submit your app, all methods are available for you to use – except for getContacts and getContactById. (If you need these two methods to test a feature in your app, [let us know](fallback::https://www.wix.com/support-chatbot?nodeId=25a57397-ccf7-4376-8b74-48d51edf7159&referral=devRels).) After you submit, we’ll review your WixHive permission request and approve the relevant permissions.
3.  **Learn about signing your requests. **This is needed when sending requests via the HTTP API only.
4.  (Optional) **You can get webhooks about new activities and contacts in the site**. [Register in the Dev Center](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/api-integrations/events-and-webhooks/about-webhooks) to receive contact and activity webhooks.
```

---

## DOC-17: About WixHive

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/introduction

### Document Intro
```markdown
The WixHive platform allows you to communicate with other apps installed on the website and to work as part of a full solution.

WixHive has two core objects, Contact and Activity, which are described below. All apps installed on the user’s site share Activities and Contacts, and WixHive enables these apps to communicate with each other to share object data.

### Contact

A contact is a person relevant to the user’s business, either a site visitor who has performed a meaningful interaction within the site or a person who has been added directly by the user.

### Activity

An activity is a visitor’s interaction with the site, such as filling out a contact form, making a purchase, or sharing a page from the site on social media. Activities are tracked by a visitor’s email, phone, or cookies. If a site visitor is a contact, you will be able to link between the contact and its activities.
```

### Sections and Functions
#### Function 01: How it Works

- Summary: The WixHive collects information from the user’s website or business, including contacts and activities. This information is saved in the scope of a website, and every component installed in that website should report all data it collects. Using the information collected by the website, allows you to enhance your app capabilities.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
The WixHive collects information from the user’s website or business, including contacts and activities. This information is saved in the scope of a website, and every component installed in that website should report all data it collects. Using the information collected by the website, allows you to enhance your app capabilities.

The WixHive allows you to post and get activities and contacts information, accessible from the HTTP API and the JavaScript SDK.
```

#### Function 02: Implementation

- Summary: Once we approve your mockups and you’re in the development stage, you can start implementing the WixHive.

- Syntax:
```text
Not provided in source section.
```

- Example:
```text
Not provided in source section.
```

- Details:
```markdown
Once we approve your mockups and you’re in the development stage, you can start implementing the WixHive.

Here’s how:

1.  **Understand how to use the WixHive.** Read more about our Contacts and Activities. We’ll explain how and when to use the SDK and HTTP API for WixHive requests.
2.  **Let us know what you’re using the WixHive for**. Request permissions to use the WixHive:
    1.  In your app’s page in the Dev Center, go to the **WixHive API** tab.  
        **Note**: You’ll only see this tab once your mockups were approved. You won’t see this tab in test apps or if you’re in the proposal/mockup review stages.
    2.  Under **Select WixHive Permissions**, check the WixHive operations that are relevant for you app.  
    3.  Explain how these operations are relevant for your app.  
        **Note**: Before you submit your app, all methods are available for you to use – except for getContacts and getContactById. (If you need these two methods to test a feature in your app, [let us know](fallback::https://www.wix.com/support-chatbot?nodeId=25a57397-ccf7-4376-8b74-48d51edf7159&referral=devRels).) After you submit, we’ll review your WixHive permission request and approve the relevant permissions.
3.  **Learn about signing your requests. **This is needed when sending requests via the HTTP API only.
4.  (Optional) **You can get webhooks about new activities and contacts in the site**. [Register in the Dev Center](fallback::https://dev.wix.com/docs/build-apps/develop-your-app/api-integrations/events-and-webhooks/about-webhooks) to receive contact and activity webhooks.
```

---

## DOC-18: Activities

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities

### Document Intro
```markdown
Apps in Wix work together by sharing information about site visitor activity. An activity is a visitor’s interaction with the site, such as filling out a contact form, making a purchase, or sharing a page from the site on social media.

You’ll use the WixHive to request information that’s useful for your app, and also post information that your app collects.

Activities are tracked by a visitor’s email, phone, or cookie. If a site visitor is a contact, you will be able to link between the contact and its activities.

Read more about the different activity types and their schemas below.
```

### Sections and Functions
#### Function 01: How it Works

- Summary: When you register your app in the dev center, you can sign up to receive or post Activities about different events that happens within the website, according to your product needs.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
var activity = {
    type:Wix.Activities.Type.FORM_CONTACT_FORM,
    info:{ subject:"My Subject", content:{message:"My Message"}},
    details:{ additionalInfoUrl:'http://www.wix.com/my-account/app/{app-def-id}/{instance-id}/{app-related-deep-link}',  summary:""},
    contactUpdate:{ name:{first:"Kanye"}, emails:[{tag:"main",email:"email@email.com"}]}
};

var onSuccess = function(d){console.log("Activity ID: " + d.activityId + ", Contact ID: " + d.contactId)};
var onFailure = function(d){console.log("Failure message:" + d)};
Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.FORM_SUBSCRIPTION_FORM,
    info: {additionalFields:[{name:"newsletterType", value:"Fitness"}]},
    details:{additionalInfoUrl:"http://www.wix.com/my-account/app/{app-def-id}/{instance-id}/{app-related-deep-link",  summary:''},
    contactUpdate:{"name":{first:"firstName", middle:"middleName", last:"lastName"}, emails:[{tag:"main",  email:"email@gmail.com"}]}
};

var onSuccess = function(d){console.log("Activity ID: " + d.activityId + ", Contact ID: " + d.contactId)};
var onFailure = function(d){console.log("Failure message:" + d)};
Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.FORM_FORM,
    info:{type:"SURVEY", fields:[{name:"vegan",value:"yes"}]},
    details:{additionalInfoUrl:"http://www.wix.com/my-account/app/{app-def-id}/{instance-id}/{app-related-deep-link}",  summary:""},
    contactUpdate:{name:{first:"Kanye"}, emails:[{tag:"main", email:"email@email.com"}]}
};

var onSuccess = function(d){console.log("Activity ID: " + d.activityId + ", Contact ID: " + d.contactId)};
var onFailure = function(d){console.log("Failure message:" + d)};
Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.SCHEDULER_CANCEL,
    info: { appointmentId: '455',
    source:'GUEST',
    cancelDate: '2013-07-01T08:07:40.802Z',
    refund: {kind: 'FULL', total: 100, currency:'USD'},
    title: 'AppointmentTitle',
    description: 'AppointmentDescription',
    infoLink: 'LinkToAppointment',
    price: {price: 100, formattedPrice:'Price', currency:'USD'},
    location: {address: 'address', city: 'NY', country: 'USA'},
    time: {start:'2013-07-01T08:07:40.802Z', end:'2013-07-01T08:07:40.802Z', timezone:'US Eastern Standard Time'},
    attendees: [{contactId:'ID', name: {first:'firstName', middle:'middleName', last:'lastName'}, phone: 'phoneNumber',  email: 'email@gmail.com'}]},
    details:{additionalInfoUrl:null, summary:''},
    contactUpdate:{"name":{first:"firstName", middle:"middleName", last:"lastName"}, emails:[{tag:"main",   email:"email@gmail.com"}]}
};

Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.SOCIAL_COMMENT,
    info: { text: 'social text',
    channel:'FACEBOOK',
    metadata: [{name:'metadata name', value: 'meta data value'}],
    commenter:{openId:{channel:'FACEBOOK'},name:{first:'firstName', middle:'middleName',    last:'lastName'},email:'email@gmail.com'},
    details:{additionalInfoUrl:null, summary:'testing social activity'},
    contactUpdate:{"name":{first:"firstName", middle:"middleName", last:"lastName"}, emails:[{tag:"main",  email:"email@gmail.com"}]}
};

var onSuccess = function(d){console.log("Activity ID: " + d.activityId + ", Contact ID: " + d.contactId)};
var onFailure = function(d){console.log("Failure message:" + d)};
Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.HOTELS_PURCHASE,
    info: { reservationId: '455', guests:{ total: 1, adults: 1, children: 0},stay: { checkin: new Date(new Date().getTime() - (60 * 60 * 24)), checkout: new Date().toISOString() },rates:[{ date: new Date(new Date().getTime() - (60 * 60 * 24)), subtotal: 22.4, taxes: [ {name: 'stuff', total: 0.6, currency: 'USD'} ], total: 30, currency: 'USD'}],payment: {total: '1', subtotal: '1', currency: 'EUR', source: 'Cash'},customer: {contactId: '123', isGuest:true, name:{ prefix: 'Mr',first: 'Kanye', middle: 'k', last:'West', suffix:'The king'},phone: '1234567',email:'email@email.com'} , rooms:[{ id: 'single123',   beds: [ {kind:'king'} ], maxOccupancy: 3, amenities: [ 'air conditioning', 'wifi', 'cable', 'goats']}] },
    details:{additionalInfoUrl:null, summary:''},
    contactUpdate:{"name":{first:"firstName", middle:"middleName", last:"lastName"}, emails:[{tag:"main",  email:"email@gmail.com"}]}
}

Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.HOTELS_PURCHASE_FAILED,
    info: { reservationId: '455', guests:{ total: 1, adults: 1, children: 0},stay: { checkin: new Date(new Date().getTime() - (60 * 60 * 24)), checkout: new Date().toISOString() },rates:[{ date: new Date(new Date().getTime() - (60 * 60 * 24)), subtotal: 22.4, taxes: [ {name: 'stuff', total: 0.6, currency: 'USD'} ], total: 30, currency: 'USD'}],payment: {total: '1', subtotal: '1', currency: 'EUR', source: 'Cash', error:{errorCode:'123', reason:'out of date'} },customer: {contactId: '123', isGuest:true, name:{ prefix: 'Mr',first: 'Kanye', middle: 'k', last:'West', suffix:'The king'},phone: '1234567',email:'email@email.com'} , rooms:[{ id: 'single123', beds: [ {kind:'king'} ], maxOccupancy: 3, amenities: [ 'air   conditioning', 'wifi', 'cable', 'goats']}] },
    details:{additionalInfoUrl:null, summary:''},
    contactUpdate:{"name":{first:"firstName", middle:"middleName", last:"lastName"}, emails:[{tag:"main",  email:"email@gmail.com"}]}
}

Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.HOTELS_CANCEL,
    info: {cancelDate: new Date().toISOString() ,refund: {kind:'FULL', total:100, currency:'USD', notes:'too expensive', destination:'Tel Aviv'} ,reservationId: '455', guests:{ total: 1, adults: 1, children: 0},stay: { checkin: new Date(new Date().getTime() - (60 * 60 * 24)), checkout: new Date().toISOString() },rates:[{ date: new Date(new Date().getTime() - (60 * 60 * 24)), subtotal: 22.4, taxes: [ {name: 'stuff', total: 0.6, currency: 'USD'} ], total: 30, currency: 'USD'}], invoice:{subtotal: 20, total:30, currency:"UDS"},customer: {contactId: '123', isGuest:true, name:{ prefix: 'Mr',first: 'Kanye', middle: 'k', last:'West', suffix:'The king'},phone: '1234567',email:'email@email.com'} , rooms:[{ id: 'single123', beds: [ {kind:'king'} ], maxOccupancy: 3, amenities: [ 'air conditioning', 'wifi', 'cable', 'goats']}] },
    details:{additionalInfoUrl:null, summary:''},
    contactUpdate:{"name":{first:"firstName", middle:"middleName", last:"lastName"}, emails:[{tag:"main", email:"email@gmail.com"}]}
}

Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.TRACK_SHARE,
    info: { track:{name: 'Stronger', id:'123'}, album: {name:'Graduation', id:'123'}, artist:{name:'Kanye West', id:'123'},sharedTo:'FACEBOOK'},
    details:{additionalInfoUrl:null, summary:''},
    contactUpdate:{}
}

Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.ALBUM_SHARE,
    info: {album: {name:'Graduation', id:'123'}, artist:{name:'Kanye West', id:'123'}, sharedTo:'FACEBOOK',
    details:{additionalInfoUrl:null, summary:''},
    contactUpdate:{}
}

Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type:Wix.Activities.Type.ECOMMERCE_PURCHASE,
    info:{
        cartId:'123', storeId:'123', storeName:'Wix', orderId:'123', 
        items:[{ 
            id: 1, type:'PHYSICAL', sku: 'sky', title: 'title',
            quantity: 1, price: '1', formattedPrice: '1.1',
            currency: 'EUR', productLink: 'link', weight: '1',
            formattedWeight: '1.0KG', media: {thumbnail: 'PIC'},
            categories: ['shirt','clothing','wix'],
            metadata: [ {name: "item", value: "1"} ],
            variants: [{title: 'title', value: '1'}]
        }],
        payment:{
            total: '1', subtotal: '1', formattedTotal: '1.0', formattedSubtotal: '1.0', currency: 'EUR', 
            coupon: {total: '1', title: 'Dis'}, tax: {total: 1, formattedTotal: 1}, 
            shipping: {total: 1, formattedTotal: 1}},
            billingAddress: {
                firstName: 'Wix' , lastName: 'Cool',
                email: 'wix@example.com', phone: '12345566',
                city: 'Bitola', address1: 'Marshal Tito', address2: 'Marshal Tito',
                region: 'Bitola', regionCode: '7000',
                country: 'USA', countryCode: 'US',
                zip: '7000',
                company: 'Wix.com'
            }, 
            paymentGateway: 'PAYPAL',
            note: 'Note',
            buyerAcceptsMarketing: true 
        },
        details:{additionalInfoUrl:null, summary:''},
        contactUpdate:{"name":{first:"firstName", middle:"middleName", last:"lastName"}, emails:[{tag:"main", email:"email@gmail.com"}]}
}

Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type: Wix.Activities.Type.MESSAGE_IM,
    info: { type:'CHAT', content:  [{ direction: 'CUSTOMER_TO_BUSINESS', time: '2016-09-15T15:53:00', message: 'test    message', media:    [{name:'image',contentType:'image',url:'http://static.wixstatic.com/media/3cd1de924697419088c1e033bb3384ef.jpg'}] }]},
    details:{additionalInfoUrl:'http://www.wix.com/my-account/app/{app-def-id}/{instance-id}/{app-related-deep-link}',      summary:""},
    contactUpdate:null
};

var onSuccess = function(d){console.log("Activity ID: " + d.activityId + ", Contact ID: " + d.contactId)};
var onFailure = function(d){console.log("Failure message:" + d)};
Wix.Activities.postActivity(activity, onSuccess, onFailure);
```
```javascript
var activity = {
    type: Wix.Activities.Type.EVENTS_RSVP,
    info: {
        eventId: '123456789123456789123456789123456789',
        eventTitle: 'my appointment',
        price: {
            price: '1',
            currency: 'USD',
            formattedPrice: '$1.00'
        },
        location: {
            address: '123 meep st.',
        },
        time: {
            start: new Date().toISOString(),
            end: new Date(new Date().getTime() + (60 * 60 * 24)).toISOString(),
            timeZone: 'ET'
        }
    },
    contactUpdate: {
        "name": {
            first: "firstName",
            middle: "middleName",
            last: "lastName"
        },
        emails: [{
            tag: "main",
            email: "email@gmail.com"
        }]
    }
}

Wix.Activities.postActivity(activity, function(res) { console.log(res) }, function(err) { console.log(err) });
```

- Details:
```markdown
When you register your app in the dev center, you can sign up to receive or post Activities about different events that happens within the website, according to your product needs.

*   **Post** an activity to report about events that occurred within your app.
*   **Get** an activity when it was reported to trigger an action within your app.

### Post Activity

When posting an Activity to Wix, make sure the data conforms to the specific schema for that type of Activity, so that other apps know what to expect when receiving it. Each type of Activity has its own schema, represented in JSON schema format.

Activities are connected to a session, which is a cookie stored in the site visitor’s browser. This means that when you (or another app) post Activities from the same browser session, they are all linked to the same site visitor. If the site visitor is a Contact, all Activities connected to this session are linked to the Contact, even Activities posted before the Contact was created.

####  How to Post an Activity

Use the Wix.Activities.postActivity SDK method.

You can see the full list of parameters in the method documentation, but here’s a quick look at the most important parameters:

*   activity.Info: Build this object using the correct activity schema.  Refer to the [list of activities and their schemas](fallback::#activity-schemas).  
*   contactUpdate: Add any information your app has about the site visitor (such as email, phone, or name) in the contactUpdate object. This object links the Activity to a Contact.
*   details.additionalInfoUrl: When an important activity is posted, we display a notification in the site’s dashboard. Users can click on this notification to see more information about the activity, so define this URL when you post the activity. (Check out the section below – “What happens in the site’s dashboard when you post an activity” for more details.)

**What happens in your app when you post the activity**

Once you post the activity, you’ll receive the Activity ID immediately. If you used the contactUpdate object, we’ll check if the contact exists for this browser session:

*   If a contact already exists for this session, we’ll add the new information you provided to this contact and send you the contact ID.
*   If this contact doesn’t exist yet, we’ll create a new contact and send you its ID. All activities connected to this specific session will be linked to the new contact.

**What happens in the site’s dashboard when you post an activity**

You can use the points below as a quick check to make sure you implemented the WixHive correctly.

If you provided the site visitor’s email/phone number when you posted the activity, we’ll link the activity to a contact and show the new information to users. Here’s what users will see in the site’s dashboard – and what you should see when testing the WixHive in your app:

*   **A notification for important activities:** Users can click on this notification to see more information about the activity. You can direct users to a URL with more information – use the additionalInfoUrl parameter in the [postActivity](fallback::#post-activity) method.  
    We display notifications for these activities:
    *   Form activities (contact-form, subscription-form, form)
    *   Scheduler appointment activity
    *   eCommerce purchase activity
    *   Hotels reservation activity
    *   Social track activity

> **Note**: 
If you think it’s important for us to notify users about an activity posted by your app, [let us know](fallback::https://www.wix.com/support-chatbot?nodeId=25a57397-ccf7-4376-8b74-48d51edf7159&referral=devRels)!  

*   **A new message in the Wix Engage app:** Users can see important activities that happened in their site – whether it’s done by an existing contact or an anonymous site visitor. (You can see the full list of important activities, above.)

*   **New information about site visitors:** When users go to the contact’s page, they can see the activity you posted, as well as any new information you sent about the contact. If the site visitor is a new contact, users will see the new contact in the contacts section of the dashboard.  
    (You’ll add this information in the contactUpdate parameter in the [postActivity](fallback::#post-activity) method.)  
    ![](https://d2wzpmhzgtb9fu.cloudfront.net/docs/wp-content/uploads/2016/07/21174251/wixhive-contacts.png)

>**Note:** 
Activities that are not linked to a Contact will not be visible to users.

### Get Activity

When you register your app, you can sign up to receive immediate notification when an Activity occurs. These events will be delivered to your app via webhooks and will include the Activity ID. To get the Activity data use the HTTP API or the JavaScript SDK with the relevant Activity ID.

There will be times when your app needs to get a list of Activities that have already occurred on a site. In such cases, you can request these Activities through our JavaScript SDK or through our HTTP API, as shown below.

You can use parameters to filter your search:

*   Use the from and until parameters to retrieve Activities by creation time.
*   Set the scope parameter to app to get Activities that were created by your app. Set the scope parameter to site to get Activities that were created by all apps on a site. Default is site.
*   Use the activityTypes parameter to filter by the type of Activity.

**NODEJS**

**RUBY**

### Activity Schemas

The activities listed below can be posted by your application to report about events that occurred within your app.

### Forms

Use the following activities for form events in your app:

*   **Contact-Form:** when your app submits a contact form.
*   **Subscription-Form:** when your app submits a subscription from.
*   **Form**: when your app submits another type of form, like a survey.

You’ll add the site visitor’s details (name, email, etc) in the contactUpdate object, and not in the form activity itself (see more information on [posting an activity](fallback::#post-activity)). So there’s no need to post form fields that ask for these details.

#### Contact-Form

|Name	|Type	|Description|
|---|---|---|
|**subject**| Array\[object\]|Subject the site visitor entered in the contact form|
|**content** (required)|Object| Content the site visitor entered in the contact form|
|content.**message**|String|Message text |
|content.**media**|Array|Media (for example, images the site visitor uploaded to the message)|
|**additionalFields**| Array\[object\]| More details submitted in the form|
|additionalFields.**name**|String|Key name|
|additionalFields.**value**|String|Key value|

Get the [Contact-Form Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/form/contact-form.json).

#### Subscription-Form

|Name	|Type	|Description|
|---|---|---|
|**additionalFields**| Array\[object\]| More details submitted in the form|
|additionalFields.**name**|String|Key name|
|additionalFields.**value**|String|Key value|

Get the [Subscription-Form Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/form/subscription-form.json).

#### Form

|Name	|Type	|Description|
|---|---|---|
|type|"CUSTOMER\_SATISFACTION", "SURVEY", "EVENT\_REGISTRATION", "ORDER", "DONATION", "QUIZ", "OTHER"| Type of form submitted: *   CUSTOMER\_SATISFACTION: Form to give feedback. *   SURVEY: Form for a general survey. *   EVENT\_REGISTRATION: Form to register for an event. *   ORDER: Form to place an order. *   DONATION: Form to make a donation. *   QUIZ: Form to answer general questions. *   OTHER: Any other type of form that's not listed here.|
| fields| Array\[object\]|Fields in the form|
|name|String|Key name|
|value|String|Key value|

Get the [Form activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/form/form.json).

### Scheduler

Use the following activities for scheduling events that occur in your app:

*   **Appointment**: when an appointment is made.
*   **Cancel**: when an appointment is cancelled.
*   **Confirmation**: when an appointment is confirmed.

#### Appointment and Confirmation

|Property	|Type	|Description|
|---|---|---|
|**appointmentId** (recommended)|String|The unique identifier of a scheduled appointment|
|**source** (required)|"GUEST" or "STAFF" |Indicates who booked/confirmed the appointment|
|**title** (required)|String|Appointment's title |
|**description** (required)|String|Appointment's description|
|**infoLink**|String|URL for more details about the appointment|
|**price**|Object|Appointment’s price|
|price.**price** (required)|Number|Price amount|
|price.**formattedPrice**|String|Price format (i.e, €0,99 or $0.99)|
|price.**currency** (required)|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|**location**|Object|Appointment's location|
|location.**address**|String|Address|
|location.**city**|String|City|
|location.**region**|String|Region|
|location.**postalCode**|String|Postal Code|
|location.**country**|String|Country|
|location.**url**|String|Location URL|
|**time**|Object|Appointment’s scheduled time|
|time.**start** (required)|DateTime|Scheduled start time|
|time.**end** (required)|DateTime|Scheduled end time|
|time.**end** (required)|String|Scheduled time zone|
|**attendees**|Array\[object\]|Appointment's attendees|
|attendees.**contactId**|String|Attendee's contact ID|
|attendees.**name**|Object|Attendee's name|
|attendees.name.**prefix**|String|Name prefix|
|attendees.name.**first**|String|First name|
|attendees.name.**middle**|String|Middle name|
|attendees.name.**last**|String|Last name|
|attendees.name.**suffix**|String|Name suffix|
|attendees.**phone**|String|Attendee's phone|
|attendees.**email**|String|Attendee's email|
|attendees.**notes**|String|Attendee's notes (like allergies or other restrictions)|
|attendees.**self**|Boolean|True if the Wix user who scheduled the appointment will attend|

Get the [Appointment Activity](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/scheduler/appointment.json) and the [Confirmation Activity](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/scheduler/confirmation.json) JSONs.

**APPOINTMENT**

**CONFIRMATION**

#### Cancel

|Property	|Type	|Description|
|---|---|---|
|**appointmentId** (recommended)|String|The unique identifier of a scheduled appointment|
|**source** (required)|"GUEST" or "STAFF" |Indicates who cancelled the appointment|
|**cancelDate** (required)|DateTime|Reservation cancel date|
|**refund** (required)|Object|Refund details|
|refund.**kind** (required)|"FULL", "PARTIAL", or "NONE"|Type of refund|
|refund.**total** (required)|Number|Total amount to refund|
|refund.**currency** (required)|String|Refund [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|refund.**notes**|String|Notes about this refund|
|refund.**destination** (required)|String|Refund's destination (credit card, cash, etc)|
|**title** (required)|String|Appointment's title |
|**description** (required)|String|Appointment's description|
|**infoLink**|String|URL for more details about the appointment|
|**price**|Object|Appointment’s price|
|price.**price** (required)|Number|Price amount|
|price.**formattedPrice**|String|Price format (i.e, €0,99 or $0.99)|
|price.**currency** (required)|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|**location**|Object|Appointment's location|
|location.**address**|String|Address|
|location.**city**|String|City|
|location.**region**|String|Region|
|location.**postalCode**|String|Postal Code|
|location.**country**|String|Country|
|location.**url**|String|Location URL|
|**time**|Object|Appointment’s scheduled time|
|time.**start** (required)|DateTime|Scheduled start time|
|time.**end** (required)|DateTime|Scheduled end time|
|time.**timeZone** (required)|String|Scheduled time zone|
|**attendees**|Array\[object\]|Appointment's attendees|
|attendees.**contactId**|String|Attendee's contact ID|
|attendees.**name**|Object|Attendee's name|
|attendees.name.**prefix**|String|Name prefix|
|attendees.name.**first**|String|First name|
|attendees.name.**middle**|String|Middle name|
|attendees.name.**last**|String|Last name|
|attendees.name.**suffix**|String|Name suffix|
|attendees.**phone**|String|Attendee's phone|
|attendees.**email**|String|Attendee's email|
|attendees.**notes**|String|Attendee's notes (like allergies or other restrictions)|
|attendees.**self**|Boolean|True if the Wix user who scheduled the appointment will attend|

Get the [Cancel Appointment Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/scheduler/cancel.json).

### Social

Use the following activities to track social actions that occur in your app – for example, when a site visitor comments on the site, likes an Instagram photo, or posts a comment through Facebook:

*   **Comment**: when a site visitor posts a comment on the site – whether the comment is posted on the site only, or also posted to the visitor’s social media page through a plugin on the site.
*   **Share-url**: when a site visitor shares an item (like a blog post or photo) on social media.
*   **Track**: when a site visitor takes one of these social media actions on the user’s channel: like, follow, subscribe, pin.

#### Comment

|Property	|Type	|Description|
|---|---|---|
|**text** (required)|String|Comment text|
|**channel** (required)|"SITE", "FACEBOOK", "TWITTER", "LINKEDIN", "GOOGLE\_PLUS", "PINTEREST", "INSTAGRAM", "TUMBLR", "BLOGGER", "WORDPRESS", or "OTHER"|Where the comment was posted. SITE refers to the Wix site|
|**metadata**|Array\[object\]|Additional information about the comment|
|metadata.**name** (required)|String|Metadata property name|
|metadata.**value** (required)|String|Metadata value|
|**commenter**|Object|Details about the site visitor who made the comment|
|commenter.**openId**|Object|How the site visitor was authenticated. Read more about [openId](fallback::https://openid.net/developers/how-connect-works/).|
|commenter.openId.**channel** (required)|"FACEBOOK", "TWITTER", "LINKEDIN", "GOOGLE\_PLUS", "PINTEREST", "INSTAGRAM", "TUMBLR", "BLOGGER", "WORDPRESS", or "OTHER"|Account used to authenticate the site visitor|
|commenter.**name**|Object|Site visitor's name|
|commenter.name.**prefix**|String|Name prefix|
|commenter.name.**first**|String|First name|
|commenter.name.**middle**|String|Middle name|
|commenter.name.**last**|String|Last name|
|commenter.name.**suffix**|String|Name suffix|
|commenter.**email**|String|Site visitor's email|

Get the [Comment Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/social/comment.json).

### Share-url

|Property	|Type	|Description|
|---|---|---|
|**channel** (required)|"FACEBOOK", "TWITTER", "LINKEDIN", "GOOGLE\_PLUS", "PINTEREST", "INSTAGRAM", "TUMBLR", "BLOGGER", "WORDPRESS", "SITE" or "OTHER"|Where the link was shared|
|**itemInfo** (required)|Object|Details about the item or page the site visitor tracked|
|itemInfo.**itemUrl** (required)|String|URL of the social media item |
|itemInfo.**ItemThumbnail**|String|ImageId of the item's thumbnail image|
|itemInfo.**ItemId** (required)|String|ID of this item|
|itemInfo.**ItemType** (required)|"IMAGE", "VIDEO", "TEXT", "SITE", "ALBUM", or "PAGE"|Type of social media item|

#### Track

|Property	|Type	|Description|
|---|---|---|
|**type** (required)|"LIKE", "FOLLOW", "SUBSCRIBE", "PIN\_IT", "FAVORITE", "LOVE", "STAR", "OTHER"|Social media action taken by the site visitor|
|**channel** (required)|"FACEBOOK", "TWITTER", "LINKEDIN", "GOOGLE\_PLUS", "PINTEREST", "INSTAGRAM", "TUMBLR", "BLOGGER", "WORDPRESS", "SITE" or "OTHER"|Social media channel that contains the item the site visitor tracked|
|**itemInfo** (required)|Object|Details about the item or page the site visitor tracked|
|itemInfo.**itemUrl** (required)|String|URL of the social media item |
|itemInfo.**ItemThumbnail**|String|ImageId of the item's thumbnail image|
|itemInfo.**ItemId** (required)|String|ID of this item|
|itemInfo.**ItemType** (required)|"IMAGE", "VIDEO", "TEXT", "SITE", "ALBUM", or "PAGE"|Type of social media item|

### Hotels

Use the following activities for hospitality events in your app:

*   **Purchase:** When a site visitor purchases a service offered by the hotel.
*   **Purchase-Failed:** When the purchase of a hotel service could not be completed.
*   **Reservation:** When a site visitor reserves a hotel room.
*   **Confirmation:** When a reservation is confirmed.
*   **Cancel:** When a reservation is canceled.

### Purchase
|Property	|Type	|Description|
|---|---|---|
|**reservationId**|String|Reservation ID|
|**guests** (required)|Object|Guests details|
|guests.**total** (required)|Number|Number of guests|
|guests.**adults** (required)|Number|Number of adult guests|
|guests.**children** (required)|Number|Number of child guests|
|**stay** (required)|Object|Stay dates|
|stay.**checkin** (required)|DateTime|Checkin date|
|stay.**checkout** (required)|DateTime|Checkout date|
|**rates** (required)|Array\[object\]|Rate details|
|rates.**date** (required)|DateTime|Rate date|
|rates.**subtotal** (required)|Number|Subtotal amount (without taxes)|
|rates.**taxes** (required)|Array\[object\]|Tax details|
|rates.taxes.**name** (required)|String|Tax name (occupancy tax, resort fee, etc)|
|rates.taxes.**total** (required)|Number|Tax total amount|
|rates.taxes.**currency** (required)|String|Tax [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|rates.**total** (required)|Number|Total amount|
|rates.**currency** (required)|String|Rate [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|**payment** (required)|Object|Payment details|
|payment.**subtotal** (required)|Number|Payment subtotal|
|payment.**total** (required)|Number|Payment total|
|payment.**currency** (required)|String|Payment [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|payment.**source** (required)|String  |Payment method (cash, credit, paypal, etc)|
|**customer**|Object|Customer details|
|customer.**contactId**|String|Customer’s contact ID|
|customer.**isGuest**|Boolean|true if the customer a returning guest|
|customer.**name**|Object|Customer's name|
|customer.name.**prefix**|String|Name prefix|
|customer.name.**first**|String|First name|
|customer.name.**middle**|String|Middle name|
|customer.name.**last**|String|Last name|
|customer.name.**suffix**|String|Name suffix|
|customer.**phone**|String|Customer's phone number|
|customer.**email**|String|Customer's email|
|**rooms** (required)| Array\[object\]|Room details|
|rooms.**id**|String|Room ID|
|rooms.**beds** (required)|Array\[object\]|Room's bed list|
|**kind** (required)|String|Type of bed|
|kind.**maxOccupancy** (required)|Number|Room's occupancy number|
|kind.**amenities** (required)|Array\[string\]|List of amenities reserved|

Get the [Purchase Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/hotels/purchase.json).

**Purchase-failed**

|Property	|Type	|Description|
|---|---|---|
|**reservationId**|String|Reservation ID|
|**guests** (required)|Object|Guests details|
|guests.**total** (required)|Number|Number of guests|
|guests.**adults** (required)|Number|Number of adult guests|
|guests.**children** (required)|Number|Number of child guests|
|**stay** (required)|Object|Stay dates|
|stay.**checkin** (required)|DateTime|Checkin date|
|stay.**checkout** (required)|DateTime|Checkout date|
|**rates** (required)|Array\[object\]|Rate details|
|rates.**date** (required)|DateTime|Rate date|
|rates.**subtotal** (required)|Number|Subtotal amount (without taxes)|
|rates.**taxes** (required)|Array\[object\]|Tax details|
|rates.taxes.**name** (required)|String|Tax name (occupancy tax, resort fee, etc)|
|rates.taxes.**total** (required)|Number|Tax total amount|
|rates.taxes.**currency** (required)|String|Tax [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|rates.**total** (required)|Number|Total amount|
|rates.**currency** (required)|String|Rate [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|**payment** (required)|Object|Payment details|
|payment.**subtotal** (required)|Number|Payment subtotal|
|payment.**total** (required)|Number|Payment total|
|payment.**currency** (required)|String|Payment [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|payment.**source** (required)|String  |Payment method (cash, credit, paypal, etc)|
|payment.**error**|Object|Details for payment error|
|payment.error.**errorCode**|Number|Error code|
|payment.error.**reason**|String|Reason why the payment failed|
|**customer**|Object|Customer details|
|customer.**contactId**|String|Customer’s contact ID|
|customer.**isGuest**|Boolean|true if the customer a returning guest|
|customer.**name**|Object|Customer's name|
|customer.name.**prefix**|String|Name prefix|
|customer.name.**first**|String|First name|
|customer.name.**middle**|String|Middle name|
|customer.name.**last**|String|Last name|
|customer.name.**suffix**|String|Name suffix|
|customer.**phone**|String|Customer's phone number|
|customer.**email**|String|Customer's email|
|**rooms** (required)| Array\[object\]|Room details|
|rooms.**id**|String|Room ID|
|rooms.**beds** (required)|Array\[object\]|Room's bed list|
|**kind** (required)|String|Type of bed|
|kind.**maxOccupancy** (required)|Number|Room's occupancy number|
|kind.**amenities** (required)|Array\[string\]|List of amenities reserved|

Get the [Purchased-Failed Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/hotels/purchase-failed.json).

**Example:**

#### Confirmation and Reservation

|Property	|Type	|Description|
|---|---|---|
|**source** (required)|"GUEST" or "STAFF"|Indicates who confirmed/reserved the room.|
|**reservationId**|String|Reservation ID|
|**guests** (required)|Object|Guests details|
|guests.**total** (required)|Number|Number of guests|
|guests.**adults** (required)|Number|Number of adult guests|
|guests.**children** (required)|Number|Number of child guests|
|**stay** (required)|Object|Stay dates|
|stay.**checkin** (required)|DateTime|Checkin date|
|stay.**checkout** (required)|DateTime|Checkout date|
|**rates** (required)|Array\[object\]|Rate details|
|rates.**date** (required)|DateTime|Rate date|
|rates.**subtotal** (required)|Number|Subtotal amount (without taxes)|
|rates.**taxes** (required)|Array\[object\]|Tax details|
|rates.taxes.**name** (required)|String|Tax name (occupancy tax, resort fee, etc)|
|rates.taxes.**total** (required)|Number|Tax total amount|
|rates.taxes.**currency** (required)|String|Tax [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|rates.**total** (required)|Number|Total amount|
|rates.**currency** (required)|String|Rate [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|**invoice** (required)|Object|Reservation invoice details|
|invoice.**subtotal** (required)|Number|Invoice subtotal|
|invoice.**total** (required)|Number|Invoice total|
|invoice.**currency** (required)|String|Invoice [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|**customer**|Object|Customer details|
|customer.**contactId**|String|Customer’s contact ID|
|customer.**isGuest**|Boolean|true if the customer a returning guest|
|customer.**name**|Object|Customer's name|
|customer.name.**prefix**|String|Name prefix|
|customer.name.**first**|String|First name|
|customer.name.**middle**|String|Middle name|
|customer.name.**last**|String|Last name|
|customer.name.**suffix**|String|Name suffix|
|customer.**phone**|String|Customer's phone number|
|customer.**email**|String|Customer's email|
|**rooms** (required)| Array\[object\]|Room details|
|rooms.**id**|String|Room ID|
|rooms.**beds** (required)|Array\[object\]|Room's bed list|
|**kind** (required)|String|Type of bed|
|kind.**maxOccupancy** (required)|Number|Room's occupancy number|
|kind.**amenities** (required)|Array\[string\]|List of amenities reserved|

Get the [Confirmation](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/hotels/confirmation.json) and the [Reservation](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/hotels/reservation.json) Activity JSON.

**RESERVATION**

**CONFIRMATION**

#### Cancel

|Property	|Type	|Description|
|---|---|---|
|**cancelDate** (required)|DateTime|Reservation cancel date|
|**refund** (required)|Object|Refund details|
|refund.**kind** (required)|"FULL", "PARTIAL", or "NONE"|Type of refund|
|refund.**total** (required)|Number|Total amount to refund|
|refund.**currency** (required)|String|Refund [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|refund.**notes**|String|Notes about this refund|
|refund.**destination** (required)|String|Refund's destination (credit card, cash, etc)|
|**reservationId**|String|Reservation ID|
|**guests** (required)|Object|Guests details|
|guests.**total** (required)|Number|Number of guests|
|guests.**adults** (required)|Number|Number of adult guests|
|guests.**children** (required)|Number|Number of child guests|
|**stay** (required)|Object|Stay dates|
|stay.**checkin** (required)|DateTime|Checkin date|
|stay.**checkout** (required)|DateTime|Checkout date|
|**rates** (required)|Array\[object\]|Rate details|
|rates.**date** (required)|DateTime|Rate date|
|rates.**subtotal** (required)|Number|Subtotal amount (without taxes)|
|rates.**taxes** (required)|Array\[object\]|Tax details|
|rates.taxes.**name** (required)|String|Tax name (occupancy tax, resort fee, etc)|
|rates.taxes.**total** (required)|Number|Tax total amount|
|rates.taxes.**currency** (required)|String|Tax [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|rates.**total** (required)|Number|Total amount|
|rates.**currency** (required)|String|Rate [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|**invoice** (required)|Object|Reservation invoice details|
|invoice.**subtotal** (required)|Number|Invoice subtotal|
|invoice.**total** (required)|Number|Invoice total|
|invoice.**currency** (required)|String|Invoice [currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|**customer**|Object|Customer details|
|customer.**contactId**|String|Customer’s contact ID|
|customer.**isGuest**|Boolean|true if the customer a returning guest|
|customer.**name**|Object|Customer's name|
|customer.name.**prefix**|String|Name prefix|
|customer.name.**first**|String|First name|
|customer.name.**middle**|String|Middle name|
|customer.name.**last**|String|Last name|
|customer.name.**suffix**|String|Name suffix|
|customer.**phone**|String|Customer's phone number|
|customer.**email**|String|Customer's email|
|**rooms** (required)| Array\[object\]|Room details|
|rooms.**id**|String|Room ID|
|rooms.**beds** (required)|Array\[object\]|Room's bed list|
|**kind** (required)|String|Type of bed|
|kind.**maxOccupancy** (required)|Number|Room's occupancy number|
|kind.**amenities** (required)|Array\[string\]|List of amenities reserved|

Get the [Cancel Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/hotels/cancel.json).

**Example:**

### Music

Use the following activities for music events in your app:

*   **Track-Play:** When a request to start playing a song is made
*   **Track-Skip:** When a track was skipped
*   **Track-Played:** When a song has completed its run
*   **Track-Lyrics:** When the track lyrics are requested
*   **Track-Share:** When a track is shared using the app
*   **Album-Share:** When an album is shared through your app
*   **Album-Fan:** When a visitor becomes a fan of an album
*   **Album-Played:** When an album has completed its run

#### Track-Play, Track-Skip, Track-Played, and Track-Lyrics

|Property	|Type	|Description|
|---|---|---|
|**track** (required)|Object|Track details|
|track.**name** (required)|String|Track name|
|track.**id**|String|Track ID|
|**album** (required)|Object|Album details|
|album.**name** (required)|String|Album name|
|album.**id**|String|Album ID|
|**artist**|Object|Artist details|
|artist.**name** (required)|String|Artist name|
|artist.**id**|String|Artist ID|

Get the [Track-Play](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/music/track-play.json), [Track-Skip](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/music/track-skipped.json), [Track-Played](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/music/track-played.json), and [Track-Lyrics](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/music/track-lyrics.json) Activity JSON.

**TRACK-PLAY**

**TRACK-SKIP**

**TRACK-PLAYED**

**TRACK-LYRICS**

### Track-Share

|Property	|Type	|Description|
|---|---|---|
|**track** (required)|Object|Track details|
|track.**name** (required)|String|Track name|
|track.**id**|String|Track ID|
|**album** (required)|Object|Album details|
|album.**name** (required)|String|Album name|
|album.**id**|String|Album ID|
|**artist**|Object|Artist details|
|artist.**name** (required)|String|Artist name|
|artist.**id**|String|Artist ID|
|**sharedTo** (required)|"FACEBOOK", "GOOGLE\_PLUS", "TWITTER", "BLOGGER", or "TUMBLR"| Where item was shared|

Get the [Track-Share Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/music/track-share.json).

**Example:**

#### Album-Share

|Property	|Type	|Description|
|---|---|---|
|**album** (required)|Object|Album details|
|album.**name** (required)|String|Album name|
|album.**id**|String|Album ID|
|**artist**|Object|Artist details|
|artist.**name** (required)|String|Artist name|
|artist.**id**|String|Artist ID|
|**sharedTo** (required)|"FACEBOOK", "GOOGLE\_PLUS", "TWITTER", "BLOGGER", or "TUMBLR"| Where item was shared|

Get the [Album-Share Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/music/album-share.json).

**Example:**

### Album-Fan and Album-Played
|	|	||
|---|---|---|
|**album** (required)|Object|Album details|
|album.**name** (required)|String|Album name|
|album.**id**|String|Album ID|
|**artist**|Object|Artist details  |
|artist.**name** (required)|String|Artist name|
|artist.**id**|String|Artist ID|

Get the [Album-Fan](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/in-development/schemas/music/album-fan.json) and the [Album-Played](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/in-development/schemas/music/album-played.json) Activity JSON.

**ALBUM-FAN**

**ALBUM-PLAYED**

### eCommerce

Use the following activities for eCommerce events in your app:

*   **Cart-add**: An item was added to the cart.
*   **Cart-remove**: An item was removed from the cart.
*   **Cart-abandon**: A cart with these items was abandoned.
*   **Cart-checkout**: A checkout process has begun with this cart.
*   **Purchase**: The checkout process has completed.

> **Note:**
Does your app rely on getting eCommerce activities that happened in the site? Keep in mind that Wix’s eCommerce app, WixStores, currently posts only the **purchase** activity.

#### Cart-add and Cart-remove

|Property|Type|Description|  
|---|---|---|   
|**cartId** (required)|String|Cart ID|  
|**storeId** (required)|String|Store ID  |  
|**storeName**|String|Name of store|  
|**item** (required)|Array\[object\]|Item added/removed from cart|  
|item.**id** (required)|String|Item ID|  
|item.**type**|"PHYSICAL" or "DIGITAL"|Item type|  
|item.**sku**|String|Item SKU number|  
|item.**title** (required)|String|Item's title|  
|item.**quantity** (required)|Integer|Item's quantity|  
|item**.**price**|Number|Item's price|  
|item.**formattedPrice**|String|Price format (i.e, €0,99 or $0.99)|  
|item.**currency** (required)|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|  
|item.**productLink** |String|Item's link|  
|item.**weight**|Number|Item's weight|  
|item.**formattedWeight**|String|Weight format|  
|item.**media**|Object|Media details for this item (like a photo)|  
|item.media.**thumbnail**|String|Link to the thumbnail |  
|item.**variants** (required)|Array\[object\]|Item's variants (like a specific color or size)|  
|item.variants.**title** (required)|String|Variant title|  
|item.variants.**value**|String|Variant value|  
|item.**categories**|Array\[string\]|Item's categories (such as shirt, summer sale, etc.)|  
|item.**metadata**|Array\[object\]|Additional information about this item|  
|item.metadata.**name** (required)|String|Metadata name|  
|item.metadata.**value** (required)|String|Metadata value|  

Get the [Cart-add JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/e_commerce/cart-add.json) and the [Cart-remove JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/e_commerce/cart-remove.json).

**CART-ADD**

**CART-REMOVE**

### Cart-abandon and Cart-checkout

|Property	|Type	|Description|  
|---|---|---|   
|**cartId** (required)|String|Cart ID|  
|**storeId** (required)|String|Store ID  |  
|**storeName**|String|Name of store|  
|**items** (required)|Array\[object\]|Items in cart|  
|items.**id** (required)|String|Item ID|  
|items.**type**|"PHYSICAL" or "DIGITAL"|Item type|  
|items.**sku**|String|Item SKU number|  
|items.**title** (required)|String|Item's title|  
|items.**quantity** (required)|Integer|Item's quantity|  
|items**.**price**|Number|Item's price|  
|items.**formattedPrice**|String|Price format (i.e, €0,99 or $0.99)|  
|items.**currency** (required)|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|  
|items.**productLink** |String|Item's link|  
|items.**weight**|Number|Item's weight|  
|items.**formattedWeight**|String|Weight format|  
|items.**media**|Object|Media details for this item (like a photo)|  
|items.media.**thumbnail**|String|Link to the thumbnail |  
|items.**variants** (required)|Array\[object\]|Item's variants (like a specific color or size)|  
|items.variants.**title** (required)|String|Variant title|  
|items.variants.**value**|String|Variant value|  
|items.**categories**|Array\[string\]|Item's categories (such as shirt, summer sale, etc.)|  
|items.**metadata**|Array\[object\]|Additional information about this item|  
|items.metadata.**name** (required)|String|Metadata name|  
|items.metadata.**value** (required)|String|Metadata value|  

Get the [Cart-abandon JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/e_commerce/cart-abandon.json) and the [Cart-checkout JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/e_commerce/cart-checkout.json).

**CART-CHECKOUT**

**CART-ABANDON**

#### Purchase

|Property	|Type	|Description|  
|---|---|---|   
|**cartId** (required)|String|Cart ID|  
|**storeId** (required)|String|Store ID|  
|**storeName**|String|Name of store|  
|**orderId** (recommended)|String|Order ID|  
|**items** (required)|Array\[object\]|Purchased items|  
|items.**id** (required)|String|Item ID|  
|items.**type**|"PHYSICAL" or "DIGITAL"|Item type|  
|items.**sku**|String|Item SKU number|  
|items.**title** (required)|String|Item's title|  
|items.**quantity** (required)|Integer|Item's quantity|  
|items**.**price**|Number|Item's price|  
|items.**formattedPrice**|String|Price format (i.e, €0,99 or $0.99)|  
|items.**currency** (required)|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|  
|items.**productLink** |String|Item's link|  
|items.**weight**|Number|Item's weight|  
|items.**formattedWeight**|String|Weight format|  
|items.**media**|Object|Media details for this item (like a photo)|  
|items.media.**thumbnail**|String|Link to the thumbnail |  
|items.**variants** (required)|Array\[object\]|Item's variants (like a specific color or size)|  
|items.variants.**title** (required)|String|Variant title|  
|items.variants.**value**|String|Variant value|  
|items.**categories**|Array\[string\]|Item's categories (such as shirt, summer sale, etc.)|  
|items.**metadata**|Array\[object\]|Additional information about this item|  
|items.metadata.**name** (required)|String|Metadata name|  
|items.metadata.**value** (required)|String|Metadata value|  
|**payment** (required)|Object|Payment details|  
|payment.**total** (required)|Number|Payment total|  
|payment.**subTotal** (required)|Number|Payment subtotal|  
|payment.**formattedTotal**|String|Formatted total|  
|payment.**formattedSubTotal**|String|Formatted subtotal|  
|payment.**currency** (required)|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|  
|payment.**coupon**|Object|Coupon details|  
|payment.coupon.**total** (required)|Number|Amount the coupon deducted from the total price|  
|payment.coupon.**FormattedTotal**|String|Formatted coupon total|  
|payment.coupon.**title** (required)|String|Coupon title|  
|payment.**tax**|Object|Payment's tax details|  
|payment.tax.**total** (required)|Number|Tax total|  
|payment.tax.**formattedTotal**|String|Formatted tax total|  
|payment.**shipping**|Object|Shipping details|  
|payment.shipping.**total** (required)|Number|Shipping total|  
|payment.shipping.**formattedTotal**|String|Formatted shipping total|  
|**shippingAddress**|Object|Shipping address details|  
|shippingAddress.**firstName**|String|Recipient's first name|  
|shippingAddress.**lastName**|String|Recipient's last name|  
|shippingAddress.**email**|String|Recipient's email|  
|shippingAddress.**phone**|String|Recipient's phone|  
|shippingAddress.**country**|String|Recipient's country|  
|shippingAddress.**countryCode**|String|Recipient's country code|  
|shippingAddress.**region**|String|Recipient's region|  
|shippingAddress.**regionCode**|String|Recipient's region code|  
|shippingAddress.**city**|String|Recipient's city|  
|shippingAddress.**address1**|String|Recipient's address|
|shippingAddress.**address2**|String|Recipient's address, part 2|
|shippingAddress.**zip**|String|Recipient's postal code|
|shippingAddress.**company**|String|Recipient's company|
|**billingAddress**|Object|Billing address details|
|billingAddress.**firstName**|String|Buyer's first name|
|billingAddress.**lastName**|String|Buyer's last name|
|billingAddress.**email**|String|Buyer's email|
|billingAddress.**phone**|String|Buyer's phone|
|billingAddress.**country**|String|Buyer's country|
|billingAddress.**countryCode**|String|Buyer's country code|
|billingAddress.**region**|String|Buyer's region|
|billingAddress.**regionCode**|String|Buyer's region code|
|billingAddress.**city**|String|Buyer's city|
|billingAddress.**address1**|String|Buyer's address|
|billingAddress.**address2**|String|Buyer's address, part 2|
|billingAddress.**zip**|String|Buyer's postal code|
|billingAddress.**company**|String|Buyer's company|
|**paymentGateway**|String|Payment gateway name|
|**note**|String|Notes about the purchase|
|**buyerAcceptsMarketing**|Boolean|True if the buyer opts to receive marketing emails from the vendor|

Get the [Purchase Activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/e_commerce/purchase.json).

### Messaging

Use the following activity for chat and other messaging events in your app:

*   **im**: when a chat/sms message is sent between a Wix user and a site visitor/contact.

**im**

|Property	|Type	|Description|
|---|---|---|
|**type** (required)|‘chat’ or ‘sms’|Type of message: *   chat - message sent to /received from the user’s site. *   sms - message sent to / received from the user’s mobile phone|
|**content** (required)|Array\[objects\]|Information about the message|
|content.**direction** (required)|‘BUSINESS\_TO\_CUSTOMER’, ‘CUSTOMER\_TO\_BUSINESS’|Message direction: *   BUSINESS\_TO\_CUSTOMER - the Wix user sent an message to the site visitor/contact. *   CUSTOMER\_TO\_BUSINESS - the Wix user received an message from a site visitor/contact|
|content.**time** (required)|DateTime|Time the message was sent, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|content.**message** (required)|String|Message text|
|content.**media** (required)|Array\[objects\]|Information about any media files sent in the message|
|content.media.**name** (required)|String|Name of the media file|
|content.media.**contentType** (required)|String|Type of media file, i.e: image, video, document|
|content.media.**url** (required)|String|URL of the media file|
|**threadId**|String|A ID for the conversation, to identify all messages that are part of this thread|
|**metadata**|Array\[objects\]|Additional information about the chat|
|**name** (required)|String|Metadata property name|
|**value** (required)|String|Metadata value|

Get the [im activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/messaging/im.json).

### Events

Use the RSVP activity for RSVPs to events created by Wix users (like conferences, webinars, or parties).

**RSVP**

|Property	|Type	|Description|
|---|---|---|
|**eventId** (required)|String|ID of the event|
|**eventTitle** (required)|String|Name of the event|
|**eventDescription**|String|Event description|
|**totalNumberAttendees**|Number|How many guests will attend the event|
|**price**|Object  |Details about the event’s price|
|price.**price** (required)|Number|Price|
|price.**currency** (required)|String|[Currency code](fallback::http://en.wikipedia.org/wiki/ISO_4217) (i.e, EUR, USD, CAD)|
|price.**formattedPrice**|String|Price format (i.e, €0,99 or $0.99)|
|**location**|Object|Location of the event|
|location.**name**|String|Location name|
|location.**address** (required)|String|Location address|
|**time**|Object|The date & time of the event|
|time.**start** (required)|Datetime|Scheduled start time|
|time.**end**|Datetime|Scheduled end time|
|time.**timeZone** (required)|String|Time zone|

Get the [rsvp activity JSON](fallback::http://github.com/wix/wix-hive-activity-schemas/blob/master/schemas/events/rsvp.json).

# Deprecated

*   The EVENTS\_EVENT\_UPDATE activity is now deprecated. Use the updated [RSVP](fallback::#events) activity instead.
*   The CONTACT\_CONTACT\_FORM activity is deprecated. Use the updated [contact-form](fallback::#contact-form) activity or our new [form](fallback::#form) activity (for other types of forms), instead.
*   The CONTACT\_SUBSCRIPTION\_FORM activity is now deprecated. Use the updated [subscription-form](fallback::#subscription-form) activity instead.
*   The SEND\_MESSAGE activity is deprecated. Use the [IM](fallback::#messaging) activity instead.
```

---

## DOC-19: Using the HTTP API

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api

### Document Intro
```markdown
The HTTP API allows you to send and receive requests from your server to Wix.

### How it Works:

Every call to the HTTP API shares a common entry point: openapi.wix.com/v1

To enable Wix to identify the site and application calling the HTTP API, all HTTP calls must be authenticated. Wix uses an [HMAC](http://en.wikipedia.org/wiki/HMAC) scheme and requires HTTPS to ensure the integrity and authenticity of each request.

When issuing a HTTP request, your request must be signed with your secret key, and include the request parameters either as query parameters or as headers.

### Request Parameters

|Header	|Description|
|---|---|
|x-wix-application-id	|App ID|
|x-wix-instance-id	|App Instance ID: the unique ID per user per site|
|x-wix-timestamp|	Timestamp in UTC format ([ISO 8601](http://en.wikipedia.org/wiki/ISO_8601)); for example, 2013-07-01T08:07:40.802Z. Valid for one minute only|
|x-wix-signature	|[HMACSHA-256 signature](http://en.wikipedia.org/wiki/SHA-2), generated using the app secret key and the request headers|

### Signature

Every call is sent with a digital signature in the x-wix-signature header, for authentication purposes.

To encode the signature:

1.  Sort all request parameters by parameter name (in ascending alphanumeric order) and concatenate their values with only a line break (n) as a separator. The request parameters include the following:  
    a. [Query parameters](http://en.wikipedia.org/wiki/Query_string), all except for the signature parameter  
    b. All [headers](http://en.wikipedia.org/wiki/HTTP_header) with the prefix x-wix-, except the x-wix-signature header. For multivalue parameters, values should be trimmed and concatenated using a comma (,).
2.  Concatenate, in the following order, and separate by a line break (n)  
    a. HTTP method, converted to uppercase  
    b. HTTP request’s URL path, without the host  
    c. All values from the sorted request parameters (the output of #1)  
    d. The request body
3.  Compute the HMACSHA-256 of the combined information using your app secret key.
4.  Encode the hash to a Base64 string.
5.  Add the signature as the query parameter signature or as the x-wix-signature header.

### Working with Data

For endpoints that return large amounts of data, the HTTP API employs a technique called cursoring to navigate large sets of data. Cursoring separates result data into pages of a fixed size and provides a way to move forwards and backwards through these pages.

For initial calls to APIs that support cursors, it is possible to either omit the cursor parameter or to pass a cursor with the value of -1. Each call to a cursoring-enabled endpoint will return a JSON object that includes a cursor to the previous page, a cursor to the next page and an array containing the data for the current page. If either the next or previous page does not exist, the value of the cursor will be 0.

All cursors are associated with the initial data request and expire within 30 minutes.

**Data cursor**:
```JSON
{
    nextCursor: <cursor>,
    previousCursor: <cursor>,
    results: [
        <<items>>
    ]
}
```
### Errors

All API errors from the HTTP API use standard HTTP error codes, as well as a JSON response containing information relevant to the error.

**Wix API Error Example**

```JSON
{
    errorCode : 400,
    message : "Missing endpoint version number."
}
```

**Standard API Errors**

|HTTP Error Code	|Description	|Area|
|---|---|---|
|400	|Bad request. Authentication credentials may be missing|Authentication|
|400	|Missing endpoint version number|	Versioning|
|403	|Bad authentication credentials |	Authentication|
|404	|Invalid endpoint or version number specified|	Versioning|
|408	|Timestamp expired on the request, please submit again with a fresh signature|	Authentication|
```

### Sections and Functions
- No sections found.

---

## DOC-20: In-App Purchases

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/in-app-purchases

### Document Intro
```markdown
### GET/premium/oneTimePurchases

Returns information about the user’s purchase history.

> **Important:**  
Before using this API endpoint, learn more about how to implement in-app purchases.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|appDefId (required)|String|Header/Query|App ID, as specified in the Developers Center. If you are sending this field through the header: prefix the field value with x-wix-|
|instanceId (required)|String|Header/Query|	The app’s instanceId in this site (a GUID). If you are sending this field through the header: prefix the field value with x-wix-|
|signature (required)|String|Header/Query|The computed signature. If you are sending this field through the header: prefix the field value with x-wix-|
|timestamp (required)|Date|Header/Query| The timestamp, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If you are sending this field through the header: prefix the field value with x-wix-|
|version (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path. Latest version is 1.0.0.|

**Response**:

This endpoint returns an array of objects, where each object is a purchase or upgrade made in your app (for a given instanceId).

|Name	|Type	|Description|
|---|---|---|
|purchaseId|String (UUID)|Unique identifier for this purchase on Wix’s database (used for support, issuing a refund, etc)|
|vendorProductId|String|Name of the in-app product that was purchased|
|datePurchased|Date|Purchase date, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp|

**Response Example**:

```JSON
[ {
    "products": [ {
        “purchaseId” : UUID,
        "vendorProductId": String,
        "datePurchased": Date
    } ]
} ]
```
```

### Sections and Functions
- No sections found.

---

## DOC-21: Contacts

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/contacts

### Document Intro
```markdown
> **Note:**  
Before using these API endpoints, learn more about how to use WixHive contacts in your app.

### GET/contacts

Returns all contacts that are part of the current site, determined by the application-id and instance-id parameters/headers. The results will be returned in cursored form. By default, all Contacts are returned.

**Parameters:**

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|fields|'NAME', 'COMPANY', 'EMAILS', 'PHONES', 'ADDRESSES', 'URLS', 'DATES', 'NOTES', 'CUSTOM','LINKS'  |Query|The Contact fields to return. Multiple fields are separated by a comma, for example: NAME, EMAILS.  System fields (like the contact’s id and ModifiedAt) are always returned.  |
|email|String|Query|The email to search against|
|phone|String|Query|The phone number to search against|
|name.first|String|Query|The first name to search against|
|name.last|String|Query|The last name to search against|
|cursor|String|Query|The semi-optional cursor into the desired data. This cursor will expire after 30 minutes, it should not be cached.|
|pageSize|Integer (1-500)  |Query|The number of results to return per page of data. Defaults to 25.|
|version (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|application-id (required)|String|Query/ Header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|instance-id (required)|String|Query/ Header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|signature (required)|String|Query/ Header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|timestamp (required)|Datetime|Query/ Header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|

**Example:**

```JSON
{
    "method": "GET",
    "url": "https://openapi.wix.com/v1/contacts?version=1.0.0&fields=NAME,PHONES",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T08:17:04.595Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type |Description|
|---|---|---|
|**total**|Number|The total number of Contacts that can be returned|
|**pageSize**|Integer (1-500)  |The number of results returned per cursor|
|**previousCursor**|String|The cursor used to access the previous set of contacts. Returns null if there are no previous results.|
|**nextCursor**|String|The cursor used to access the next set of contacts. Returns null if there are no more results.|
|**results**|Array\[Objects\]|An array of Contact items. Each contact object contains information about the contact.|
|results.**id**|String|Contact's ID|
|results.**name**|Object|Contact's name|
|results.name.**prefix**|String|Name prefix|
|results.name.**first**|String|First name|
|results.name.**middle**|String|Middle name|
|results.name.**last**|String|Last name|
|results.name.**suffix**|String|Name suffix|
|results.**picture**|String|URL of the contact's photo|
|results.**company**|Object|Contact's company details|
|results.company.**role**|String|Contact's role in the company|
|results.company.**name**|String|Contact's company name|
|results.**emails**|Array\[Objects\]|Contact's email addresses|
|results.emails.**id**|Number|ID of this email within the array|
|results.emails.**tag**|String|Tag for this email - home, work, etc|
|results.emails.**email**|String|Email address|
|results.emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|results.emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|results.**phones**|Array\[Objects\]|Contact's phone numbers|
|results.phones.**id**|Number|ID of this phone number within the array|
|results.phones.**tag**|String|Tag for this phone number - home, work, etc|
|results.phones.**phone**|String  |Phone number|
|results.phones.**normalizedPhone**|String|Normalized phone number|
|results.**addresses**|Array\[Objects\]|Contact's addresses|
|results.addresses.**id**|Number|ID of this address within the array|
|results.addresses.**tag**|String|Tag for this address - home, work, etc|
|results.addresses.**address**|String|Street address|
|results.addresses.**neighborhood**|String|Neighborhood|
|results.addresses.**city**|String|City|
|results.addresses.**region**|String|Region, like a U.S state or a province in Canada|
|results.addresses.**country**|String|Country|
|results.addresses.**postalCode**|String|Postal code|
|results.**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|results.urls.**id**|Number  |ID of this URL within the array|
|results.urls.**tag**|String|Tag for this URL - personal, work, etc|
|results.urls.**url**|String|The URL|
|results.**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|results.dates.**id**|Number|ID of this date within the array|
|results.dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|results.dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|results.**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|results.**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|results.links.**href**|String|The href of the operation relevant to this resource|
|results.links.**rel**|String|The relationship of this operation to the returned resource|
|results.**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400| *   Invalid pageSize. Valid values are 25, 50 or 100. *   Invalid or missing cursor. *   Bad authentication credentials. *   Bad request. Authentication credentials may be missing. *   Missing endpoint version number. |
|403|*   Unauthorized. Your app has been removed from the site. *   Unauthorized. Insufficient permissions. |
|404|*   App is not found on site. *   Endpoint version number does not exist.|
|408|Timestamp expired on the request, please submit again with a new timestamp.|
|410|Cursor expired. The cursor is no longer valid. Please query again.|

### GET/contacts/{contactId}

Find a contact referenced by its ID, only relevant for the given site determined by the application-id and instance-id parameters/headers.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|contactId (required)|String|Path|ID of the contact|
|version (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|application-id (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|instance-id (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|signature (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|timestamp (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|

**Example**:

```JSON
{
    "method": "GET",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b?version=1.0.0&fields=NAME,PHONES",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T08:20:35.316Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    }
}
```

**Response**:

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   Bad authentication credentials. *   Bad request. Authentication credentials may be missing. *   Missing endpoint version number. |
|403|*   Unauthorized. Your app has been removed from the site. *   Unauthorized. Insufficient permissions. |
|404|*   Contact not found, or site for instance-id and app-id does not exist.*   App is not found on site. *   Endpoint version number does not exist.|
|408|Timestamp expired on the request, please submit again with a new timestamp.|

### POST/contacts

Version 2.0.0 : Reconciles Contact information with that of the WixHive’s.

Use this when your app has information about a site visitor that may already be registered as a Contact as part of the WixHive. Your app should provide as much information as possible so that we will find the best match for that Contact and return it with the reconciled information. If no match was found, we will create a new Contact.

Depending on the type of information, we will either add or dismiss changes. When the information can be added to a list, such as emails or phones, a new item will be added if no similar item exists. When the information cannot be added we dismiss the change, such is the case with name, company and picture. If your wish is to override such data, there are explicit ways to do so using the Contact’s ID and our HTTP API.

**Parameters:**

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path. Latest version is 2.0.0|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**contactInfo** (required)|Object|Body|The Contact object to reconcile. **Important**: Include at least the email or phone number in your request - we need it to create/update the contact.  |
|contactInfo.**name**|Object|Body|Contact's name|
|contactInfo.name.**prefix**|String|Body|Name prefix |
|contactInfo.name.**first**|String|Body|First name|
|contactInfo.name.**middle**|String|Body|Middle name|
|contactInfo.name.**last**|String|Body|Last name|
|contactInfo.name.**suffix**|String|Body|Name suffix|
|contactInfo.**picture**|String|Body|URL of the contact's photo|
|contactInfo.**company**|Object|Body|Contact's company details|
|contactInfo.company.**role**|String|Body|Contact's role in the company|
|contactInfo.company.**name**|String|Body|Contact's company name|
|contactInfo.**emails**|Array\[Objects\]|Body|Contact's email addresses|
|contactInfo.emails.**tag**|String|Body|Tag for this email - home, work, etc|
|contactInfo.emails.**email**|String|Body|Email address|
|contactInfo.emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|Body|The subscription status of the current email|
|contactInfo.emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Body|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|contactInfo.**phones**|Array\[Objects\]|Body|Contact's phone numbers|
|contactInfo.phones.**tag**|String|Body|Tag for this phone number - home, work, etc|
|contactInfo.phones.**phone**|String  |Body|Phone number|
|contactInfo.**addresses**|Array\[Objects\]|Body|Contact's addresses|
|contactInfo.addresses.**tag**|String|Body|Tag for this address - home, work, etc|
|contactInfo.addresses.**address**|String|Body|Street address|
|contactInfo.addresses.**neighborhood**|String|Body|Neighborhood|
|contactInfo.addresses.**city**|String|Body|City|
|contactInfo.addresses.**region**|String|Body|Region, like a U.S state or a province in Canada|
|contactInfo.addresses.**country**|String|Body|Country|
|contactInfo.addresses.**postalCode**|String|Body|Postal code|
|contactInfo.**urls**|Array\[Objects\]Body||URLs associated with the contact, like Facebook or LinkedIn|
|contactInfo.urls.**tag**|String|Body|Tag for this URL - personal, work, etc|
|contactInfo.urls.**url**|String|Body|The URL|
|contactInfo.**dates**|Array\[Objects\]|Body|Important dates for this Contact, like birthday|
|contactInfo.dates.**tag**|String|Body|Tag for this date - birthday, anniversary, etc|
|contactInfo.dates.**date**|Datetime|Body|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|contactInfo.**notes**|Array\[objects\]  |Body  |Notes associated with this contact|
|contactInfo.notes**content** (required)|String|Body  |The content of the note|
|contactInfo.**custom**|Array\[objects\]|Body  |Custom fields associated with this contact|
|contactInfo.custom.**field** (required)|String|Body  |The name of the custom field|
|contactInfo.custom.**value** (required)|String|Body  |The value of the custom field|

**Example**:

```JSON
{
    "method": "POST",
    "url": "https://openapi.wix.com/v1/contacts?version=2.0.0",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T08:24:27.078Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "emails": [
            {
                "tag": "work",
                "email": "email@work.com",
                "emailStatus": "recurring"
            }
        ]
    }
}
```

**Response**:

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**contact**|Object|The reconciled Contact and its information|
|contact.**id**|String|Contact's ID|
|contact.**name**|Object|Contact's name|
|contact.name.**prefix**|String|Name prefix|
|contact.name.**first**|String|First name|
|contact.name.**middle**|String|Middle name|
|contact.name.**last**|String|Last name|
|contact.name.**suffix**|String|Name suffix|
|contact.**picture**|String|URL of the contact's photo|
|contact.**company**|Object|Contact's company details|
|contact.company.**role**|String|Contact's role in the company|
|contact.company.**name**|String|Contact's company name|
|contact.**emails**|Array\[Objects\]|Contact's email addresses|
|contact.emails.**id**|Number|ID of this email within the array|
|contact.emails.**tag**|String|Tag for this email - home, work, etc|
|contact.emails.**email**|String|Email address|
|contact.emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|contact.emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|contact.**phones**|Array\[Objects\]|Contact's phone numbers|
|contact.phones.**id**|Number|ID of this phone number within the array|
|contact.phones.**tag**|String|Tag for this phone number - home, work, etc|
|contact.phones.**phone**|String  |Phone number|
|contact.phones.**normalizedPhone**|String|Normalized phone number|
|contact.**addresses**|Array\[Objects\]|Contact's addresses|
|contact.addresses.**id**|Number|ID of this address within the array|
|contact.addresses.**tag**|String|Tag for this address - home, work, etc|
|contact.addresses.**address**|String|Street address|
|contact.addresses.**neighborhood**|String|Neighborhood|
|contact.addresses.**city**|String|City|
|contact.addresses.**region**|String|Region, like a U.S state or a province in Canada|
|contact.addresses.**country**|String|Country|
|contact.addresses.**postalCode**|String|Postal code|
|contact.**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|contact.urls.**id**|Number  |ID of this URL within the array|
|contact.urls.**tag**|String|Tag for this URL - personal, work, etc|
|contact.urls.**url**|String|The URL|
|contact.**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|contact.dates.**id**|Number|ID of this date within the array|
|contact.dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|contact.dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|contact.**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|contact.**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|contact.links**href**|String|The href of the operation relevant to this resource|
|contact.links**rel**|String|The relationship of this operation to the returned resource|
|contact.**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**details**|Object|Details about the reconciliation process|
|details.**rejectedData**|Array\[objects\]|Contact information which was rejected during the reconciliation process|
|details.**existingData**|Array\[objects\]|Contact information which was added by the WixHive|
|details.**note**|Object|Notes about the operation|
|details.note.**returnedData**|'COMPLETE' or 'RESTRICTED'|The level of details returned. Your app may receive RESTRICTED details when it does not have sufficient permissions.|
|details.note.**requiredPermissionsForAllData**|Array\[string\]|The permissions missing for your app to receive complete information from the WixHive.|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|200|Found match for Contact information which was supplied. Contact information was merged.|
|201| No match found for Contact information supplied, new Contact created.|
|400| *   Contact data is malformed. *   Contact info must contain at least one phone, email or address. *   Bad authentication credentials. *   Bad request. Authentication credentials may be missing. *   Missing endpoint version number. |
|403|*   Unauthorized. Your app has been removed from the site. *   Unauthorized. Insufficient permissions. |
|404|*   App is not found on site. *   Endpoint version number does not exist.|
|408|Timestamp expired on the request, please submit again with a new timestamp.|


### POST/contacts/{contactId}/address

Adds a tag and address to a given Contact. Note: tags are not unique.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note**: There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**address**|Object|Body| The address to add to the contact|
|address.**tag** (required)|String|Body|Tag for this address - home, work, etc|
|address.**address**|String|Body|Street address|
|address.**neighborhood**|String|Body|Neighborhood|
|address.**city**|String|Body|City|
|address.**region**|String|Body|Region, like a U.S state or a province in Canada|
|address.**country**|String|Body|Country|
|address.**postalCode**|String|Body|Postal code|

**Example:**

```JSON
{
    "method": "POST",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/address?version=1.0.0&modifiedAt=2017-03-26T08:51:41.425Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T08:54:46.991Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "work",
        "address": "500 Terry A Francois",
        "neighborhood": "Awesomeville",
        "city": "San Francisco",
        "region": "CA",
        "country": "USA",
        "postalCode": "94158"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400| *   address information is malformed. *   modifiedAt is missing. |
|404|*   Contact not found. *   Site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current Contact. Please re-fetch the Contact to sync and get the most recent modifiedAt value, then try again.|

### POST/contacts/{contactId}/email

Adds a tag and email to a given Contact. Note: tags are not unique.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note**: There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**email** (required)|Object|Body|The email to add to the contact|
|email.**tag**|String|Body|Tag for this email - home, work, etc|
|email.**email** (required)|String|Body|Email address|
|email.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|Body|The subscription status of the current email|
|email.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Body|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|

**Example**:

```JSON
{
    "method": "POST",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/email?version=1.0.0&modifiedAt=2017-03-26T09:20:12.749Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T09:22:20.191Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "home",
        "email": "ceo@coolCompany.com",
        "emailStatus": "recurring"
    }
}
```

**Response**:

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   email information is malformed. *   modifiedAt is missing |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the contact to sync and get the most recent modifiedAt value, then try again.|

### POST/contacts/{contactId}/phone

Adds a tag and phone number to a given Contact. Note: tags are not unique.

**Parameters:**

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note:** There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.  |
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**phone** (required)|Object|Body|The phone number to add to the contact|
|phone.**tag** (required)|String|Body|Tag for this phone number - home, work, etc|
|phone.**phone** (required)|String  |Body|The contact's raw phone number|

**Example**:

```JSON
{
    "method": "POST",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/phone?version=1.0.0&modifiedAt=2017-03-26T09:20:54.145Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T09:25:29.992Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "home",
        "phone": "+146257182"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   phone number information is malformed. *   modifiedAt is missing. |
|404|*   Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current Contact. Please re-fetch the Contact to sync and get the most recent modifiedAt value, then try again.|

### POST/contacts/{contactId}/url

Adds a tag and url to a given Contact. Note: tags are not unique.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note**: There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**url**  (required)|Object|Body|The URL to add to the contact|
|url.**tag**|String|Body|Tag for this URL - personal, work, etc|
|url.**url**|String|Body|The URL|


**Example**:

```JSON
{
    "method": "POST",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/url?version=1.0.0&modifiedAt=2017-03-26T09:25:30.092Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T09:26:50.576Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "home",
        "url": "http://google.com"
    }
}
```

**Response**:

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   url information is malformed. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current Contact. Please re-fetch the Contact to sync and get the most recent modifiedAt value, then try again.|

### POST/contacts/{contactId}/date

Adds a tag and date to a given Contact. Note: tags are not unique.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note:** There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**date** (required)|Object|Body|The date to add to the contact|
|date.**tag**|String|Body|Tag for this date - birthday, anniversary, etc|
|date.**date** (required)|Datetime|Body|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Example**:

```JSON
{
    "method": "POST",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/date?version=1.0.0&modifiedAt=2017-03-26T09:26:50.687Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T09:28:27.990Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "home",
        "date": "2017-03-26T09:25:30.092Z"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   date information is malformed. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the cntact to sync and get the most recent modifiedAt value, then try again.|

### PUT/contacts/{contactId}/name

Edits name information for the given contact.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note:** There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**name** (required)|Object|Body|The edited name information|
|name.**prefix**|String|Body|Name prefix |
|name.**first**|String|Body|First name|
|name.**middle**|String|Body|Middle name|
|name.**last**|String|Body|Last name|
|name.**suffix**|String|Body|Name suffix|

 **Example**:

```JSON
{
    "method": "PUT",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/name?version=1.0.0&modifiedAt=2017-03-26T09:28:28.060Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T09:30:52.331Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "prefix": "Prof",
        "first": "Henry",
        "last": "Collins"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   name information is malformed. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the cntact to sync and get the most recent modifiedAt value, then try again.|

### PUT/contacts/{contactId}/company

Edits company information for the given contact.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**company** (required)|Object|Body|The edited company information|
|company.**role**|String|Body|Contact's role in the company|
|company.**name**|String|Body|Contact's company name|

**Example**:

```JSON
{
    "method": "PUT",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/company?version=1.0.0&modifiedAt=2017-03-26T09:30:52.464Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T09:32:23.622Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "role": "CEO",
        "name": "Coolness"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors:**

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   company information is malformed. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the cntact to sync and get the most recent modifiedAt value, then try again.|

### PUT/contacts/{contactId}/address/{addressId}

Edits address information for the given Contact. Note: tags are not unique.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**addressId** (required)|String|Path|ID of this address within the array|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note:** There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**address** (required)|Object|The edited address information|
|address.**tag**|String|Body|Tag for this address - home, work, etc|
|address.**address**|String|Body|Street address|
|address.**neighborhood**|String|Body|Neighborhood|
|address.**city**|String|Body|City|
|address.**region**|String|Body|Region, like a U.S state or a province in Canada|
|address.**country**|String|Body|Country|
|address.**postalCode**|String|Body|Postal code|

**Example**:

```JSON
{
    "method": "PUT",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/address/1?version=1.0.0&modifiedAt=2017-03-26T09:32:23.684Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T12:57:00.343Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "Wix NYC Lounge",
        "address": "235 W 23rd St",
        "neighborhood": "Wixville",
        "city": "NYC",
        "region": "NY",
        "country": "USA",
        "postalCode": "10011"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   address information is malformed. *   address id is not found. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the cntact to sync and get the most recent modifiedAt value, then try again.|


### PUT/contacts/{contactId}/email/{emailId}

Edits email information for the given Contact. Note: tags are not unique.

**Parameters:**

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**emailId** (required)|String|Path|ID of the email to edit|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note:** There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**email** (required)|Object|Body |Contact's email address|
|email.**tag**|String|Body |Tag for this email - home, work, etc|
|email.**email** (required)|String|Body |Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|Body |The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Body |Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|

**Example**:

```JSON
{
    "method": "PUT",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/email/1?version=1.0.0&modifiedAt=2017-03-26T12:59:07.487Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T12:59:57.468Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "home",
        "email": "ceo@coolCompany.com",
        "emailStatus": "recurring"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   email information is malformed. *   email id not found. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the cntact to sync and get the most recent modifiedAt value, then try again.|

### PUT/contacts/{contactId}/phone/{phoneId}

Edits phone number information for the given Contact. Note: tags are not unique.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**phoneId** (required)|String|Path|ID of the phone number to edit|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note:** There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**phone** (required)|Object|Body|The edited phone number information|
|phone.**tag** (required)|String|Body|Tag for this phone number - home, work, etc|
|phone.**phone** (required)|String  |Body|Phone number|

**Example**:

```JSON
{
    "method": "PUT",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/phone/1?version=1.0.0&modifiedAt=2017-03-26T12:59:57.549Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T13:01:21.832Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "home",
        "phone": "+146257182"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.


|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|


**Errors:**

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   phone number information is malformed. *   phone number id not found. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the contact to sync and get the most recent modifiedAt value, then try again.|
    
### PUT/contacts/{contactId}/url/{urlId}

Edits url information for the given Contact. Note: tags are not unique.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**urlId** (required)|String|Path|ID of the URL to edit|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note:** There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|version (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**url** (required)|Object|Body|The edited url information|
|url.**tag** (required)|String|Body|Tag for this URL - personal, work, etc|
|url.**url** (required)|String|Body|The URL|


**Example**:

```JSON
{
    "method": "PUT",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/url/1?version=1.0.0&modifiedAt=2017-03-26T13:01:23.155Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T13:02:46.149Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "home",
        "url": "http://google.com"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   url information is malformed. *   url id not found. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the contact to sync and get the most recent modifiedAt value, then try again.|


### PUT/contacts/{contactId}/date/{dateId}

Edits date information for the given Contact. Note: tags are not unique.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**dateId** (required)|String|Path|ID of the date to edit|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**modifiedAt** (required)|Timestamp|Query|The modification time of the Contact as received from Wix, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. **Note:** There may be times where another app makes an update to the same Contact. When that happens the modifiedAt value in our system will be updated and your app will have to re-fetch in order to sync. If your app tries to make an update using an outdated modifiedAt value it will receive an error.|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**date** (required)|Object|Body|The edited date information|
|dates.**tag** (required)|String|Body|Tag for this date - birthday, anniversary, etc|
|dates.**date** (required)|Datetime|Body|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Example:**

```JSON
{
    "method": "PUT",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/date/1?version=1.0.0&modifiedAt=2017-03-26T13:02:46.224Z",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T13:09:01.583Z",
        "x-wix-signature": "MTQ2MmE0_QxNy1lMmExLWM5NWItM2Q2MzhkOTI2OTA0"
    },
    "json": true,
    "body": {
        "tag": "home",
        "date": "2017-03-26T13:02:46.224Z"
    }
}
```

**Response:**

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Contact's ID|
|**name**|Object|Contact's name|
|name.**prefix**|String|Name prefix |
|name.**first**|String|First name|
|name.**middle**|String|Middle name|
|name.**last**|String|Last name|
|name.**suffix**|String|Name suffix|
|**picture**|String|URL of the contact's photo|
|**company**|Object|Contact's company details|
|company.**role**|String|Contact's role in the company|
|company.**name**|String|Contact's company name|
|**emails**|Array\[Objects\]|Contact's email addresses|
|emails.**id**|Number|ID of this email within the array|
|emails.**tag**|String|Tag for this email - home, work, etc|
|emails.**email**|String|Email address|
|emails.**emailStatus**|‘optOut’, ‘transactional’, ‘recurring’|The subscription status of the current email|
|emails.**deliveryStatus**|‘valid’, ‘spam’, ‘complaint’, ‘rejected’, ‘deferral’, ‘bounce’|Email delivery status:*   valid: When emails are delivered successfully. *   spam: When emails are marked as spam by the recipient. *   complaint: When the recipient of the email has made a complaint to the email provider. *   rejected: When the email is rejected by email provider. *   deferral: When your email provider refuses to send emails. *   bounce: When the mailbox is full, email address doesn't exist, etc.|
|**phones**|Array\[Objects\]|Contact's phone numbers|
|phones.**id**|Number|ID of this phone number within the array|
|phones.**tag**|String|Tag for this phone number - home, work, etc|
|phones.**phone**|String  |Phone number|
|phones.**normalizedPhone**|String|Normalized phone number|
|**addresses**|Array\[Objects\]|Contact's addresses|
|addresses.**id**|Number|ID of this address within the array|
|addresses.**tag**|String|Tag for this address - home, work, etc|
|addresses.**address**|String|Street address|
|addresses.**neighborhood**|String|Neighborhood|
|addresses.**city**|String|City|
|addresses.**region**|String|Region, like a U.S state or a province in Canada|
|addresses.**country**|String|Country|
|addresses.**postalCode**|String|Postal code|
|**urls**|Array\[Objects\]|URLs associated with the contact, like Facebook or LinkedIn|
|urls.**id**|Number  |ID of this URL within the array|
|urls.**tag**|String|Tag for this URL - personal, work, etc|
|urls.**url**|String|The URL|
|**dates**|Array\[Objects\]|Important dates for this Contact, like birthday|
|dates.**id**|Number|ID of this date within the array|
|dates.**tag**|String|Tag for this date - birthday, anniversary, etc|
|dates.**date**|Datetime|The date, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**createdAt**|Date|The date this contact was created, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|
|**links**|Array\[Objects\]|An array of [HATEOAS](fallback::http://en.wikipedia.org/wiki/HATEOAS) links to operations applicable to the Contact resource|
|links.**href**|String|The href of the operation relevant to this resource|
|links.**rel**|String|The relationship of this operation to the returned resource|
|**modifiedAt**|Timestamp|Date and time this contact was modified, as an [ISO 8601 timestamp](fallback::http://www.w3.org/TR/NOTE-datetime)|

**Errors**:

Here’s a list of possible errors and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   date information is malformed. *   date id not found. *   modifiedAt is missing. |
|404|Contact not found, or site for instance-id and app-id does not exist.|
|409|There was a conflict updating the current contact. Please re-fetch the contact to sync and get the most recent modifiedAt value, then try again.|
```

### Sections and Functions
- No sections found.

---

## DOC-22: Activities

- Source: https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/activities

### Document Intro
```markdown
> **Note:**  
Before using these API endpoints, learn more about how to use WixHive activities in your app.
```

### Sections and Functions
#### Function 01: GET/activities

- Summary: Activities will be returned in descending order from the most recent Activity. The Activities by default are for the site the application is installed on, determined by the application-id and instance-id parameters/headers. Optionally results can be restricted to activities created by the current application. Results are returned in cursored form, and can be filtered by date ranges.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
{
    "method": "GET",
    "url": "https://openapi.wix.com/v1/activities?version=1.0.0&activityTypes=form/contact-form&until=2017-03-26T13:48:42.220Z&pageSize=10",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T13:53:15.106Z",
        "x-wix-signature": "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMT12"
    }
}
```

- Details:
```markdown
Activities will be returned in descending order from the most recent Activity. The Activities by default are for the site the application is installed on, determined by the application-id and instance-id parameters/headers. Optionally results can be restricted to activities created by the current application. Results are returned in cursored form, and can be filtered by date ranges.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|activityTypes|String|Query|The activity types to filter against. Multiple activity types are seperated by a comma|
|until|Datetime|Query|The ending date for activities we want to return, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. This field is only relevant when a cursor is not present.|
|from|Datetime|Query|The beginning date for activities we want to return, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. This field is only relevant when a cursor is not present.|
|scope|'site', 'app'|Query|The scope of the results to return, either for the entire site or limited to the current application. By default, all activities for the site will be returned  |
|cursor|String|Query|The semi-optional cursor into the desired data. This cursor will expire after 30 minutes, it should not be cached.|
|pageSize|Integer (1-500)|Query|The number of results to return per page of data. Defaults to 25.|
|version (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|application-id (required)|String|Query/ Header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|instance-id (required)|String|Query/ Header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|signature (required)|String|Query/ Header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|timestamp (required)|Datetime|Query/ Header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|

**Response**:

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**pageSize**|Integer (1-500)|Number of results returned per cursor|
|**previousCursor**|String|The cursor used to access the previous set of activities. null will be returned if there are no previous results|
|**nextCursor**|String|The cursor used to access the next set of activities. null will be returned if there are no more results|
|**results**|Array\[Object\]|Array of Activity items|
|results.**id**|String|Activity ID|
|results.**createdAt**|Datetime|Timestamp indicating when this activity was created, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp|
|results.**activityType**|String (see list of [activity types](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities))|Type of activity performed|
|results.**activityLocationUrl**|String|URL where the activity was performed|
|results.**activityDetails**|Object|Relevant information about this activity to display in the Dashboard|
|results.activityDetails.**additionalInfoUrl**|String|URL linking to more specific contextual information about the activity for use in the Dashboard|
|results.activityDetails.**summary**|String|A short description about the activity for use in the Dashboard|
|results.**activityInfo**|Object|Activity specific information related to this type of activity. This field must adhere to the [schema specified by the activity type](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities).|

**Errors**:

Here’s a list of possible error codes and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api#errors).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   Bad request. 'from' and 'until' fields are only valid when a cursor is not present. *   Bad request. Unknown scope parameter value. *   Invalid pageSize. Valid values are 25, 50 or 100. *   Invalid or missing cursor. *   Bad authentication credentials. *   Bad request. Authentication credentials may be missing. *   Missing endpoint version number. |
|403|*   Unauthorized. Your app has been removed from the site. *   Unauthorized. Insufficient permissions.|
|404|*   Activity Type not found. *   App is not found on site. *   Endpoint version number does not exist.|
|408|Timestamp expired on the request, please submit again with a new timestamp.|
|410|Cursor expired. The cursor is no longer valid. Please query again.|
```

#### Function 02: GET/activities/{activityId}

- Summary: Returns an activity referenced by its ID, only relevant for the given site determined by the application-id and instance-id parameters/headers.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
{
    "method": "GET",
    "url": "https://openapi.wix.com/v1/activities/6cbefa98-0345-4f2b-8bb4-a480d3f5008a?version=1.0.0",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T13:59:10.254Z",
        "x-wix-signature": "gMQmr3dQcB1knjd7si5dCEHubWOvEus0PtED3Vida90="
    }
}
```

- Details:
```markdown
Returns an activity referenced by its ID, only relevant for the given site determined by the application-id and instance-id parameters/headers.

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|activityId (required)|String|Path|The activity to get|
|version (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|application-id (required)|String|Query/ Header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|instance-id (required)|String|Query/ Header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|signature (required)|String|Query/ Header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|timestamp (required)|Datetime|Query/ Header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|

**Response**:

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**id**|String|Activity ID|
|**createdAt**|Datetime|Timestamp indicating when this activity was created, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp|
|**activityType**|String (see list of [activity types](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities))|Type of activity performed|
|**activityLocationUrl**|String|URL where the activity was performed|
|**activityDetails**|Object|Relevant information about this activity to display in the Dashboard|
|activityDetails.**additionalInfoUrl**|String|URL linking to more specific contextual information about the activity for use in the Dashboard  |
|activityDetails.**summary**|String|A short description about the activity for use in the Dashboard|
|**activityInfo**|Object|Activity specific information related to this type of activity. This field must adhere to the [schema specified by the activity type](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities).|

**Errors**:

Here’s a list of possible error codes and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api#errors).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   Bad authentication credentials. *   Bad request. Authentication credentials may be missing. *   Missing endpoint version number. |
|403|*   Unauthorized. Your app has been removed from the site. *   Unauthorized. Insufficient permissions.|
|404|*   Activity not found, or site for instance-id and app-id does not exist. *   App is not found on site. *   Endpoint version number does not exist.|
|408|Timestamp expired on the request, please submit again with a new timestamp.|
```

#### Function 03: GET/activities/types

- Summary: Returns a list of Activity types that are currently supported by Wix. Each Activity type has an associated schema that data must conform to when posting Activities to Wix.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
{
    "method": "GET",
    "url": "https://openapi.wix.com/v1/activities/types?version=1.0.0",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T14:00:30.160Z",
        "x-wix-signature": "ieCPqR-O6jrLOI6wjc5Ud-uE-6hye3UU0z9hsVtZlSE="
    }
}
```

- Details:
```markdown
Returns a list of Activity types that are currently supported by Wix. Each Activity type has an associated schema that data must conform to when posting Activities to Wix.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|version (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|application-id (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|instance-id (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|signature (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|timestamp (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|

**Response**:

|Name	|Type	|Description|
|---|---|---|
|types|Array\[String\]|An array of activity types currently supported by Wix|

**Activity types**:

**Errors**:

Here’s a list of possible error codes and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api#errors).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   Bad authentication credentials. *   Bad request. Authentication credentials may be missing. *   Missing endpoint version number. |
|403|*   Unauthorized. Your app has been removed from the site. *   Unauthorized. Insufficient permissions.|
|404|*   App is not found on site. *   Endpoint version number does not exist.|
|408|Timestamp expired on the request, please submit again with a new timestamp.|
|410|Cursor expired. The cursor is no longer valid. Please query again.|
```

#### Function 04: GET/contacts/{contactId}/activities

- Summary: Returns the activity stream for a given contact, referenced by the contact’s unique ID. Activities will be returned in descending order from the most recent activity, in cursored form, and can be filtered by date ranges.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
{
    "method":  "GET",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/activities?version=1.0.0",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T14:01:51.914Z",
        "x-wix-signature": "EBB0T_9rEyKRBys5eCaQRhO8Q6yriSIYifj0UKvy464="
    }
}
```

- Details:
```markdown
Returns the activity stream for a given contact, referenced by the contact’s unique ID. Activities will be returned in descending order from the most recent activity, in cursored form, and can be filtered by date ranges.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|contactId (required)|String|Path|ID of the contact's stream to fetch|
|activityTypes|String (see list of [activity types](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities))|Query|The activity types to filter against. Multiple activity types are separated by a comma.|
|until|Datetime|Query|The ending date for activities we want to return, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. This field is only relevant when a cursor is not present.|
|from|Datetime|Query|The beginning date for activities we want to return, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. This field is only relevant when a cursor is not present|
|scope|'site', 'app' |Query|The scope of the results to return, either for the entire site or limited to the current application. By default, all activities for the site will be returned|
|cursor|String|Query|The semi-optional cursor into the desired data. This cursor will expire after 30 minutes, it should not be cached.|
|pageSize|Integer (1-500)  |Query|The number of results to return per page of data. Defaults to 25.|
|version (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|application-id (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|instance-id (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|signature (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|timestamp (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|

**Response**:

Here’s the full list of fields that can be part of the response.

The fields you’ll actually receive depend on the information you request and what we have in the system.

|Name	|Type	|Description|
|---|---|---|
|**pageSize**|Integer (1-500)|Number of results returned per cursor|
|**previousCursor**|String|The cursor used to access the previous set of activities. null will be returned if there are no previous results|
|**nextCursor**|String|The cursor used to access the next set of activities. null will be returned if there are no more results|
|**results**|Array\[Object\]|Array of Activity items|
|results.**id**|String|Activity ID|
|results.**createdAt**|Datetime|Timestamp indicating when this activity was created, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp|
|results.**activityType**|String (see list of [activity types](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities))|Type of activity performed|
|results.**activityLocationUrl**|String|URL where the activity was performed|
|results.**activityDetails**|Object|Relevant information about this activity to display in the Dashboard|
|results.activityDetails.**additionalInfoUrl**|String|URL linking to more specific contextual information about the activity for use in the Dashboard|
|results.activityDetails.**summary**|String|A short description about the activity for use in the Dashboard|
|results.**activityInfo**|Object|Activity specific information related to this type of activity. This field must adhere to the [schema specified by the activity type](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities#activity-schemas).|

**Errors**:

Here’s a list of possible error codes and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api#errors).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   Bad request. 'from' and 'until' fields are only valid when a cursor is not present. *   Bad request. Unknown scope parameter value. *   Invalid pageSize. Valid values are 25, 50 or 100.*   Invalid or missing cursor. *   Bad authentication credentials. *   Bad request. Authentication credentials may be missing. *   Missing endpoint version number. |
|403|*   Unauthorized. Your app has been removed from the site. *   Unauthorized. Insufficient permissions.|
|404|*   Contact not found. *   Activity Type not found. *   App is not found on site. *   Endpoint version number does not exist.|
|408|Timestamp expired on the request, please submit again with a new timestamp.|
|410|Cursor expired. The cursor is no longer valid. Please query again.|
```

#### Function 05: POST/contacts/{contactId}/activities

- Summary: This endpoint creates an activity of a given activity type, adding the activity directly to the specific contact. These activity objects are then viewable in the site owner’s dashboard. Each activity conforms to a specific schema predefined by Wix. When the activity is successfully created, the ID of the activity will be returned. If schema validation fails, or other errors occur, an error will be returned by this endpoint.

- Syntax:
```text
Not provided in source section.
```

- Example:
```javascript
{
    "method": "POST",
    "url": "https://openapi.wix.com/v1/contacts/0126c839-2344-47d6-b219-1441b30d1a8b/activities?version=1.0.0",
    "headers": {
        "x-wix-application-id": "1462a46b-d417-e2a1-c95b-3d638d926904",
        "x-wix-instance-id": "dbb179ed-7ffd-4c21-951b-c38ab7d1c45b",
        "x-wix-timestamp": "2017-03-26T14:09:09.668Z",
        "x-wix-signature": "qklWQibm57XNToJlLZkPwhZJZ6NbUHgMkzezZKbDeIA="
    },
    "json": true,
    "body": {
        "createdAt": "2017-03-26T14:01:51.914Z",
        "activityType": "hotels/cancel",
        "activityLocationUrl": "http://google.com",
        "activityInfo": {
            "cancelDate": "2017-03-26T14:07:33.734Z",
            "refund": {
                "kind": "FULL",
                "total": 100,
                "currency": "USD",
                "notes": "too expensive",
                "destination": "Tel Aviv"
            },
            "reservationId": "455",
            "guests": {
                "total": 1,
                "adults": 1,
                "children": 0
            },
            "stay": {
                "checkin": "2017-03-26T14:06:07.334Z",
                "checkout": "2017-03-26T14:07:33.734Z"
            },
            "rates": [
                {
                    "date": "2017-03-26T14:06:07.334Z",
                    "subtotal": 22.4,
                    "taxes": [
                        {
                            "name": "stuff",
                            "total": 0.6,
                            "currency": "USD"
                        }
                    ],
                    "total": 30,
                    "currency": "USD"
                }
            ],
            "invoice": {
                "subtotal": 20,
                "total": 30,
                "currency": "UDS"
            },
            "customer": {
                "contactId": "123",
                "isGuest": true,
                "name": {
                    "prefix": "Mr",
                    "first": "Kanye",
                    "middle": "k",
                    "last": "West",
                    "suffix": "The king"
                },
                "phone": "1234567",
                "email": "email@email.com"
            },
            "rooms": [
                {
                    "id": "single123",
                    "beds": [
                        {
                            "kind": "king"
                        }
                    ],
                    "maxOccupancy": 3,
                    "amenities": [
                        "air conditioning",
                        "wifi",
                        "cable",
                        "goats"
                    ]
                }
            ]
        }
    }
}
```

- Details:
```markdown
This endpoint creates an activity of a given activity type, adding the activity directly to the specific contact. These activity objects are then viewable in the site owner’s dashboard. Each activity conforms to a specific schema predefined by Wix. When the activity is successfully created, the ID of the activity will be returned. If schema validation fails, or other errors occur, an error will be returned by this endpoint.

**Parameters**:

|Name	|Data Type |Parameter Type	|Description|
|---|---|---|---|
|**contactId** (required)|String|Path|ID of the contact to edit|
|**version** (required)|Integer|Query|The specific version of this endpoint. This version uses semantic versioning, in the form of major.minor.path|
|**application-id** (required)|String|Query/header|The application definition ID. If sent through the header, this field must be prefixed with x-wix-|
|**instance-id** (required)|String|Query/header|The instance ID used for security validation with Wix. If sent through the header, this field must be prefixed with x-wix-|
|**signature** (required)|String|Query/header|The computed signature. If sent through the header, this field must be prefixed with x-wix-|
|**timestamp** (required)|Datetime|Query/header|The timestamp as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp. If sent through the header, this field must be prefixed with x-wix-|
|**activity** (required)|Object|Body|The activity to create|
|activity.**createdAt** (required)|Datetime|Body|Timestamp indicating when this activity was created, as an [ISO 8601](fallback::http://www.w3.org/TR/NOTE-datetime) timestamp|
|activity.**activityType** (required)|String (see list of [activity types](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities))|Body|Type of activity performed|
|activity.**activityLocationUrl**|String|Body|URL where the activity was performed|
|activity.**activityDetails**|Object|Body|Relevant information about this activity to display in the Dashboard|
|activity.activityDetails.**additionalInfoUrl** (required)|String|Body|URL linking to more specific contextual information about the activity for use in the Dashboard|
|activity.activityDetails.**summary** (required)|String|Body|A short description about the activity for use in the Dashboard|
|activity.**activityInfo** (required)|Object|Body|Activity specific information related to this type of activity. This field must adhere to the [schema specified by the activity type](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/wix-hive-deprecated/activities#activity-schemas).|

**Response**:

|Name	|Type	|Description|
|---|---|---|
|activityId|String|Activity ID|
|contactId|String|Contact ID|

**Errors**:

Here’s a list of possible error codes and when they occur. Read more about our [API errors](fallback::https://dev.wix.com/docs/client/api-reference/deprecated/http-api-deprecated/using-the-http-api#errors).

|HTTP Status Code	|Reason/Error Message |
|---|---|
|400|*   Activity is missing required information. *   Bad authentication credentials. *   Bad request. Authentication credentials may be missing. *   Missing endpoint version number. |
|403|*   Unauthorized. Your app has been removed from the site. *   Unauthorized. Insufficient permissions.|
|404|*   Contact not found. *   App is not found on site. *   Endpoint version number does not exist.|
|408|Timestamp expired on the request, please submit again with a new timestamp.|
```

---
