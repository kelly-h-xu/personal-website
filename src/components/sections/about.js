import React, { useEffect, useRef } from 'react';
// import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  position: relative .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-md);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-md, 24px);
        line-height: 12px;
      }
    }
  }
`;
// const StyledPic = styled.div`
//   position: relative;
//   max-width: 300px;

//   @media (max-width: 768px) {
//     margin: 50px auto 0;
//     width: 70%;
//   }

//   .wrapper {
//     ${({ theme }) => theme.mixins.boxShadow};
//     display: block;
//     position: relative;
//     width: 100%;
//     border-radius: var(--border-radius);
//     background-color: var(--green);

//     &:hover,
//     &:focus {
//       outline: 0;
//       transform: translate(-4px, -4px);

//       &:after {
//         transform: translate(8px, 8px);
//       }

//       .img {
//         filter: none;
//         mix-blend-mode: normal;
//       }
//     }

//     .img {
//       position: relative;
//       border-radius: var(--border-radius);
//       mix-blend-mode: multiply;
//       filter: grayscale(100%) contrast(1);
//       transition: var(--transition);
//     }

//     &:before,
//     &:after {
//       content: '';
//       display: block;
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       border-radius: var(--border-radius);
//       transition: var(--transition);
//     }

//     &:before {
//       top: 0;
//       left: 0;
//       background-color: var(--navy);
//       mix-blend-mode: screen;
//     }

//     &:after {
//       border: 2px solid var(--green);
//       top: 14px;
//       left: 14px;
//       z-index: -1;
//     }
//   }
// `;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  // const skills = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Eleventy', 'Node.js', 'WordPress'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me 👩🏻‍💻</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! I’m Kelly, a senior at Duke University (Class of 2026), majoring in Computer
              Science with a focus on Software Systems.
            </p>

            <p>
              I love combining software engineering with thoughtful design to create products that
              are not only powerful but also intuitive and engaging. I’ve been lucky enough to gain
              valuable experience in many facets of technology, from software engineering at{' '}
              <a href="https://www.carters.com/">a retail company</a>, to UI/UX design at{' '}
              <a href="https://www.merck.com/">a pharmaceutical company</a>, to teaching data
              structures and algorithms at Duke, and more!
            </p>

            <p>
              Right now, I’m eager to grow as an engineer, take on challenging projects, and build
              beautiful, user-centered software that makes an impact.
            </p>
          </div>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
