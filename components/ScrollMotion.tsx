"use client";

import { useEffect, useRef } from "react";

/**
 * TOP ページのスクロール連動の動き（外部ライブラリなし）。
 * - JS が動いたときだけ <html> に js-motion を付け、初期の非表示状態はそのクラスの下でだけ効かせる（静的 HTML・JS なしでは全部見える）
 * - prefers-reduced-motion: reduce のときは何もしない
 * - 動かすのは opacity / transform のみ（CLS なし）。スクロールは passive + rAF で間引き
 */
export function ScrollMotion() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("js-motion");

    const pending = new Set<HTMLElement>();
    // 1) 表示に入ったら is-in を付ける（同じタイミングで入った要素は順に少しずつ遅らせる）
    const reveal = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        hits.forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.setProperty("--d", `${Math.min(i, 6) * 80}ms`);
          el.classList.add("is-in");
          pending.delete(el);
          reveal.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    // 下層ページ用：見出し・表・図・カードに自動で付ける（本文の段落には付けない）。
    // 読み込み時にすでに画面内にあるものは対象外にして、表示直後のちらつきを避ける
    const vh = window.innerHeight;
    document
      .querySelectorAll<HTMLElement>(".section-title, .prose h2, .prose table, .prose img, .ui-card, [data-auto-reveal] > *")
      .forEach((el) => {
        if (el.hasAttribute("data-reveal") || el.closest("[data-reveal]")) return;
        if (el.getBoundingClientRect().top < vh) return;
        el.setAttribute("data-reveal", "");
      });
    document.querySelectorAll<HTMLElement>("[data-reveal],[data-bars]").forEach((el) => {
      pending.add(el);
      reveal.observe(el);
    });
    // 速いスクロールやページ内リンクで一度も画面に入らずに通り過ぎた要素は、そのまま表示にする
    let lastSweep = 0;
    const sweep = (now: number) => {
      if (now - lastSweep < 200 || pending.size === 0) return;
      lastSweep = now;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) {
          el.style.setProperty("--d", "0ms");
          el.classList.add("is-in");
          pending.delete(el);
          reveal.unobserve(el);
        }
      });
    };

    // 2) 数字のカウントアップ（終わったら元の文字列をそのまま戻す）
    const counted = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          counted.unobserve(el);
          const original = el.textContent ?? "";
          const m = original.match(/^(\d+)(.*)$/);
          if (!m) return;
          const to = parseInt(m[1], 10);
          const suffix = m[2];
          const start = performance.now();
          const dur = 900;
          const step = (t: number) => {
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            if (p < 1) {
              el.textContent = `${Math.round(to * eased)}${suffix}`;
              requestAnimationFrame(step);
            } else {
              el.textContent = original;
            }
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => counted.observe(el));

    // 3) 読了バーとファーストビューのパララックス（rAF で1フレーム1回）
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    const update = () => {
      ticking = false;
      sweep(performance.now());
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      if (y < window.innerHeight * 1.5) {
        parallax.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0");
          const limit = 28;
          const v = Math.max(-limit, Math.min(limit, -y * speed));
          el.style.transform = `translate3d(0, ${v.toFixed(1)}px, 0)`;
        });
      }
    };
    let settle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(() => {
        lastSweep = 0;
        sweep(performance.now());
      }, 250);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reveal.disconnect();
      counted.disconnect();
    };
  }, []);

  return <div ref={barRef} aria-hidden="true" className="read-progress" />;
}
