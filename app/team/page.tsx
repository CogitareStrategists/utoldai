"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./team.module.css";

type DemoUser = { name: string; email: string; organization?: string };
export default function TeamPage(){
 const [user,setUser]=useState<DemoUser>({name:"Praveen",email:""});
 useEffect(()=>{const stored=sessionStorage.getItem("utoldai_user");if(stored)setUser(JSON.parse(stored));},[]);
 return <main className={styles.page}>
  <header className={styles.nav}><Link href="/" className={styles.brand}><span>U</span><b>UToldAI</b></Link><Link href="/" className={styles.linkButton}>Exit</Link></header>
  <section className={styles.hero}><p className={styles.eyebrow}>Welcome to UToldAI</p><h1>Welcome, {user.name||"Praveen"}</h1><h2>Your Business Development AI Team is ready.</h2><p>Designed to help you win more projects.</p></section>
  <section className={styles.difference}><div><p className={styles.eyebrow}>What makes this team different?</p><h2>It behaves like a proactive teammate, not a passive tool.</h2></div><div className={styles.diffGrid}><article><b>Reviews opportunities proactively</b><span>Assesses readiness before drafting.</span></article><article><b>Identifies proposal risks and gaps</b><span>Highlights missing details and weak points.</span></article><article><b>Recommends improvements</b><span>Suggests ways to strengthen proposal quality.</span></article><article><b>Learns your preferred way of working over time</b><span>Adapts to proposal style, scope preferences and client types.</span></article></div></section>
  <section className={styles.teammates}><div className={styles.sectionTitle}><p className={styles.eyebrow}>Your Team Mates</p><h2>Work with the first active member of your AI Team.</h2></div><div className={styles.grid}><article className={styles.active}><b>🟢 Active</b><h3>Proposal Associate</h3><p>A proactive teammate that helps create stronger proposals and improves through feedback.</p><Link href="/team/proposal" className={styles.primaryButton}>Open Associate</Link></article><article><b>🔒 Advanced Plan</b><h3>Commercial Associate</h3><p>Prepare quotations, commercial offers and payment terms.</p><button disabled>Advanced Plan</button></article><article><b>🔒 Advanced Plan</b><h3>Client Communication Associate</h3><p>Draft proposal submission emails and client follow-ups.</p><button disabled>Advanced Plan</button></article><article><b>🔒 Advanced Plan</b><h3>Knowledge Associate</h3><p>Reuse organizational knowledge, past projects and experience.</p><button disabled>Advanced Plan</button></article></div></section>
 </main>;
}
