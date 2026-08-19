import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Track window dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position and status
    const mouse = {
      x: null,
      y: null,
      radius: 120, // Interaction radius
    };

    const lastMouse = {
      x: null,
      y: null
    };

    // Particle definition
    class Particle {
      constructor(isMouseParticle = false) {
        this.reset(isMouseParticle);
        if (isMouseParticle && mouse.x !== null) {
          // Centered near the mouse position
          this.x = mouse.x + (Math.random() - 0.5) * 8;
          this.y = mouse.y + (Math.random() - 0.5) * 8;
        }
      }

      reset(isMouseParticle = false) {
        this.isMouseParticle = isMouseParticle;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Background particles move slower, cursor particles drift very gently
        this.vx = (Math.random() - 0.5) * (isMouseParticle ? 0.5 : 0.4);
        this.vy = (Math.random() - 0.5) * (isMouseParticle ? 0.5 : 0.4);
        this.radius = Math.random() * (isMouseParticle ? 2.5 : 1.5) + 0.5;
        this.alpha = isMouseParticle ? 0.8 : Math.random() * 0.5 + 0.1;
        this.decay = Math.random() * 0.007 + 0.003; // Slower fade out (decay) for elegant trail
        this.color = isMouseParticle 
          ? `hsla(${200 + Math.random() * 60}, 85%, 65%, ` // Light blue/violet for mouse trail
          : `hsla(${220 + Math.random() * 30}, 40%, 40%, `; // Muted blue/gray for background
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Interaction with mouse
        if (mouse.x !== null && !this.isMouseParticle) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            // Gently pull/push particles from cursor
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }

        if (this.isMouseParticle) {
          this.alpha -= this.decay;
        } else {
          // Wrap around screen for background particles
          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.fill();
      }
    }

    // Initialize background particles
    const backgroundParticleCount = Math.min(60, Math.floor((width * height) / 25000));
    const particles = Array.from({ length: backgroundParticleCount }, () => new Particle(false));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (lastMouse.x === null || lastMouse.y === null) {
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
        return;
      }

      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const dist = Math.hypot(dx, dy);

      // Only spawn mouse particles when cursor moves beyond a small threshold
      if (dist > 8) {
        particles.push(new Particle(true));
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      lastMouse.x = null;
      lastMouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const animate = () => {
      // Semi-transparent clear to create faint trailing effect
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? 'rgba(2, 6, 23, 0.2)' : 'rgba(248, 250, 252, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        // Remove dead mouse particles
        if (p.isMouseParticle && p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      // Draw faint lines between close background particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          if (pi.isMouseParticle || pj.isMouseParticle) continue;

          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 100) {
            const alpha = (100 - dist) / 100 * 0.15;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`; // Indigo lines
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
