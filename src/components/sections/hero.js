import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { MdEmail, MdDownload } from 'react-icons/md';
import { Typewriter } from 'react-simple-typewriter';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start; /* centers vertically */
  margin-left: 0;

  .content {
    width: 85%;
    padding-right: 1rem;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 6vw, var(--fz-xl));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .button-group {
  display: flex;
  gap: 20px;
  margin-top: 40px;

  .btn {
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: 30px;
    padding: 1rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus {
      background-color: var(--green-tint);
      outline: none;
      }
    }
  }

`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>👋 Hi, I'm </h1>;
  const two = <h2 className="big-heading">Kelly Xu!</h2>;
  const three = (
  <h3 className="big-heading">
    I’m a{' '}
    <span style={{ color: 'var(--green)' }}>
      <Typewriter
        words={['Software Developer', 'Student', 'Creative']}
        loop={0} // 0 = infinite
        cursor
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </span>
  </h3>
  );
  //add stuff later if want to
  const four = (
    <>
      <p>
       
      </p>
    </>
  );

  //add buttons for email & resume 
  const emailUser = "22kellyx";
  const emailDomain = "gmail.com";
  const email = `${emailUser}@${emailDomain}`;

  const five = (
    <div className="button-group">
      <a className="btn" href={`mailto:${email}`} style={{ display: 'flex', alignItems: 'center' }}>
        <MdEmail style={{ marginRight: '8px' }} />
        Email
      </a>
      {/* <a className="btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
        <MdDownload style={{ marginRight: '8px' }} />
        Resume
      </a> */}
    </div>
  );


  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <div className="content">
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
