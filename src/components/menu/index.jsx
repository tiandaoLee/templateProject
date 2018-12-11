import React from 'react';
import { Link } from 'react-router';

import {
  Layout,
  Menu as AntdMenu,
  Icon
} from 'antd';

import MENU from './menuData';

import styles from './index.less';

const { SubMenu } = AntdMenu;
const { Sider } = Layout;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  // 菜单伸缩
  _toggle = () => {
    this.setState((preState, props) => ({
      collapsed: !preState.collapsed
    }));
  }
  // 生成一级菜单
  _createSubMenu = () => {
    return MENU.map((item) => {
      const { key, icon, title } = item;
      const subMenuTitle = (
        <span>
          <Icon type={icon} />
          <span>{title}</span>
        </span>
      );
      return (
        <SubMenu key={key} title={subMenuTitle}>
          { this._createItemMenu(item) }
        </SubMenu>
      );
    });
  }
  // 生成二级菜单
  _createItemMenu = (subMenuData) => {
    const { children } = subMenuData;
    return children.map((subItem) => {
      const { key, router, title } = subItem;
      return (
        <AntdMenu.Item key={key}>
          <Link to={router}>{title}</Link>
        </AntdMenu.Item>
      );
    });
  }
  // 获取当前菜单
  getCurrentMenu = () => {
    const { currentLocation = {} } = this.props;
    const { pathname = '' } = currentLocation;
    const paths = pathname.split('/');
    return paths.length > 2 ? paths[2] : paths[1];
  }
  render() {
    const currentMenu = this.getCurrentMenu();
    const { collapsed } = this.state;
    return (
      <Sider
        width={150}
        trigger={null}
        className={styles.slider}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.menu_top} onClick={this._toggle}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </div>
        <AntdMenu
          mode="inline"
          defaultSelectedKeys={[currentMenu]}
          selectedKeys={[currentMenu]}
          defaultOpenKeys={['accountManager']}
          className={styles.menu}
        >
          {this._createSubMenu()}
        </AntdMenu>
      </Sider>
    );
  }
}

export default Menu;
