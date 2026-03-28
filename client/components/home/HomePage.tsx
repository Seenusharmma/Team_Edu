"use client"
import React from 'react'
import Hero from './Hero'
import MentorsSection from './MentorsSection'
import CourseSection from './CourseSection'
import CourseSlider from './CourseSlider'
import WhyChoose from './WhyChoose'
import StepsSection from './StepsSection'
import FAQSection from './FAQSection'
import BlogSection from './BlogSection'
import CTASection from './CTASection'

const HomePage = () => {
  return (
    <>
    <Hero />
    <MentorsSection/>
    <CourseSection />
    {/* <CourseSlider/> */}
    <WhyChoose/>
    <StepsSection/>
    <FAQSection/>
    <BlogSection/>
    <CTASection />
    </>
  )
}

export default HomePage