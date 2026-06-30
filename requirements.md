# Internet Project Guide — Functional Requirements

## What Is This App?

A multi-page website named "Classroom assignment board", Its target audience is the students of class ט4. The website is designed to serve two purposes: first, to gather the students' assignments in one place and organize them. Second, to provide them with study tips. 

---

## Technologies Used

| Technology | Role |
| :---- | :---- |
| HTML5 | Page structure and content |
| CSS3 | Visual styling and layout |
| JavaScript (vanilla) | Client-side interactivity and data fetching |
| C\# with .NET Minimal API | Web server and API endpoints |

**No frameworks are used — on either the client or the server.** There is no React, Vue, Angular, Bootstrap, jQuery, or any other library. The C\# backend is equally bare: no Entity Framework, no MVC, no Razor Pages — just a single file with route handlers.

- Writing HTML means writing actual HTML tags, not JSX or templates.  
- Writing CSS means writing actual CSS rules, not utility classes or CSS-in-JS.  
- Writing JavaScript means calling `fetch()`, manipulating the DOM, and handling events directly — not delegating to a framework.  
- Writing a server means defining routes and returning responses explicitly — not relying on conventions hidden inside a framework.

---

## Graphical Design Considerations

I chose this graphical design because it's simple and visually appealing. Just like the website’s concept it isn't a complicated design, and it didn't use any design library, just simple CSS.

---

## Pages and What They Do

### Home (`index.html`)

The landing page. It orients the visitor and tells him how to use the site.

- Displays a welcome panel to the website.   
- Briefly describes the purpose of the website and how to use it.   
- Displays an image of the class schedule under the title "classes’ schedule".

#### Static content

- An image of the class's schedule  
- A brief explanation about the website (written in HTML).

---

### Assignment board (`assignment_board.html`)

The most interactive page on the website. The user can enter the homework data into a form, which will then be presented in an organized and visually appealing way within cards.

- The homework details entry form includes a subject name field (e.g. math, science), a task description field (e.g. pages 40-48), and a calendar for selecting the assignment due date. After filling all fields, clicking "Submit" submits the task to the server using an HTML form POST. 

Live data panel  
An area displaying the saved tasks. Each task is rendered as its own card. 

* Upon page load, the task board is populated automatically by a fetch() from the server, without the need for a manual refresh. 

 	  
---

### Study tips (`studytips.html`)

A page designed to improve the students' study environment.

- Opens with a brief statement about how important the study environment and the technique that are used to study.  
- Continues with a list of tips to improve the study techniques.  
- Displays the weather in Tel-Aviv and if its between 20 and 28 it shows a massage that suggests the user to study outside, if its above 28 it will suggest the user  to study indoor because it's too hot outside and if its neither of those it will suggest the user to study indoors because it's too hot.

---

### 

### About (`about.html`)

Explains how the site itself was built.

- Describes the purpose of the project in plain language.  
- Briefly explains why I chose this idea.  
- Contains a table breaking down each part of the app (HTML, CSS, JavaScript, C\#) and what each role plays.  
- Lists exactly what the JavaScript does across the site.  
- Describes each server-side API route \- what it gets, what it returns and how it's triggered.

---

## Behaviour That Applies to Every Page

Primary colors in the website  
Chalk board green \- \#188038, Golden Yellow \- `#fbbc04` and White \- `#ffffff`.

Background picture  
All of the pages have a background picture of a notebook page.

### Shared navigation header

Every page displays the same header at the top, containing:

- The site title.  
- A navigation bar with four links: Home, Assignment board, Study tips, About.  
- The header is not duplicated in each HTML file. It is stored in a single separate file and loaded dynamically by JavaScript on every page.

### Active navigation highlight

The navigation link corresponding to the currently viewed page is automatically highlighted (visually distinct background colour). This is set by JavaScript — not by hard-coding a class in each HTML file.

### Shared footer

Every page has an identical footer at the bottom explaining that the site is for students of ט4 only.

### Responsive layout

All pages adjust seamlessly on small screens:

- Navigation links stack vertically instead of sitting side by side.  
- Content fills the available width rather than being constrained to a fixed column.  
- Text size adjusts for readability.

---

### Data and State

- Assignment board content: a list of tasks on the server that grows with each POST. It is held in memory only — it resets when the server restarts. There is no database.  
- Tel-Aviv weather: fetched from a third-party public API (`wttr.in`) on each page load, not stored.

---

## User Interactions

| Interaction | Where | Result |
| :---- | :---- | :---- |
| Click a nav link | Any page | Navigates to that page; active link highlight updates |
| Enter the home work data and click submit | Assignment board page | Assignment is uploaded into a card with all the data organized.   |
| Resize browser window | Any page | Layout adapts to the new width. |
| Refresh the page | Study tips page | Displays the updated weather and the relevant recommendation. |

---

## What the App Does NOT Do

- No user accounts or login.  
- No persistent storage — messages are lost on server restart.  
- No client-side routing or single-page app behaviour.  
- No form validation — empty messages are silently ignored by the server.  
- No error messages shown to the user when API calls fail (elements show a fallback text string).  
- No admin interface.  
- No search.

