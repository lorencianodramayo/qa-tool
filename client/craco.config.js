const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': 'rgb(255 0 120)',
              '@font-family': 'Karla, sans-serif',
              '@table-selected-row-bg': '#4606f114',
              '@layout-header-background': '#29125f',
              '@layout-header-height': '53px',
              '@layout-header-padding': '5px 0 0',
              '@layout-body-background': '#ffffff',
              '@menu-dark-selected-item-icon-color': 'rgb(255 0 120)',
              '@menu-dark-selected-item-text-color': 'rgb(255 0 120)',
              '@menu-dark-item-active-bg': '#ffffff',
              '@menu-dark-item-hover-bg': 'transparent',
              '@menu-dark-color': '#ececec',
              '@menu-dark-bg': '#29125f',
              '@menu-horizontal-line-height': '48px !important',
              '@menu-bg': '#29125f',
              '@menu-dark-highlight-color': 'rgb(255 0 120)',
              '@popover-bg': 'transparent',
              '@popover-arrow-width': 0,
              '@popover-arrow-color': 'transparent',
              '@popover-arrow-outer-color': 'transparent',
              '@popover-distance': 0,
              '@popover-padding-horizontal': 0
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};