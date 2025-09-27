import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/common/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import Features from '../components/home/Features';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Nibras Ahmed - Premium Digital Products & Templates</title>
        <meta name="description" content="Discover premium digital products, templates, and components created by Nibras Ahmed. High-quality designs for modern web development." />
        <meta name="keywords" content="digital products, templates, components, web development, react, nextjs, tailwind" />
        <meta property="og:title" content="Nibras Ahmed - Premium Digital Products" />
        <meta property="og:description" content="Premium digital products and templates for modern web development" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://nibrasahmed.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://nibrasahmed.com" />
      </Head>

      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <section id="hero">
            <HeroSection />
          </section>

          {/* Featured Products */}
          <section id="products" className="py-20 bg-gray-50">
            <FeaturedProducts />
          </section>

          {/* Features */}
          <section id="features" className="py-20">
            <Features />
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-20 bg-gray-50">
            <Testimonials />
          </section>

          {/* Newsletter */}
          <section id="newsletter" className="py-20">
            <Newsletter />
          </section>
        </motion.div>
      </Layout>
    </>
  );
}