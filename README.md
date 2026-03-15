# Simplif_money_assignment_2
Precious Metals Price Viewer

A React-based web application that displays information and price trends for precious metals including Gold, Silver, Platinum, and Palladium.
The project is inspired by the metal purchase flow in the Simplify Money application and demonstrates how live asset prices can be visualized in a simple and interactive UI.

Users can view different metals from the landing page and navigate to a dedicated page where price trends and performance metrics are displayed.

Features

Landing page displaying four metals:

Gold

Silver

Platinum

Palladium

Navigation using React Router

Individual pages for each metal

Price trend visualization using charts

Performance metrics such as:

Today's High

Today's Low

Clean and modular React component structure

Tech Stack

React

React Router

Charting library (Recharts / Chart.js)

JavaScript

CSS / Bootstrap (for UI styling)

Project Structure
src
 ├── landing_pages
 │    ├── Home.js
 │    ├── Gold.js
 │    ├── Silver.js
 │    ├── Platinum.js
 │    ├── Palladium.js
 │
 ├── index.js
 ├── index.css
How to Run the Project

Follow these steps to run the application locally.

1. Clone the repository
git clone https://github.com/your-username/precious-metals-viewer.git
2. Navigate into the project directory
cd precious-metals-viewer
3. Install dependencies
npm install
4. Start the development server
npm start

The application will start and open in your browser at:

http://localhost:3000
Application Flow

The user lands on the Home Page.

The page displays cards for the four metals.

Clicking on a metal card navigates to the respective page.

Each page displays:

Metal name

Price information

Price trend chart

Performance metrics.

Approach

Created a landing page with metal cards for easy navigation.

Implemented React Router to handle navigation between pages.

Structured components into a dedicated landing_pages folder.

Used chart libraries to visualize price trends.

Implemented placeholders for API integration to fetch real-time metal prices.

Challenges Faced
API Access Restrictions

Many metal price APIs restrict direct frontend access and return 403 Forbidden errors without proper authentication or backend proxy.

React Version Conflicts

During development, mismatched versions of React and React DOM caused hook errors that required reinstalling dependencies.

Routing Setup

Ensuring correct router configuration and component structure required debugging to prevent blank screens during rendering.

Future Improvements

Integrate a backend service for secure API calls.

Add real-time price updates.

Implement additional chart filters such as:

1 Day

1 Week

1 Month

1 Year

Improve UI to resemble a professional trading dashboard.

Add more performance analytics and historical data.
