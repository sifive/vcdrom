##



## UI inputs

### Keyboard shortcuts

| Action | Description |
|-|-|
| <kbd>Alt</kbd> <kbd>0</kbd> | time zoom full 100%, press again to unzoom |
| <kbd>Alt</kbd> <kbd>-</kbd> | time zoom out (around the cursor) |
| <kbd>Alt</kbd> <kbd>+</kbd> | time zoom in (around the cursor) |
|||
| <kbd>Alt</kbd> <kbd>,</kbd> | scroll to the past by 1/5 screen|
| <kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>,</kbd> | scroll to the past by 1 screen |
| <kbd>Shift</kbd> <kbd>Alt</kbd> <kbd>,</kbd> | scroll to the past by 1 inst block|
|||
| <kbd>Alt</kbd> <kbd>.</kbd> | scroll to the future by 1/5 screen |
| <kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>.</kbd> | scroll to the future by 1 screen |
| <kbd>Shift</kbd> <kbd>Alt</kbd> <kbd>.</kbd> | scroll to the future by 1 inst block|
|||
| <kbd>Alt</kbd> <kbd>[</kbd> | scroll to the beginning of time |
| <kbd>Alt</kbd> <kbd>]</kbd> | scroll to the end of time |
|||
| <kbd>Alt</kbd> <kbd>/</kbd> | toggle read-only mode |

### Mouse actions

| Action | Description |
|-|-|
| 🖱️↕️-wheel | scroll signal list |
| <kbd>Shift</kbd> + 🖱️↕️-wheel  | scroll along the timeline |
| <kbd>Ctrl</kbd> + 🖱️⬆️-wheel | time zoom in (around the cursor) |
| <kbd>Ctrl</kbd> + 🖱️⬇️-wheel | time zoom out (around the cursor) |


## Cursors

Cursors allow you to mark interesting places in the simulation, and to
easily measure time and cycles between two points.  Cursors are defined in the waveql text (on the left edge of the viewer).  This text is persisted between viewer sessions so you will not lose defined cursors when the viewer is closed.

### The Mouse Click Cursor

When you click the left mouse button at any point in the simulation a white "click" cursor is placed at that location.  If you click at another location, the click cursor is moved to the new location.

Click cursors are defined in the waveql file as "@(time-val).x"   Where the .x makes this a special "click" cursor.  

When you click in the simulation you will see the time value of this
cursor updated.

### Creating Cursors

You can convert a "click" cursor into a persistent cursor by changing it's color designator from ".x" to any other color.  You can do this by editing the cursor text, or in Freedom Studio.

You can create as many cursors as needed.

### Editing Cursors

You can edit both the time and color by editing the waveql text.  The cursor markers will update automatically in the viewer, in Freedom Studio, and in any other opened viewers.

### Removing Cursors

Remove a cursor by simply deleting the appropriate cursor line from the waveql editor text.

You can also delete cursors from the Experiment Control Panel in Freedom Studio.

## SiFive Customer Support (requires login)

The embedded Freedom Studio browser does not support user profiles.  This means that you will need to login every time
you click links in this section (you're login credentials will not be saved upon closing the help window).  
For a better experience, you can drag these links to your normal preferred system browser where
your login will be persisted across sessions.

[SiFive Customer Portal](https://sifive.atlassian.net/servicedesk/customer/portal/47/article/465732086?src=-88580917)