import React from 'react';

export const DutchFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className}>
    <path fill="#21468b" d="M0 0h640v480H0z"/>
    <path fill="#fff" d="M0 0h640v320H0z"/>
    <path fill="#ae1c28" d="M0 0h640v160H0z"/>
  </svg>
);

export const UKFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className}>
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35.5L54 480H0l240-179zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42V0z"/>
    <path fill="#FFF" d="M213 0h214v480H213zM0 133h640v214H0z"/>
    <path fill="#C8102E" d="M0 160h640v160H0zM240 0h160v480H240z"/>
  </svg>
);

export const GermanFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className}>
    <path fill="#ffce00" d="M0 320h640v160H0z"/>
    <path d="M0 0h640v160H0z"/>
    <path fill="#d00" d="M0 160h640v160H0z"/>
  </svg>
);

export const FrenchFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className}>
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#002654" d="M0 0h213.3v480H0z"/>
    <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
  </svg>
);

export const SpanishFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className}>
    <path fill="#c60b1e" d="M0 0h640v480H0z"/>
    <path fill="#ffc400" d="M0 120h640v240H0z"/>
    <g transform="matrix(3.43749 0 0 3.43749 194.6 240)">
      <g>
        <path fill="#c60b1e" d="M-11 0h2v19h-2zm22 0h2v19h-2zM-11 19v2h24v-2z"/>
        <path fill="#c60b1e" d="M-12 1h26v2H-12z"/>
        <path fill="#ffc400" d="M-12 3h26v16h-26z"/>
        <path fill="#c60b1e" d="M-12 5h26v2H-12zm0 10h26v2H-12z"/>
        <path fill="#003893" d="M-12 7h5v8h-5zm7.5 0h5v8h-5zm7.5 0h5v8h-5zm7.5 0h5v8h-5z"/>
        <path fill="#fff" d="M-12 9h26v4h-26z"/>
        <path fill="#c60b1e" d="M-12 10h26v2h-26z"/>
      </g>
      <g fill="#ad9b62">
        <path d="M-3-11v2h2v-2zm-1 2v5h4v-5h-2zm1 0h2v4h-2zM-3-4v2h2v-2zm-1 2v5h4v-5h-2zm1 0h2v4h-2z"/>
      </g>
      <path fill="#706d6e" d="M-1-11v11h2v-11z"/>
      <g fill="#ad9b62">
        <path d="M-1-12v-2h2v2zm1-2v-5h-4v5h2zm-1 0h-2v-4h2zM-1-21v-2h2v-2zm1-2v-5h-4v5h2zm-1 0h-2v-4h2z"/>
      </g>
      <g transform="rotate(180)">
        <g fill="#ad9b62">
          <path d="M-3-11v2h2v-2zm-1 2v5h4v-5h-2zm1 0h2v4h-2zM-3-4v2h2v-2zm-1 2v5h4v-5h-2zm1 0h2v4h-2z"/>
        </g>
        <path fill="#706d6e" d="M-1-11v11h2v-11z"/>
        <g fill="#ad9b62">
          <path d="M-1-12v-2h2v2zm1-2v-5h-4v5h2zm-1 0h-2v-4h2zM-1-21v-2h2v-2zm1-2v-5h-4v5h2zm-1 0h-2v-4h2z"/>
        </g>
      </g>
      <path fill="#c60b1e" d="M-1-14v2h2v-2z"/>
      <path fill="#003893" d="M0-16.5A2.5 2.5 0 0 1-2.5-19h5A2.5 2.5 0 0 1 0-16.5z"/>
      <path d="M0-19a2.5 2.5 0 0 0-2.5 2.5h5A2.5 2.5 0 0 0 0-19z"/>
      <path fill="#ffc400" d="M-1-21v-2h2v2z"/>
    </g>
  </svg>
);