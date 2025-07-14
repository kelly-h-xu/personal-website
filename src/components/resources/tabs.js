import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const StyledTabContainer = styled.div`
  display: flex;
  max-width: 100%;
  margin-left: 0;

  @media (max-width: 600px) {
    display: block;
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin-right: 8em;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins?.link || ''};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height, 40px);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy, #ccd6f6);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono, monospace);
  font-size: var(--fz-md, 14px);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    justify-content: center;
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy, #112240);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height, 40px);
  border-radius: var(--border-radius, 4px);
  background: var(--green, #64ffda);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height, 40px)));
  transition: transform 0.25s ease;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width, 120px);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width, 120px)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  h3 {
    font-size: var(--fz-xl, 20px);
    font-weight: 600;
    margin-bottom: 15px;
  }

  ul {
    ${({ theme }) => theme.mixins?.fancyList || ''};
  }
`;

const TabList = ({ data = [] }) => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);

  useEffect(() => {
    if (tabFocus !== null && tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
    }
  }, [tabFocus]);

  const onKeyDown = e => {
    const total = data.length;
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        setTabFocus(prev => (prev === 0 ? total - 1 : prev - 1));
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        setTabFocus(prev => (prev === total - 1 ? 0 : prev + 1));
        break;
      case 'Home':
        e.preventDefault();
        setTabFocus(0);
        break;
      case 'End':
        e.preventDefault();
        setTabFocus(total - 1);
        break;
      default:
        break;
    }
  };

  return (
    <StyledTabContainer>
      <StyledTabList role="tablist" aria-label="Tabs" onKeyDown={onKeyDown}>
        {data.map((tab, i) => (
          <StyledTabButton
            key={i}
            isActive={activeTabId === i}
            onClick={() => setActiveTabId(i)}
            ref={el => (tabs.current[i] = el)}
            id={`tab-${i}`}
            role="tab"
            tabIndex={activeTabId === i ? '0' : '-1'}
            aria-selected={activeTabId === i}
            aria-controls={`panel-${i}`}>
            <span>{tab.label}</span>
          </StyledTabButton>
        ))}
        <StyledHighlight activeTabId={activeTabId} />
      </StyledTabList>

      <StyledTabPanels>
        <TransitionGroup component={null}>
          {data.map((tab, i) =>
            activeTabId === i ? (
              <CSSTransition key={i} timeout={250} classNames="fade">
                <StyledTabPanel
                  id={`panel-${i}`}
                  role="tabpanel"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-labelledby={`tab-${i}`}
                  aria-hidden={activeTabId !== i}
                  hidden={activeTabId !== i}>
                  {tab.items.map((item, idx) => (
                    <div key={idx}>
                      <h3>{item.name}</h3>
                      {Array.isArray(item.description) && (
                        <ul>
                          {item.description.map((point, pointIdx) => (
                            <li key={pointIdx}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </StyledTabPanel>
              </CSSTransition>
            ) : null
          )}
        </TransitionGroup>
      </StyledTabPanels>
    </StyledTabContainer>
  );
};

export default TabList;
