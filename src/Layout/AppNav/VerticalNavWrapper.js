import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MetisMenu from 'react-metismenu';
import { setEnableMobileMenu } from '../../redux/ThemeOption/themeSlice';
import { AnalysisNav, GroupingNav, AudiencesNav, ReportingNav } from './NavItems';

const CustomMenuLink = (props) => {
  return (
    <>
      <i className={props.children[0].props.className}></i>
      <NavLink to={props?.to} className={props?.className}>
        {props?.label}
      </NavLink>
    </>
  );
};

class Nav extends Component {
  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Analysis</h5>
        <MetisMenu
          content={AnalysisNav}
          LinkComponent={CustomMenuLink}
          onSelected={this.toggleMobileSidebar}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />

        <h5 className="app-sidebar__heading">Groupings</h5>
        <MetisMenu
          content={GroupingNav}
          LinkComponent={CustomMenuLink}
          onSelected={this.toggleMobileSidebar}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />

        <h5 className="app-sidebar__heading">Audience</h5>
        <MetisMenu
          content={AudiencesNav}
          LinkComponent={CustomMenuLink}
          onSelected={this.toggleMobileSidebar}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />

        <h5 className="app-sidebar__heading">Connect & Reporting</h5>
        <MetisMenu
          content={ReportingNav}
          LinkComponent={CustomMenuLink}
          onSelected={this.toggleMobileSidebar}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

const mapStateToProps = (state) => ({
  enableMobileMenu: state.theme.enableMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
