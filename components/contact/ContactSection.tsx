'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_ENTRANCE, STAGGER } from '@/lib/animation/easings';
import { site } from '@/lib/site';
import JackScene from '@/components/jack/JackScene';

/**
 * PRD §4.6 — same glass treatment as the nav, real contact details, résumé
 * download, and a working form.
 *
 * Submissions POST to FormSubmit, which relays them to `site.email`. It was
 * chosen over Formspree/Resend because it needs no account, no dashboard
 * and no API key — nothing secret ends up in the repo — and over the
 * previous `mailto:` handler because that silently did nothing for anyone
 * without a configured desktop mail client, which is most visitors.
 *
 * ONE-TIME STEP: the very first submission triggers a confirmation email
 * to `site.email`. Click the link in it once and the endpoint is live
 * forever after. Until then nothing is delivered.
 *
 * If the request fails for any reason the UI falls back to a prefilled
 * mailto link rather than losing the message.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const mailtoFallback = `mailto:${site.email}?subject=${encodeURIComponent(
    `Portfolio enquiry — ${name || 'Hello'}`
  )}&body=${encodeURIComponent(`${message}\n\n—\n${name}\n${email}`.trim())}`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio enquiry — ${name || 'Hello'}`,
          // Honeypot: bots fill hidden fields, humans never see this one.
          _honey: '',
          _template: 'table',
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const rise = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-70px' },
    transition: { duration: 0.6, delay: i * STAGGER, ease: EASE_ENTRANCE },
  });

  const field =
    'w-full rounded-soft border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-silver-bright outline-none transition placeholder:text-silver-faint focus:border-white/25 focus:bg-white/[0.055]';

  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] items-center justify-center px-6 py-28"
    >
      <div className="panel panel-ticks w-full max-w-5xl p-6 sm:p-12">
        <div className="mb-10 flex items-baseline justify-between">
          <p className="eyebrow">Contact</p>
          <p className="tech-index">SEC 04</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <motion.h2
              {...rise(1)}
              className="mt-5 text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-[1.05] tracking-[-0.04em]"
            >
              Hiring, or building
              <br />
              something? Say hi.
            </motion.h2>

            <motion.dl {...rise(2)} className="mt-10 space-y-4">
              <div>
                <dt className="eyebrow mb-1">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-silver-bright underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Phone</dt>
                <dd>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="text-sm text-silver-bright underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </motion.dl>

            <motion.div {...rise(3)} className="mt-10 flex flex-wrap gap-2.5">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="press meta rounded-full border border-white/12 px-4 py-2 text-silver-bright hover:bg-white/[0.06]"
              >
                GitHub ↗
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="press meta rounded-full border border-white/12 px-4 py-2 text-silver-bright hover:bg-white/[0.06]"
              >
                LinkedIn ↗
              </a>
              <a
                href={site.resume}
                download
                className="press meta rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-silver-bright hover:bg-white/[0.1]"
              >
                Résumé ↓
              </a>
            </motion.div>
          </div>

          <motion.form {...rise(2)} onSubmit={onSubmit} className="space-y-3">
            <div>
              <label htmlFor="c-name" className="eyebrow mb-2 block">
                Name
              </label>
              <input
                id="c-name"
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="c-email" className="eyebrow mb-2 block">
                Email
              </label>
              <input
                id="c-email"
                type="email"
                className={field}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="c-message" className="eyebrow mb-2 block">
                Message
              </label>
              <textarea
                id="c-message"
                rows={5}
                className={`${field} resize-none`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you building?"
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="press meta w-full rounded-soft border border-white/15 bg-white/[0.07] px-4 py-3 uppercase tracking-[0.18em] text-silver-bright transition hover:bg-white/[0.12] disabled:opacity-50"
            >
              {status === 'sending'
                ? 'Sending…'
                : status === 'sent'
                  ? 'Sent ✓'
                  : 'Send message'}
            </button>

            <p className="meta text-silver-faint" aria-live="polite">
              {status === 'sent' ? (
                <>Message sent. I&rsquo;ll get back to you.</>
              ) : status === 'error' ? (
                <>
                  Couldn&rsquo;t send from here.{' '}
                  <a
                    href={mailtoFallback}
                    className="text-silver-bright underline decoration-white/30 underline-offset-4"
                  >
                    Open it in your mail app instead
                  </a>
                  , or write to {site.email}.
                </>
              ) : (
                <>Goes straight to my inbox.</>
              )}
            </p>
          </motion.form>
        </div>

        {/* Jack runs across and delivers the nudge, then carries on out. */}
        <div className="mt-10">
          <JackScene
            stopAt={0.34}
            lines={[
              'Still here? Say something.',
              'He actually replies. Usually.',
            ]}
          />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Static rather than new Date(): the server and client can sit
              on opposite sides of a year boundary, which hydrates as a
              mismatch. */}
          <p className="meta text-silver-faint">© 2026 {site.name}</p>
          <p className="meta text-silver-faint">
            Built with Next.js, GSAP &amp; Lenis
          </p>
        </div>
      </div>
    </section>
  );
}
