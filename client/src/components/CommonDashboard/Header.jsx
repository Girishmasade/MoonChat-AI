import React, { useState } from 'react';
import { Layout, Menu, Button, Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

const { Header } = Layout;

export const AppHeader = () => {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('home');

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: theme === 'dark' ? '#141414' : '#fff',
        padding: '0 32px',
      }}
    >
      {/* Left: Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <div
          style={{
            background: '#9254de',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '6px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          C
        </div>
        Chatter
      </div>

      {/* Center: Menu */}
      <Menu
        theme={theme}
        mode="horizontal"
        selectedKeys={[current]}
        onClick={onClick}
        items={[
          { key: 'home', label: 'Home' },
          { key: 'features', label: 'Features' },
          { key: 'pricing', label: 'Pricing' },
          { key: 'contact', label: 'Contact' },
        ]}
        style={{ flex: 1, justifyContent: 'center', borderBottom: 'none' }}
      />

      {/* Right: Theme, Login, Sign Up */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', }}>
        <BulbOutlined style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
        <Switch
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
        <span style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Login</span>
        <Button type="primary" style={{ background: '#9254de' }}>
          Sign Up
        </Button>
      </div>
    </Header>
  );
};

