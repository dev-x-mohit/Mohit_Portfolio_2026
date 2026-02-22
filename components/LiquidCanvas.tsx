'use client';
import React, { useRef, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  NEBULA AURORA BACKGROUND
//  - 3-tier star field with slow parallax
//  - 5 drifting nebula blobs (radial gradient clouds)
//  - Aurora sine-wave bands that shift over time
//  - Mouse: gravitational lens — nearby stars / clouds warp toward cursor
//  - Click: expanding shockwave ring that ripples outward and fades
// ─────────────────────────────────────────────────────────────────────────────

interface Star {
    x: number; y: number;
    baseX: number; baseY: number;
    r: number;
    alpha: number;
    twinklePhase: number;
    twinkleSpeed: number;
    layer: 0 | 1 | 2; // 0 = far, 2 = near
}

interface NebulaBlob {
    x: number; y: number;
    vx: number; vy: number;
    radius: number;
    hue: number;
    saturation: number;
    alpha: number;
    phase: number;
    phaseSpeed: number;
    baseVx: number;
    baseVy: number;
}

interface Shockwave {
    x: number; y: number;
    r: number;
    alpha: number;
    maxR: number;
}

interface AuroraBand {
    yBase: number;
    amplitude: number;
    frequency: number;
    phase: number;
    phaseSpeed: number;
    hue: number;
    alpha: number;
    thickness: number;
}

const STAR_COUNT = 220;
const NEBULA_COUNT = 7;
const PARALLAX = [0.006, 0.014, 0.024]; // per layer
const LENS_RADIUS = 220;
const LENS_STRENGTH = 55;

// ─── seeded pseudo-random (same layout every load) ───────────────────────────
let _seed = 42;
const sr = () => { _seed ^= _seed << 13; _seed ^= _seed >> 17; _seed ^= _seed << 5; return ((_seed >>> 0) / 0xFFFFFFFF); };

function buildStars(w: number, h: number): Star[] {
    _seed = 42;
    return Array.from({ length: STAR_COUNT }, () => {
        const layer = (sr() < 0.6 ? 0 : sr() < 0.5 ? 1 : 2) as 0 | 1 | 2;
        const x = sr() * w;
        const y = sr() * h;
        return {
            x, y, baseX: x, baseY: y,
            r: 0.4 + layer * 0.7 + sr() * 0.6,
            alpha: 0.3 + sr() * 0.5,
            twinklePhase: sr() * Math.PI * 2,
            twinkleSpeed: 0.004 + sr() * 0.012,
            layer,
        };
    });
}

function buildNebulas(w: number, h: number): NebulaBlob[] {
    const hues = [230, 270, 190, 300, 200, 250, 170];
    _seed = 99;
    return Array.from({ length: NEBULA_COUNT }, (_, i) => {
        const vx = (sr() - 0.5) * 0.18;
        const vy = (sr() - 0.5) * 0.18;
        return {
            x: sr() * w,
            y: sr() * h,
            vx, vy,
            baseVx: vx, baseVy: vy,
            radius: w * (0.22 + sr() * 0.28),
            hue: hues[i % hues.length],
            saturation: 65 + sr() * 25,
            alpha: 0.022 + sr() * 0.038,
            phase: sr() * Math.PI * 2,
            phaseSpeed: 0.0008 + sr() * 0.0012,
        };
    });
}

function buildAurora(w: number, h: number): AuroraBand[] {
    const configs = [
        { hue: 175, alpha: 0.06, thickness: h * 0.12 },
        { hue: 240, alpha: 0.05, thickness: h * 0.10 },
        { hue: 280, alpha: 0.04, thickness: h * 0.14 },
        { hue: 200, alpha: 0.05, thickness: h * 0.09 },
    ];
    _seed = 7;
    return configs.map((c, i) => ({
        yBase: h * (0.15 + i * 0.2),
        amplitude: 25 + sr() * 40,
        frequency: 0.003 + sr() * 0.003,
        phase: sr() * Math.PI * 2,
        phaseSpeed: 0.003 + sr() * 0.004,
        hue: c.hue,
        alpha: c.alpha,
        thickness: c.thickness,
    }));
}

// ─────────────────────────────────────────────────────────────────────────────
const LiquidCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef({
        stars: [] as Star[],
        nebulas: [] as NebulaBlob[],
        aurora: [] as AuroraBand[],
        shockwaves: [] as Shockwave[],
        mouse: { x: -9999, y: -9999 },
        t: 0,
        w: 0,
        h: 0,
        raf: 0,
        isDark: true,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const S = stateRef.current;

        const resize = () => {
            S.w = canvas.width = window.innerWidth;
            S.h = canvas.height = window.innerHeight;
            S.stars = buildStars(S.w, S.h);
            S.nebulas = buildNebulas(S.w, S.h);
            S.aurora = buildAurora(S.w, S.h);
        };

        const onMouse = (e: MouseEvent) => { S.mouse.x = e.clientX; S.mouse.y = e.clientY; };
        const onLeave = () => { S.mouse.x = -9999; S.mouse.y = -9999; };
        const onClick = (e: MouseEvent) => {
            S.shockwaves.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.8, maxR: 250 + Math.random() * 100 });

            // Interaction: scatter the nebulas slightly
            S.nebulas.forEach(blob => {
                const dx = blob.x - e.clientX;
                const dy = blob.y - e.clientY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 500 && dist > 1) {
                    blob.vx += (dx / dist) * 1.5;
                    blob.vy += (dy / dist) * 1.5;
                }
            });
        };
        const onTouch = (e: TouchEvent) => {
            if (!e.touches[0]) return;
            S.mouse.x = e.touches[0].clientX;
            S.mouse.y = e.touches[0].clientY;
        };

        const themeObs = new MutationObserver(() => {
            S.isDark = document.documentElement.classList.contains('dark');
        });
        themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        S.isDark = document.documentElement.classList.contains('dark');

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouse);
        window.addEventListener('click', onClick);
        document.addEventListener('mouseleave', onLeave);
        window.addEventListener('touchmove', onTouch, { passive: true });

        // ── OffscreenCanvas for nebula layer (drawn at 1/3 res, scaled up) ──────
        const ofc = document.createElement('canvas');
        const ofc2 = document.createElement('canvas');

        // ── Main render loop ─────────────────────────────────────────────────────
        const render = () => {
            S.t += 0.016;
            const { w, h, t, mouse, stars, nebulas, aurora, shockwaves, isDark } = S;

            // Background
            const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
            if (isDark) {
                bgGrad.addColorStop(0, 'hsl(230,30%,5%)');
                bgGrad.addColorStop(0.5, 'hsl(250,25%,4%)');
                bgGrad.addColorStop(1, 'hsl(220,35%,6%)');
            } else {
                bgGrad.addColorStop(0, 'hsl(220,40%,96%)');
                bgGrad.addColorStop(1, 'hsl(240,35%,92%)');
            }
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);

            // ── AURORA BANDS ──────────────────────────────────────────────────────
            ctx.save();
            for (const band of aurora) {
                band.phase += band.phaseSpeed;

                ctx.beginPath();
                ctx.moveTo(0, band.yBase);
                for (let x = 0; x <= w; x += 4) {
                    const y = band.yBase + Math.sin(x * band.frequency + band.phase) * band.amplitude
                        + Math.sin(x * band.frequency * 2.3 + band.phase * 1.4) * (band.amplitude * 0.4);
                    ctx.lineTo(x, y);
                }
                // close the band shape
                ctx.lineTo(w, band.yBase + band.thickness);
                for (let x = w; x >= 0; x -= 4) {
                    ctx.lineTo(x, band.yBase + band.thickness + Math.sin(x * band.frequency + band.phase + 0.5) * (band.amplitude * 0.3));
                }
                ctx.closePath();

                const a = (isDark ? band.alpha : band.alpha * 1.8);
                const l1 = isDark ? 65 : 40;
                const l2 = isDark ? 68 : 45;
                const l3 = isDark ? 60 : 35;
                const bandGrad = ctx.createLinearGradient(0, band.yBase - band.amplitude, 0, band.yBase + band.thickness + band.amplitude);
                bandGrad.addColorStop(0, `hsla(${band.hue},80%,${l1}%,0)`);
                bandGrad.addColorStop(0.3, `hsla(${band.hue},85%,${l2}%,${a})`);
                bandGrad.addColorStop(0.7, `hsla(${band.hue},80%,${l3}%,${a * 0.7})`);
                bandGrad.addColorStop(1, `hsla(${band.hue},80%,${l1}%,0)`);
                ctx.fillStyle = bandGrad;
                ctx.fill();
            }
            ctx.restore();

            // ── NEBULA CLOUDS ─────────────────────────────────────────────────────
            ofc.width = Math.max(1, w >> 1);
            ofc.height = Math.max(1, h >> 1);
            const octx = ofc.getContext('2d')!;
            octx.clearRect(0, 0, ofc.width, ofc.height);

            for (const blob of nebulas) {
                blob.phase += blob.phaseSpeed;
                blob.x += blob.vx + Math.sin(blob.phase) * 0.12;
                blob.y += blob.vy + Math.cos(blob.phase * 1.3) * 0.09;

                // Friction to return to base velocity if bumped by click
                blob.vx = blob.vx * 0.98 + blob.baseVx * 0.02;
                blob.vy = blob.vy * 0.98 + blob.baseVy * 0.02;

                // wrap
                if (blob.x < -blob.radius) blob.x = w + blob.radius;
                else if (blob.x > w + blob.radius) blob.x = -blob.radius;
                if (blob.y < -blob.radius) blob.y = h + blob.radius;
                else if (blob.y > h + blob.radius) blob.y = -blob.radius;

                const bx = blob.x / 2;
                const by = blob.y / 2;
                const br = blob.radius / 2;

                const grad = octx.createRadialGradient(bx, by, 0, bx, by, br);
                const a = isDark ? blob.alpha : blob.alpha * 1.25;
                const l1 = isDark ? 65 : 45;
                const l2 = isDark ? 60 : 40;
                const l3 = isDark ? 55 : 35;
                grad.addColorStop(0, `hsla(${blob.hue},${blob.saturation}%,${l1}%,${a * 2})`);
                grad.addColorStop(0.4, `hsla(${blob.hue},${blob.saturation}%,${l2}%,${a})`);
                grad.addColorStop(1, `hsla(${blob.hue},${blob.saturation}%,${l3}%,0)`);
                octx.fillStyle = grad;
                octx.beginPath();
                octx.arc(bx, by, br, 0, Math.PI * 2);
                octx.fill();
            }

            ctx.save();
            ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';
            ctx.filter = 'blur(18px)';
            ctx.drawImage(ofc, 0, 0, w, h);
            ctx.filter = 'none';
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();

            // ── STARS ─────────────────────────────────────────────────────────────
            const lensX = mouse.x, lensY = mouse.y;
            const hasLens = lensX > -900;

            for (const s of stars) {
                s.twinklePhase += s.twinkleSpeed;
                const twinkle = 0.7 + 0.3 * Math.sin(s.twinklePhase);

                // Parallax pull toward mouse
                let px = s.baseX, py = s.baseY;
                if (hasLens) {
                    const factor = PARALLAX[s.layer];
                    px = s.baseX + (lensX - S.w / 2) * factor;
                    py = s.baseY + (lensY - S.h / 2) * factor;
                }

                // Gravitational lens warp near cursor
                let rx = px, ry = py;
                if (hasLens) {
                    const dx = px - lensX, dy = py - lensY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < LENS_RADIUS && dist > 1) {
                        const pull = (1 - dist / LENS_RADIUS) * LENS_STRENGTH * (s.layer + 1) * 0.5;
                        rx = px - (dx / dist) * pull;
                        ry = py - (dy / dist) * pull;
                    }
                }

                s.x = rx; s.y = ry;

                const brightness = isDark
                    ? `hsla(${210 + s.layer * 20},40%,${80 + s.layer * 8}%,${s.alpha * twinkle})`
                    : `hsla(${220},50%,${30 + s.layer * 10}%,${s.alpha * twinkle * 0.5})`;

                // Larger stars get a soft glow
                if (s.layer === 2) {
                    const glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, s.r * 4);
                    glow.addColorStop(0, `hsla(200,80%,88%,${s.alpha * twinkle * 0.5})`);
                    glow.addColorStop(1, 'hsla(200,80%,88%,0)');
                    ctx.fillStyle = glow;
                    ctx.beginPath();
                    ctx.arc(rx, ry, s.r * 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(rx, ry, s.r, 0, Math.PI * 2);
                ctx.fillStyle = brightness;
                ctx.fill();
            }

            // ── SHOCKWAVES ────────────────────────────────────────────────────────
            for (let i = shockwaves.length - 1; i >= 0; i--) {
                const sw = shockwaves[i];
                sw.r += 4.5;
                sw.alpha *= 0.94;

                const progress = sw.r / sw.maxR;
                // Double ring
                for (const offset of [-4, 0, 4]) {
                    const cr = sw.r + offset;
                    if (cr < 0) continue;
                    ctx.beginPath();
                    ctx.arc(sw.x, sw.y, cr, 0, Math.PI * 2);
                    ctx.strokeStyle = `hsla(200,85%,72%,${sw.alpha * (1 - progress) * (offset === 0 ? 1 : 0.35)})`;
                    ctx.lineWidth = offset === 0 ? 1.5 : 0.5;
                    ctx.stroke();
                }

                // Inner glow at origin (fades early)
                if (progress < 0.3) {
                    const grd = ctx.createRadialGradient(sw.x, sw.y, 0, sw.x, sw.y, sw.r * 0.4);
                    grd.addColorStop(0, `hsla(200,90%,80%,${sw.alpha * 0.3})`);
                    grd.addColorStop(1, 'hsla(200,90%,80%,0)');
                    ctx.beginPath();
                    ctx.arc(sw.x, sw.y, sw.r * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = grd;
                    ctx.fill();
                }

                if (sw.alpha < 0.01 || sw.r > sw.maxR) shockwaves.splice(i, 1);
            }

            // ── CURSOR – microscopic crosshair dot ────────────────────────────────
            if (hasLens) {
                const pulse = 0.5 + 0.5 * Math.sin(t * 3.5);
                // outer ring
                ctx.beginPath();
                ctx.arc(lensX, lensY, 6 + pulse * 3, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(200,85%,75%,${0.25 + pulse * 0.15})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                // dot
                ctx.beginPath();
                ctx.arc(lensX, lensY, 2, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(190,100%,85%,0.9)`;
                ctx.fill();

                // lens field circle
                ctx.beginPath();
                ctx.arc(lensX, lensY, LENS_RADIUS, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(220,70%,65%,0.04)`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            S.raf = requestAnimationFrame(render);
        };

        S.raf = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(S.raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('click', onClick);
            document.removeEventListener('mouseleave', onLeave);
            window.removeEventListener('touchmove', onTouch);
            themeObs.disconnect();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none select-none" aria-hidden="true">
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', display: 'block' }}
            />
        </div>
    );
};

export default LiquidCanvas;
