import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Slider } from 'react-burgers';

import AppMobileMenu from '../AppMobileMenu';

import {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
} from '../../redux/ThemeOption/themeSlice';

class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false,
    };
  }

  toggleEnableClosedSidebar = () => {
    let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
    setEnableClosedSidebar(!enableClosedSidebar);
  };

  state = {
    openLeft: false,
    openRight: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false,
  };

  render() {
    return (
      <Fragment>
          <div className="app-header__logo">
              <div style={{height:"50px", width:"150px", backgroundSize:"150px 50px", backgroundRepeat: "no-repeat"}} className="logo-src"/>
              <div className="header__pane ml-auto">
                  <div onClick={this.toggleEnableClosedSidebar}>
                  {/* {this.props.menuclosable && this.props.menuclosable==true?
                      <Slider 
                      width={26}
                      lineHeight={2}
                      lineSpacing={5}
                      color='#6c757d'
                      active={this.state.active}
                      onClick={() => this.setState({ active: !this.state.active })}/>
                      :
                      <></>
              
                  } */}
                      <Slider 
                      width={26}
                      lineHeight={2}
                      lineSpacing={5}
                      color='#6c757d'
                      active={this.state.active}
                      onClick={() => this.setState({ active: !this.state.active })}/>
                  </div>
              </div>
          </div>
          <AppMobileMenu/>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableClosedSidebar: state.theme.enableClosedSidebar,
  enableMobileMenu: state.theme.enableMobileMenu,
  enableMobileMenuSmall: state.theme.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableClosedSidebar: (enable) => dispatch(setEnableClosedSidebar(enable)),
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: (enable) => dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);
