Bus Stops Web Application
Project Description

This project is a web application for viewing bus stops, buses, and arrival times.

The application allows the user to:

Select a bus stop using an autocomplete input

View all buses that stop at the selected stop

Click on a bus to see the nearest arrival times

Automatically detect the nearest bus stop using browser geolocation

The project consists of a backend server, a database, and a frontend interface.

Project Structure

server.js – backend server (Node.js + Express)

indexDB tables – MySQL database tables

index.html – frontend user interface

Uses Bootstrap, jQuery, and jQuery UI via CDN

How to Run the Project Locally
1.Unzip the Project

Unzip the provided ZIP archive to any folder on your computer.

2.Requirements

Make sure the following are installed:

Node.js

MySQL

3.Install Dependencies

Open a terminal in the project folder and run:

npm install

4.Start the Server

Run the backend server:

node server.js


After starting, the server will be available at:

http://localhost:3000

5.Open the Application

Open the file index.html in a web browser
(Chrome or Edge recommended).

How to Use the Application

Start typing a bus stop name in the input field

Select a stop from the autocomplete list

Available buses for that stop will appear below

Click on a bus number to view upcoming arrival times

If location access is allowed, the nearest stop is selected automatically

Database

The application uses a MySQL database with the following tables:

ivanalek_stop – bus stops

ivanalekstop_times – buses per stop

ivanalek_arrival – arrival times

ivanalek_directions – route directions