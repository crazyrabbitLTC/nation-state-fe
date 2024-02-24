import React from 'react';
import styles from '../styles/ActionTable.module.css';

export const ActionTable = () => {
  // Define hardcoded data array with rows information
  const rows = [
    { emoji: '🏰', action: 'Nation Created', address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', link: 'https://example.com' },
    { emoji: '🛂', action: 'Citizenship Claimed', address: '0x0A1e4D0B5c71B955c0a5993023fc48bA6E380496', link: 'https://example.com' },
    { emoji: '✅', action: 'Registered to Vote', address: '0x4B0897b0513fdc7C54744667e48AF82880B502fA', link: 'https://example.com' },
    { emoji: '🏰', action: 'Nation Created', address: '0x583031D1113aD414F02576BD6afaBfb302140225', link: 'https://example.com' },
    { emoji: '🛂', action: 'Citizenship Claimed', address: '0xdD870fa1b7C4700F2BD7f44238821C26f7392148', link: 'https://example.com' },
    { emoji: '✅', action: 'Registered to Vote', address: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c', link: 'https://example.com' },
    { emoji: '🏰', action: 'Nation Created', address: '0x4B0897b0513fdc7C54744667e48AF82880B502fA', link: 'https://example.com' },
    { emoji: '🛂', action: 'Citizenship Claimed', address: '0x583031D1113aD414F02576BD6afaBfb302140225', link: 'https://example.com' },
    { emoji: '✅', action: 'Registered to Vote', address: '0xdD870fa1b7C4700F2BD7f44238821C26f7392148', link: 'https://example.com' },
    { emoji: '🏰', action: 'Nation Created', address: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c', link: 'https://example.com' }
  ];

  return (
    <div className={styles.actionTableContainer}>
      <table className={styles.actionTable}>
        <thead>
          <tr>
            <th>Emoji</th>
            <th>Action</th>
            <th>Address</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.emoji}</td>
              <td><span className={styles[row.action.replace(/ /g, '')]}>{row.action}</span></td>
              <td>
                <img src="/path-to-avatar.png" alt="Avatar" className={styles.avatar} />
                {row.address}
              </td>
              <td>
                <a href={row.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <img src="/path-to-link-icon.svg" alt="Link" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

