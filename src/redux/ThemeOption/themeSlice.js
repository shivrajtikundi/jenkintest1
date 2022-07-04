import { createSlice } from '@reduxjs/toolkit';
import sideBar6 from '../../assets/utils/images/sidebar/city1.jpg';

const initialState = {
  backgroundColor: '',
  headerBackgroundColor: '',
  enableMobileMenuSmall: '',
  enableBackgroundImage: false,
  enableClosedSidebar: false,
  enableFixedHeader: true,
  enableHeaderShadow: true,
  enableSidebarShadow: true,
  enableFixedFooter: true,
  enableFixedSidebar: true,
  colorScheme: 'white',
  backgroundImage: sideBar6,
  backgroundImageOpacity: 'opacity-06',
  enablePageTitleIcon: true,
  enablePageTitleSubheading: true,
  enablePageTabsAlt: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setEnableBackgroundImage: (state, action) => {
      state.enableBackgroundImage = action.payload;
    },
    setEnableFixedHeader: (state, action) => {
      state.enableFixedHeader = action.payload;
    },
    setEnableHeaderShadow: (state, action) => {
      state.enableHeaderShadow = action.payload;
    },
    setEnableSidebarShadow: (state, action) => {
      state.enableSidebarShadow = action.payload;
    },
    setEnablePageTitleIcon: (state, action) => {
      state.enablePageTitleIcon = action.payload;
    },
    setEnablePageTitleSubheading: (state, action) => {
      state.enablePageTitleSubheading = action.payload;
    },
    setEnablePageTabsAlt: (state, action) => {
      state.enablePageTabsAlt = action.payload;
    },
    setEnableMobileMenu: (state, action) => {
      state.enableMobileMenu = action.payload;
    },
    setEnableMobileMenuSmall: (state, action) => {
      state.enableMobileMenuSmall = action.payload;
    },
    setEnableClosedSidebar: (state, action) => {
      state.enableClosedSidebar = action.payload;
    },
    setEnableFixedSidebar: (state, action) => {
      state.enableFixedSidebar = action.payload;
    },
    setEnableFixedFooter: (state, action) => {
      state.enableFixedFooter = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setHeaderBackgroundColor: (state, action) => {
      state.headerBackgroundColor = action.payload;
    },
    setColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    },
    setBackgroundImageOpacity: (state, action) => {
      state.backgroundImageOpacity = action.payload;
    },
    setBackgroundImage: (state, action) => {
      state.backgroundImage = action.payload;
    },
  },
});

/**
 * Actions
 */
export const {
  setEnableFixedHeader,
  setEnableBackgroundImage,
  setBackgroundImage,
  setBackgroundImageOpacity,
  setColorScheme,
  setHeaderBackgroundColor,
  setBackgroundColor,
  setEnablePageTabsAlt,
  setEnablePageTitleSubheading,
  setEnablePageTitleIcon,
  setEnableSidebarShadow,
  setEnableHeaderShadow,
  setEnableFixedFooter,
  setEnableFixedSidebar,
  setEnableClosedSidebar,
  setEnableMobileMenuSmall,
  setEnableMobileMenu,
} = themeSlice.actions;

/**
 * Reducers
 */
export const themeReducer = themeSlice.reducer;
