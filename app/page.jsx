"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// ICONS — minimalist 1.5px stroke
// ─────────────────────────────────────────────────────────────────────────────
const ic = (paths, sz=20) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
);
const Icons = {
  arrow: (s=20) => ic(<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>, s),
  arrowUR: (s=20) => ic(<><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>, s),
  plus: (s=20) => ic(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>, s),
  spark: (s=20) => ic(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>, s),
};

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 32px' : '24px 32px',
      transition: 'all 0.4s cubic-bezier(.2,.8,.2,1)',
      background: scrolled ? 'rgba(247,249,254,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.04em', fontStyle: 'italic' }}>be</span>
          <span style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.05em' }}>Professional</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', marginLeft: 4, alignSelf: 'center' }} />
        </div>
        <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="hide-mobile">
          {['Producto', 'Para clubes', 'Bienestar'].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', letterSpacing: '-0.005em', fontWeight: 450, transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = 'var(--ink)'}
               onMouseLeave={e => e.target.style.color = 'var(--muted)'}>{l}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="https://carlesserra.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }} className="hide-mobile">Acceder</a>
          <a href="https://carlesserra.com" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{
            background: 'var(--lime)', color: '#fff', padding: '9px 18px',
            borderRadius: 100, fontSize: 13, fontWeight: 600, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'all 0.25s cubic-bezier(.2,.8,.2,1)',
          }}>
            Empezar <span style={{ display: 'inline-flex' }}>{Icons.arrow(14)}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — editorial layout, asymmetric
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null);
  const mockRef = useRef(null);

  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.7 })
        .from('.hero-title-line', { y: 60, opacity: 0, duration: 1, stagger: 0.08 }, '-=0.4')
        .from('.hero-sub', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-cta > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
        .from('.hero-meta', { opacity: 0, duration: 1 }, '-=0.4')
        .from('.hero-mock', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out' }, '-=1')
        .from('.float-chip', { scale: 0.7, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)' }, '-=0.7');

      // Mockup floating
      gsap.to('.hero-mock', { y: -8, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      // Floating chips with offset
      gsap.to('.float-chip-1', { y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3 });
      gsap.to('.float-chip-2', { y: -12, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8 });
      gsap.to('.float-chip-3', { y: -8,  duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.2 });
      gsap.to('.float-chip-4', { y: -14, duration: 4.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.1 });

      // Lime blob pulse
      gsap.to('.hero-blob', { scale: 1.15, opacity: 0.55, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} style={{
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      padding: '140px 32px 60px',
    }}>
      {/* Background blobs */}
      <div className="hero-blob" style={{
        position: 'absolute', top: '20%', right: '-10%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(26,115,232,0.16) 0%, transparent 60%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-15%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(49,118,210,0.10) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: 'linear-gradient(rgba(24,28,32,1) 1px, transparent 1px), linear-gradient(90deg, rgba(24,28,32,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 60 }} className="hero-grid">
        {/* LEFT: copy */}
        <div style={{ paddingTop: 40 }}>
          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 36,
            paddingLeft: 14, position: 'relative',
          }}>
            <span style={{ position: 'absolute', left: 0, top: '50%', width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', transform: 'translateY(-50%)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Sistema integral / clubes deportivos
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(48px, 7.5vw, 104px)',
            lineHeight: 0.96, letterSpacing: '-0.045em', marginBottom: 36,
            fontVariationSettings: '"opsz" 144',
          }}>
            <span className="hero-title-line" style={{ display: 'block' }}>Gestiona tu club</span>
            <span className="hero-title-line" style={{ display: 'block' }}>
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>como un</span>
              <span style={{
                display: 'inline-block', marginLeft: 18, position: 'relative',
                fontWeight: 600,
              }}>
                profesional
                <svg style={{ position: 'absolute', left: '-2%', bottom: '-8%', width: '104%', height: 'auto' }} viewBox="0 0 400 30" fill="none">
                  <path d="M5 22 Q 100 8, 200 18 T 395 12" stroke="var(--lime)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{
            fontSize: 18, lineHeight: 1.55, color: 'var(--muted)', maxWidth: 480, marginBottom: 40,
            fontWeight: 400,
          }}>
            Centraliza equipos, jugadores, entrenamientos, bienestar y rendimiento en una plataforma diseñada para clubes modernos. <span style={{ color: 'var(--ink)', fontWeight: 500 }}>Sin Excels. Sin grupos de WhatsApp. Sin caos.</span>
          </p>

          {/* CTAs */}
          <div className="hero-cta" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <PremiumButton primary href="https://carlesserra.com">Empezar ahora</PremiumButton>
            <PremiumButton>Ver demo (2 min)</PremiumButton>
          </div>

          {/* Bottom meta strip */}
          <div className="hero-meta" style={{
            display: 'flex', gap: 28, paddingTop: 24,
            borderTop: '1px solid var(--line)', flexWrap: 'wrap',
          }}>
            {[
              ['12+', 'equipos por club'],
              ['250+', 'jugadores activos'],
              ['1', 'plataforma centralizada'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.04em' }}>{k}</div>
                <div style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: dashboard mockup with floating chips */}
        <div className="hero-mock-wrap" style={{ position: 'relative', minHeight: 580 }}>
          <div className="hero-mock" style={{ position: 'relative', zIndex: 2 }}>
            <DashboardMockup />
          </div>

          {/* Floating chips */}
          <div className="float-chip float-chip-1" style={{
            position: 'absolute', top: '4%', left: '-8%', zIndex: 3,
            background: 'var(--paper)', color: 'var(--ink)',
            padding: '10px 14px', borderRadius: 100,
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 12px 32px rgba(24,28,32,0.10)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--lime-dim)' }} />
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Asistencia</div>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em' }}>92%</div>
            </div>
          </div>

          <div className="float-chip float-chip-2" style={{
            position: 'absolute', top: '32%', right: '-12%', zIndex: 3,
            background: 'var(--paper)', border: '1px solid var(--line)',
            padding: '12px 16px', borderRadius: 14,
            boxShadow: '0 16px 40px rgba(24,28,32,0.10)',
            minWidth: 180,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--crimson)', boxShadow: '0 0 8px var(--crimson)' }} />
              <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>3 alertas</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>Jugadores con<br/>fatiga elevada</div>
          </div>

          <div className="float-chip float-chip-3" style={{
            position: 'absolute', bottom: '14%', left: '-10%', zIndex: 3,
            background: 'linear-gradient(135deg, var(--lime), var(--brand-bright))', color: '#fff',
            padding: '12px 16px', borderRadius: 14,
            boxShadow: '0 12px 36px rgba(26,115,232,0.30)',
          }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.85 }}>Próximo partido</div>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>Sáb · 17:00</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>Juvenil A vs Atlético</div>
          </div>

          <div className="float-chip float-chip-4" style={{
            position: 'absolute', bottom: '4%', right: '-6%', zIndex: 3,
            background: 'var(--paper)', border: '1px solid var(--line)',
            padding: '10px 14px', borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 12px 32px rgba(24,28,32,0.10)',
          }}>
            <svg width="44" height="22" viewBox="0 0 44 22">
              <polyline points="0,16 8,12 16,14 24,8 32,10 44,4" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fatiga media</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>64% <span style={{ color: 'var(--lime)', fontSize: 11 }}>↘ −4%</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM BUTTON
// ─────────────────────────────────────────────────────────────────────────────
function PremiumButton({ children, primary, onClick, href }) {
  const ref = useRef(null);
  const onEnter = e => gsap.to(e.currentTarget, { y: -2, duration: 0.3, ease: 'power2.out' });
  const onLeave = e => gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: 'power2.out' });
  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };
  if (primary) {
    return (
      <Tag ref={ref} onMouseEnter={onEnter} onMouseLeave={onLeave} {...linkProps} style={{
        background: 'var(--lime)', color: '#fff', border: 'none',
        padding: '15px 26px', borderRadius: 100, fontSize: 14, fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em',
        display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
        boxShadow: '0 6px 24px rgba(26,115,232,0.30)',
      }}>
        {children}
        <span style={{
          width: 24, height: 24, borderRadius: '50%', background: 'var(--lime-dim)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
        }}>{Icons.arrow(12)}</span>
      </Tag>
    );
  }
  return (
    <Tag ref={ref} onMouseEnter={onEnter} onMouseLeave={onLeave} {...linkProps} style={{
      background: 'transparent', color: 'var(--ink)',
      border: '1px solid var(--line-strong)',
      padding: '15px 24px', borderRadius: 100, fontSize: 14, fontWeight: 500,
      cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em',
      display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
      transition: 'border-color 0.3s',
    }}
    onMouseOver={e => e.currentTarget.style.borderColor = 'var(--lime)'}
    onMouseOut={e => e.currentTarget.style.borderColor = 'var(--line-strong)'}>
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD MOCKUP — réplica de la pantalla "BeProfesional / Home"
// ─────────────────────────────────────────────────────────────────────────────
function DashboardMockup() {
  // Calendar layout for May 2026 (May 1 = Friday) — entrenamientos / partidos / hoy
  const calendar = [
    [{d:27,t:'train',count:3,prev:true},{d:28,t:'train'},{d:29,muted:true},{d:30,t:'train'},{d:1,t:'train'},{d:2,t:'match'},{d:3,today:true}],
    [{d:4,t:'train'},{d:5,t:'train'},{d:6},{d:7,t:'train'},{d:8,t:'train'},{d:9,t:'match'},{d:10}],
    [{d:11,t:'train'},{d:12,t:'train'},{d:13},{d:14,t:'train'},{d:15,t:'train'},{d:16},{d:17}],
    [{d:18,t:'train'},{d:19,t:'train'},{d:20},{d:21,t:'train'},{d:22,t:'train'},{d:23},{d:24}],
    [{d:25,t:'train'},{d:26,t:'train'},{d:27},{d:28,t:'train'},{d:29,t:'train'},{d:30},{d:31}],
    [{d:1,t:'train',next:true},{d:2,t:'train',next:true},{d:3,next:true},{d:4,t:'train',next:true},{d:5,t:'train',next:true},{d:6,next:true},{d:7,next:true}],
  ];

  return (
    <div className="dash-mock" style={{
      background: '#F4F6FB', border: '1px solid var(--line)',
      borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(24,28,32,0.10), 0 0 0 1px rgba(24,28,32,0.04)',
      display: 'grid', gridTemplateColumns: '108px 1fr 132px', minHeight: 560,
      fontSize: 10,
    }}>
      {/* Sidebar */}
      <aside style={{
        background: '#F4F6FB', borderRight: '1px solid var(--line)',
        padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--lime)', letterSpacing: '-0.02em' }}>BeProfessional</div>
          <div style={{ fontSize: 8, color: 'var(--muted-2)', marginTop: 1 }}>Sant Jordi Juvenil</div>
        </div>

        {/* Volver */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 8px', borderRadius: 8, background: '#fff',
          border: '1px solid var(--line)', color: 'var(--lime)', fontWeight: 600, fontSize: 9,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Volver
        </div>

        {[
          {label:'Home', active:true, d:'M3 9l9-7 9 7v11a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2z'},
          {label:'Players', d:'M16 11a3 3 0 100-6 3 3 0 000 6zM8 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 2.5-5 6-5s6 2 6 5'},
          {label:'Partidos', d:'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z'},
          {label:'Chats', d:'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8z'},
          {label:'Estadisticas', d:'M3 3v18h18M7 14l4-4 4 4 5-5'},
          {label:'Play Maker', d:'M5 3l14 9-14 9V3z'},
          {label:'Codigos', d:'M16 18l6-6-6-6M8 6l-6 6 6 6'},
          {label:'Settings', d:'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z'},
        ].map(it => (
          <div key={it.label} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 8px', borderRadius: 8,
            background: it.active ? '#fff' : 'transparent',
            border: it.active ? '1px solid var(--line)' : '1px solid transparent',
            color: it.active ? 'var(--ink)' : 'var(--muted)',
            fontSize: 9, fontWeight: it.active ? 600 : 500,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={it.d}/></svg>
            {it.label}
          </div>
        ))}

        {/* Notificaciones card */}
        <div style={{
          marginTop: 'auto', background: '#fff', border: '1px solid var(--line)', borderRadius: 10,
          padding: '8px 9px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 7, fontFamily: 'var(--mono)', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Notif.</div>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)' }} />
          </div>
          <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6 }}>14 sin leer</div>
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 5 }}>
            <div style={{ fontSize: 8, fontWeight: 600, color: 'var(--ink)' }}>Nuevo partido</div>
            <div style={{ fontSize: 7, color: 'var(--muted-2)', lineHeight: 1.3, marginTop: 1 }}>Entrenador añadió UD Ibiza…</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ padding: '14px 16px', background: '#fff', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>BeProfesional</div>
            <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 4 }}>Sesión de entrenamiento programada para las 05:00 p. m.</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--lime)', marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Entrenador</div>
          </div>
          <div style={{
            padding: '4px 10px', borderRadius: 100, background: 'var(--azul-tenue)',
            color: 'var(--lime)', fontSize: 9, fontWeight: 600,
          }}>2025/2026</div>
        </div>

        {/* Metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
          {[
            { icon: 'M9 9a3 3 0 116 0c0 1.5-1 2-2 3-1 .5-1 1.5-1 2M12 17h.01', label: 'Estado mental', val: '80%', sub: 'Promedio del estado mental' },
            { icon: 'M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z', label: 'Fatiga', val: '70%', sub: 'Promedio de fatiga reportada' },
            { icon: 'M16 11a3 3 0 100-6 3 3 0 000 6zM8 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 2.5-5 6-5s6 2 6 5', label: 'Disponibilidad', val: '8%', sub: 'Jugadores asistirán hoy' },
          ].map(m => (
            <div key={m.label} style={{
              background: '#fff', border: '1px solid var(--line)', borderRadius: 10,
              padding: '10px 11px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={m.icon}/></svg>
                <span style={{ fontSize: 7, fontFamily: 'var(--mono)', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</span>
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 24, fontWeight: 600, color: 'var(--lime)', letterSpacing: '-0.04em', lineHeight: 1 }}>{m.val}</div>
              <div style={{ fontSize: 7, color: 'var(--muted-2)', marginTop: 4, lineHeight: 1.3 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Planificacion card */}
        <div style={{
          background: '#fff', border: '1px solid var(--line)', borderRadius: 12,
          padding: '12px 14px',
        }}>
          {/* Card header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', background: 'var(--lime)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 7, fontFamily: 'var(--mono)', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Planificación</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 1 }}>Calendario del equipo</div>
              <div style={{ fontSize: 8, color: 'var(--muted)', marginTop: 2 }}>Visualiza entrenamientos y partidos.</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 7, color: 'var(--lime)', fontWeight: 600 }}>Domingo, 3 de mayo</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 4, justifyContent: 'flex-end' }}>
                <div style={{ background: 'var(--lime)', color: '#fff', fontSize: 8, fontWeight: 600, padding: '3px 8px', borderRadius: 100 }}>+ Añadir</div>
                <div style={{ background: '#fff', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: 8, fontWeight: 600, padding: '3px 8px', borderRadius: 100 }}>FIJOS</div>
              </div>
            </div>
          </div>

          {/* Two-column: calendar + eventos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 10 }}>
            {/* Calendar */}
            <div style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '8px 10px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: 'var(--muted)' }}>‹</span>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 7, fontFamily: 'var(--mono)', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mes actual</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 12, fontWeight: 600, letterSpacing: '-0.02em' }}>Mayo De 2026</div>
                </div>
                <span style={{ fontSize: 9, color: 'var(--muted)' }}>›</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, fontSize: 6 }}>
                {['LUN','MAR','MIE','JUE','VIE','SAB','DOM'].map(d => (
                  <div key={d} style={{ textAlign: 'center', color: 'var(--muted-2)', fontFamily: 'var(--mono)', letterSpacing: '0.04em', padding: '2px 0' }}>{d}</div>
                ))}
                {calendar.flat().map((c, i) => {
                  const isMatch = c.t === 'match';
                  const isTrain = c.t === 'train';
                  const isToday = c.today;
                  const dim = c.muted || c.next;
                  return (
                    <div key={i} style={{
                      aspectRatio: '1',
                      border: isMatch ? '1.5px solid #FB923C' : isToday ? 'none' : '1px solid var(--line)',
                      borderRadius: 4,
                      background: isToday ? 'var(--lime)' : '#fff',
                      color: isToday ? '#fff' : dim ? 'var(--muted-2)' : 'var(--ink)',
                      opacity: dim ? 0.45 : 1,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      fontSize: 8, fontWeight: 600, position: 'relative',
                    }}>
                      {c.d}
                      {(isTrain || isMatch) && !isToday && (
                        <div style={{ display: 'flex', gap: 1, position: 'absolute', bottom: 2 }}>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: isMatch ? '#FB923C' : 'var(--lime)' }} />
                          {c.count > 1 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--lime)' }} />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 7, color: 'var(--muted-2)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--lime)' }} />Entrenamientos</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FB923C' }} />Partidos</span>
              </div>
            </div>

            {/* Eventos del día */}
            <div style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '8px 10px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 7, fontFamily: 'var(--mono)', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Eventos del día</div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 11, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 1 }}>Domingo, 3 de mayo</div>
                </div>
                <div style={{ fontSize: 7, color: 'var(--lime)', background: 'var(--azul-tenue)', padding: '2px 6px', borderRadius: 100, fontWeight: 600 }}>1 evento</div>
              </div>
              <div style={{
                background: 'var(--paper-dim)', border: '1px solid var(--line)', borderRadius: 6,
                padding: '8px 10px', marginTop: 6,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 7, fontFamily: 'var(--mono)', color: '#FB923C', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Partido</span>
                  <span style={{ fontSize: 9, fontFamily: 'var(--mono)', fontWeight: 600 }}>18:00</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, letterSpacing: '-0.01em' }}>Partido vs Cosas</div>
                <div style={{ display: 'flex', gap: 10, fontSize: 7, color: 'var(--muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-7 8-12a8 8 0 10-16 0c0 5 8 12 8 12z"/></svg>
                    cosas
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
                    Modalidad CASA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column — Perfil destacado */}
      <aside style={{
        background: '#F4F6FB', borderLeft: '1px solid var(--line)',
        padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ fontSize: 7, fontFamily: 'var(--mono)', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Perfil destacado</div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 17, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95 }}>JOSE<br/>BORDALAS</div>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ fontSize: 6, fontWeight: 700, padding: '2px 5px', borderRadius: 4, background: '#FEF3C7', color: '#B45309', letterSpacing: '0.06em' }}>★ ELITE</span>
          <span style={{ fontSize: 6, fontWeight: 600, padding: '2px 5px', borderRadius: 4, background: '#fff', border: '1px solid var(--line)', color: 'var(--muted)', letterSpacing: '0.06em' }}>SUB-21</span>
        </div>

        {/* Player photo card */}
        <div style={{
          aspectRatio: '0.85', borderRadius: 10, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(160deg, #2C5F9E 0%, #1A4577 60%, #0F2D55 100%)',
          border: '1px solid var(--line)',
        }}>
          {/* Stylized silhouette */}
          <svg width="100%" height="100%" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="50" cy="38" r="18" fill="#E8C19A"/>
            <path d="M50 56 C 30 60 18 75 18 95 L 18 120 L 82 120 L 82 95 C 82 75 70 60 50 56 Z" fill="#1A73E8"/>
            <circle cx="42" cy="34" r="2.5" fill="#1A1A1A"/>
            <circle cx="58" cy="34" r="2.5" fill="#1A1A1A"/>
            <path d="M44 44 Q 50 48 56 44" stroke="#1A1A1A" strokeWidth="1" fill="none" strokeLinecap="round"/>
            <rect x="40" y="28" width="20" height="2" fill="#1A1A1A"/>
          </svg>
          <div style={{ position: 'absolute', top: 6, right: 6, fontSize: 7, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '1px 4px', borderRadius: 3 }}>JB</div>
          <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 6, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Posición</div>
              <div style={{ fontSize: 9, fontWeight: 700 }}>Entrenador</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 6, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>Partidos</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>0</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 7, fontFamily: 'var(--mono)', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>Rendimiento</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
          {[['Goles','43'],['G. Contra','5'],['Partidos','12'],['Victorias','5']].map(([l,v]) => (
            <div key={l} style={{
              background: '#fff', border: '1px solid var(--line)', borderRadius: 6,
              padding: '6px 7px',
            }}>
              <div style={{ fontSize: 6, fontFamily: 'var(--mono)', color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 16, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARQUEE STRIP — between hero and next section
// ─────────────────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Equipos', 'Jugadores', 'Entrenamientos', 'Partidos', 'Bienestar', 'Asistencia', 'Estadísticas', 'Carga · RPE', 'Alertas'];
  return (
    <div style={{
      borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
      padding: '20px 0', overflow: 'hidden', whiteSpace: 'nowrap',
      background: 'var(--azul-tenue)',
    }}>
      <div style={{ display: 'inline-flex', gap: 40, animation: 'marquee 40s linear infinite' }}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 40 }}>
            <span style={{ fontFamily: 'var(--display)', fontStyle: 'italic', fontWeight: 300, fontSize: 32, letterSpacing: '-0.03em', color: i % 3 === 1 ? 'var(--lime)' : 'var(--ink)' }}>{it}</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--lime-dim)', opacity: 0.4 }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTROL TOTAL — big editorial section, varied block sizes
// ─────────────────────────────────────────────────────────────────────────────
function ControlSection() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-title-line', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 60, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out',
      });
      gsap.from('.ct-block', {
        scrollTrigger: { trigger: '.ct-grid', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: '140px 32px 80px', position: 'relative' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: 40, alignItems: 'end',
          marginBottom: 80, paddingBottom: 24, borderBottom: '1px solid var(--line)',
        }} className="hero-grid">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              [01] · Producto
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--lime)' }}>06 funciones</div>
          </div>
          <h2 style={{
            fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(36px, 5.5vw, 76px)',
            lineHeight: 1, letterSpacing: '-0.04em', maxWidth: 900,
          }}>
            <span className="ct-title-line" style={{ display: 'block' }}>No es solo gestión.</span>
            <span className="ct-title-line" style={{ display: 'block' }}>
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Es</span> control total <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: 'var(--lime)', verticalAlign: 'middle', marginLeft: 8 }}></span>
            </span>
          </h2>
        </div>

        {/* Bento-style varied grid */}
        <div className="ct-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridAutoRows: 'minmax(220px, auto)',
          gap: 16,
        }}>
          {/* 1. Panel del club — wide, hero block */}
          <div className="ct-block" style={{
            gridColumn: 'span 4', gridRow: 'span 2',
            background: 'var(--paper)', color: 'var(--ink)', borderRadius: 18,
            padding: '32px', position: 'relative', overflow: 'hidden',
            border: '1px solid var(--line)',
            boxShadow: '0 12px 40px rgba(24,28,32,0.06)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ position: 'absolute', top: -100, right: -100, width: 320, height: 320, borderRadius: '50%', background: 'var(--lime)', opacity: 0.18, filter: 'blur(80px)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>01 · Panel del club</div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: 480 }}>
                Una vista para <span style={{ fontStyle: 'italic', fontWeight: 300 }}>verlo todo</span> sin abrir nada.
              </h3>
            </div>
            {/* Mini stat row */}
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--line)', paddingTop: 20 }}>
              {[['12','equipos'],['248','jugadores'],['5','molestias'],['3','partidos']].map(([k,v],i) => (
                <div key={k} style={{ paddingLeft: i ? 16 : 0, borderLeft: i ? '1px solid var(--line)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.04em' }}>{k}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Bienestar — accent */}
          <div className="ct-block" style={{
            gridColumn: 'span 2', gridRow: 'span 1',
            background: 'linear-gradient(135deg, var(--lime), var(--brand-bright))', color: '#fff', borderRadius: 18,
            padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(26,115,232,0.25)',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>02 · Bienestar</div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 24, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Check-in <span style={{ fontStyle: 'italic', fontWeight: 300 }}>diario</span>
              </h3>
            </div>
            {/* mini chips */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Fatiga','Sueño','Mental','RPE'].map(c => (
                <span key={c} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.20)', fontWeight: 500 }}>{c}</span>
              ))}
            </div>
          </div>

          {/* 3. Entrenamientos */}
          <div className="ct-block" style={{
            gridColumn: 'span 2', gridRow: 'span 1',
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
            padding: 24, position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(24,28,32,0.04)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>03 · Entrenamientos</div>
            <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 24, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>Sesiones planificadas</h3>
            {/* week strip */}
            <div style={{ display: 'flex', gap: 4 }}>
              {['L','M','X','J','V','S','D'].map((d, i) => {
                const intensity = [3,2,4,1,3,0,0][i];
                return (
                  <div key={d} style={{ flex: 1 }}>
                    <div style={{
                      height: 36, borderRadius: 6, marginBottom: 4,
                      background: intensity ? `rgba(26,115,232,${0.15 + intensity * 0.18})` : 'var(--paper-dim)',
                      border: '1px solid var(--line)',
                    }} />
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted-2)', textAlign: 'center' }}>{d}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Partidos */}
          <div className="ct-block" style={{
            gridColumn: 'span 3', gridRow: 'span 1',
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
            padding: 24, position: 'relative',
            boxShadow: '0 8px 24px rgba(24,28,32,0.04)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>04 · Partidos</div>
            <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
              Convocatorias
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '10px 0', borderTop: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--lime)' }}>SÁB · 17:00</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>Juvenil A vs Atlético CF</div>
              </div>
              <div style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>18 conv.</div>
            </div>
          </div>

          {/* 5. Asistencia */}
          <div className="ct-block" style={{
            gridColumn: 'span 3', gridRow: 'span 1',
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
            padding: 24,
            boxShadow: '0 8px 24px rgba(24,28,32,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>05 · Asistencia</div>
                <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                  Histórico, en directo
                </h3>
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 48, fontWeight: 600, letterSpacing: '-0.05em', color: 'var(--lime)' }}>92<span style={{ fontSize: 22 }}>%</span></div>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({length: 30}, (_, i) => {
                const present = i !== 4 && i !== 11 && i !== 19 && i !== 23;
                return <div key={i} style={{ flex: 1, height: 24, borderRadius: 3, background: present ? 'var(--lime)' : 'rgba(230,57,70,0.45)', opacity: present ? 0.9 : 1 }} />;
              })}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted-2)', marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>HACE 30 DÍAS</span><span>HOY</span>
            </div>
          </div>

          {/* 6. Estadísticas */}
          <div className="ct-block" style={{
            gridColumn: 'span 6', gridRow: 'span 1',
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
            padding: '28px 32px',
            boxShadow: '0 8px 24px rgba(24,28,32,0.04)',
            display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: 32, alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>06 · Estadísticas</div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 30, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Datos</span> que cuentan una historia
              </h3>
            </div>
            {[
              { v: '+1.500', l: 'Datos / semana' },
              { v: '14', l: 'KPIs por equipo' },
              { v: '0,3s', l: 'Latencia consulta' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 44, fontWeight: 500, letterSpacing: '-0.05em', color: 'var(--ink)' }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROLE SWITCHER
// ─────────────────────────────────────────────────────────────────────────────
function RoleSwitcher() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const contentRef = useRef(null);

  const roles = [
    {
      label: 'Jugador',
      tag: 'Vista personal',
      title: 'Tu rendimiento, en tu bolsillo.',
      desc: 'Consulta tus entrenamientos, registra tus sensaciones tras cada sesión y sigue tu evolución física semana a semana.',
      bullets: ['Calendario personal', 'Check-in en 30s', 'Mi rendimiento', 'Notificaciones del cuerpo técnico'],
      stat: { v: '30s', l: 'tiempo medio de check-in' },
    },
    {
      label: 'Entrenador',
      tag: 'Vista cuerpo técnico',
      title: 'Planifica con criterio. Decide con datos.',
      desc: 'Diseña sesiones, controla la asistencia, analiza la carga y el RPE de cada jugador. Sin abrir cinco apps.',
      bullets: ['Planificador semanal', 'Pase de lista 1-tap', 'Carga y RPE por sesión', 'Comparativa entre jugadores'],
      stat: { v: '4×', l: 'más rápido planificar' },
    },
    {
      label: 'Staff',
      tag: 'Vista administrativa',
      title: 'Toda la operativa del club, ordenada.',
      desc: 'Gestiona altas, bajas, fichas, documentación y comunicación con familias. Y mira el club entero desde una sola pantalla.',
      bullets: ['Fichas centralizadas', 'Comunicación familias', 'Documentos por jugador', 'Vista global del club'],
      stat: { v: '0', l: 'hojas de cálculo' },
    },
    {
      label: 'Dirección',
      tag: 'Vista directiva',
      title: 'Decisiones rápidas con la foto completa.',
      desc: 'Visualiza KPIs del club, evolución de equipos, alertas críticas y rendimiento agregado. Para reuniones que duran lo justo.',
      bullets: ['KPIs ejecutivos', 'Alertas en tiempo real', 'Comparativas por categoría', 'Informes exportables'],
      stat: { v: '1 click', l: 'a cualquier dato' },
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rs-header > *', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      });
      gsap.from('.rs-tab', {
        scrollTrigger: { trigger: '.rs-tabs', start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
  }, [active]);

  const r = roles[active];
  return (
    <section ref={ref} style={{
      padding: '140px 32px 100px', position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(26,115,232,0.04), transparent)',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        {/* Header */}
        <div className="rs-header hero-grid" style={{
          display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: 40, alignItems: 'end',
          marginBottom: 60, paddingBottom: 24, borderBottom: '1px solid var(--line)',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              [02] · Roles
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--lime)' }}>04 perfiles</div>
          </div>
          <h2 style={{
            fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(36px, 5.5vw, 76px)',
            lineHeight: 1, letterSpacing: '-0.04em',
          }}>
            Una plataforma. <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Cuatro</span> formas de usarla.
          </h2>
        </div>

        {/* Tabs */}
        <div className="rs-tabs" style={{ display: 'flex', gap: 0, marginBottom: 48, borderBottom: '1px solid var(--line)' }}>
          {roles.map((rr, i) => (
            <button key={rr.label} className="rs-tab"
              onClick={() => setActive(i)}
              style={{
                background: 'transparent', border: 'none', color: i === active ? 'var(--ink)' : 'var(--muted-2)',
                padding: '18px 24px', fontSize: 16, fontWeight: 500, cursor: 'pointer',
                fontFamily: 'inherit', letterSpacing: '-0.01em',
                position: 'relative', transition: 'color 0.3s',
              }}
              onMouseEnter={e => { if (i !== active) e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={e => { if (i !== active) e.currentTarget.style.color = 'var(--muted-2)'; }}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.5, marginRight: 8 }}>0{i+1}</span>
              {rr.label}
              {i === active && (
                <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: 'var(--lime)' }} />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} style={{
          display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 80, alignItems: 'center', minHeight: 380,
        }} className="hero-grid">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--lime)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{r.tag}</div>
            <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24, maxWidth: 600 }}>
              {r.title}
            </h3>
            <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 32, maxWidth: 540 }}>{r.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 480 }}>
              {r.bullets.map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--lime)' }}>+</span>
                  <span style={{ fontSize: 14, color: 'var(--ink)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: big stat block */}
          <div style={{
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
            padding: 36, position: 'relative', overflow: 'hidden', minHeight: 320,
            boxShadow: '0 12px 40px rgba(24,28,32,0.06)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 240, height: 240, borderRadius: '50%', background: 'var(--lime)', opacity: 0.12, filter: 'blur(40px)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Resultado típico</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(64px, 10vw, 140px)', fontWeight: 500, lineHeight: 0.9, letterSpacing: '-0.06em', color: 'var(--lime)' }}>{r.stat.v}</div>
              <div style={{ fontSize: 18, color: 'var(--ink)', marginTop: 12 }}>{r.stat.l}</div>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.label} · vista</span>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--lime)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icons.arrowUR(14)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WELLNESS PANEL — split layout, varied indicators
// ─────────────────────────────────────────────────────────────────────────────
function WellnessPanel() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wp-bar-fill', {
        scrollTrigger: { trigger: '.wp-grid', start: 'top 70%' },
        scaleX: 0, transformOrigin: 'left center', duration: 1.4, stagger: 0.08, ease: 'power3.out',
      });
      gsap.from('.wp-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      });
      gsap.from('.wp-title-line', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const indicators = [
    { name: 'Fatiga', val: 64, max: 100, accent: false, kind: 'bar' },
    { name: 'Sueño', val: 7.4, max: 10, accent: true, kind: 'bar', unit: 'h' },
    { name: 'Estado mental', val: 82, max: 100, accent: false, kind: 'bar', unit: '%' },
    { name: 'RPE medio', val: 6.2, max: 10, accent: true, kind: 'bar' },
    { name: 'Carga semanal', val: 78, max: 100, accent: false, kind: 'bar', unit: '%' },
    { name: 'Molestias', val: 5, max: 248, accent: false, kind: 'count', label: 'jugadores' },
  ];

  return (
    <section ref={ref} style={{
      padding: '120px 32px',
      background: 'var(--paper-dim)', color: 'var(--ink)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Diagonal stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'var(--line)' }} />

      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 80 }} className="hero-grid">
        {/* Left: title + meta */}
        <div style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
            [03] · Bienestar
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.04em', marginBottom: 28 }}>
            <span className="wp-title-line" style={{ display: 'block' }}>Lo que no</span>
            <span className="wp-title-line" style={{ display: 'block' }}>se mide,</span>
            <span className="wp-title-line" style={{ display: 'block', fontStyle: 'italic', fontWeight: 300 }}>se rompe.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 420, marginBottom: 24 }}>
            Fatiga, sueño, estado mental, RPE, carga, molestias. Indicadores diarios para detectar riesgos antes de que se conviertan en lesiones.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 100, background: 'var(--lime)', color: '#fff' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.7)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>En vivo</span>
          </div>
        </div>

        {/* Right: indicators panel */}
        <div className="wp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {indicators.map((ind, i) => (
            <div key={ind.name} className="wp-card" style={{
              background: ind.accent ? 'linear-gradient(135deg, var(--lime), var(--brand-bright))' : 'var(--paper)',
              color: ind.accent ? '#fff' : 'var(--ink)',
              border: ind.accent ? 'none' : '1px solid var(--line)',
              boxShadow: ind.accent ? '0 12px 32px rgba(26,115,232,0.20)' : '0 6px 18px rgba(24,28,32,0.04)',
              borderRadius: 14, padding: '22px 22px',
              gridColumn: i === 5 ? 'span 2' : 'auto',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: ind.accent ? 'rgba(255,255,255,0.75)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ind.name}</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 36, fontWeight: 500, letterSpacing: '-0.04em', color: ind.accent ? '#fff' : 'var(--ink)' }}>
                  {ind.val}{ind.unit ? <span style={{ fontSize: 18, opacity: 0.6 }}>{ind.unit}</span> : ''}
                </div>
              </div>
              {ind.kind === 'bar' ? (
                <>
                  <div style={{ height: 4, borderRadius: 2, background: ind.accent ? 'rgba(255,255,255,0.25)' : 'rgba(24,28,32,0.08)', overflow: 'hidden' }}>
                    <div className="wp-bar-fill" style={{
                      height: '100%', width: `${(ind.val / ind.max) * 100}%`,
                      background: ind.accent ? '#fff' : 'var(--lime)', borderRadius: 2,
                    }} />
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: ind.accent ? 'rgba(255,255,255,0.6)' : 'var(--muted)', marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <span>0</span><span>{ind.max}{ind.unit || ''}</span>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>
                  de {ind.max} {ind.label}
                  <span style={{ marginLeft: 'auto', padding: '3px 8px', background: 'var(--crimson)', color: '#fff', borderRadius: 4, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Atención</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLUB COMMAND CENTER — black, dramatic
// ─────────────────────────────────────────────────────────────────────────────
function ClubCommandCenter() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cc-stat-num', {
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      });
      gsap.from('.cc-row', {
        scrollTrigger: { trigger: '.cc-table', start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const teams = [
    { n: 'Amateur', cat: 'Amateur', players: 24, load: 78, alerts: 2, rec: 'Reducir carga' },
    { n: 'Juvenil A', cat: 'Juvenil', players: 22, load: 64, alerts: 0, rec: '—' },
    { n: 'Juvenil B', cat: 'Juvenil', players: 21, load: 58, alerts: 1, rec: 'Revisar JL' },
    { n: 'Cadete A', cat: 'Cadete', players: 20, load: 52, alerts: 0, rec: '—' },
    { n: 'Infantil A', cat: 'Infantil', players: 18, load: 44, alerts: 1, rec: 'Molestias MC' },
    { n: 'Alevín', cat: 'Alevín', players: 16, load: 38, alerts: 0, rec: '—' },
  ];

  return (
    <section ref={ref} style={{ padding: '140px 32px 120px', position: 'relative', overflow: 'hidden' }}>
      {/* Big number watermark */}
      <div style={{
        position: 'absolute', top: 60, right: -20, fontFamily: 'var(--display)',
        fontSize: 'clamp(180px, 28vw, 400px)', fontWeight: 600, letterSpacing: '-0.06em',
        color: 'rgba(24,28,32,0.04)', lineHeight: 0.8, pointerEvents: 'none',
      }}>04</div>

      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: 60, display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: 40, paddingBottom: 24, borderBottom: '1px solid var(--line)' }} className="hero-grid">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              [04] · Club Command
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--lime)' }}>Función estrella</div>
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(36px, 5.5vw, 76px)', lineHeight: 1, letterSpacing: '-0.04em' }}>
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Todos</span> los equipos del club, en una sola pantalla.
          </h2>
        </div>

        {/* Top stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, marginBottom: 40, borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }} className="cc-stats-grid">
          {[
            ['12', 'Equipos'],
            ['248', 'Jugadores'],
            ['5', 'Con molestias', true],
            ['3', 'Próximos partidos'],
            ['8', 'Entrenamientos hoy'],
          ].map(([v, l, alert], i) => (
            <div key={l} className="cc-stat-num" style={{
              padding: '32px 24px',
              borderLeft: i ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--display)', fontWeight: 500,
                fontSize: 'clamp(48px, 6.5vw, 88px)', lineHeight: 0.95, letterSpacing: '-0.05em',
                color: alert ? 'var(--crimson)' : 'var(--ink)',
              }}>{v}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Teams table */}
        <div className="cc-table-wrap">
        <div className="cc-table" style={{
          background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(24,28,32,0.06)',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr 1.4fr 0.8fr 1.2fr',
            gap: 16, padding: '14px 24px', background: 'var(--paper-dim)',
            borderBottom: '1px solid var(--line)',
            fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            <div>Equipo</div><div>Categoría</div><div>Jug.</div><div>Carga</div><div>Alertas</div><div>Recomendación</div>
          </div>
          {teams.map((t, i, arr) => (
            <div key={t.n} className="cc-row" style={{
              display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr 1.4fr 0.8fr 1.2fr',
              gap: 16, padding: '18px 24px', alignItems: 'center',
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--azul-tenue)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.alerts ? 'var(--crimson)' : 'var(--lime)' }} />
                <span style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 17, letterSpacing: '-0.02em' }}>{t.n}</span>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', padding: '3px 8px', background: 'var(--paper-dim)', border: '1px solid var(--line)', borderRadius: 4, justifySelf: 'start' }}>{t.cat}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>{t.players}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(24,28,32,0.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${t.load}%`, background: t.load > 75 ? 'var(--crimson)' : 'var(--lime)', borderRadius: 2 }} />
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, width: 32, color: 'var(--muted)' }}>{t.load}%</span>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: t.alerts ? 'var(--crimson)' : 'var(--muted-2)' }}>
                {t.alerts > 0 ? `${t.alerts} ⚠` : '—'}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{t.rec}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BENEFITS — varied editorial blocks
// ─────────────────────────────────────────────────────────────────────────────
function Benefits() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bf-block', {
        scrollTrigger: { trigger: '.bf-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ marginBottom: 60, display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: 40, paddingBottom: 24, borderBottom: '1px solid var(--line)' }} className="hero-grid">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              [05] · Por qué
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--lime)' }}>06 razones</div>
          </div>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(36px, 5.5vw, 76px)', lineHeight: 1, letterSpacing: '-0.04em' }}>
            Lo que <span style={{ fontStyle: 'italic', fontWeight: 300 }}>cambia</span> cuando todo está conectado.
          </h2>
        </div>

        <div className="bf-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, gridAutoRows: 'minmax(180px, auto)',
        }}>
          {/* Big stat */}
          <div className="bf-block" style={{
            gridColumn: 'span 5', gridRow: 'span 2',
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
            padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '0 12px 40px rgba(24,28,32,0.06)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>01 · Centralización</div>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(80px, 12vw, 180px)', fontWeight: 500, lineHeight: 0.85, letterSpacing: '-0.06em', color: 'var(--lime)' }}>1 app</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: 'var(--muted)', marginTop: 8 }}>en lugar de seis</div>
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 320 }}>
              Adiós a la mezcla de Excel, WhatsApp, Drive, Notas, Google Calendar y la cabeza del entrenador.
            </div>
          </div>

          {/* Quote / pull quote */}
          <div className="bf-block" style={{
            gridColumn: 'span 7', gridRow: 'span 1',
            background: 'linear-gradient(135deg, var(--lime), var(--lime-dim))', color: '#fff', borderRadius: 18,
            padding: '32px 36px', display: 'flex', alignItems: 'center', gap: 24,
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 14px 40px rgba(26,115,232,0.30)',
          }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 90, fontWeight: 600, lineHeight: 0.7, letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.30)', flexShrink: 0 }}>"</div>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: 14 }}>
                Pasamos de tres reuniones para entender el estado del club a una sola pantalla.
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.75)' }}>
                Director deportivo · Club piloto
              </div>
            </div>
          </div>

          {/* small block 1 */}
          <div className="bf-block" style={{
            gridColumn: 'span 4', gridRow: 'span 1',
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: 28,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(24,28,32,0.04)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>02 · Comunicación</div>
            <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Menos grupos. <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--muted)' }}>Más claridad.</span>
            </h3>
          </div>

          {/* small block 2 */}
          <div className="bf-block" style={{
            gridColumn: 'span 3', gridRow: 'span 1',
            background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: 28,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(24,28,32,0.04)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>03 · Decisiones</div>
            <div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 56, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.04em' }}>3×</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>más rápido decidir con datos</div>
            </div>
          </div>

          {/* row 3 — three equal blocks */}
          {[
            { n: '04', t: 'Imagen profesional', d: 'Tu club transmite seriedad a jugadores, familias y patrocinadores.' },
            { n: '05', t: 'Cero hojas de cálculo', d: 'Deja atrás Excel para siempre. Los datos viven donde tienen que vivir.' },
            { n: '06', t: 'Histórico permanente', d: 'Cada temporada, cada jugador, cada sesión. Disponible siempre.' },
          ].map(b => (
            <div key={b.n} className="bf-block" style={{
              gridColumn: 'span 4', gridRow: 'span 1',
              background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18,
              padding: 28, display: 'flex', flexDirection: 'column', gap: 12,
              boxShadow: '0 6px 20px rgba(24,28,32,0.03)',
              transition: 'border-color 0.3s, background 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime)'; e.currentTarget.style.background = 'var(--azul-tenue)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--paper)'; }}
            >
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{b.n}</div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.03em' }}>{b.t}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA FINAL
// ─────────────────────────────────────────────────────────────────────────────
function CTA() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-line', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
      });
      gsap.to('.cta-blob', { scale: 1.15, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: '160px 32px 140px', position: 'relative', overflow: 'hidden' }}>
      <div className="cta-blob" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 900, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(26,115,232,0.20) 0%, transparent 60%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: 'linear-gradient(rgba(24,28,32,1) 1px, transparent 1px), linear-gradient(90deg, rgba(24,28,32,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 28 }}>
          [→] Empieza hoy
        </div>
        <h2 style={{
          fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(48px, 8vw, 128px)',
          lineHeight: 0.94, letterSpacing: '-0.05em', marginBottom: 36,
        }}>
          <span className="cta-line" style={{ display: 'block' }}>Profesionaliza</span>
          <span className="cta-line" style={{ display: 'block' }}><span style={{ fontStyle: 'italic', fontWeight: 300 }}>la gestión</span></span>
          <span className="cta-line" style={{ display: 'block' }}>de tu club <span style={{ display: 'inline-block', width: 18, height: 18, borderRadius: '50%', background: 'var(--lime)', verticalAlign: 'middle' }}></span></span>
        </h2>
        <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.55 }}>
          Setup en menos de 10 minutos. Empieza la próxima temporada con todo bajo control.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <PremiumButton primary href="https://carlesserra.com">Empezar ahora</PremiumButton>
          <PremiumButton>Solicitar demo</PremiumButton>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '60px 32px 32px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 60,
          paddingBottom: 48, borderBottom: '1px solid var(--line)',
        }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 24, fontStyle: 'italic', letterSpacing: '-0.04em' }}>be</span>
              <span style={{ fontWeight: 600, fontSize: 24, letterSpacing: '-0.05em' }}>Professional</span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', marginLeft: 4, alignSelf: 'center' }} />
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 320, lineHeight: 1.55 }}>
              Plataforma de gestión deportiva diseñada para clubes que quieren dejar de improvisar.
            </p>
          </div>
          {[
            { t: 'Producto', l: ['Funciones', 'Bienestar', 'Club Command', 'Roles'] },
            { t: 'Recursos', l: ['Documentación', 'Casos de éxito', 'Changelog', 'Estado'] },
            { t: 'Compañía', l: ['Sobre nosotros', 'Contacto', 'Privacidad', 'Términos'] },
          ].map(c => (
            <div key={c.t}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{c.t}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.l.map(li => (
                  <li key={li}><a href="#" style={{ fontSize: 14, color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--lime)'}
                    onMouseLeave={e => e.target.style.color = 'var(--ink)'}>{li}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)' }}>© 2026 beProfessional · Hecho para clubes que ganan partidos.</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.08em' }}>v 1.0 · ES</div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <ControlSection />
      <RoleSwitcher />
      <WellnessPanel />
      <ClubCommandCenter />
      <Benefits />
      <CTA />
      <Footer />
    </>
  );
}

export default App;
