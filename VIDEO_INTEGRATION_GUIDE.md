# Video Integration Guide for ProcureAI Demo

## 🎥 Method 1: Local Video Files (Recommended)

### Step 1: Add Video Files
1. Create a `public/videos/` folder in your project
2. Add your video files:
   \`\`\`
   public/
   ├── videos/
   │   ├── ai-order-creation.mp4
   │   ├── smart-form-demo.mp4
   │   ├── analytics-dashboard.mp4
   │   └── vendor-management.mp4
   \`\`\`

### Step 2: Update Demo Configuration
In `components/demo-showcase.tsx`, update the media URLs:

\`\`\`typescript
const demoSteps = [
  {
    title: "AI-Powered Order Creation",
    description: "Watch how our AI assistant transforms natural language requests...",
    type: "video",
    media: "/videos/ai-order-creation.mp4", // ← Your video file
    features: ["Natural language processing", "Smart vendor matching", "Automated compliance checks"],
  },
  // ... other steps
]
\`\`\`

## 🎬 Method 2: YouTube Videos

### Step 1: Get YouTube Embed URL
1. Go to your YouTube video
2. Click "Share" → "Embed"
3. Copy the URL from the iframe src (e.g., `https://www.youtube.com/embed/VIDEO_ID`)

### Step 2: Update Configuration
\`\`\`typescript
const demoSteps = [
  {
    title: "AI-Powered Order Creation",
    description: "Watch how our AI assistant transforms...",
    type: "youtube",
    media: "https://www.youtube.com/embed/YOUR_VIDEO_ID", // ← YouTube embed URL
    features: ["Natural language processing", "Smart vendor matching", "Automated compliance checks"],
  },
]
\`\`\`

## 🎯 Method 3: External Video URLs

For videos hosted elsewhere (Vimeo, AWS S3, etc.):

\`\`\`typescript
const demoSteps = [
  {
    title: "AI-Powered Order Creation",
    type: "video",
    media: "https://your-cdn.com/videos/demo-video.mp4", // ← External URL
    features: [...],
  },
]
\`\`\`

## 📱 Video Optimization Tips

### 1. Video Format & Compression
- **Format**: MP4 (H.264 codec) for best compatibility
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **File Size**: Keep under 10MB for web performance
- **Duration**: 30-90 seconds per demo step

### 2. Compression Tools
- **Online**: HandBrake, CloudConvert
- **Command Line**: FFmpeg
- **Services**: Cloudinary, AWS Elemental

### 3. Example FFmpeg Command
\`\`\`bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -b:a 128k -movflags +faststart output.mp4
\`\`\`

## 🎨 Video Features Included

### ✅ Auto-Play & Controls
- Videos auto-play when step becomes active
- Play/pause button overlay
- Mute/unmute toggle
- Click to expand to lightbox

### ✅ Responsive Design
- Maintains aspect ratio on all devices
- Optimized controls for mobile
- Smooth transitions between steps

### ✅ Performance Optimized
- Lazy loading for non-active videos
- Automatic pause when switching steps
- Error handling for failed video loads

## 🔧 Customization Options

### Video Player Settings
\`\`\`typescript
// In enhanced-desktop-frame.tsx, you can customize:
<video
  loop={true}                    // Loop video
  muted={true}                   // Start muted
  autoPlay={true}                // Auto-play when active
  playsInline={true}             // Inline play on mobile
  controls={false}               // Hide native controls
  poster="/path/to/poster.jpg"   // Poster image
/>
\`\`\`

### YouTube Player Parameters
\`\`\`typescript
// Add parameters to YouTube URL:
const youtubeUrl = `https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&controls=1&modestbranding=1&rel=0`
\`\`\`

## 🚀 Quick Setup Example

1. **Add your video file** to `public/videos/demo.mp4`

2. **Update one demo step** to test:
\`\`\`typescript
{
  title: "AI-Powered Order Creation",
  type: "video",
  media: "/videos/demo.mp4",
  features: ["Natural language processing", "Smart vendor matching", "Automated compliance checks"],
}
\`\`\`

3. **Test the demo** - your video should now play in the desktop frame!

## 🎭 Fallback for Missing Videos

The component automatically shows placeholder images if videos fail to load, so you can deploy with placeholders and add real videos later.

## 📊 Analytics & Tracking

To track video engagement, you can add event listeners:

\`\`\`typescript
onPlay={() => {
  // Track video play event
  analytics.track('Demo Video Played', { step: currentStep, title: titles[index] })
}}
