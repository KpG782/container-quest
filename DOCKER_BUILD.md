# Container Tech Quiz - Docker Build Guide

## Quick Build & Run

### Build the Docker image:

```bash
docker build -t container-quiz:latest .
```

### Run the container:

```bash
docker run -p 3000:3000 container-quiz:latest
```

### Access the quiz:

Open your browser to **http://localhost:3000**

## Docker Commands

### Build with specific tag:

```bash
docker build -t container-quiz:v1.0 .
```

### Run in detached mode:

```bash
docker run -d -p 3000:3000 --name quiz-app container-quiz:latest
```

### View logs:

```bash
docker logs quiz-app
```

### Stop the container:

```bash
docker stop quiz-app
```

### Remove the container:

```bash
docker rm quiz-app
```

## Image Details

- **Base Image**: node:20-alpine (updated from node:18 to fix vulnerabilities)
- **Build Type**: Multi-stage build (optimized size)
- **Output**: Standalone Next.js application
- **Port**: 3000
- **User**: Non-root (nextjs:nodejs)

## What's Included

✅ 10-question quiz (7 easy, 3 hard)
✅ Randomized question order
✅ Educational background section
✅ Research citations (Sturley et al., 2024)
✅ Loading indicators
✅ Progress tracking
✅ Score summary

## Production Deployment

### Push to Docker Hub:

```bash
docker tag container-quiz:latest yourusername/container-quiz:latest
docker push yourusername/container-quiz:latest
```

### Deploy to cloud:

```bash
# AWS ECS, Azure Container Instances, or Google Cloud Run
# Use the pushed image: yourusername/container-quiz:latest
```

## Troubleshooting

**Build fails?**

- Ensure you have Node.js dependencies: `npm install`
- Check Docker is running: `docker --version`

**Port 3000 already in use?**

- Use different port: `docker run -p 8080:3000 container-quiz:latest`
- Access at: http://localhost:8080

**Image too large?**

- Already optimized with alpine and multi-stage build
- Current size: ~150-200MB (typical for Next.js)

---

**Ready to build!** This Dockerfile is optimized for production use. 🐳
