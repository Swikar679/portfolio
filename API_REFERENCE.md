# API Endpoints Reference

## Base URL
- **Development:** `http://localhost:5000`
- **Production:** `https://your-app.vercel.app`

## Endpoints

### 📹 Reels

#### List All Reels
```http
GET /api/reels
```

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Ambiance Edit",
    "description": "Edit for a Premium Restaurant.",
    "videoUrl": "/reels/alcove video.mp4",
    "posterUrl": "https://placehold.co/1080x1920/1a1a1a/ffffff?text=Ambiance+Edit",
    "isFeatured": true
  }
]
```

#### Get Single Reel
```http
GET /api/reels/:id
```

**Parameters:**
- `id` (number) - Reel ID

**Response (200):**
```json
{
  "id": 1,
  "title": "Ambiance Edit",
  "description": "Edit for a Premium Restaurant.",
  "videoUrl": "/reels/alcove video.mp4",
  "posterUrl": "https://placehold.co/1080x1920/1a1a1a/ffffff?text=Ambiance+Edit",
  "isFeatured": true
}
```

**Response (404):**
```json
{
  "message": "Reel not found"
}
```

#### Create Reel
```http
POST /api/reels
Content-Type: application/json
```

**Body:**
```json
{
  "title": "My New Reel",
  "description": "Description of the reel",
  "videoUrl": "/reels/my-video.mp4",
  "posterUrl": "https://example.com/poster.jpg",
  "isFeatured": false
}
```

**Response (201):**
```json
{
  "id": 6,
  "title": "My New Reel",
  "description": "Description of the reel",
  "videoUrl": "/reels/my-video.mp4",
  "posterUrl": "https://example.com/poster.jpg",
  "isFeatured": false
}
```

### 🔧 Admin

#### Seed Database
```http
POST /api/admin/seed
```

**Response (200):**
```json
{
  "message": "Database seeded successfully",
  "count": 5,
  "reels": [...]
}
```

## Testing with cURL

### List reels
```bash
curl https://your-app.vercel.app/api/reels
```

### Get specific reel
```bash
curl https://your-app.vercel.app/api/reels/1
```

### Create reel
```bash
curl -X POST https://your-app.vercel.app/api/reels \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Reel",
    "description": "Test description",
    "videoUrl": "/reels/test.mp4",
    "isFeatured": false
  }'
```

### Seed database
```bash
curl -X POST https://your-app.vercel.app/api/admin/seed
```

## Testing with JavaScript (Frontend)

### Fetch all reels
```javascript
const response = await fetch('/api/reels');
const reels = await response.json();
console.log(reels);
```

### Fetch single reel
```javascript
const response = await fetch('/api/reels/1');
const reel = await response.json();
console.log(reel);
```

### Create reel
```javascript
const response = await fetch('/api/reels', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Reel',
    description: 'Description',
    videoUrl: '/reels/video.mp4',
    isFeatured: false,
  }),
});
const newReel = await response.json();
console.log(newReel);
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Title and videoUrl are required"
}
```

### 404 Not Found
```json
{
  "message": "Reel not found"
}
```

### 405 Method Not Allowed
```json
{
  "message": "Method not allowed"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error",
  "error": "Error details..."
}
```
