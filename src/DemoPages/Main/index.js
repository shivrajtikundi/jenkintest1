import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ResizeDetector from 'react-resize-detector';
import AppMain from '../../Layout/AppMain';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closedSmallerSidebar: false,
    };
  }

  render() {
    let {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      closedSmallerSidebar,
      enableMobileMenu,
      enablePageTabsAlt,
    } = this.props;

    return (
      <ResizeDetector
        handleWidth
        render={({ width }) => (
          <Fragment>
            <div
              className={cx(
                'app-container app-theme-' + colorScheme,
                { 'fixed-header': enableFixedHeader },
                { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                { 'fixed-footer': enableFixedFooter },
                { 'closed-sidebar': enableClosedSidebar || width < 1250 },
                {
                  'closed-sidebar-mobile': closedSmallerSidebar || width < 1250,
                },
                { 'sidebar-mobile-open': enableMobileMenu },
                { 'body-tabs-shadow-btn': enablePageTabsAlt }
              )}
            >
              <AppMain />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
              />
            </div>
          </Fragment>
        )}
      />
    );
  }
}

const mapStateToProp = (state) => ({
  colorScheme: state.theme.colorScheme,
  enableFixedHeader: state.theme.enableFixedHeader,
  enableMobileMenu: state.theme.enableMobileMenu,
  enableFixedFooter: state.theme.enableFixedFooter,
  enableFixedSidebar: state.theme.enableFixedSidebar,
  enableClosedSidebar: state.theme.enableClosedSidebar,
  enablePageTabsAlt: state.theme.enablePageTabsAlt,
});

export default withRouter(connect(mapStateToProp)(Main));
