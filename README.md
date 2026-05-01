# Wanderlust

Wanderlust is a full-stack travel stay marketplace inspired by Airbnb. Guests can explore stays, filter destinations, read reviews, reserve trips, and manage bookings. Hosts can create, edit, and manage their own listings with images, amenities, pricing, and location data.

## Live Demo

https://wanderlust-project-itlc.onrender.com

## Features

- Browse responsive stay cards with destination, price, capacity, and property details
- Search by destination, country, or title
- Filter by category, guest count, and price range
- User signup, login, logout, and protected routes with Passport.js
- Host listings with title, description, images, amenities, category, bedrooms, bathrooms, and max guests
- Owner-only edit and delete controls
- Reviews and star ratings with author ownership checks
- Booking flow with check-in, check-out, guest validation, trip confirmation, and cancellation
- Trips dashboard for authenticated guests
- Mapbox geocoding support with a graceful local fallback
- Cloudinary image uploads in production, with local upload fallback for development
- MongoDB session storage using `connect-mongo`

## Tech Stack

- Node.js
- Express.js
- MongoDB and Mongoose
- EJS and EJS Mate
- Bootstrap 5
- Passport.js
- Joi validation
- Multer
- Cloudinary
- Mapbox SDK
- Render deployment

## Project Structure

```text
wanderlust-project/
  app.js
  cloudConfig.js
  schema.js
  middleware.js
  controllers/
  models/
  routes/
  views/
  public/
  init/
  utils/
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Prateek-Gokhale/wanderlust-project.git
cd wanderlust-project
```

Install dependencies:

```bash
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

For Windows PowerShell, create `.env` manually or run:

```powershell
Copy-Item .env.example .env
```

Set the required local values:

```env
ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust
PORT=3000
SECRET=replace-with-a-strong-session-secret
```

Optional production integrations:

```env
MAP_TOKEN=your-mapbox-public-token
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

Seed demo data:

```bash
npm run seed
```

Start the app:

```bash
npm start
```

Open:

```text
http://localhost:3000/listings
```

If PowerShell blocks `npm.ps1`, use:

```powershell
cmd /c npm install
cmd /c npm run seed
cmd /c npm start
```

## Demo Credentials

```text
Host:  demo-host  / password123
Guest: demo-guest / password123
```

The seed command creates the host account and demo listings. The guest account can be created through the signup page or manually for testing.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `ATLASDB_URL` | Yes | MongoDB connection string |
| `PORT` | No | Local server port, defaults to `8080` if unset |
| `SECRET` | Yes | Session signing secret |
| `MAP_TOKEN` | No | Mapbox public token for maps and geocoding |
| `CLOUD_NAME` | No | Cloudinary cloud name |
| `CLOUD_API_KEY` | No | Cloudinary API key |
| `CLOUD_API_SECRET` | No | Cloudinary API secret |

## Deployment

This project is configured as a Node web service and is deployed on Render.

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Recommended Render environment variables:

```env
NODE_ENV=production
ATLASDB_URL=your-mongodb-atlas-url
SECRET=your-production-session-secret
MAP_TOKEN=your-mapbox-token
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

For production image uploads, configure Cloudinary. Without Cloudinary, local uploads work during development but are not durable on most hosted platforms.

## Useful Scripts

```bash
npm start
npm run seed
```

## License

ISC
