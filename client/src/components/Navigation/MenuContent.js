import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import Home from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutUrl } from '../../utils/const';

const MenuLink = ({ path, exact, icon, label, onClick }) => (
  <ListItem
    button
    component={NavLink}
    to={path}
    exact={exact}
    onClick={onClick}
  >
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    <ListItemText primary={label} />
  </ListItem>
);

export default function MenuContent(props) {
  const client = useApolloClient();
  const history = useHistory();

  // TODO: does not work
  const logoutUser = async () => {
    await fetch(logoutUrl, { method: 'DELETE' });
    client.clearStore();
    history.push('/login');
  };

  return (
    <List component="nav" aria-label="drawer menu content">
      <MenuLink
        path="/"
        exact
        icon={<Home />}
        label="Strona główna"
        onClick={props.onMenuItemClick}
      />
      <MenuLink
        path="/peaks"
        exact
        icon={<FilterHdrIcon />}
        label="Szczyty"
        onClick={props.onMenuItemClick}
      />
      <ListItem button onClick={logoutUser}>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText>Wyloguj</ListItemText>
      </ListItem>
    </List>
  );
}
