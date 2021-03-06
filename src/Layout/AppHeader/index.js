import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HeaderLogo from '../AppLogo';

import SearchBox from './Components/SearchBox';
import MegaMenu from './Components/MegaMenu';
import UserBox from './Components/UserBox';

import HeaderDots from './Components/HeaderDots';

class Header extends React.Component {
  render() {
    let { headerBackgroundColor, enableMobileMenuSmall, enableHeaderShadow } = this.props;
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition
            component="div"
            className={cx('app-header', headerBackgroundColor, {
              'header-shadow': enableHeaderShadow,
            })}
            appear={true}
            timeout={1500}
            enter={false}
            exit={false}
          >
            <div>
              <HeaderLogo menuclosable={this.props.menuclosable}/>
              <div
                className={cx('app-header__content', {
                  'header-mobile-open': !enableMobileMenuSmall,
                })}
              >
                <div className="app-header-left">
                  {/* <SearchBox />
                  <MegaMenu /> */}
                </div>
                <div className="app-header-right">
                  {/* <HeaderDots/> */}
                  <UserBox/>
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableHeaderShadow: state.theme.enableHeaderShadow,
  closedSmallerSidebar: state.theme.closedSmallerSidebar,
  headerBackgroundColor: state.theme.headerBackgroundColor,
  enableMobileMenuSmall: state.theme.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
