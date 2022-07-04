import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Nav from '../AppNav/VerticalNavWrapper';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PerfectScrollbar from 'react-perfect-scrollbar';
import HeaderLogo from '../AppLogo';

import { setEnableMobileMenu } from '../../redux/ThemeOption/themeSlice';

class AppSidebar extends Component {
  state = {
    items: [{ id: 1, text: 'Buy eggs' }],
  };

  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {
    let { backgroundColor, enableBackgroundImage, enableSidebarShadow, backgroundImage, backgroundImageOpacity } =
      this.props;

    return (
      <Fragment>
        <div className="sidebar-mobile-overlay" onClick={this.toggleMobileSidebar} />
        <TransitionGroup>
          <CSSTransition
            component="div"
            className={cx('app-sidebar', backgroundColor, {
              'sidebar-shadow': enableSidebarShadow,
            })}
            appear={true}
            enter={false}
            exit={false}
            timeout={500}
          >
            <div>
              <HeaderLogo />
              <PerfectScrollbar>
                <div className="app-sidebar__inner">
                  <Nav />
                </div>
              </PerfectScrollbar>
              <div
                className={cx('app-sidebar-bg', backgroundImageOpacity)}
                style={{
                  backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null,
                }}
              ></div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableBackgroundImage: state.theme.enableBackgroundImage,
  enableSidebarShadow: state.theme.enableSidebarShadow,
  enableMobileMenu: state.theme.enableMobileMenu,
  backgroundColor: state.theme.backgroundColor,
  backgroundImage: state.theme.backgroundImage,
  backgroundImageOpacity: state.theme.backgroundImageOpacity,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
