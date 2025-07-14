import React, { useEffect, useRef, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import TabList from '../resources/tabs'

const StyledAboutSection = styled.section`

  .inner {
    display: flex;
    flex-direction: column;
    width: 100%;
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

    .content {
    width: 75%;
    padding-right: 1rem;
    }

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;
const leadershipData = [
  {
    name: "TA work",
    description: ["CS201- Data Structures and Algorithms ('24 - present)"]
  },
  {
    name: "Database Research Group",
    description: ["Frontend development and UI/UX design for Irex, a beginner-friendly SQL debugger"]
  },
  {
      name: "Duke Applied Machine Learning",
      description: ["Co-director ('24-'25)", "Oversaw Hardware, Software, and Data Science divisions for a student organization of >200 people.", "Contrary to the name of the organization, I didn't touch any machine learning (was in the software engineering division)."]
  },
  {
    name: "DTech",
    description: ["DTech Scholar ('23-present)", "Assistant Lead of Mentorship ('23-'24); Launched new mentorship program for women in tech organization at Duke"]
  },
   {
    name: "Developer for Christensen Family Center of Innovation",
    description: ["Developing software and design solutions for startup clients."]
  }
]
const relevantCourseworkData = [
  {
    name: "ECE496: Software Engineering"
  }, 
  {
    name: "COMPSCI 330: Design and Analysis of Algorithms"
  },
  {
    name: "COMPSCI 356: Computer Network Architecture"
  },
  {
    name: "COMPSCI 316: Intro to Database Systems"
  },
  {
    name: "COMPSCI 290: Intro to Applied Machine Learning"
  },
  {
    name: "COMPSCI 250: Computer Architecture"
  },
  {
    name: "COMPSCI 290: Server-Side Web Applications"
  },
  {
    name: "COMPSCI 230: Discrete Math"
  },
  {
    name: "COMPSCI 216: Data Science"
  },
  {
    name: "STA 221: Regression Theory Applications"
  },
  {
    name: "STA 230: Probability"
  },
  {
    name: "COMPSCI 201: Data Structures and Algorithms"
  },
  {
    name: "MATH 218: Linear Algebra"
  },
  {
    name: "MATH 212: Multivariable Calculus"
  }
]
const irrelevantCourseworkData = [
  {
    name: "BIOLOGY 201: Molecular Biology"
  },
  {
    name: "CHEM 201: Organic Chemistry I"
  },
  {
    name: "ECE 110: Intro to Electrical and Computer Engineering"
  },
  {
    name: "EGR 201: Mechanics of Solids"
  },
  {
    name: "PHYSICS 141: General Physics I"
  },
  {
    name: "PHYSICS 142: General Physics II"
  }
]
const data = [
  {
    label: "Involvement and Leadership",
    items: leadershipData
  },
  {
    label: "Relevant Coursework",
    items: relevantCourseworkData
  },
  {
    label: "Irrelevant (to Software Engineering) Coursework ",
    items: irrelevantCourseworkData
  }
];

const Edu = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Eleventy', 'Node.js', 'WordPress'];

  return (
    <StyledAboutSection id="education" ref={revealContainer}>
      <h2 className="numbered-heading">Education</h2>

      <div className="inner">
        {/* <StyledText>
          <div className='content'>
            <p>
              I'm currently a senior at Duke (graduating Spring 2026) majoring in Computer Science with a concentration in Software Systems,
              but my other considerations for my course of study have ranged from Premed to Biomedical Engineering + CS, to CS + Statistics. 
            </p>
          </div>
        </StyledText> */}
        <TabList data={data} />
      </div>
    </StyledAboutSection>
  );
};

export default Edu;
