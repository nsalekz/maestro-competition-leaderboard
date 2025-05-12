// Particle Network Animation
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Style the canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    
    // Initialize the canvas
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Set the canvas dimensions
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle properties
    const particleCount = 100;
    const particleColor = 'rgba(74, 144, 226, 0.5)';
    const lineColor = 'rgba(74, 144, 226, 0.2)';
    const particleRadius = 1.5;
    const maxLineDistance = 150;
    const minLineDistance = 30;
    const maxSpeed = 0.5;
    
    // Create particles
    let particles = [];
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() * 2 - 1) * maxSpeed;
            this.vy = (Math.random() * 2 - 1) * maxSpeed;
            this.radius = particleRadius;
        }
        
        update() {
            // Update position based on velocity
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }
    }
    
    // Create initial particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw lines between particles
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxLineDistance && distance > minLineDistance) {
                    // Calculate line opacity based on distance
                    const opacity = 1 - (distance / maxLineDistance);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(74, 144, 226, ${opacity * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        // Draw connections
        drawLines();
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    initParticles();
    animate();
    
    // Add interactive effect on mouse move (optional)
    let mouseX = 0;
    let mouseY = 0;
    let interactiveParticle = null;
    
    window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create or update interactive particle
        if (!interactiveParticle) {
            interactiveParticle = {
                x: mouseX,
                y: mouseY,
                radius: particleRadius * 2
            };
            particles.push(interactiveParticle);
        } else {
            interactiveParticle.x = mouseX;
            interactiveParticle.y = mouseY;
        }
    });
    
    // Reduce particle count on mobile for better performance
    function checkMobile() {
        if (window.innerWidth <= 768) {
            // If we already have fewer particles, don't recreate
            if (particles.length <= 40) return;
            
            // Reset particles with a lower count
            particles = [];
            for (let i = 0; i < 40; i++) {
                particles.push(new Particle());
            }
        } else {
            // If we already have the right number of particles, don't recreate
            if (particles.length >= particleCount) return;
            
            // Reset to normal count
            initParticles();
        }
    }
    
    // Check on load and resize
    checkMobile();
    window.addEventListener('resize', checkMobile);
});